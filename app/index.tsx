import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { GraduationCap, Search, Info } from 'lucide-react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES } from '../lib/theme';
import { useSemesters } from '../hooks/useFetchData';
import SemesterCard from '../components/SemesterCard'; // Import komponen baru
// Tambahkan 'Info' ke import

export default function Home() {
  const router = useRouter();
  const { semesters, loading, error } = useSemesters();

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* Header Row untuk Judul dan Tombol Info */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <Text style={styles.title}>Pilih Semester</Text>
          <Text style={styles.subtitle}>
            Klik semester untuk melihat daftar
          </Text>
        </View>
        
        {/* Tombol Info Baru */}
        <TouchableOpacity 
          onPress={() => router.push('/about')}
          style={{ padding: 8, backgroundColor: '#EEF2FF', borderRadius: 8 }}
        >
          <Info size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.searchButton}
        onPress={() => router.push('/search')}
      >
        <Search size={20} color={COLORS.primary} />
        <Text style={styles.searchText}>Cari Mata Kuliah...</Text>
      </TouchableOpacity>
    </View>
  );

  // Fungsi render item sekarang jauh lebih sederhana
  const renderItem = ({ item }: { item: any }) => (
    <SemesterCard 
      item={item}
      onPress={() => router.push({
        pathname: '/semester/[id]',
        params: { id: item.id, name: item.name }
      })}
    />
  );

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
          title: 'Roadmap Ilmu Komputer',
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: '#fff',
          headerTitleStyle: { fontFamily: 'Poppins-SemiBold' },
          headerShadowVisible: false,
        }} 
      />
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <FlatList
        data={semesters}
        renderItem={renderItem}
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
  title: { fontSize: SIZES.h1, fontFamily: 'Poppins-Bold', color: COLORS.text },
  subtitle: { fontSize: SIZES.body, fontFamily: 'Poppins-Regular', color: COLORS.textSecondary, marginTop: 5, textAlign: 'center' },
  searchButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, padding: 12, borderRadius: SIZES.borderRadius, borderWidth: 1, borderColor: '#E0E0E0', marginTop: 10 },
  searchText: { marginLeft: 10, color: COLORS.textSecondary, fontFamily: 'Poppins-Regular' },
});