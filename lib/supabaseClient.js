import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// --- WINDOW POLYFILL START ---
// Polyfill agar tidak error di Android
if (typeof window === 'undefined') {
  global.window = {
    localStorage: {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    },
    navigator: {
      userAgent: 'ReactNative',
    },
    location: {
      href: '',
    },
  };
}
// --- WINDOW POLYFILL END ---

// Mengambil URL & Key dari file .env
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Validasi sederhana agar tidak crash jika lupa isi .env
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("⚠️ Error: EXPO_PUBLIC_SUPABASE_URL atau EXPO_PUBLIC_SUPABASE_ANON_KEY belum diatur di file .env");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});