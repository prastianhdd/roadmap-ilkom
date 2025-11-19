// 👇 PERUBAHAN PENTING DI SINI: Tambahkan '/legacy'
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { Platform } from 'react-native';
import * as IntentLauncher from 'expo-intent-launcher';

const getExtension = (type: string) => {
  const t = type.toUpperCase();
  switch (t) {
    case 'PDF': return '.pdf';
    case 'WORD': return '.docx';
    case 'JPG': return '.jpg';
    case 'PNG': return '.png';
    case 'IMAGE': return '.jpg';
    default: return '';
  }
};

const getMimeType = (type: string) => {
  const t = type.toUpperCase();
  switch (t) {
    case 'PDF': return 'application/pdf';
    case 'WORD': return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case 'JPG': return 'image/jpeg';
    case 'PNG': return 'image/png';
    case 'IMAGE': return 'image/*';
    default: return '*/*';
  }
};

export const handleFileOpen = async (url: string, title: string, type: string) => {
  try {
    // Bersihkan nama file
    const cleanTitle = title.replace(/[^a-zA-Z0-9]/g, '_');
    const extension = getExtension(type);
    
    if (!extension) {
      alert('Tipe file tidak didukung.');
      return;
    }

    // Menggunakan cacheDirectory (lebih stabil untuk file sementara)
    // Di API Legacy, properti ini seharusnya ADA (tidak undefined)
    const fileDir = FileSystem.cacheDirectory + 'materi/';
    const fileUri = fileDir + cleanTitle + extension;

    // DEBUG: Pastikan path valid
    console.log('Target Simpan:', fileUri);

    // 1. Buat folder jika belum ada
    const dirInfo = await FileSystem.getInfoAsync(fileDir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(fileDir, { intermediates: true });
    }

    // 2. Cek apakah file sudah ada
    const fileInfo = await FileSystem.getInfoAsync(fileUri);

    if (!fileInfo.exists) {
      console.log(`Downloading ${type} file...`);
      const downloadRes = await FileSystem.downloadAsync(url, fileUri);
      
      if (downloadRes.status !== 200) {
        throw new Error('Gagal download, status: ' + downloadRes.status);
      }
    } else {
      console.log('File sudah ada di cache, langsung buka...');
    }

    // 3. Buka File
    if (Platform.OS === 'android') {
      const contentUri = await FileSystem.getContentUriAsync(fileUri);
      await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
        data: contentUri,
        flags: 1, // FLAG_GRANT_READ_URI_PERMISSION
        type: getMimeType(type),
      });
    } else {
      await Sharing.shareAsync(fileUri);
    }

  } catch (error) {
    console.error('Gagal membuka file:', error);
    // Casting error ke any agar pesan bisa terbaca
    alert(`Gagal: ${(error as any).message || 'Terjadi kesalahan tak terduga'}`);
  }
};