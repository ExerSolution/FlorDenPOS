import { NextRequest,NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'  
export async function GET(request: NextRequest) {
    const supabase = await createClient();
    const { email, password } = await request.json();
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if(error){
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 200 });
    }
