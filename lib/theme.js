// lib/theme.js

// Berdasarkan konsep.pdf, kita definisikan warna-warna utama
export const COLORS = {
  // Warna Utama & Latar Belakang
  primary: '#4A69E2', // Biru/ungu yang kuat untuk header & tombol
  background: '#F8F9FA', // Latar belakang utama yang sangat terang (off-white)
  card: '#FFFFFF', // Warna dasar untuk kartu-kartu
  
  // Warna Teks
  text: '#212529', // Teks utama (abu-abu sangat gelap)
  textSecondary: '#6C757D', // Teks abu-abu untuk deskripsi
  white: '#FFFFFF',

  // Warna Aksen untuk Kartu Semester (berdasarkan konsep.pdf)
  // Ini bisa berupa warna solid atau Anda bisa gunakan untuk gradient nanti
  semester1: '#4A69E2', // Biru
  semester2: '#7B50E2', // Ungu
  semester3: '#C840D1', // Ungu/Magenta
  semester4: '#E24083', // Pink
  semester5: '#E03B3B', // Merah
  semester6: '#E2783F', // Oranye
  semester7: '#E2B840', // Kuning/Oranye
  semester8: '#3BE07E', // Hijau
};

// Anda juga bisa mengekspor ukuran standar untuk konsistensi
export const SIZES = {
  padding: 16,
  borderRadius: 12,
  h1: 28,
  h2: 22,
  h3: 18,
  body: 14,
};