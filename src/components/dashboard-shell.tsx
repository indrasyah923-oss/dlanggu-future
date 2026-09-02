import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Building2,
  ClipboardList,
  Database,
  FilePlus2,
  Gauge,
  History,
  LogOut,
  Menu,
  MessageSquareText,
  ShieldCheck,
  UserCog,
} from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { BrandMark } from "./brand-mark";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { signOut, useSession, type Role } from "@/lib/auth-store";
import { cn } from "@/lib/utils";

type NavItem = { label: string; to: string; icon: typeof Gauge };

const adminNav: NavItem[] = [
  { label: "Dashboard", to: "/admin/dashboard", icon: Gauge },
  { label: "Antrian Approval", to: "/admin/approval", icon: ClipboardList },
  { label: "Kelola Akun DUDI", to: "/admin/dudi", icon: ShieldCheck },
  { label: "Kelola Data Master", to: "/admin/data", icon: Database },
  { label: "Knowledge Base AI", to: "/admin/ai-assistant", icon: MessageSquareText },
];

const dudiNav: NavItem[] = [
  { label: "Dashboard", to: "/dudi/dashboard", icon: Gauge },
  { label: "Ajukan Lowongan", to: "/dudi/ajukan", icon: FilePlus2 },
  { label: "Riwayat Pengajuan", to: "/dudi/riwayat", icon: History },
  { label: "Profil Perusahaan", to: "/dudi/profil", icon: Building2 },
];

export function DashboardShell({
  role,
  title,
  description,
  children,
}: {
  role: Role;
  title: string;
  description: string;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const session = useSession();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = role === "admin" ? adminNav : dudiNav;
  const headline = role === "admin" ? "Panel Admin — SMKN 1 Dlanggu" : "Portal Mitra Industri — SMKN 1 Dlanggu";

  useEffect(() => {
    if (!session) navigate({ to: "/login" });
  }, [session, navigate]);

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[17rem_minmax(0,1fr)]">
      <aside className="batik-pattern sticky top-0 hidden h-screen overflow-y-auto bg-primary text-nav-foreground lg:block">
        <div className="relative z-10 p-6">
          <Link to="/" aria-label="Kembali ke situs SMKN 1 Dlanggu">
            <BrandMark />
          </Link>
          <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-gold">
            {role === "admin" ? "Panel Admin" : "Portal Mitra Industri"}
          </p>
          <nav className="mt-4 space-y-1" aria-label="Navigasi dashboard">
            {items.map((item) => (
              <SidebarLink key={item.to} item={item} active={pathname === item.to} />
            ))}
          </nav>
          <div className="mt-8 rounded-lg border border-nav-foreground/15 bg-nav-foreground/5 p-4">
            <p className="text-xs text-nav-muted">Masuk sebagai</p>
            <p className="mt-1 truncate font-display font-bold">{session?.name ?? "-"}</p>
            <p className="truncate text-xs text-nav-muted">{session?.email}</p>
            <Button
              variant="heroOutline"
              size="sm"
              className="mt-4 w-full"
              onClick={() => {
                signOut();
                navigate({ to: "/login" });
              }}
            >
              <LogOut /> Keluar
            </Button>
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="batik-pattern sticky top-0 z-40 overflow-hidden bg-primary text-nav-foreground shadow-lg">
          <div className="relative z-10 flex items-center gap-3 px-5 py-4 sm:px-8">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="heroOutline" size="icon" className="lg:hidden" aria-label="Buka menu dashboard">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="batik-pattern w-[86%] overflow-y-auto bg-primary text-nav-foreground"
              >
                <SheetTitle className="sr-only">Navigasi dashboard</SheetTitle>
                <div className="relative z-10">
                  <BrandMark />
                  <nav className="mt-8 space-y-1">
                    {items.map((item) => (
                      <SheetClose asChild key={item.to}>
                        <SidebarLink item={item} active={pathname === item.to} />
                      </SheetClose>
                    ))}
                  </nav>
                  <Button
                    variant="heroOutline"
                    className="mt-8 w-full"
                    onClick={() => {
                      signOut();
                      navigate({ to: "/login" });
                    }}
                  >
                    <LogOut /> Keluar
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-bold uppercase tracking-[0.16em] text-brand-gold">
                {headline}
              </p>
              <h1 className="truncate font-display text-xl font-bold">{title}</h1>
            </div>
            <div className="hidden items-center gap-3 sm:flex">
              <span className="grid size-10 place-items-center rounded-lg bg-nav-foreground/10">
                <UserCog className="size-5" />
              </span>
            </div>
          </div>
        </header>
        <main className="px-5 py-8 sm:px-8">
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground">{description}</p>
          <div className="mt-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

function SidebarLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition",
        active
          ? "bg-nav-foreground/15 text-nav-foreground"
          : "text-nav-muted hover:bg-nav-foreground/10 hover:text-nav-foreground",
      )}
    >
      <Icon className="size-4 shrink-0" />
      {item.label}
    </Link>
  );
}

export function DashCard({
  title,
  value,
  hint,
  icon,
  highlight = false,
}: {
  title: string;
  value: string | number;
  hint?: string;
  icon: ReactNode;
  highlight?: boolean;
}) {
  return (
    <article
      className={cn(
        "rounded-xl border bg-card p-6 soft-card",
        highlight && "border-brand-gold/60 bg-brand-gold-soft/40",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="grid size-11 place-items-center rounded-lg bg-secondary text-primary">
          {icon}
        </span>
        <strong className="font-display text-3xl">{value}</strong>
      </div>
      <h2 className="mt-5 font-display font-bold">{title}</h2>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </article>
  );
}
