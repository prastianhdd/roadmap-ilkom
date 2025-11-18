import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { BookOpen, ChevronRight } from 'lucide-react-native';
import { COLORS, SIZES } from '../../lib/theme';
import { useCoursesBySemester } from '../../hooks/useFetchData';

export default function SemesterDetail() {
  const { id, name } = useLocalSearchParams();
  const router = useRouter();
  
  // Fetch courses
  const { courses, loading } = useCoursesBySemester(id);

  const renderCourseCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({
        pathname: '/course/[id]',
        params: { 
          id: item.id, 
          name: item.name,
          category: item.category
        }
      })}
    >
      <View style={styles.cardHeader}>
        {/* Kategori Badge */}
        <View style={[styles.categoryBadge, { 
            backgroundColor: item.category === 'Wajib' ? '#EEF2FF' : '#F3F4F6' 
        }]}>
          <Text style={[styles.categoryText, {
             color: item.category === 'Wajib' ? COLORS.primary : COLORS.textSecondary
          }]}>
            {item.category || 'Umum'}
          </Text>
        </View>
      </View>

      <Text style={styles.courseTitle}>{item.name}</Text>

      <View style={styles.cardFooter}>
        <View style={styles.footerItem}>
          <BookOpen size={14} color={COLORS.textSecondary} />
          <Text style={styles.footerText}>Lihat Materi</Text>
        </View>
        <ChevronRight size={20} color={COLORS.primary} style={{ marginLeft: 'auto' }} />
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: name as string || 'Daftar Mata Kuliah' }} />
      
      <FlatList
        data={courses}
        renderItem={renderCourseCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Belum ada mata kuliah di semester ini.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContent: { padding: SIZES.padding },
  card: { backgroundColor: COLORS.card, borderRadius: SIZES.borderRadius, padding: SIZES.padding, marginBottom: 16, elevation: 2, borderLeftWidth: 4, borderLeftColor: COLORS.primary },
  cardHeader: { flexDirection: 'row', marginBottom: 8 },
  categoryBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  categoryText: { fontFamily: 'Poppins-SemiBold', fontSize: 12 },
  courseTitle: { fontFamily: 'Poppins-Bold', fontSize: 18, color: COLORS.text, marginBottom: 12 },
  cardFooter: { flexDirection: 'row', alignItems: 'center', paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F3F4F6' },
  footerItem: { flexDirection: 'row', alignItems: 'center' },
  footerText: { fontFamily: 'Poppins-Regular', fontSize: 12, color: COLORS.textSecondary, marginLeft: 4 },
  emptyText: { textAlign: 'center', marginTop: 20, fontFamily: 'Poppins-Regular', color: COLORS.textSecondary }
});