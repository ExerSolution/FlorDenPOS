import { createClient } from "@/utils/supabase/server";
import { SupabaseClient, UserResponse } from "@supabase/supabase-js";
import { randomBytes } from "crypto";

import { NextRequest, NextResponse } from "next/server";

// Define the type for a single site object
interface Site {
  site_id: string;
  created_at: string; // Use Date if you parse it into a Date object
  user_id: string;
  site_link: string;
  site_name: string;
  description: string;
  faucetpay_api_key: string;
  api_key: string;
  auto_payment: boolean;
  is_exist: boolean;
  updated_at: string; // Use Date if you parse it into a Date object
}

// Define the type for the response from Supabase for site data
interface SiteResponse {
  error: any; // Replace 'any' with the actual error type if known
  data: Site[];
  count: number | null;
  status: number;
  statusText: string;
}
// Define the type for a single currency object
interface Currency {
  id: number;
  created_at: string; // Use Date if you parse it into a Date object
  currency_name: string;
  currency_code: string;
  is_exist: boolean;
  user_id: string;
  updated_at: string; // Use Date if you parse it into a Date object
}

// Define the type for the response from Supabase for currency data
interface CurrencyResponse {
  error: any; // Replace 'any' with the actual error type if known
  data: Currency[];
  count: number | null;
  status: number;
  statusText: string;
}

export async function POST(req: NextRequest) {
  const {
    site_id,
    currency_id,
    amount,
    refferal,
    wallet_address,
    transaction_id,
  } = await req.json();

  const supabase = createClient();
  const user = await supabase.auth.getUser();

  const siteData = await getSite(supabase, user, site_id);
  const currencyData = await getCurrency(supabase, user, currency_id);
  const transactionData = await getCallbackUrl(
    supabase,
    user,
    site_id,
    transaction_id
  );

  if (!siteData || !currencyData || !transactionData) {
    return NextResponse.json({ error: "Error fetching data" }, { status: 400 });
  }

  const faucetpay_api_key = siteData[0].faucetpay_api_key;
  const currency_code = currencyData[0].currency_code;
  const callback_url = transactionData[0].callback_url;

  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  };

  let bodyContent = new FormData();
  bodyContent.append("api_key", faucetpay_api_key);
  bodyContent.append("amount", amount);
  bodyContent.append("to", wallet_address);
  bodyContent.append("currency", currency_code);
  bodyContent.append("referral", refferal);

  let response = await fetch("https://faucetpay.io/api/v1/send", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  console.log(data);
  if (data.status != 200) {
    return NextResponse.json({ error: data.message }, { status: 400 });
  }
  const transactionRecord = await updateTransactionRecord(
    supabase,
    user,
    site_id,
    currency_id,
    amount,
    refferal,
    wallet_address,
    data,
    transaction_id,
    callback_url
  );
  console.log(transactionRecord);

  if (!transactionRecord) {
    return NextResponse.json(
      { error: "Error creating transaction record" },
      { status: 400 }
    );
  } else {
    return NextResponse.json(
      { data: "Transaction created successfully" },
      { status: 200 }
    );
  }
}
const updateTransactionRecord = async (
  supabase: SupabaseClient,
  user: UserResponse,
  site_id: string,
  currency_id: string,
  amount: number,
  refferal: boolean,
  wallet_address: string,
  faucetpay_data: any,
  transaction_id: string,
  callback_url: string
) => {
  const { data, error } = await supabase
    .from("tbl_transaction")
    .update({
      currency: currency_id,
      to_user: wallet_address,
      current_balance: faucetpay_data.balance,
      status: faucetpay_data.status == 200 ? "Sent" : "Declined",
      payout_user_hash: faucetpay_data.payout_user_hash,
      payout_id: faucetpay_data.payout_id,
      refferal: refferal,
      user_id: user.data.user?.id,
      hash_number: faucetpay_data.hash_number,
      site_id: site_id,
      type: "Manual",
      transaction_id: randomBytes(8).toString("hex"),
      is_exist: true,
      amount: amount,
    })
    .eq("transaction_id", transaction_id)
    .select();

  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };
  if (!data || data.length == 0) {
    return false;
  }

  let bodyContent = JSON.stringify(data[0]);

  let response = await fetch(callback_url, {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  if (error) {
    return false;
  }
  return data;
};

const getCurrency = async (
  supabase: SupabaseClient,
  user: UserResponse,
  currency: string
) => {
  const { data, error } = await supabase
    .from("tbl_token")
    .select("*")
    .eq("id", currency)
    .eq("user_id", user.data.user?.id)
    .eq("is_exist", true);
  console.log(error);
  if (error) {
    return null;
  }
  return data;
};

const getSite = async (
  supabase: SupabaseClient,
  user: UserResponse,
  site_id: string
) => {
  const { data, error } = await supabase
    .from("tbl_site")
    .select("*")
    .eq("site_id", site_id)
    .eq("user_id", user.data.user?.id)
    .eq("is_exist", true);
  console.log(error);
  if (error) {
    return null;
  }
  return data;
};

const getCallbackUrl = async (
  supabase: SupabaseClient,
  user: UserResponse,
  site_id: string,
  transaction_id: string
) => {
  const { data, error } = await supabase
    .from("tbl_transaction")
    .select("callback_url")
    .eq("transaction_id", transaction_id)
    .eq("site_id", site_id)
    .eq("user_id", user.data.user?.id)
    .eq("is_exist", true);
  console.log(error);
  if (error) {
    return null;
  }
  return data;
};
