import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load env variables
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_API
);

export default supabase;
