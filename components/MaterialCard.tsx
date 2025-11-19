import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FileText, Video, Link as LinkIcon, DownloadCloud } from 'lucide-react-native';
import { COLORS, SIZES } from '../lib/theme';

interface MaterialProps {
  item: {
    id: number;
    title: string;
    type: string;
  };
  onPress: () => void;
}

export default function MaterialCard({ item, onPress }: MaterialProps) {
  
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

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>
        {getIcon(item.type)}
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>
          {item.type} • Klik untuk buka
        </Text>
      </View>
      <DownloadCloud size={20} color={COLORS.textSecondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.borderRadius,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contentContainer: { flex: 1 },
  title: { fontFamily: 'Poppins-SemiBold', fontSize: 15, color: COLORS.text },
  subtitle: { fontFamily: 'Poppins-Regular', fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
});