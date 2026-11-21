"use client";

import { useEffect, useRef, useState } from "react";

type Turn = { role: "user" | "assistant"; content: string };

const starters = [
  "What did you do at DXC?",
  "Tell me about the Fujitsu alliances.",
  "Are you open to a new venture?",
];

export function TwinChat() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const openPanel = () => setOpen(true);
    window.addEventListener("open-twin", openPanel);
    return () => window.removeEventListener("open-twin", openPanel);
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [turns, pending, open]);

  async function ask(text: string) {
    const question = text.trim();
    if (!question || pending) return;
    const history = [...turns, { role: "user" as const, content: question }];
    setTurns(history);
    setDraft("");
    setError("");
    setPending(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = (await response.json()) as { answer?: string; error?: string };
      if (!response.ok || !data.answer) {
        setError(data.error || "The twin could not answer.");
        return;
      }
      setTurns((current) => [...current, { role: "assistant", content: data.answer! }]);
    } catch {
      setError("The twin could not be reached.");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      {open ? null : (
        <button type="button" className="twin-launch" onClick={() => setOpen(true)}>
          Digital twin
        </button>
      )}
      {open ? (
        <section className="twin-panel" aria-label="Digital twin chat">
          <header className="twin-head">
            <div>
              <p className="kicker">Digital twin</p>
              <strong>Ask about the career</strong>
            </div>
            <button type="button" className="twin-close" onClick={() => setOpen(false)}>
              Close
            </button>
          </header>
          <div className="twin-log" ref={listRef}>
            {turns.length === 0 ? (
              <div className="twin-empty">
                <p>I answer from the public career record — roles, alliances, and results.</p>
                <div className="twin-starters">
                  {starters.map((starter) => (
                    <button key={starter} type="button" onClick={() => ask(starter)} disabled={pending}>
                      {starter}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              turns.map((turn, index) => (
                <p key={`${turn.role}-${index}`} className={turn.role === "user" ? "twin-user" : "twin-assistant"}>
                  {turn.content}
                </p>
              ))
            )}
            {pending ? <p className="twin-assistant twin-wait">Looking through the record…</p> : null}
            {error ? <p className="twin-error">{error}</p> : null}
          </div>
          <form
            className="twin-form"
            onSubmit={(event) => {
              event.preventDefault();
              void ask(draft);
            }}
          >
            <label className="sr-only" htmlFor="twin-question">
              Question for the digital twin
            </label>
            <textarea
              id="twin-question"
              ref={inputRef}
              rows={2}
              value={draft}
              placeholder="Ask about a role, a company, or a result"
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void ask(draft);
                }
              }}
            />
            <button type="submit" className="btn" disabled={pending || !draft.trim()}>
              Ask
            </button>
          </form>
        </section>
      ) : null}
    </>
  );
}
