import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  // Keep a runtime guard so developers get a clear error locally
  // In Expo this should be provided via app.json or environment.
  console.warn('Supabase env vars are not set: EXPO_PUBLIC_SUPABASE_URL or EXPO_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!, {
  auth: { persistSession: true },
});

export default supabase;
