import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  const errorDescription = requestUrl.searchParams.get('error_description');
  
  console.log("Auth callback received:", { code: !!code, error, errorDescription });
  
  if (error) {
    console.error("Auth error:", error, errorDescription);
    // Redirect to sign-in page with error
    return NextResponse.redirect(`${requestUrl.origin}/signin?error=${encodeURIComponent(errorDescription || error)}`);
  }
  
  if (code) {
    try {
      const cookieStore = cookies();
      const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
      
      // Exchange the code for a session
      const { error: sessionError } = await supabase.auth.exchangeCodeForSession(code);
      
      if (sessionError) {
        console.error("Session exchange error:", sessionError);
        return NextResponse.redirect(`${requestUrl.origin}/signin?error=auth_session_error`);
      }
      
      console.log("Authentication successful");
      // Redirect to profile page on success
      return NextResponse.redirect(`${requestUrl.origin}/profile`);
    } catch (error) {
      console.error("Exception in auth callback:", error);
      return NextResponse.redirect(`${requestUrl.origin}/signin?error=auth_exception`);
    }
  }

  // If no code and no error, redirect to home
  return NextResponse.redirect(requestUrl.origin);
}