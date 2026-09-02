import { createFileRoute } from "@tanstack/react-router";
import { BriefcaseBusiness, Building2, CalendarClock, MapPin, Search } from "lucide-react";
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
import { careerListings, majors } from "@/lib/school-data";
export const Route = createFileRoute("/career-center")({
  head: () => ({
    meta: [
      { title: "Peluang Karier — SMKN 1 Dlanggu" },
      {
        name: "description",
        content:
          "Temukan peluang karier yang relevan dengan lulusan SMKN 1 Dlanggu berdasarkan jurusan, lokasi, posisi, dan status.",
      },
      { property: "og:title", content: "Peluang Karier — SMKN 1 Dlanggu" },
      {
        property: "og:description",
        content: "Lowongan pekerjaan yang relevan dengan kompetensi lulusan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CareerPage,
});
function CareerPage() {
  const [major, setMajor] = useState("Semua");
  const [location, setLocation] = useState("Semua");
  const [status, setStatus] = useState("Semua");
  const [query, setQuery] = useState("");
  const locations = [...new Set(careerListings.map((x) => x.location))];
  const filtered = useMemo(
    () =>
      careerListings.filter(
        (x) =>
          (major === "Semua" || x.majors.includes(major as never)) &&
          (location === "Semua" || x.location === location) &&
          (status === "Semua" || x.status === status) &&
          (x.position + " " + x.company).toLowerCase().includes(query.toLowerCase()),
      ),
    [major, location, status, query],
  );
  return (
    <>
      <PageHero
        eyebrow="Career Center"
        title="Peluang Karier"
        description="Temukan lowongan pekerjaan yang relevan dengan lulusan SMKN 1 Dlanggu dan kompetensi yang telah dipelajari."
      />
      <section className="bg-muted/60 py-12">
        <div className="container-shell grid gap-3 rounded-xl border bg-card p-5 soft-card sm:grid-cols-2 lg:grid-cols-4">
          <label className="relative">
            <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
            <input
              className="h-10 w-full rounded-md border bg-background pl-10 pr-3 text-sm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Posisi atau perusahaan"
            />
          </label>
          <Filter value={major} set={setMajor} label="Jurusan" items={majors.map((m) => m.code)} />
          <Filter value={location} set={setLocation} label="Lokasi" items={locations} />
          <Filter
            value={status}
            set={setStatus}
            label="Status"
            items={["Sedang Dibuka", "Pendaftaran Ditutup"]}
          />
        </div>
      </section>
      <section className="batik-pattern py-16">
        <div className="container-shell relative z-10">
          <SectionHeading
            eyebrow="Daftar Lowongan"
            title="Mulai langkah profesionalmu"
            description="Seluruh perusahaan dan lowongan di bawah merupakan data contoh yang belum diverifikasi."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {filtered.map((x) => (
              <article key={x.id} className="rounded-xl border bg-card p-6 soft-card">
                <div className="grid grid-cols-[auto_1fr_auto] gap-3">
                  <div className="grid size-12 place-items-center rounded-lg bg-secondary text-primary">
                    <BriefcaseBusiness />
                  </div>
                  <div className="min-w-0">
                    <h2 className="truncate font-display text-lg font-bold">{x.position}</h2>
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Building2 className="size-3.5" />
                      {x.company}
                    </p>
                  </div>
                  <span className="h-fit rounded-full bg-brand-gold-soft px-2 py-1 text-[10px] font-bold">
                    Data Contoh
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {x.majors.map((m) => (
                    <span
                      key={m}
                      className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold"
                    >
                      {m}
                    </span>
                  ))}
                </div>
                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex gap-2">
                    <MapPin className="size-4 shrink-0 text-primary" />
                    <span>{x.location}</span>
                  </div>
                  <div className="flex gap-2">
                    <CalendarClock className="size-4 shrink-0 text-primary" />
                    <span>Batas pendaftaran: {x.deadline}</span>
                  </div>
                  <div>
                    <dt className="font-semibold">Persyaratan</dt>
                    <dd className="mt-1 text-muted-foreground">{x.requirements}</dd>
                  </div>
                </dl>
                <div className="mt-5 flex items-center justify-between border-t pt-4">
                  <span
                    className={`text-xs font-bold ${x.status === "Sedang Dibuka" ? "text-primary" : "text-destructive"}`}
                  >
                    {x.status}
                  </span>
                  <Button disabled={x.status !== "Sedang Dibuka"}>Link Lamaran</Button>
                </div>
              </article>
            ))}
            {filtered.length === 0 && (
              <p className="rounded-xl border border-dashed p-10 text-center text-muted-foreground md:col-span-2">
                Belum ada lowongan contoh yang sesuai.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
function Filter({
  value,
  set,
  label,
  items,
}: {
  value: string;
  set: (x: string) => void;
  label: string;
  items: readonly string[];
}) {
  return (
    <Select value={value} onValueChange={set}>
      <SelectTrigger className="h-10">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Semua">Semua {label}</SelectItem>
        {items.map((x) => (
          <SelectItem key={x} value={x}>
            {x}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
