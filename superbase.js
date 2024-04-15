import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const superbaseUrl = "https://psdtepahkdbutbwyfzzt.supabase.co";
const superbaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzZHRlcGFoa2RidXRid3lmenp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxOTg3MTMsImV4cCI6MjAyODc3NDcxM30.MtKpj4TDWRFQ2QVF5NjN4uARAn_AEawH6dx9z6eQqtc";


  export const  supabase = createClient(superbaseUrl,superbaseAnonKey)