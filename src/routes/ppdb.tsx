import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Route as RouteIcon,
  Send,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { majors } from "@/lib/school-data";

export const Route = createFileRoute("/ppdb")({
  head: () => ({
    meta: [
      { title: "PPDB SMKN 1 Dlanggu" },
      {
        name: "description",
        content:
          "Informasi penerimaan peserta didik baru SMKN 1 Dlanggu, pilihan jurusan, persyaratan, jadwal, dan proses pendaftaran.",
      },
      { property: "og:title", content: "PPDB SMKN 1 Dlanggu" },
      { property: "og:description", content: "Mulai Perjalananmu Bersama SMKN 1 Dlanggu." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PpdbPage,
});
function PpdbPage() {
  const requirements = [
    "Dokumen identitas calon peserta didik",
    "Dokumen kelulusan sesuai ketentuan",
    "Pas foto dan dokumen pendukung",
    "Mengikuti proses sesuai jalur pendaftaran",
  ];
  const steps = [
    "Pelajari informasi PPDB",
    "Pilih jalur dan jurusan",
    "Siapkan persyaratan",
    "Isi formulir pendaftaran",
    "Pantau hasil seleksi",
  ];
  return (
    <>
      <PageHero
        eyebrow="PPDB SMKN 1 Dlanggu"
        title="Mulai Perjalananmu Bersama SMKN 1 Dlanggu"
        description="Dapatkan informasi lengkap mengenai penerimaan peserta didik baru, pilihan jurusan, persyaratan, jadwal, dan proses pendaftaran."
      />
      <section className="py-20">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Informasi PPDB"
            title="Panduan yang sederhana dan mudah dipahami"
            description="Informasi pada prototype ini dapat diperbarui admin setelah jadwal dan ketentuan resmi diterbitkan."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <Info
              icon={<RouteIcon />}
              title="Jalur Pendaftaran"
              items={["Jalur umum", "Jalur prestasi", "Jalur afirmasi"]}
            />
            <Info icon={<FileText />} title="Persyaratan" items={requirements.slice(0, 3)} />
            <Info
              icon={<CalendarDays />}
              title="Jadwal"
              items={[
                "Pengumuman: Menunggu jadwal resmi",
                "Pendaftaran: Menunggu jadwal resmi",
                "Seleksi: Menunggu jadwal resmi",
              ]}
            />
          </div>
        </div>
      </section>
      <section className="batik-pattern bg-muted/60 py-20">
        <div className="container-shell relative z-10">
          <SectionHeading
            eyebrow="Pilihan Jurusan"
            title="Enam jalur untuk mengembangkan potensimu"
          />
          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {majors.map((m) => (
              <div key={m.code} className="rounded-lg border bg-card p-5">
                <p className="font-display text-lg font-bold">{m.code}</p>
                <p className="mt-1 text-sm text-muted-foreground">{m.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container-shell grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Persyaratan" title="Siapkan dokumen dengan baik" />
            <div className="mt-8 space-y-3">
              {requirements.map((r) => (
                <p key={r} className="flex gap-3 rounded-lg border bg-card p-4 text-sm">
                  <CheckCircle2 className="size-5 shrink-0 text-primary" />
                  {r}
                </p>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Alur Pendaftaran" title="Lima langkah menuju pendaftaran" />
            <ol className="mt-8 space-y-3">
              {steps.map((s, i) => (
                <li
                  key={s}
                  className="grid grid-cols-[auto_1fr] items-center gap-4 rounded-lg bg-secondary p-4"
                >
                  <span className="grid size-9 place-items-center rounded-full bg-primary font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="font-semibold">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <section className="bg-primary py-20 text-nav-foreground">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading
            eyebrow="FAQ"
            title="Pertanyaan yang sering diajukan"
            description="Temukan jawaban singkat seputar proses penerimaan peserta didik baru."
            inverse
          />
          <Accordion type="single" collapsible className="rounded-xl bg-nav-foreground/5 px-6">
            {(
              [
                [
                  "Kapan pendaftaran dibuka?",
                  "Jadwal resmi akan diperbarui setelah diterbitkan oleh pihak berwenang.",
                ],
                [
                  "Apakah saya bisa memilih jurusan?",
                  "Pilihan jurusan dilakukan sesuai alur dan ketentuan PPDB yang berlaku.",
                ],
                [
                  "Di mana saya dapat mendaftar?",
                  "Gunakan tombol “Daftar Sekarang” untuk menuju informasi pendaftaran yang diperbarui admin.",
                ],
                [
                  "Bagaimana jika dokumen belum lengkap?",
                  "Siapkan seluruh dokumen sebelum tenggat dan hubungi sekolah untuk informasi lebih lanjut.",
                ],
              ] as const
            ).map(([q, a]) => (
              <AccordionItem key={q} value={q} className="border-nav-foreground/15">
                <AccordionTrigger className="text-left text-nav-foreground hover:no-underline">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="text-nav-muted">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      <section className="py-16">
        <div className="container-shell flex flex-col items-center rounded-xl border bg-brand-gold-soft p-8 text-center">
          <ClipboardCheck className="size-10 text-primary" />
          <h2 className="mt-4 font-display text-2xl font-bold">
            Siap bergabung bersama SMKN 1 Dlanggu?
          </h2>
          <Button asChild className="mt-6" size="lg">
            <Link to="/ai-assistant">
              Daftar Sekarang <Send />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
function Info({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  return (
    <article className="rounded-xl border bg-card p-6 soft-card">
      <div className="text-primary">{icon}</div>
      <h2 className="mt-4 font-display text-lg font-bold">{title}</h2>
      <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
        {items.map((i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-gold" />
            {i}
          </li>
        ))}
      </ul>
    </article>
  );
}
