import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { COLORS, SIZES } from '../../lib/theme';
import { useCoursesBySemester } from '../../hooks/useFetchData';
import CourseCard from '../../components/CourseCard'; // Import komponen baru

export default function SemesterDetail() {
  const { id, name } = useLocalSearchParams();
  const router = useRouter();
  
  const { courses, loading } = useCoursesBySemester(id);

  const renderItem = ({ item }: { item: any }) => (
    <CourseCard 
      item={item}
      onPress={() => router.push({
        pathname: '/course/[id]',
        params: { 
          id: item.id, 
          name: item.name,
          category: item.category,
          semesterId: id // Kita kirim ID semester juga untuk konteks
        }
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
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: name as string || 'Daftar Mata Kuliah' }} />
      
      <FlatList
        data={courses}
        renderItem={renderItem}
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
  emptyText: { textAlign: 'center', marginTop: 20, fontFamily: 'Poppins-Regular', color: COLORS.textSecondary }
});