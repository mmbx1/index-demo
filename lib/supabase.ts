import { createClient } from '@supabase/supabase-js';

// We strictly require these variables to exist, or the app will throw a loud error 
// rather than failing silently in production.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase Environment Variables');
}

// Export the single, secure instance of the database client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);