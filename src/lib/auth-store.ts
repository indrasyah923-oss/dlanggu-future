/**
 * Simulasi sesi login berbasis role (frontend only).
 * Autentikasi sesungguhnya nanti ditangani backend Laravel.
 */
import { useSyncExternalStore } from "react";
import { getDb } from "./mock-store";

export type Role = "admin" | "dudi";
export type Session = { role: Role; email: string; dudiId?: string; name: string } | null;

let session: Session = null;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function useSession() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => session,
    () => null,
  );
}

/** Ganti dengan POST /api/login saat backend Laravel siap. */
export async function signIn(role: Role, email: string): Promise<Session> {
  await new Promise((r) => setTimeout(r, 200));
  if (role === "admin") {
    session = { role, email, name: "Administrator Sekolah" };
  } else {
    const accounts = getDb().dudiAccounts;
    const matched = accounts.find((a) => a.email === email) ?? accounts[0];
    session = { role, email, dudiId: matched.id, name: matched.company_name };
  }
  emit();
  return session;
}

export function signOut() {
  session = null;
  emit();
}

/** Akun demo untuk simulasi alur end-to-end. */
export const demoAccounts = {
  admin: { email: "admin@smkn1dlanggu.sch.id", password: "admin123" },
  dudi: [
    { email: "hrd@nusadigital.example", password: "dudi123", label: "Nusa Digital Studio" },
    { email: "partnership@kreasivisual.example", password: "dudi123", label: "Kreasi Visual Jatim" },
    {
      email: "training@hospitalitycenter.example",
      password: "dudi123",
      label: "Hospitality Training Center",
    },
  ],
};
