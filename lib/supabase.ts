import { createClient } from '@supabase/supabase-js';

const isBrowser = typeof window !== 'undefined';

const createDummyClient = () => {
  return {
    auth: {
      signInWithOAuth: () => Promise.resolve({ data: null, error: null }),
      signOut: () => Promise.resolve({ error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null })
    }
  } as any;
};

let supabaseInstance: ReturnType<typeof createClient> | null = null;

export const getSupabase = () => {
  if (!isBrowser) {
    console.warn('Using dummy Supabase client for SSR/build');
    return createDummyClient();
  }

  if (supabaseInstance) return supabaseInstance;
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase credentials missing');
    return createDummyClient();
  }
  
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseInstance;
};

// Export for backward compatibility
export const supabase = getSupabase();

// Update auth functions to use getSupabase()
export async function signInWithGoogle() {
  const client = getSupabase();
  if (!client) {
    throw new Error('Supabase client not initialized');
  }
  
  const { data, error } = await client.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  
  if (error) throw error;
  return data;
}

export async function signInWithGithub() {
  const client = getSupabase();
  if (!client) {
    throw new Error('Supabase client not initialized');
  }
  
  const { data, error } = await client.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  
  if (error) throw error;
  return data;
}

export async function signOut() {
  const client = getSupabase();
  if (!client) {
    throw new Error('Supabase client not initialized');
  }
  
  const { error } = await client.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const client = getSupabase();
  if (!client) {
    throw new Error('Supabase client not initialized');
  }
  
  const { data: { user } } = await client.auth.getUser();
  return user;
}
