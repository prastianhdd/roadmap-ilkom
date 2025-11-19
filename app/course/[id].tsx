import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Linking, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { FileText, Video, Link as LinkIcon, DownloadCloud } from 'lucide-react-native';
import { COLORS, SIZES } from '../../lib/theme';
import { useCourseDetail } from '../../hooks/useFetchData';
import { handleFileOpen } from '../../lib/fileHandler';

// Definisi Tipe Data
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

// 1. Definisi Peta Warna (Sama seperti di CourseCard)
const CATEGORY_COLORS: { [key: string]: string } = {
  green: '#10B981', // Emerald
  blue: '#3B82F6',  // Blue
  yellow: '#F59E0B', // Amber
  red: '#EF4444',   // Red
  default: COLORS.primary,
};

export default function CourseDetail() {
  // 2. Ambil juga parameter 'category' dan 'name' dari navigasi sebelumnya
  // agar warna bisa langsung muncul sebelum data loading selesai
  const params = useLocalSearchParams();
  const id = params.id;
  const initialCategory = params.category as string;
  
  const { course, loading, error } = useCourseDetail(id) as { 
    course: Course | null; 
    loading: boolean; 
    error: any; 
  };
  
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  // 3. Tentukan Warna Aksen
  // Prioritas: Kategori dari API -> Kategori dari Params -> Default
  const categoryKey = course?.category || initialCategory || 'default';
  const accentColor = CATEGORY_COLORS[categoryKey] || CATEGORY_COLORS.default;

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

  const handlePressMaterial = async (item: Material) => {
    const type = item.type.toUpperCase();
    
    if (type === 'LINK' || type === 'DRIVE' || type === 'VIDEO') {
      try {
        const supported = await Linking.canOpenURL(item.content);
        if (supported) {
          await Linking.openURL(item.content);
        } else {
          Alert.alert("Error", "Link tidak valid/tidak didukung.");
        }
      } catch (err) {
        Alert.alert("Error", "Terjadi kesalahan saat membuka link.");
      }
      return;
    }

    try {
      setDownloadingId(item.id);
      await handleFileOpen(item.content, item.title, type);
    } catch (err) {
      console.error(err);
    } finally {
      setDownloadingId(null);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        {/* Spinner mengikuti warna kategori */}
        <ActivityIndicator size="large" color={accentColor} />
      </View>
    );
  }

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
      {/* 4. Update Header Navigation agar warnanya seragam */}
      <Stack.Screen 
        options={{ 
          title: 'Detail Mata Kuliah',
          headerStyle: { backgroundColor: accentColor }, // Header mengikuti warna kategori
        }} 
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HERO SECTION DENGAN WARNA DINAMIS */}
        <View style={[styles.heroSection, { backgroundColor: accentColor }]}>
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
          
          {course.materials && course.materials.length > 0 ? (
            course.materials.map((item: Material) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.materialCard}
                onPress={() => handlePressMaterial(item)}
                disabled={downloadingId !== null}
              >
                <View style={styles.materialIcon}>
                  {getIcon(item.type)}
                </View>
                <View style={styles.materialContent}>
                  <Text style={styles.materialTitle}>{item.title}</Text>
                  <Text style={styles.materialInfo}>
                    {item.type} • {(item.type === 'LINK' || item.type === 'VIDEO') ? 'Buka Link' : 'Download & Buka'}
                  </Text>
                </View>
                
                {downloadingId === item.id ? (
                  <ActivityIndicator size="small" color={accentColor} />
                ) : (
                  <DownloadCloud size={20} color={COLORS.textSecondary} />
                )}
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
  
  // Hapus backgroundColor static dari sini karena sudah via inline-style
  heroSection: { 
    padding: SIZES.padding * 1.5, 
    borderBottomLeftRadius: 24, 
    borderBottomRightRadius: 24, 
    marginBottom: 20 
  },
  
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