import { createClient } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Create a Supabase client for server-side operations
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Get the current user
export const getCurrentUser = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user || null;
};

// Sign out the current user
export const signOut = async () => {
  return await supabase.auth.signOut();
};

// Sign in with Google (client-side)
export const signInWithGoogle = async () => {
  const supabaseClient = createClientComponentClient();
  return await supabaseClient.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
};

// Sign in with GitHub (client-side)
export const signInWithGithub = async () => {
  const supabaseClient = createClientComponentClient();
  return await supabaseClient.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
};