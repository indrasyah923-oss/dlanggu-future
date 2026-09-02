import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  MapPin,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useMemo, useState } from "react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { locations, majors, pklListings } from "@/lib/school-data";
export const Route = createFileRoute("/pkl-career-center")({
  head: () => ({
    meta: [
      { title: "PKL & Career Center — SMKN 1 Dlanggu" },
      {
        name: "description",
        content:
          "Cari tempat PKL sesuai jurusan dan lokasi di Jawa Timur melalui PKL & Career Center SMKN 1 Dlanggu.",
      },
      { property: "og:title", content: "PKL & Career Center — SMKN 1 Dlanggu" },
      { property: "og:description", content: "Temukan Tempat PKL yang Tepat untukmu." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PklPage,
});
function PklPage() {
  const [major, setMajor] = useState("Semua");
  const [location, setLocation] = useState("Semua");
  const [field, setField] = useState("Semua");
  const [status, setStatus] = useState("Semua");
  const [type, setType] = useState("Semua");
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      pklListings.filter(
        (x) =>
          (major === "Semua" || x.majors.includes(major as never)) &&
          (location === "Semua" || x.location === location) &&
          (field === "Semua" || x.field === field) &&
          (status === "Semua" || x.status === status) &&
          (type === "Semua" || x.type === type) &&
          (x.company + " " + x.position).toLowerCase().includes(query.toLowerCase()),
      ),
    [major, location, field, status, type, query],
  );
  return (
    <>
      <PageHero
        eyebrow="PKL & Career Center"
        title="Temukan Tempat PKL yang Tepat untukmu"
        description="Temukan informasi perusahaan dan industri yang membuka kesempatan PKL serta peluang kerja yang sesuai dengan jurusan dan kompetensimu."
      />
      <section className="bg-muted/60 py-12">
        <div className="container-shell">
          <div className="rounded-xl border bg-card p-5 soft-card">
            <div className="flex items-center gap-2 font-display font-bold">
              <SlidersHorizontal className="text-primary" /> Pencarian Tempat PKL
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <label className="relative sm:col-span-2 lg:col-span-1">
                <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-10 w-full rounded-md border bg-background pl-10 pr-3 text-sm"
                  placeholder="Cari perusahaan atau posisi"
                />
              </label>
              <Filter
                value={major}
                onChange={setMajor}
                placeholder="Jurusan"
                items={majors.map((m) => m.code)}
              />
              <Filter
                value={location}
                onChange={setLocation}
                placeholder="Kota/Kabupaten"
                items={locations}
              />
              <Filter
                value={field}
                onChange={setField}
                placeholder="Bidang"
                items={[...new Set(pklListings.map((x) => x.field))]}
              />
              <Filter
                value={status}
                onChange={setStatus}
                placeholder="Status"
                items={["Sedang Dibuka", "Pendaftaran Ditutup"]}
              />
              <Filter
                value={type}
                onChange={setType}
                placeholder="Jenis kesempatan"
                items={["PKL", "Kerja"]}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container-shell">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Rekomendasi PKL untukmu"
              title={major === "Semua" ? "Peluang PKL terbaru" : "Peluang untuk jurusan " + major}
              description="Pilih jurusan untuk menampilkan perusahaan yang menerima kompetensi tersebut."
            />
            <p className="text-sm font-semibold text-primary">{filtered.length} hasil</p>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {filtered.map((x) => (
              <article key={x.id} className="rounded-xl border bg-card p-6 soft-card">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
                  <div className="flex min-w-0 gap-3">
                    <div className="grid size-12 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                      <Building2 />
                    </div>
                    <div className="min-w-0">
                      <h2 className="truncate font-display text-lg font-bold">{x.company}</h2>
                      <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="size-3" />
                        {x.location} · {x.field}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="rounded-full bg-brand-gold-soft px-2 py-1 text-[10px] font-bold">
                      Data Contoh
                    </span>
                    <p
                      className={`mt-2 text-xs font-bold ${x.status === "Sedang Dibuka" ? "text-primary" : "text-destructive"}`}
                    >
                      {x.status === "Sedang Dibuka" ? "🟢" : "🔴"} {x.status}
                    </p>
                  </div>
                </div>
                <h3 className="mt-5 font-display font-bold text-primary">{x.position}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{x.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {x.majors.map((m) => (
                    <span
                      key={m}
                      className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground"
                    >
                      {m}
                    </span>
                  ))}
                </div>
                <dl className="mt-5 grid gap-3 border-t pt-4 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-xs text-muted-foreground">Periode PKL</dt>
                    <dd className="mt-1 flex items-center gap-1 font-medium">
                      <CalendarDays className="size-3.5" />
                      {x.period}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Persyaratan</dt>
                    <dd className="mt-1 font-medium">{x.requirements}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Kontak</dt>
                    <dd className="mt-1 font-medium">{x.contact}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Diperbarui</dt>
                    <dd className="mt-1 font-medium">{x.updated}</dd>
                  </div>
                </dl>
                <Button className="mt-5 w-full" disabled={x.status !== "Sedang Dibuka"}>
                  Link Pendaftaran <ArrowRight />
                </Button>
              </article>
            ))}
            {filtered.length === 0 && (
              <div className="rounded-xl border border-dashed p-10 text-center text-muted-foreground lg:col-span-2">
                Belum ada data contoh yang sesuai dengan filter.
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="bg-primary py-16 text-nav-foreground">
        <div className="container-shell flex flex-col items-start justify-between gap-7 sm:flex-row sm:items-center">
          <SectionHeading
            eyebrow="Career Center"
            title="Siap melangkah setelah lulus?"
            description="Temukan peluang kerja yang relevan dengan kompetensimu."
            inverse
          />
          <Button asChild variant="gold" size="lg">
            <Link to="/career-center">
              Lihat Peluang Karier <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
function Filter({
  value,
  onChange,
  placeholder,
  items,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  items: readonly string[];
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-10">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Semua">Semua {placeholder}</SelectItem>
        {items.map((i) => (
          <SelectItem key={i} value={i}>
            {i}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
