import { supabase } from "~/lib/supabase/client";

export async function recordAuthenticatedLogin() {
  const { error } = await supabase.rpc("record_login");

  if (error) {
    throw new Error(`Streak login tidak dapat diperbarui: ${error.message}`);
  }
}
