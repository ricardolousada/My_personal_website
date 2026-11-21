import { TWIN_MODEL, twinSystemPrompt } from "@/lib/careerContext";

export const runtime = "nodejs";

type ChatTurn = { role: "user" | "assistant"; content: string };

function cleanAnswer(text: string) {
  return text
    .replace(/<think>[\s\S]*?<\/think>/gi, "")
    .replace(/<\/?think>/gi, "")
    .trim();
}

function readTurns(input: unknown): ChatTurn[] | null {
  if (!Array.isArray(input) || input.length === 0 || input.length > 16) return null;
  const turns: ChatTurn[] = [];
  for (const item of input) {
    if (!item || typeof item !== "object") return null;
    const role = (item as { role?: unknown }).role;
    const content = (item as { content?: unknown }).content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim();
    if (!text || text.length > 1200) return null;
    turns.push({ role, content: text });
  }
  if (turns[turns.length - 1]?.role !== "user") return null;
  return turns;
}

function messageText(content: unknown) {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content
    .map((part) => {
      if (typeof part === "string") return part;
      if (part && typeof part === "object" && "text" in part && typeof part.text === "string") return part.text;
      return "";
    })
    .join("");
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim().replace(/^["']|["']$/g, "");
  if (!apiKey) {
    return Response.json({ error: "The digital twin is not configured yet." }, { status: 500 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Send a question as JSON." }, { status: 400 });
  }

  const turns = readTurns((payload as { messages?: unknown }).messages);
  if (!turns) {
    return Response.json({ error: "Ask a short question about the career." }, { status: 400 });
  }

  let upstream: Response;
  try {
    upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3001",
        "X-Title": "Ricardo Lousada Digital Twin",
      },
      body: JSON.stringify({
        model: TWIN_MODEL,
        temperature: 0.3,
        max_tokens: 2200,
        messages: [{ role: "system", content: twinSystemPrompt() }, ...turns],
      }),
    });
  } catch {
    return Response.json({ error: "The digital twin could not be reached. Try again in a moment." }, { status: 502 });
  }

  const data = (await upstream.json().catch(() => null)) as {
    error?: { message?: string };
    choices?: { message?: { content?: unknown } }[];
  } | null;

  if (!upstream.ok) {
    const detail = data?.error?.message || "The model did not answer.";
    const status = upstream.status === 429 ? 429 : 502;
    return Response.json(
      { error: status === 429 ? "The twin is busy. Wait a few seconds and ask again." : detail },
      { status },
    );
  }

  const answer = cleanAnswer(messageText(data?.choices?.[0]?.message?.content));
  if (!answer) {
    return Response.json({ error: "The twin returned an empty answer. Ask again." }, { status: 502 });
  }

  return Response.json({ answer });
}
