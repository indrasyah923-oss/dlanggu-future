import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronRight,
  Clapperboard,
  Code2,
  Cookie,
  ChefHat,
  GraduationCap,
  Hotel,
  Laptop,
  Network,
  Palette,
  Play,
  Sparkles,
  Users,
  Wifi,
  ConciergeBell,
  Handshake,
  Newspaper,
} from "lucide-react";
import heroImage from "@/assets/smkn1-dlanggu-hero.jpg";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { achievements, graduates, majors, news, partners, products } from "@/lib/school-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SMKN 1 Dlanggu — Digital School & Career Center" },
      {
        name: "description",
        content:
          "Platform digital SMKN 1 Dlanggu untuk sekolah, PPDB, produk unggulan, PKL, karier, dan AI Assistant.",
      },
      { property: "og:title", content: "SMKN 1 Dlanggu — Digital School & Career Center" },
      {
        property: "og:description",
        content: "Berprestasi, Berkarya, dan Siap Menghadapi Dunia Industri.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const icons = {
  Network,
  Code2,
  Palette,
  Clapperboard,
  Hotel,
  Award,
  Laptop,
  Cookie,
  Play,
  Wifi,
  ConciergeBell,
  ChefHat,
};
function Icon({ name }: { name: keyof typeof icons }) {
  const C = icons[name];
  return <C />;
}

function Home() {
  return (
    <>
      <section className="relative min-h-[760px] overflow-hidden bg-primary text-nav-foreground sm:min-h-[800px]">
        <img
          src={heroImage}
          alt="Siswa SMK berkolaborasi di laboratorium teknologi"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="batik-pattern absolute inset-0" />
        <div className="container-shell relative z-10 flex min-h-[760px] items-center pb-10 pt-32 sm:min-h-[800px] md:pb-24">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-nav-foreground/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold backdrop-blur">
              <Sparkles className="size-4" /> Digital School & Career Center
            </div>
            <h1 className="font-display text-5xl font-extrabold leading-[1.08] sm:text-7xl">
              SMKN 1 Dlanggu
            </h1>
            <p className="mt-5 max-w-2xl font-display text-xl font-semibold leading-8 text-nav-foreground sm:text-3xl">
              Berprestasi, Berkarya, dan Siap Menghadapi Dunia Industri
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-nav-muted sm:text-base">
              Platform digital SMKN 1 Dlanggu untuk mengenal sekolah, menemukan program keahlian,
              melihat prestasi, mendapatkan informasi PPDB, menemukan peluang PKL dan karier, serta
              mengenal produk unggulan sekolah.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="gold" size="lg">
                <a href="#profil">
                  Jelajahi Sekolah <ArrowRight />
                </a>
              </Button>
              <Button asChild variant="heroOutline" size="lg">
                <Link to="/pkl-career-center">
                  Cari Tempat PKL <SearchIcon />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="relative inset-x-0 bottom-0 z-20 md:absolute">
          <div className="container-shell grid grid-cols-2 gap-px overflow-hidden rounded-t-xl bg-nav-foreground/10 backdrop-blur md:grid-cols-4">
            {[
              ["6", "Program Keahlian"],
              ["Digital", "Learning Ecosystem"],
              ["Jawa Timur", "Jangkauan PKL"],
              ["AI", "School Assistant"],
            ].map(([v, l]) => (
              <div key={l} className="bg-primary/70 px-5 py-4">
                <strong className="block font-display text-xl text-brand-gold">{v}</strong>
                <span className="text-xs text-nav-muted">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="profil" className="batik-pattern scroll-mt-24 overflow-hidden py-20">
        <div className="container-shell relative z-10 grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Profil Singkat"
              title="Sekolah vokasi yang tumbuh bersama perubahan zaman"
              description="SMKN 1 Dlanggu menghadirkan pembelajaran yang menghubungkan kompetensi, kreativitas, dan kesiapan siswa menghadapi pendidikan lanjutan maupun dunia kerja."
            />
            <div className="mt-8 grid grid-cols-2 gap-4">
              <Stat icon={<GraduationCap />} value="6" label="Program Keahlian" />
              <Stat icon={<Users />} value="Siswa" label="Berpusat pada potensi" />
            </div>
          </div>
          <div className="rounded-xl border bg-card p-7 soft-card sm:p-9">
            <p className="font-display text-2xl font-bold">Mengapa SMKN 1 Dlanggu?</p>
            <div className="mt-6 space-y-4">
              {[
                "Pembelajaran berbasis kompetensi",
                "Terhubung dengan dunia industri",
                "Pengembangan keterampilan siswa",
                "Persiapan memasuki dunia kerja",
                "Mendukung siswa melanjutkan pendidikan",
              ].map((x) => (
                <div key={x} className="flex items-center gap-3">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                    <Check className="size-4" />
                  </span>
                  <span className="font-medium">{x}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="jurusan" className="scroll-mt-24 bg-muted/60 py-20">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Program Keahlian"
            title="Temukan bidang yang sesuai dengan potensimu"
            description="Enam program keahlian dengan pembelajaran praktis dan orientasi karier."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {majors.map((m) => (
              <article
                key={m.code}
                className="group rounded-xl border bg-card p-6 soft-card transition duration-300 hover:-translate-y-1 hover:border-primary/35"
              >
                <div className="mb-5 grid size-12 place-items-center rounded-lg bg-secondary text-primary">
                  <Icon name={m.icon} />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                  {m.code}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold">{m.name}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{m.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {m.careers.map((c) => (
                    <span
                      key={c}
                      className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <Button asChild variant="link" className="mt-4 px-0">
                  <a href={`#${m.code.toLowerCase().replace(" ", "-")}`}>
                    Lihat Detail <ChevronRight />
                  </a>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="prestasi" className="scroll-mt-24 py-20">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Prestasi SMKN 1 Dlanggu"
            title="Talenta yang terus bertumbuh"
            description="Data contoh berikut menunjukkan struktur informasi prestasi yang dapat diperbarui admin."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {achievements.map((a) => (
              <article key={a.title} className="rounded-xl border bg-card p-6">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-lg bg-brand-gold-soft text-primary">
                    <Icon name={a.icon} />
                  </span>
                  <span className="text-xs font-bold text-primary">{a.year}</span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{a.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{a.field}</p>
                <p className="mt-4 text-sm font-semibold">{a.person}</p>
              </article>
            ))}
          </div>
          <div className="mt-16">
            <SectionHeading eyebrow="Lulusan Terbaik" title="Melangkah dengan kompetensi" />
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {graduates.map((g) => (
                <article
                  key={g.name}
                  className="grid grid-cols-[auto_1fr] gap-4 rounded-xl border bg-card p-5"
                >
                  <div className="grid size-14 place-items-center rounded-full bg-primary font-display font-bold text-primary-foreground">
                    {g.initials}
                  </div>
                  <div>
                    <h3 className="font-display font-bold">{g.name}</h3>
                    <p className="text-xs text-primary">
                      {g.major} · {g.year}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">{g.achievement}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-20 text-nav-foreground">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Kerja Sama Industri"
            title="Terhubung dengan Dunia Industri"
            description="SMKN 1 Dlanggu membangun hubungan dengan dunia industri untuk memberikan pengalaman belajar dan peluang yang relevan bagi siswa."
            inverse
          />
          <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-5">
            {partners.map((p) => (
              <div
                key={p}
                className="flex min-h-28 flex-col items-center justify-center rounded-lg border border-nav-foreground/15 bg-nav-foreground/5 p-4 text-center"
              >
                <Handshake className="mb-3 text-brand-gold" />
                <span className="text-sm font-semibold">{p}</span>
                <span className="mt-1 text-[10px] uppercase tracking-wide text-nav-muted">
                  Placeholder
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-nav-muted">
            Daftar mitra merupakan placeholder dan dapat diedit admin setelah data resmi tersedia.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-shell">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Produk Unggulan"
              title="Karya Sekolah, Produk Berkualitas"
              description="Kenali berbagai produk dan layanan unggulan hasil karya warga SMKN 1 Dlanggu."
            />
            <Button asChild variant="outline">
              <Link to="/produk-unggulan">
                Lihat Semua <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {products.slice(0, 3).map((p) => (
              <article key={p.id} className="rounded-xl border bg-card p-6 soft-card">
                <div className="grid size-12 place-items-center rounded-lg bg-secondary text-primary">
                  <Icon name={p.icon} />
                </div>
                <p className="mt-5 text-xs font-bold uppercase text-primary">{p.category}</p>
                <h3 className="mt-2 font-display text-lg font-bold">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/60 py-20">
        <div className="container-shell grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="PKL & Career Center"
              title="Temukan Tempat PKL yang Tepat untukmu"
              description="Temukan informasi perusahaan dan industri yang membuka kesempatan PKL serta peluang kerja yang sesuai dengan jurusan dan kompetensimu."
            />
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/pkl-career-center">
                  Cari Tempat PKL <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/career-center">Peluang Karier</Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Feature
              icon={<BriefcaseBusiness />}
              title="Rekomendasi Sesuai Jurusan"
              text="Pilih jurusan dan temukan peluang yang relevan."
            />
            <Feature
              icon={<Building2 />}
              title="Wilayah Jawa Timur"
              text="Telusuri kesempatan di kota dan kabupaten pilihan."
            />
            <Feature
              icon={<BookOpenCheck />}
              title="Panduan PKL"
              text="Akses informasi periode dan persyaratan."
            />
            <Feature
              icon={<Sparkles />}
              title="Dlanggu AI Assistant"
              text="Tanyakan informasi sekolah dengan cepat."
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-shell">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading eyebrow="Berita & Kegiatan" title="Kabar terbaru dari sekolah" />
            <Newspaper className="hidden size-10 text-primary sm:block" />
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {news.map((n) => (
              <article key={n.title} className="rounded-xl border bg-card p-6">
                <p className="text-xs font-bold uppercase text-primary">
                  {n.category} · {n.date}
                </p>
                <h3 className="mt-3 font-display text-lg font-bold">{n.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{n.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SearchIcon() {
  return <BriefcaseBusiness />;
}
function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-lg border bg-card p-5">
      <div className="text-primary">{icon}</div>
      <strong className="mt-3 block font-display text-2xl">{value}</strong>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="text-primary">{icon}</div>
      <h3 className="mt-4 font-display font-bold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
