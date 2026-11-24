import { isPostBodyMeaningful, writeKeyMatches } from "@/lib/posts";

export async function readPostInput(request: Request): Promise<{ title: string; body: string } | Response> {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Send the post as JSON." }, { status: 400 });
  }
  const value = payload as { title?: unknown; body?: unknown };
  const title = typeof value?.title === "string" ? value.title.trim() : "";
  const body = typeof value?.body === "string" ? value.body : "";
  if (title.length < 3 || title.length > 140) {
    return Response.json({ error: "The title needs between 3 and 140 characters." }, { status: 400 });
  }
  if (body.length > 100_000 || !isPostBodyMeaningful(body)) {
    return Response.json({ error: "Add some text to the post (up to 100,000 characters)." }, { status: 400 });
  }
  return { title, body };
}

export function authorizationError(request: Request) {
  if (!process.env.BLOG_WRITE_KEY?.trim()) {
    return Response.json({ error: "Writing is not configured. Set BLOG_WRITE_KEY in .env." }, { status: 500 });
  }
  const authorization = request.headers.get("authorization") ?? "";
  const token = authorization.replace(/^Bearer\s+/i, "");
  if (!writeKeyMatches(token)) return Response.json({ error: "The write key is not right." }, { status: 401 });
  return null;
}
