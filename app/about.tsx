import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import { Stack } from 'expo-router';
import { Github, Mail, Globe, Code2, Smartphone, Database } from 'lucide-react-native';
import { COLORS, SIZES } from '../lib/theme';

export default function AboutScreen() {
  
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Tentang Aplikasi' }} />
      
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* BAGIAN 1: Header Aplikasi */}
        <View style={styles.appInfoSection}>
          <View style={styles.logoContainer}>
            <Smartphone size={40} color={COLORS.white} />
          </View>
          <Text style={styles.appName}>Roadmap Ilmu Komputer</Text>
          <Text style={styles.version}>Versi 1.0.0</Text>
          <Text style={styles.description}>
            Aplikasi panduan kurikulum interaktif untuk mahasiswa Ilmu Komputer. 
            Dibuat untuk memudahkan akses materi dan alur pembelajaran.
          </Text>
        </View>

        {/* BAGIAN 2: Profil Pengembang */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pengembang</Text>
          <View style={styles.devCard}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}></Text> 
            </View>
            <View style={styles.devInfo}>
              <Text style={styles.devName}>Prastian Hidayat</Text>
              <Text style={styles.devRole}>Junior Fullstack Developer</Text>
            </View>
          </View>
          
          {/* Tombol Sosial Media */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn} onPress={() => openLink('https://github.com/prastianhdd')}>
              <Github size={20} color={COLORS.white} />
              <Text style={styles.socialText}>GitHub</Text>
            </TouchableOpacity>
            
            {/* Ganti URL portfolio Anda jika ada */}
            <TouchableOpacity style={[styles.socialBtn, { backgroundColor: '#0A66C2' }]} onPress={() => openLink('prastianhd@gmail.com')}>
              <Mail size={20} color={COLORS.white} />
              <Text style={styles.socialText}>Email</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* BAGIAN 3: Teknologi */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Teknologi (Tech Stack)</Text>
          <View style={styles.techContainer}>
            <View style={styles.techItem}>
              <Code2 size={20} color={COLORS.primary} />
              <Text style={styles.techText}>React Native (Expo)</Text>
            </View>
            <View style={styles.techItem}>
              <Database size={20} color={COLORS.primary} />
              <Text style={styles.techText}>Supabase (PostgreSQL)</Text>
            </View>
            <View style={styles.techItem}>
              <Globe size={20} color={COLORS.primary} />
              <Text style={styles.techText}>TypeScript</Text>
            </View>
          </View>
        </View>

        {/* Footer Copyright */}
        <Text style={styles.copyright}>2025 © Roadmap Ilkom. All rights reserved.</Text>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SIZES.padding, paddingBottom: 40 },
  
  // App Info Styles
  appInfoSection: { alignItems: 'center', marginBottom: 30, marginTop: 10 },
  logoContainer: { width: 80, height: 80, backgroundColor: COLORS.primary, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 15, elevation: 5 },
  appName: { fontFamily: 'Poppins-Bold', fontSize: 24, color: COLORS.text },
  version: { fontFamily: 'Poppins-Regular', fontSize: 14, color: COLORS.textSecondary, marginBottom: 15 },
  description: { textAlign: 'center', fontFamily: 'Poppins-Regular', color: COLORS.textSecondary, paddingHorizontal: 20, lineHeight: 22 },

  // Section Styles
  section: { marginBottom: 25 },
  sectionTitle: { fontFamily: 'Poppins-SemiBold', fontSize: 18, color: COLORS.text, marginBottom: 12 },
  
  // Developer Card
  devCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, padding: 15, borderRadius: SIZES.borderRadius, elevation: 2, marginBottom: 15 },
  avatarPlaceholder: { width: 50, height: 50, borderRadius: 25, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  avatarText: { color: COLORS.white, fontFamily: 'Poppins-Bold', fontSize: 20 },
  devInfo: { flex: 1 },
  devName: { fontFamily: 'Poppins-SemiBold', fontSize: 16, color: COLORS.text },
  devRole: { fontFamily: 'Poppins-Regular', fontSize: 12, color: COLORS.textSecondary },

  // Social Buttons
  socialRow: { flexDirection: 'row', gap: 10 },
  socialBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#333', paddingVertical: 10, borderRadius: 8, gap: 8 },
  socialText: { color: COLORS.white, fontFamily: 'Poppins-SemiBold', fontSize: 14 },

  // Tech Stack
  techContainer: { backgroundColor: COLORS.card, borderRadius: SIZES.borderRadius, padding: 15, elevation: 2 },
  techItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  techText: { marginLeft: 12, fontFamily: 'Poppins-Regular', fontSize: 14, color: COLORS.text },

  copyright: { textAlign: 'center', fontFamily: 'Poppins-Regular', fontSize: 12, color: '#AAA', marginTop: 20 },
});