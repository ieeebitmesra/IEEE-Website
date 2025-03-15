import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  db: {
    schema: 'public'
  }
});

// Enhanced Google authentication function
export const signInWithGoogle = async () => {
  console.log("Starting Google sign-in process");
  try {
    // Define the exact redirect URL
    const redirectUrl = `${window.location.origin}/auth/callback`;
    console.log("Redirect URL:", redirectUrl);
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        // Make sure this matches what's configured in Supabase dashboard
        skipBrowserRedirect: false,
      },
    });
    
    console.log("Sign-in response:", { data, error });
    
    if (error) {
      console.error("Google sign-in error:", error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error("Exception during Google sign-in:", error);
    throw error;
  }
};

export const signInWithGithub = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    
    if (error) {
      console.error("GitHub sign-in error:", error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error("Exception during GitHub sign-in:", error);
    throw error;
  }
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};