// app/_layout.tsx

import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { COLORS } from '../lib/theme'; // Pastikan path ini benar

// Mencegah splash screen hilang otomatis sebelum font dimuat
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        // Style Global Header
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'Poppins-SemiBold',
        },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      {/* Definisi Layar */}
      <Stack.Screen name="index" options={{ title: 'Roadmap Kurikulum' }} />
      <Stack.Screen name="search" options={{ title: 'Cari Mata Kuliah' }} />
      
      {/* Layar Dinamis */}
      <Stack.Screen name="semester/[id]" options={{ title: 'Daftar Mata Kuliah' }} />
      <Stack.Screen name="course/[id]" options={{ title: 'Detail Materi' }} />
      <Stack.Screen name="about" options={{ title: 'Tentang Aplikasi' }} />
    </Stack>
  );
}