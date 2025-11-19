import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BookOpen, ChevronRight } from 'lucide-react-native';
import { COLORS, SIZES } from '../lib/theme';

interface CourseProps {
  item: {
    id: number;
    name: string;
    category: string; // e.g. 'green', 'blue', 'yellow', 'red'
  };
  onPress: () => void;
}

// Peta Warna Kategori (Mapping)
const CATEGORY_COLORS: { [key: string]: string } = {
  green: '#10B981', // Emerald
  blue: '#3B82F6',  // Blue
  yellow: '#F59E0B', // Amber
  red: '#EF4444',   // Red
  // Default fallback
  default: COLORS.primary, 
};

// Peta Label Kategori (Opsional: Mengubah kode warna jadi Teks yang enak dibaca)
const CATEGORY_LABELS: { [key: string]: string } = {
  green: 'Wajib Umum',
  blue: 'Wajib Prodi',
  yellow: 'Peminatan',
  red: 'Lanjutan',
  default: 'Mata Kuliah'
};

export default function CourseCard({ item, onPress }: CourseProps) {
  // Ambil warna berdasarkan kategori, atau gunakan default jika tidak ada
  const accentColor = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.default;
  const label = CATEGORY_LABELS[item.category] || item.category;

  return (
    <TouchableOpacity 
      style={[styles.card, { borderLeftColor: accentColor }]} 
      onPress={onPress}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.categoryBadge, { backgroundColor: accentColor + '15' }]}> 
          {/* '15' menambahkan transparansi ke warna hex */}
          <Text style={[styles.categoryText, { color: accentColor }]}>
            {label.toUpperCase()}
          </Text>
        </View>
      </View>

      <Text style={styles.courseTitle}>{item.name}</Text>

      <View style={styles.cardFooter}>
        <View style={styles.footerItem}>
          <BookOpen size={14} color={COLORS.textSecondary} />
          <Text style={styles.footerText}>Lihat Materi</Text>
        </View>
        <ChevronRight size={20} color={accentColor} style={{ marginLeft: 'auto' }} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.padding,
    marginBottom: 16,
    elevation: 2,
    borderLeftWidth: 4,
    // borderLeftColor di-handle via inline style di atas
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: { flexDirection: 'row', marginBottom: 8 },
  categoryBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  categoryText: { fontFamily: 'Poppins-SemiBold', fontSize: 10 },
  courseTitle: { fontFamily: 'Poppins-Bold', fontSize: 16, color: COLORS.text, marginBottom: 12 },
  cardFooter: { flexDirection: 'row', alignItems: 'center', paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F3F4F6' },
  footerItem: { flexDirection: 'row', alignItems: 'center' },
  footerText: { fontFamily: 'Poppins-Regular', fontSize: 12, color: COLORS.textSecondary, marginLeft: 4 },
});