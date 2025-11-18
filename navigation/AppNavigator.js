// navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from '../lib/theme'; // Import warna dari Fase 2

// Import semua layar Anda
import HomeScreen from '../screens/HomeScreen';
import CourseListScreen from '../screens/CourseListScreen';
import CourseDetailScreen from '../screens/CourseDetailScreen';
import SearchScreen from '../screens/SearchScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          // Header default untuk seluruh aplikasi
          headerStyle: {
            backgroundColor: COLORS.primary, // Biru/Ungu dari konsep.pdf
          },
          headerTintColor: COLORS.white, // Warna teks header (putih)
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold', // Font dari Fase 2
          },
          headerBackTitleVisible: false, // Menyembunyikan teks "Back" di iOS
        }}
      >
        {/* Layar 1: Home */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Roadmap Kurikulum', // Judul di header
          }}
        />

        {/* Layar 2: Daftar Mata Kuliah */}
        <Stack.Screen
          name="CourseList"
          component={CourseListScreen}
          // Judul untuk layar ini akan diatur secara dinamis
          options={({ route }) => ({
            title: route.params.semesterName || 'Daftar Mata Kuliah',
          })}
        />

        {/* Layar 3: Detail Mata Kuliah */}
        <Stack.Screen
          name="CourseDetail"
          component={CourseDetailScreen}
          options={({ route }) => ({
            title: route.params.courseName || 'Detail Mata Kuliah',
          })}
        />

        {/* Layar 4: Pencarian */}
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            title: 'Cari Mata Kuliah',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}