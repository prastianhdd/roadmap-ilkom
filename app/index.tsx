import React from 'react';
// 👇 Pastikan ada ActivityIndicator di dalam kurung kurawal ini
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { GraduationCap, Search } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Ini yang tadi kita perbaiki
import { COLORS, SIZES } from '../lib/theme';
import { useSemesters } from '../hooks/useFetchData';

export default function Home() {
  const router = useRouter();
  // Gunakan hook untuk ambil data
  const { semesters, loading, error } = useSemesters();

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Pilih Semester</Text>
      <Text style={styles.subtitle}>
        Klik semester untuk melihat daftar mata kuliah
      </Text>
      <TouchableOpacity 
        style={styles.searchButton}
        onPress={() => router.push('/search')}
      >
        <Search size={20} color={COLORS.primary} />
        <Text style={styles.searchText}>Cari Mata Kuliah...</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSemesterCard = ({ item }: { item: any }) => {
    // Mapping warna berdasarkan urutan (karena di DB tidak simpan warna)
    // Kita putar ulang warna jika semester > 8
    const colorKeys = ['semester1', 'semester2', 'semester3', 'semester4', 'semester5', 'semester6', 'semester7', 'semester8'];
    // @ts-ignore
    const bgColor = COLORS[colorKeys[(item.order - 1) % 8]] || COLORS.primary;

    return (
      <TouchableOpacity
        style={[styles.cardContainer, { backgroundColor: bgColor }]}
        onPress={() => router.push({
          pathname: '/semester/[id]',
          params: { id: item.id, name: item.name }
        })}
      >
        <Text style={styles.cardNumber}>{item.order}</Text>
        <View style={styles.cardContent}>
          <GraduationCap size={32} color={COLORS.white} />
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardSks}>{item.sks} SKS</Text> 
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen 
        options={{
          title: 'Roadmap Kurikulum',
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: '#fff',
          headerTitleStyle: { fontFamily: 'Poppins-SemiBold' },
          headerShadowVisible: false,
        }} 
      />
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <FlatList
        data={semesters} // Data dari Supabase
        renderItem={renderSemesterCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContainer: { padding: SIZES.padding / 2, paddingBottom: 40 },
  headerContainer: { padding: SIZES.padding, marginBottom: 10 },
  title: { fontSize: SIZES.h1, fontFamily: 'Poppins-Bold', color: COLORS.text, textAlign: 'center' },
  subtitle: { fontSize: SIZES.body, fontFamily: 'Poppins-Regular', color: COLORS.textSecondary, marginTop: 5, textAlign: 'center', marginBottom: 20 },
  searchButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, padding: 12, borderRadius: SIZES.borderRadius, borderWidth: 1, borderColor: '#E0E0E0', marginTop: 10 },
  searchText: { marginLeft: 10, color: COLORS.textSecondary, fontFamily: 'Poppins-Regular' },
  cardContainer: { flex: 1, margin: SIZES.padding / 2, height: 140, borderRadius: SIZES.borderRadius, padding: SIZES.padding, justifyContent: 'flex-end', overflow: 'hidden', position: 'relative', elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  cardNumber: { position: 'absolute', top: -10, right: -5, fontSize: 80, fontFamily: 'Poppins-Bold', color: 'rgba(255,255,255,0.15)' },
  cardContent: { zIndex: 1 },
  cardTitle: { color: COLORS.white, fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h3, marginTop: 5 },
  cardSks: { color: 'rgba(255,255,255,0.9)', fontFamily: 'Poppins-Regular', fontSize: 12 },
});