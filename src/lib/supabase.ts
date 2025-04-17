
import { supabase as supabaseClient } from '@/integrations/supabase/client';

// Export the pre-configured client from the integrations folder
export const supabase = supabaseClient;

// Helper function to check if Supabase connection is properly configured
export const isSupabaseConfigured = () => {
  return true; // Since we're using the auto-generated client, it's always configured
};
