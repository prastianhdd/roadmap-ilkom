import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Linking, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { FileText, Video, Link as LinkIcon, DownloadCloud } from 'lucide-react-native';
import { COLORS, SIZES } from '../../lib/theme';
import { useCourseDetail } from '../../hooks/useFetchData';

// 1. Definisi Tipe Data (Agar TypeScript tidak bingung membaca 'never')
interface Material {
  id: number;
  title: string;
  type: string;
  content: string;
}

interface Course {
  id: number;
  name: string;
  category: string;
  semesterId: number;
  materials: Material[];
}

export default function CourseDetail() {
  const { id } = useLocalSearchParams();
  
  // 2. Casting tipe data Hook (Solusi 'Property error does not exist')
  const { course, loading, error } = useCourseDetail(id) as { 
    course: Course | null; 
    loading: boolean; 
    error: any; 
  };

  // 3. Berikan tipe 'string' eksplisit untuk parameter
  const handleOpenLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Error", "Tidak dapat membuka link ini: " + url);
    }
  };

  // 3. Berikan tipe 'string' eksplisit
  const getIcon = (type: string) => {
    const t = type?.toUpperCase();
    switch (t) {
      case 'PDF': return <FileText size={24} color="#E03B3B" />;
      case 'VIDEO': return <Video size={24} color="#4A69E2" />;
      case 'DOC': return <FileText size={24} color="#2563EB" />;
      case 'LINK': return <LinkIcon size={24} color="#10B981" />;
      case 'IMAGE': return <FileText size={24} color="#A855F7" />;
      default: return <FileText size={24} color={COLORS.textSecondary} />;
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  // Tampilkan error jika ada
  if (error) {
     return (
      <View style={styles.center}>
        <Text style={{ fontFamily: 'Poppins-Regular', color: 'red' }}>Error: {error}</Text>
      </View>
    );
  }

  if (!course) {
    return (
      <View style={styles.center}>
        <Text style={{ fontFamily: 'Poppins-Regular' }}>Data tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Detail Mata Kuliah' }} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HERO SECTION */}
        <View style={styles.heroSection}>
          <View style={styles.heroHeader}>
            <Text style={styles.heroCode}>ID: {course.id}</Text> 
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>{course.category}</Text>
            </View>
          </View>
          <Text style={styles.heroTitle}>{course.name}</Text>
          <Text style={styles.heroSubtitle}>Mata Kuliah Semester {course.semesterId}</Text>
        </View>

        {/* MATERI PEMBELAJARAN */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Materi Pembelajaran</Text>
          <Text style={styles.sectionSubtitle}>
            Total {course.materials?.length || 0} materi tersedia
          </Text>
          
          {/* 4. Berikan tipe 'any' atau 'Material' pada map item */}
          {course.materials && course.materials.length > 0 ? (
            course.materials.map((item: Material) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.materialCard}
                onPress={() => handleOpenLink(item.content)}
              >
                <View style={styles.materialIcon}>
                  {getIcon(item.type)}
                </View>
                <View style={styles.materialContent}>
                  <Text style={styles.materialTitle}>{item.title}</Text>
                  <Text style={styles.materialInfo}>
                    {item.type} • Klik untuk buka
                  </Text>
                </View>
                <DownloadCloud size={20} color={COLORS.textSecondary} />
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Belum ada materi yang diunggah.</Text>
            </View>
          )}
        </View>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  heroSection: { backgroundColor: COLORS.primary, padding: SIZES.padding * 1.5, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, marginBottom: 20 },
  heroHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  heroCode: { fontFamily: 'Poppins-Bold', color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  heroBadge: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  heroBadgeText: { color: '#fff', fontFamily: 'Poppins-SemiBold', fontSize: 12 },
  heroTitle: { fontFamily: 'Poppins-Bold', fontSize: 24, color: '#fff', marginBottom: 4 },
  heroSubtitle: { fontFamily: 'Poppins-Regular', color: 'rgba(255,255,255,0.9)', fontSize: 14 },
  section: { paddingHorizontal: SIZES.padding, marginBottom: 24 },
  sectionTitle: { fontFamily: 'Poppins-Bold', fontSize: 18, color: COLORS.text, marginBottom: 8 },
  sectionSubtitle: { fontFamily: 'Poppins-Regular', fontSize: 14, color: COLORS.textSecondary, marginBottom: 12, marginTop: -4 },
  materialCard: { backgroundColor: COLORS.card, borderRadius: SIZES.borderRadius, padding: 12, marginBottom: 10, flexDirection: 'row', alignItems: 'center', elevation: 1, borderWidth: 1, borderColor: '#F3F4F6' },
  materialIcon: { width: 48, height: 48, backgroundColor: '#F9FAFB', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  materialContent: { flex: 1 },
  materialTitle: { fontFamily: 'Poppins-SemiBold', fontSize: 15, color: COLORS.text },
  materialInfo: { fontFamily: 'Poppins-Regular', fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  emptyState: { padding: 20, alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', borderWidth: 1, borderColor: '#ccc', borderRadius: 12 },
  emptyText: { fontFamily: 'Poppins-Regular', color: COLORS.textSecondary },
});