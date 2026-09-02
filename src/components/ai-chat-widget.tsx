import { Link } from "@tanstack/react-router";
import { Bot, ExternalLink, MessageCircle, Send, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { getAssistantReply, quickQuestions } from "@/lib/chatbot";

type Message = { role: "assistant" | "user"; text: string };

export function AiChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Halo! 👋 Saya Dlanggu AI Assistant.\n\nSaya siap membantu kamu menemukan informasi tentang SMKN 1 Dlanggu, mulai dari jurusan, PPDB, PKL, karier, prestasi, hingga informasi sekolah lainnya.",
    },
  ]);
  const send = (value: string) => {
    const text = value.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text },
      { role: "assistant", text: getAssistantReply(text) },
    ]);
    setInput("");
  };
  return (
    <>
      {open && (
        <aside
          className="fixed bottom-24 right-4 z-50 flex h-[min(620px,calc(100vh-8rem))] w-[calc(100%-2rem)] max-w-sm flex-col overflow-hidden rounded-xl border bg-card shadow-2xl sm:right-6"
          aria-label="Dlanggu AI Assistant"
        >
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 bg-primary p-4 text-primary-foreground">
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-nav-foreground/10">
                <Bot />
              </div>
              <div className="min-w-0">
                <h2 className="truncate font-display font-bold">Dlanggu AI Assistant</h2>
                <p className="text-xs text-nav-muted">Knowledge base lokal</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              aria-label="Tutup chat"
            >
              <X />
            </Button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto bg-muted/40 p-4">
            {messages.map((m, i) => (
              <div
                key={`${m.role}-${i}`}
                className={`max-w-[86%] whitespace-pre-line rounded-lg p-3 text-sm leading-6 ${m.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "border bg-card text-card-foreground"}`}
              >
                {m.text}
              </div>
            ))}
            <div className="flex flex-wrap gap-2">
              {messages.length < 3 &&
                quickQuestions.slice(0, 3).map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="rounded-full border bg-card px-3 py-2 text-left text-xs text-primary transition hover:bg-accent"
                  >
                    {q}
                  </button>
                ))}
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 border-t bg-card p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanyakan sesuatu..."
              className="min-w-0 rounded-md border bg-background px-3 text-sm"
              aria-label="Pesan untuk AI Assistant"
            />
            <Button size="icon" aria-label="Kirim pesan">
              <Send />
            </Button>
          </form>
          <Link
            to="/ai-assistant"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 border-t py-2 text-xs font-semibold text-primary"
          >
            Buka halaman AI Assistant <ExternalLink className="size-3" />
          </Link>
        </aside>
      )}
      <Button
        onClick={() => setOpen((v) => !v)}
        size="icon"
        className="fixed bottom-5 right-4 z-50 size-14 rounded-full shadow-2xl sm:right-6"
        aria-label={open ? "Tutup Dlanggu AI Assistant" : "Buka Dlanggu AI Assistant"}
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </Button>
    </>
  );
}
