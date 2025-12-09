import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load env variables
dotenv.config();

// Check if Supabase credentials are provided and valid
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API;

let supabase = null;

if (supabaseUrl && supabaseKey &&
    supabaseUrl !== 'your_supabase_project_url_here' &&
    supabaseKey !== 'your_supabase_anon_key_here') {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log("✅ Supabase client initialized successfully");
  } catch (error) {
    console.error("❌ Failed to initialize Supabase client:", error.message);
    console.warn("🔄 Falling back to mock client for development");
    supabase = createMockClient();
  }
} else {
  console.warn("⚠️ Supabase credentials not found or using placeholder values. Running in offline mode.");
  supabase = createMockClient();
}

function createMockClient() {
  return {
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => Promise.resolve({ data: null, error: null }),
      delete: () => Promise.resolve({ data: null, error: null }),
    }),
  };
}

export default supabase;