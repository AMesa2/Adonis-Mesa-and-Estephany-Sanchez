// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zighylulqmskgjvmeaiv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppZ2h5bHVscW1za2dqdm1lYWl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0MjA5MDcsImV4cCI6MjA2Mjk5NjkwN30.vCNwplhXNQ7vmYvANLV1ajz5635CxdQQTjNxWBEbx3o';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);



//  Test Supabase Connection
const testConnection = async () => {
  const { data, error } = await supabase.from('watchlist').select('*');
  if (error) {
    console.error("Failed to connect to Supabase:", error);
  } else {
    console.log("Supabase Connection Successful. Data fetched:", data);
  }
};

testConnection();