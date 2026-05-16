import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client using the service_role key.
// NEVER import this in client components — it has full database access.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);
