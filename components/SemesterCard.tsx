import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GraduationCap } from 'lucide-react-native';
import { COLORS, SIZES } from '../lib/theme';

// Tipe data untuk props (agar TypeScript senang)
interface SemesterProps {
  item: {
    id: number;
    name: string;
    order: number;
    sks: number;
  };
  onPress: () => void;
}

export default function SemesterCard({ item, onPress }: SemesterProps) {
  // Logika warna warni
  const colorKeys = ['semester1', 'semester2', 'semester3', 'semester4', 'semester5', 'semester6', 'semester7', 'semester8'];
  // @ts-ignore
  const bgColor = COLORS[colorKeys[(item.order - 1) % 8]] || COLORS.primary;

  return (
    <TouchableOpacity
      style={[styles.cardContainer, { backgroundColor: bgColor }]}
      onPress={onPress}
    >
      <Text style={styles.cardNumber}>{item.order}</Text>
      
      <View style={styles.cardContent}>
        <GraduationCap size={32} color={COLORS.white} />
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardSks}>{item.sks} SKS</Text> 
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    margin: SIZES.padding / 2,
    height: 140,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.padding,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    position: 'relative',
    elevation: 4,
    // Shadow iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardNumber: {
    position: 'absolute',
    top: -10,
    right: -5,
    fontSize: 80,
    fontFamily: 'Poppins-Bold',
    color: 'rgba(255,255,255,0.15)',
  },
  cardContent: {
    zIndex: 1,
  },
  cardTitle: {
    color: COLORS.white,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16, // Sedikit disesuaikan
    marginTop: 5,
  },
  cardSks: {
    color: 'rgba(255,255,255,0.9)',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
});