import { Link } from "@tanstack/react-router";
import { MapPin, Mail, Phone } from "lucide-react";
import { BrandMark } from "./brand-mark";

export function SiteFooter() {
  return (
    <footer className="batik-pattern relative overflow-hidden bg-primary text-nav-foreground">
      <div className="container-shell relative z-10 grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <BrandMark />
          <p className="mt-5 max-w-md text-sm leading-7 text-nav-muted">
            Platform digital untuk informasi sekolah, PPDB, karya siswa, PKL, dan persiapan karier.
          </p>
        </div>
        <div>
          <h2 className="font-display font-bold">Akses Cepat</h2>
          <div className="mt-4 grid gap-3 text-sm text-nav-muted">
            <Link to="/ppdb">PPDB</Link>
            <Link to="/produk-unggulan">Produk Unggulan</Link>
            <Link to="/pkl-career-center">PKL & Career Center</Link>
            <Link to="/ai-assistant">AI Assistant</Link>
          </div>
        </div>
        <div>
          <h2 className="font-display font-bold">Hubungi Sekolah</h2>
          <div className="mt-4 space-y-3 text-sm text-nav-muted">
            <p className="flex gap-2">
              <MapPin className="size-4 shrink-0" /> Dlanggu, Mojokerto, Jawa Timur
            </p>
            <p className="flex gap-2">
              <Phone className="size-4" /> Kontak sekolah
            </p>
            <p className="flex gap-2">
              <Mail className="size-4" /> Email sekolah
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-nav-foreground/10 py-5 text-center text-xs text-nav-muted">
        © 2026 SMKN 1 Dlanggu. Digital School & Career Center.
      </div>
    </footer>
  );
}
