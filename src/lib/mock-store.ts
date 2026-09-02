/**
 * In-memory mock data store.
 *
 * Semua data di bawah adalah data dummy frontend. Struktur field sengaja
 * dibuat rapi dan konsisten agar nanti mudah diganti menjadi pemanggilan
 * REST API Laravel (lihat src/lib/api.ts).
 */

export type SubmissionType = "PKL" | "Karier";
export type SubmissionStatus = "Menunggu Persetujuan" | "Disetujui" | "Ditolak" | "Ditutup";
export type MajorCode = "TKJ" | "RPL" | "DKV" | "Animasi" | "Tata Boga" | "Perhotelan";

export type DudiAccount = {
  id: string;
  company_name: string;
  business_field: string;
  address: string;
  city: string;
  logo_url: string | null;
  pic_name: string;
  email: string;
  phone: string;
  description: string;
  verified: boolean;
  active: boolean;
  created_at: string;
};

export type DudiSubmission = {
  id: string;
  dudi_id: string;
  company_name: string;
  type: SubmissionType;
  position: string;
  majors: MajorCode[];
  location: string;
  quota: number;
  period: string;
  deadline: string;
  requirements: string;
  description: string;
  pic_contact: string;
  external_link: string;
  status: SubmissionStatus;
  admin_note: string;
  submitted_at: string;
};

export type MasterRecord = {
  id: string;
  [key: string]: string;
};

export type KnowledgeEntry = {
  id: string;
  question: string;
  answer: string;
};

export type MasterTableKey =
  | "jurusan"
  | "prestasi"
  | "lulusan"
  | "mitra"
  | "ppdb"
  | "produk"
  | "berita";

export type MockDatabase = {
  dudiAccounts: DudiAccount[];
  submissions: DudiSubmission[];
  master: Record<MasterTableKey, MasterRecord[]>;
  knowledgeBase: KnowledgeEntry[];
};

const initialDb: MockDatabase = {
  dudiAccounts: [
    {
      id: "dudi-001",
      company_name: "Nusa Digital Studio",
      business_field: "Teknologi Informasi",
      address: "Jl. Raya Darmo No. 12",
      city: "Surabaya",
      logo_url: null,
      pic_name: "Bapak Arif Wicaksono",
      email: "hrd@nusadigital.example",
      phone: "0812-0000-0001",
      description:
        "Studio digital yang mengerjakan pengembangan web, dukungan perangkat, dan layanan IT untuk UMKM.",
      verified: true,
      active: true,
      created_at: "10 Juli 2026",
    },
    {
      id: "dudi-002",
      company_name: "Kreasi Visual Jatim",
      business_field: "Industri Kreatif",
      address: "Jl. Soekarno Hatta No. 45",
      city: "Malang",
      logo_url: null,
      pic_name: "Ibu Renata Sari",
      email: "partnership@kreasivisual.example",
      phone: "0812-0000-0002",
      description:
        "Rumah produksi konten visual, ilustrasi, dan motion graphic untuk kebutuhan promosi.",
      verified: true,
      active: true,
      created_at: "22 Juli 2026",
    },
    {
      id: "dudi-003",
      company_name: "Hospitality Training Center",
      business_field: "Hospitality",
      address: "Jl. Gajah Mada No. 8",
      city: "Mojokerto",
      logo_url: null,
      pic_name: "Bapak Dwi Santoso",
      email: "training@hospitalitycenter.example",
      phone: "0812-0000-0003",
      description:
        "Pusat pelatihan layanan tamu, tata graha, dan operasional dapur untuk calon tenaga hospitality.",
      verified: false,
      active: true,
      created_at: "14 Agustus 2026",
    },
  ],
  submissions: [
    {
      id: "sub-001",
      dudi_id: "dudi-001",
      company_name: "Nusa Digital Studio",
      type: "PKL",
      position: "IT Support & Web Developer",
      majors: ["TKJ", "RPL"],
      location: "Surabaya",
      quota: 6,
      period: "Januari–Maret 2027",
      deadline: "",
      requirements: "Siswa kelas XI, CV, portofolio sederhana",
      description:
        "Program praktik untuk membantu dukungan perangkat dan pengembangan web internal.",
      pic_contact: "Bapak Arif Wicaksono · 0812-0000-0001",
      external_link: "",
      status: "Disetujui",
      admin_note: "",
      submitted_at: "12 Agustus 2026",
    },
    {
      id: "sub-002",
      dudi_id: "dudi-001",
      company_name: "Nusa Digital Studio",
      type: "Karier",
      position: "Junior Web Developer",
      majors: ["RPL"],
      location: "Surabaya",
      quota: 2,
      period: "",
      deadline: "30 September 2026",
      requirements: "HTML, CSS, JavaScript, dan portofolio dasar",
      description: "Bergabung dalam tim pengembangan website klien UMKM dan instansi.",
      pic_contact: "Bapak Arif Wicaksono · 0812-0000-0001",
      external_link: "",
      status: "Menunggu Persetujuan",
      admin_note: "",
      submitted_at: "28 Agustus 2026",
    },
    {
      id: "sub-003",
      dudi_id: "dudi-002",
      company_name: "Kreasi Visual Jatim",
      type: "PKL",
      position: "Graphic Designer & Motion Intern",
      majors: ["DKV", "Animasi"],
      location: "Malang",
      quota: 4,
      period: "Februari–April 2027",
      deadline: "",
      requirements: "Portofolio desain atau animasi, mampu bekerja dalam tim",
      description: "Kesempatan belajar produksi konten visual, ilustrasi, dan motion graphic.",
      pic_contact: "Ibu Renata Sari · 0812-0000-0002",
      external_link: "",
      status: "Disetujui",
      admin_note: "",
      submitted_at: "15 Agustus 2026",
    },
    {
      id: "sub-004",
      dudi_id: "dudi-002",
      company_name: "Kreasi Visual Jatim",
      type: "PKL",
      position: "Social Media Content Intern",
      majors: ["DKV"],
      location: "Malang",
      quota: 3,
      period: "Maret–Mei 2027",
      deadline: "",
      requirements: "Menguasai dasar desain dan penjadwalan konten",
      description: "Membantu produksi dan penjadwalan konten media sosial klien.",
      pic_contact: "Ibu Renata Sari · 0812-0000-0002",
      external_link: "",
      status: "Ditolak",
      admin_note: "Deskripsi pekerjaan masih terlalu umum. Mohon lengkapi rincian tugas harian.",
      submitted_at: "20 Agustus 2026",
    },
    {
      id: "sub-005",
      dudi_id: "dudi-003",
      company_name: "Hospitality Training Center",
      type: "PKL",
      position: "Front Office & Kitchen Trainee",
      majors: ["Perhotelan", "Tata Boga"],
      location: "Mojokerto",
      quota: 8,
      period: "November 2026–Januari 2027",
      deadline: "",
      requirements: "Komunikatif, disiplin, surat pengantar sekolah",
      description: "Praktik layanan tamu, penataan area, serta pengenalan operasional dapur.",
      pic_contact: "Bapak Dwi Santoso · 0812-0000-0003",
      external_link: "",
      status: "Menunggu Persetujuan",
      admin_note: "",
      submitted_at: "30 Agustus 2026",
    },
  ],
  master: {
    jurusan: [
      { id: "mj-1", kode: "TKJ", nama: "Teknik Komputer dan Jaringan", kuota: "72" },
      { id: "mj-2", kode: "RPL", nama: "Rekayasa Perangkat Lunak", kuota: "72" },
      { id: "mj-3", kode: "DKV", nama: "Desain Komunikasi Visual", kuota: "36" },
      { id: "mj-4", kode: "Animasi", nama: "Animasi", kuota: "36" },
      { id: "mj-5", kode: "Tata Boga", nama: "Tata Boga", kuota: "36" },
      { id: "mj-6", kode: "Perhotelan", nama: "Perhotelan", kuota: "36" },
    ],
    prestasi: [
      {
        id: "mp-1",
        judul: "Juara 1 Web Technologies",
        bidang: "Lomba Kompetensi Siswa",
        tahun: "2026",
        peraih: "Tim RPL",
      },
      {
        id: "mp-2",
        judul: "Gold Medal Desain Poster",
        bidang: "Festival Kreativitas Pelajar",
        tahun: "2025",
        peraih: "Nadia Putri",
      },
    ],
    lulusan: [
      {
        id: "ml-1",
        nama: "Alya Ramadhani",
        jurusan: "RPL",
        tahun: "2024",
        capaian: "Junior Web Developer",
      },
      {
        id: "ml-2",
        nama: "Raka Pratama",
        jurusan: "TKJ",
        tahun: "2023",
        capaian: "Network Support Specialist",
      },
    ],
    mitra: [
      {
        id: "mm-1",
        nama: "Nusa Digital Studio",
        bidang: "Teknologi Informasi",
        kota: "Surabaya",
        status: "Aktif",
      },
      {
        id: "mm-2",
        nama: "Kreasi Visual Jatim",
        bidang: "Industri Kreatif",
        kota: "Malang",
        status: "Aktif",
      },
    ],
    ppdb: [
      {
        id: "mppdb-1",
        item: "Jalur Prestasi",
        kategori: "Jalur",
        keterangan: "Seleksi berdasarkan nilai rapor dan sertifikat prestasi",
      },
      {
        id: "mppdb-2",
        item: "Pendaftaran Online",
        kategori: "Jadwal",
        keterangan: "Data contoh — diperbarui admin sebelum PPDB dibuka",
      },
    ],
    produk: [
      {
        id: "mprod-1",
        nama: "Paket Website UMKM",
        kategori: "Layanan Digital",
        unit: "RPL",
        harga: "Mulai Rp750.000",
      },
      {
        id: "mprod-2",
        nama: "Kue Kering Premium",
        kategori: "Kuliner",
        unit: "Tata Boga",
        harga: "Rp65.000",
      },
    ],
    berita: [
      {
        id: "mb-1",
        judul: "Semangat Kemerdekaan dalam Karya Siswa",
        kategori: "Kegiatan",
        tanggal: "18 Agustus 2026",
      },
      {
        id: "mb-2",
        judul: "Pembekalan Siswa Menuju Dunia Industri",
        kategori: "Sekolah",
        tanggal: "12 Agustus 2026",
      },
    ],
  },
  knowledgeBase: [
    {
      id: "kb-1",
      question: "Bagaimana cara daftar PPDB?",
      answer:
        "Informasi PPDB mencakup jalur pendaftaran, persyaratan, jadwal, pilihan jurusan, dan alur pendaftaran. Buka halaman PPDB untuk panduan lengkap.",
    },
    {
      id: "kb-2",
      question: "Apa saja jurusan di SMKN 1 Dlanggu?",
      answer:
        "SMKN 1 Dlanggu memiliki program TKJ, RPL, DKV, Animasi, Tata Boga, dan Perhotelan.",
    },
    {
      id: "kb-3",
      question: "Bagaimana cara mencari tempat PKL?",
      answer:
        "Gunakan halaman PKL & Career Center, lalu pilih jurusan, kota/kabupaten, bidang, status, dan jenis kesempatan.",
    },
  ],
};

let db: MockDatabase = structuredClone(initialDb);
const listeners = new Set<() => void>();

export function getDb() {
  return db;
}

export function subscribeDb(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function mutateDb(fn: (draft: MockDatabase) => void) {
  const draft = structuredClone(db);
  fn(draft);
  db = draft;
  listeners.forEach((l) => l());
}

export const masterTables: { key: MasterTableKey; label: string; columns: string[] }[] = [
  { key: "jurusan", label: "Data Jurusan", columns: ["kode", "nama", "kuota"] },
  { key: "prestasi", label: "Data Prestasi", columns: ["judul", "bidang", "tahun", "peraih"] },
  { key: "lulusan", label: "Data Lulusan Terbaik", columns: ["nama", "jurusan", "tahun", "capaian"] },
  { key: "mitra", label: "Data Mitra Industri", columns: ["nama", "bidang", "kota", "status"] },
  { key: "ppdb", label: "Data PPDB", columns: ["item", "kategori", "keterangan"] },
  { key: "produk", label: "Data Produk Unggulan/BLUD", columns: ["nama", "kategori", "unit", "harga"] },
  { key: "berita", label: "Data Berita/Kegiatan", columns: ["judul", "kategori", "tanggal"] },
];
