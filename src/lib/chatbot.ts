export const quickQuestions = [
  "Ada tempat PKL TKJ di Surabaya?",
  "Perusahaan mana yang menerima siswa RPL?",
  "Bagaimana cara daftar PPDB?",
  "Apa saja jurusan di SMKN 1 Dlanggu?",
  "Ada PKL DKV di Malang?",
  "Apa saja produk unggulan sekolah?",
  "Bagaimana cara mencari tempat PKL?",
];

import { getDb } from "./mock-store";

export function getAssistantReply(question: string) {
  const q = question.toLowerCase();
  // Knowledge base yang dikelola admin (/admin/ai-assistant) diperiksa lebih dulu.
  const kb = getDb().knowledgeBase.find((entry) => {
    const key = entry.question.toLowerCase();
    return q.includes(key) || key.includes(q);
  });
  if (kb) return kb.answer;
  if (q.includes("ppdb") || q.includes("daftar"))
    return "Informasi PPDB mencakup jalur pendaftaran, persyaratan, jadwal, pilihan jurusan, dan alur pendaftaran. Buka halaman PPDB untuk panduan lengkap dan tombol “Daftar Sekarang”.";
  if (q.includes("jurusan"))
    return "SMKN 1 Dlanggu memiliki program TKJ, RPL, DKV, Animasi, Tata Boga, dan Perhotelan. Setiap jurusan dirancang untuk membangun kompetensi yang relevan dengan dunia industri.";
  if (q.includes("surabaya") && q.includes("tkj"))
    return "Pada data contoh tersedia Nusa Digital Studio di Surabaya untuk TKJ dan RPL. Status data masih “Data Contoh”, jadi pastikan melakukan verifikasi sebelum mendaftar.";
  if (q.includes("malang") && (q.includes("dkv") || q.includes("animasi")))
    return "Pada data contoh tersedia Kreasi Visual Jatim di Malang untuk DKV dan Animasi. Informasi ini belum terverifikasi dan diberi label “Data Contoh”.";
  if (q.includes("pkl") || q.includes("perusahaan"))
    return "Gunakan halaman PKL & Career Center, pilih jurusan, kota/kabupaten, bidang, status, dan jenis kesempatan. Sistem akan menampilkan rekomendasi yang sesuai. Semua data prototype diberi label “Data Contoh”.";
  if (q.includes("karier") || q.includes("kerja") || q.includes("lowongan"))
    return "Bagian Peluang Karier menyediakan lowongan relevan bagi lulusan, lengkap dengan filter jurusan, lokasi, posisi, dan status.";
  if (q.includes("produk") || q.includes("unggulan"))
    return "Produk unggulan sekolah mencakup layanan digital, desain, kuliner, animasi, jaringan, dan hospitality. Buka halaman Produk Unggulan untuk melihat katalog.";
  if (q.includes("prestasi"))
    return "Prestasi contoh mencakup bidang teknologi, desain, dan animasi. Data disusun agar mudah diperbarui admin sekolah.";
  return "Saya dapat membantu tentang jurusan, PPDB, PKL, peluang karier, prestasi, produk unggulan, dan informasi sekolah. Coba sebutkan topik atau jurusan yang ingin kamu cari.";
}
