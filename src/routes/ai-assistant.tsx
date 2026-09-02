import { createFileRoute } from "@tanstack/react-router";
import { Bot, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { getAssistantReply, quickQuestions } from "@/lib/chatbot";
type Message = { role: "assistant" | "user"; text: string };
export const Route = createFileRoute("/ai-assistant")({
  head: () => ({
    meta: [
      { title: "Dlanggu AI Assistant — SMKN 1 Dlanggu" },
      {
        name: "description",
        content:
          "Asisten virtual SMKN 1 Dlanggu untuk informasi jurusan, PPDB, PKL, karier, prestasi, dan produk sekolah.",
      },
      { property: "og:title", content: "Dlanggu AI Assistant — SMKN 1 Dlanggu" },
      {
        property: "og:description",
        content: "Temukan informasi sekolah dengan bantuan knowledge base lokal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AiPage,
});
function AiPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Halo! 👋 Saya Dlanggu AI Assistant.\n\nSaya siap membantu kamu menemukan informasi tentang SMKN 1 Dlanggu, mulai dari jurusan, PPDB, PKL, karier, prestasi, hingga informasi sekolah lainnya.",
    },
  ]);
  const send = (text: string) => {
    const value = text.trim();
    if (!value) return;
    setMessages((p) => [
      ...p,
      { role: "user", text: value },
      { role: "assistant", text: getAssistantReply(value) },
    ]);
    setInput("");
  };
  return (
    <>
      <PageHero
        eyebrow="AI Integrated Website"
        title="Dlanggu AI Assistant"
        description="Asisten informasi sekolah berbasis knowledge base lokal untuk membantu kamu menemukan jawaban dengan cepat."
      />
      <section className="batik-pattern py-16">
        <div className="container-shell relative z-10 grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <aside>
            <div className="rounded-xl border bg-card p-6 soft-card">
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-lg bg-secondary text-primary">
                  <Sparkles />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold">Contoh pertanyaan</h2>
                  <p className="text-sm text-muted-foreground">Pilih untuk memulai percakapan.</p>
                </div>
              </div>
              <div className="mt-6 space-y-2">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="w-full rounded-lg border bg-background p-3 text-left text-sm transition hover:border-primary hover:bg-accent"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </aside>
          <div className="flex min-h-[620px] flex-col overflow-hidden rounded-xl border bg-card soft-card">
            <div className="flex items-center gap-3 bg-primary p-5 text-primary-foreground">
              <Bot className="size-7" />
              <div>
                <h2 className="font-display font-bold">Dlanggu AI Assistant</h2>
                <p className="text-xs text-nav-muted">Prototype · Knowledge base lokal</p>
              </div>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto bg-muted/40 p-5">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] whitespace-pre-line rounded-lg p-4 text-sm leading-6 ${m.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "border bg-card"}`}
                >
                  {m.text}
                </div>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 border-t p-4"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-w-0 rounded-lg border bg-background px-4 text-sm"
                placeholder="Tulis pertanyaanmu..."
                aria-label="Pertanyaan"
              />
              <Button size="icon" aria-label="Kirim">
                <Send />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
