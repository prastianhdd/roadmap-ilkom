import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Search as SearchIcon, X } from 'lucide-react-native';
import { COLORS, SIZES } from '../lib/theme';
import { useSearchCourses } from '../hooks/useFetchData';
import CourseCard from '../components/CourseCard';

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const { search, results, loading, error } = useSearchCourses();

  // Debounce sederhana: Menunggu user berhenti mengetik sebentar baru mencari
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        search(query);
      }
    }, 500); // Delay 500ms

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const renderItem = ({ item }: { item: any }) => (
    <CourseCard 
      item={item}
      onPress={() => router.push({
        pathname: '/course/[id]',
        params: { 
          id: item.id, 
          name: item.name,
          category: item.category,
          semesterId: item.semesterId
        }
      })}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header Pencarian Kustom */}
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <SearchIcon size={20} color={COLORS.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="Cari nama mata kuliah..."
            placeholderTextColor={COLORS.textSecondary}
            value={query}
            onChangeText={setQuery}
            autoFocus={true}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <X size={18} color={COLORS.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={() => router.back()} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Batal</Text>
        </TouchableOpacity>
      </View>

      {/* Konten Hasil */}
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={results}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              query.length > 0 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyText}>Tidak ditemukan hasil untuk "{query}"</Text>
                </View>
              ) : (
                <View style={styles.emptyState}>
                  <Text style={styles.placeholderText}>Ketik untuk mulai mencari...</Text>
                </View>
              )
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
    paddingTop: 50, // Sesuaikan untuk notch/status bar
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.text,
    height: '100%', // Penting agar text vertikal center
  },
  cancelButton: {
    marginLeft: 12,
  },
  cancelText: {
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.primary,
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  listContent: {
    padding: SIZES.padding,
  },
  emptyState: {
    marginTop: 50,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Poppins-Regular',
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  placeholderText: {
    fontFamily: 'Poppins-Regular',
    color: COLORS.textSecondary,
    fontSize: 14,
    fontStyle: 'italic',
  }
});