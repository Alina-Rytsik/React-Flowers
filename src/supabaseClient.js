import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://supabase.com/dashboard/project/xubswrbfgfvpurzutyrf'; // Dashboard
const supabaseKey = 'your-anon-key'; // Public anon key
export const supabase = createClient(supabaseUrl, supabaseKey);
