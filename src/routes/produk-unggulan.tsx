import { createFileRoute } from "@tanstack/react-router";
import { ConciergeBell, Cookie, Laptop, Palette, Play, ShoppingBag, Wifi } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/school-data";
const icons = { Laptop, Palette, Cookie, Play, Wifi, ConciergeBell };
export const Route = createFileRoute("/produk-unggulan")({
  head: () => ({
    meta: [
      { title: "Produk Unggulan Sekolah — SMKN 1 Dlanggu" },
      {
        name: "description",
        content: "Katalog produk dan layanan unggulan hasil karya warga SMKN 1 Dlanggu.",
      },
      { property: "og:title", content: "Produk Unggulan Sekolah — SMKN 1 Dlanggu" },
      { property: "og:description", content: "Karya Sekolah, Produk Berkualitas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});
function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Produk Unggulan Sekolah"
        title="Karya Sekolah, Produk Berkualitas"
        description="Kenali berbagai produk dan layanan unggulan hasil karya warga SMKN 1 Dlanggu."
      />
      <section className="batik-pattern py-20">
        <div className="container-shell relative z-10">
          <SectionHeading
            eyebrow="Katalog Produk"
            title="Produk dan layanan dari setiap kompetensi"
            description="Seluruh produk berikut merupakan data contoh dan strukturnya dapat diperbarui admin."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => {
              const Icon = icons[p.icon];
              return (
                <article
                  key={p.id}
                  className="group overflow-hidden rounded-xl border bg-card soft-card transition hover:-translate-y-1"
                >
                  <div className="grid aspect-[16/9] place-items-center bg-secondary">
                    <Icon className="size-16 text-primary/70 transition group-hover:scale-110" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-bold uppercase text-primary">{p.category}</span>
                      <span className="rounded-full bg-brand-gold-soft px-2 py-1 text-[10px] font-bold">
                        Data Contoh
                      </span>
                    </div>
                    <h2 className="mt-3 font-display text-xl font-bold">{p.name}</h2>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{p.description}</p>
                    <dl className="mt-5 grid grid-cols-2 gap-3 border-t pt-4 text-sm">
                      <div>
                        <dt className="text-xs text-muted-foreground">Jurusan/unit</dt>
                        <dd className="font-semibold">{p.unit}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-muted-foreground">Harga</dt>
                        <dd className="font-semibold text-primary">{p.price}</dd>
                      </div>
                    </dl>
                    <div className="mt-5 grid grid-cols-2 gap-2">
                      <Button variant="outline">Lihat Detail</Button>
                      <Button>
                        <ShoppingBag /> Pesan
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
