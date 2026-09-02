/**
 * Lapisan akses data (mock).
 *
 * Semua fungsi di bawah bersifat async dan mengembalikan data dummy dari
 * src/lib/mock-store.ts. Ketika backend Laravel siap, cukup ganti isi tiap
 * fungsi menjadi pemanggilan REST API, misalnya:
 *
 *   export async function fetchDudiSubmissions(dudiId?: string) {
 *     const res = await fetch(`/api/dudi/submissions?dudi_id=${dudiId ?? ""}`);
 *     return res.json();
 *   }
 *
 * Tanda tangan fungsi (parameter & bentuk data yang dikembalikan) sengaja
 * dibuat stabil supaya komponen UI tidak perlu diubah saat migrasi.
 */
import {
  getDb,
  mutateDb,
  subscribeDb,
  type DudiAccount,
  type DudiSubmission,
  type KnowledgeEntry,
  type MasterRecord,
  type MasterTableKey,
} from "./mock-store";
import { useSyncExternalStore } from "react";

const delay = () => new Promise((r) => setTimeout(r, 180));
const newId = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
const today = () =>
  new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

/* ---------------------------------- read --------------------------------- */

export function useDb() {
  return useSyncExternalStore(
    (cb) => subscribeDb(cb),
    () => getDb(),
    () => getDb(),
  );
}

export async function fetchDudiAccounts(): Promise<DudiAccount[]> {
  await delay();
  return getDb().dudiAccounts;
}

export async function fetchDudiSubmissions(dudiId?: string): Promise<DudiSubmission[]> {
  await delay();
  const all = getDb().submissions;
  return dudiId ? all.filter((s) => s.dudi_id === dudiId) : all;
}

export async function fetchPendingSubmissions(): Promise<DudiSubmission[]> {
  await delay();
  return getDb().submissions.filter((s) => s.status === "Menunggu Persetujuan");
}

export async function fetchApprovedSubmissions(): Promise<DudiSubmission[]> {
  await delay();
  return getDb().submissions.filter((s) => s.status === "Disetujui");
}

/* --------------------------------- write --------------------------------- */

export type SubmissionPayload = Omit<
  DudiSubmission,
  "id" | "status" | "admin_note" | "submitted_at"
>;

export async function createDudiSubmission(payload: SubmissionPayload): Promise<DudiSubmission> {
  await delay();
  const record: DudiSubmission = {
    ...payload,
    id: newId("sub"),
    status: "Menunggu Persetujuan",
    admin_note: "",
    submitted_at: today(),
  };
  mutateDb((d) => {
    d.submissions.unshift(record);
  });
  return record;
}

export async function updateDudiSubmission(id: string, patch: Partial<DudiSubmission>) {
  await delay();
  mutateDb((d) => {
    const item = d.submissions.find((s) => s.id === id);
    if (item) Object.assign(item, patch);
  });
}

export async function cancelDudiSubmission(id: string) {
  await delay();
  mutateDb((d) => {
    d.submissions = d.submissions.filter((s) => s.id !== id);
  });
}

export async function closeDudiSubmission(id: string) {
  return updateDudiSubmission(id, { status: "Ditutup" });
}

export async function resubmitDudiSubmission(id: string) {
  return updateDudiSubmission(id, {
    status: "Menunggu Persetujuan",
    admin_note: "",
    submitted_at: today(),
  });
}

export async function approveDudiSubmission(id: string) {
  return updateDudiSubmission(id, { status: "Disetujui", admin_note: "" });
}

export async function rejectDudiSubmission(id: string, note: string) {
  return updateDudiSubmission(id, { status: "Ditolak", admin_note: note });
}

export async function updateDudiProfile(id: string, patch: Partial<DudiAccount>) {
  await delay();
  mutateDb((d) => {
    const acc = d.dudiAccounts.find((a) => a.id === id);
    if (acc) Object.assign(acc, patch);
    if (patch.company_name) {
      d.submissions.forEach((s) => {
        if (s.dudi_id === id) s.company_name = patch.company_name as string;
      });
    }
  });
}

export async function verifyDudiAccount(id: string, verified: boolean) {
  return updateDudiProfile(id, { verified });
}

export async function setDudiAccountActive(id: string, active: boolean) {
  return updateDudiProfile(id, { active });
}

/* ------------------------------ master data ------------------------------ */

export async function fetchMasterRecords(table: MasterTableKey): Promise<MasterRecord[]> {
  await delay();
  return getDb().master[table];
}

export async function createMasterRecord(table: MasterTableKey, values: Record<string, string>) {
  await delay();
  mutateDb((d) => {
    d.master[table].push({ id: newId(table), ...values });
  });
}

export async function updateMasterRecord(
  table: MasterTableKey,
  id: string,
  values: Record<string, string>,
) {
  await delay();
  mutateDb((d) => {
    const row = d.master[table].find((r) => r.id === id);
    if (row) Object.assign(row, values);
  });
}

export async function deleteMasterRecord(table: MasterTableKey, id: string) {
  await delay();
  mutateDb((d) => {
    d.master[table] = d.master[table].filter((r) => r.id !== id);
  });
}

/* --------------------------- AI knowledge base --------------------------- */

export async function fetchKnowledgeBase(): Promise<KnowledgeEntry[]> {
  await delay();
  return getDb().knowledgeBase;
}

export async function createKnowledgeEntry(entry: Omit<KnowledgeEntry, "id">) {
  await delay();
  mutateDb((d) => {
    d.knowledgeBase.push({ id: newId("kb"), ...entry });
  });
}

export async function updateKnowledgeEntry(id: string, entry: Omit<KnowledgeEntry, "id">) {
  await delay();
  mutateDb((d) => {
    const row = d.knowledgeBase.find((k) => k.id === id);
    if (row) Object.assign(row, entry);
  });
}

export async function deleteKnowledgeEntry(id: string) {
  await delay();
  mutateDb((d) => {
    d.knowledgeBase = d.knowledgeBase.filter((k) => k.id !== id);
  });
}
