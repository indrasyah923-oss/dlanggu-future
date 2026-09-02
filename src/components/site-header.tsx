import { Link, useRouterState } from "@tanstack/react-router";
import { Bot, ChevronDown, Menu, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandMark } from "./brand-mark";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

const groups = [
  {
    label: "Profil",
    items: [
      "Tentang Sekolah",
      "Visi & Misi",
      "Sambutan Kepala Sekolah",
      "Fasilitas",
      "Struktur Organisasi",
    ],
    hash: "profil",
  },
  {
    label: "Jurusan",
    items: ["TKJ", "RPL", "DKV", "Animasi", "Tata Boga", "Perhotelan"],
    hash: "jurusan",
  },
  { label: "Prestasi", items: ["Prestasi Siswa", "Lulusan Terbaik"], hash: "prestasi" },
  {
    label: "PKL & Career Center",
    items: ["Cari Tempat PKL", "Rekomendasi PKL", "Peluang Karier", "Perusahaan", "Panduan PKL"],
    hash: "",
  },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { label: "Home", href: "/" },
    { label: "PPDB", href: "/ppdb" },
    { label: "Produk Unggulan", href: "/produk-unggulan" },
  ];
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${scrolled || pathname !== "/" ? "border-nav-foreground/10 bg-primary shadow-lg" : "border-transparent bg-primary/40 backdrop-blur-md"}`}
    >
      <div className="container-shell grid h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <Link to="/" aria-label="SMKN 1 Dlanggu — Home">
          <BrandMark />
        </Link>
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Navigasi utama">
          <Link
            to="/"
            className="px-3 py-7 text-sm font-semibold text-nav-muted transition hover:text-nav-foreground"
            activeProps={{ className: "text-nav-foreground border-b-2 border-brand-gold" }}
          >
            Home
          </Link>
          {groups.slice(0, 3).map((group) => (
            <DesktopGroup key={group.label} {...group} />
          ))}
          {links.slice(1).map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="px-3 py-7 text-sm font-semibold text-nav-muted transition hover:text-nav-foreground"
              activeProps={{ className: "text-nav-foreground border-b-2 border-brand-gold" }}
            >
              {item.label}
            </Link>
          ))}
          <DesktopGroup {...groups[3]} />
          <Link
            to="/ai-assistant"
            className="grid size-10 place-items-center rounded-md text-nav-muted transition hover:bg-nav-foreground/10 hover:text-nav-foreground"
            aria-label="AI Assistant"
          >
            <Bot />
          </Link>
          <Button asChild variant="gold" size="sm">
            <Link to="/pkl-career-center">
              <Search /> Cari Tempat PKL
            </Link>
          </Button>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="xl:hidden" variant="heroOutline" size="icon" aria-label="Buka menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[88%] overflow-y-auto bg-primary text-nav-foreground">
            <SheetTitle className="sr-only">Navigasi utama</SheetTitle>
            <BrandMark />
            <nav className="mt-8 space-y-1">
              <MobileLink to="/">Home</MobileLink>
              <Accordion type="multiple">
                {groups.slice(0, 3).map((g) => (
                  <AccordionItem key={g.label} value={g.label} className="border-nav-foreground/10">
                    <AccordionTrigger className="text-nav-foreground hover:no-underline">
                      {g.label}
                    </AccordionTrigger>
                    <AccordionContent>
                      {g.items.map((i) => (
                        <SheetClose asChild key={i}>
                          <Link to="/" hash={g.hash} className="block py-2 text-nav-muted">
                            {i}
                          </Link>
                        </SheetClose>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <MobileLink to="/ppdb">PPDB</MobileLink>
              <MobileLink to="/produk-unggulan">Produk Unggulan</MobileLink>
              <Accordion type="single" collapsible>
                <AccordionItem value="career" className="border-nav-foreground/10">
                  <AccordionTrigger className="text-nav-foreground hover:no-underline">
                    PKL & Career Center
                  </AccordionTrigger>
                  <AccordionContent>
                    {groups[3].items.map((i) => (
                      <SheetClose asChild key={i}>
                        <Link
                          to={i === "Peluang Karier" ? "/career-center" : "/pkl-career-center"}
                          className="block py-2 text-nav-muted"
                        >
                          {i}
                        </Link>
                      </SheetClose>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <MobileLink to="/ai-assistant">AI Assistant</MobileLink>
              <SheetClose asChild>
                <Button asChild variant="gold" className="mt-5 w-full">
                  <Link to="/pkl-career-center">Cari Tempat PKL</Link>
                </Button>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function DesktopGroup({
  label,
  items,
  hash,
}: {
  label: string;
  items: readonly string[];
  hash: string;
}) {
  const career = label === "PKL & Career Center";
  const parentLink = career ? (
    <Link
      to="/pkl-career-center"
      className="flex items-center gap-1 px-3 py-7 text-sm font-semibold text-nav-muted transition hover:text-nav-foreground"
    >
      {label}
      <ChevronDown className="size-3.5 transition group-hover:rotate-180" />
    </Link>
  ) : (
    <Link
      to="/"
      hash={hash}
      className="flex items-center gap-1 px-3 py-7 text-sm font-semibold text-nav-muted transition hover:text-nav-foreground"
    >
      {label}
      <ChevronDown className="size-3.5 transition group-hover:rotate-180" />
    </Link>
  );
  return (
    <div className="group relative">
      {parentLink}
      <div className="invisible absolute left-0 top-[68px] w-56 translate-y-2 rounded-lg border bg-popover p-2 text-popover-foreground opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        {items.map((item) =>
          career ? (
            <Link
              key={item}
              to={item === "Peluang Karier" ? "/career-center" : "/pkl-career-center"}
              className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
            >
              {item}
            </Link>
          ) : (
            <Link
              key={item}
              to="/"
              hash={hash}
              className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
            >
              {item}
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
function MobileLink({
  to,
  children,
}: {
  to: "/" | "/ppdb" | "/produk-unggulan" | "/ai-assistant";
  children: React.ReactNode;
}) {
  return (
    <SheetClose asChild>
      <Link
        to={to}
        className="block border-b border-nav-foreground/10 py-4 font-medium text-nav-foreground"
      >
        {children}
      </Link>
    </SheetClose>
  );
}
