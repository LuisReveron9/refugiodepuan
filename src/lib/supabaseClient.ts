import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tvdylgjjcmtbvglbcbdd.supabase.co";

const supabaseAnonKey =
  "sb_publishable_sykU-ip7uuBbi1x2-MuWfQ_SL0J9n07";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);