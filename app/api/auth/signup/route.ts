// import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
export async function POST(request: NextRequest) {
    const supabase = await createClient();
    const { email, password } = await request.json();
    console.log(email, password);
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    
const { data:inserdata, error:errorinsert } = await supabase
.from('tbl_user')
.insert([
  { email:  email,
    created_at: new Date(),
   },
]);

if (errorinsert) {
    return NextResponse.json({ error: errorinsert.message }, { status: 400 });
}

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data||inserdata, { status: 200 });


}
