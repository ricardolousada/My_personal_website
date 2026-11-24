import { likePost, getPost } from "@/lib/posts";

export const runtime = "nodejs";

const cookieName = "blog-likes";
const cookieMaxAge = 60 * 60 * 24 * 365;

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!/^[a-z0-9-]{1,80}$/.test(id)) return Response.json({ error: "Unknown post." }, { status: 404 });

  const liked = new Set(readLiked(request));
  const current = await getPost(id);
  if (!current) return Response.json({ error: "Unknown post." }, { status: 404 });

  if (liked.has(id)) return jsonWithCookie({ likes: current.likes, liked: true }, liked);

  const post = await likePost(id);
  if (!post) return Response.json({ error: "Unknown post." }, { status: 404 });
  liked.add(id);
  return jsonWithCookie({ likes: post.likes, liked: true }, liked);
}

function readLiked(request: Request) {
  const header = request.headers.get("cookie") ?? "";
  const match = header.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${cookieName}=`));
  if (!match) return [];
  try {
    return decodeURIComponent(match.slice(cookieName.length + 1))
      .split(",")
      .filter((id) => /^[a-z0-9-]{1,80}$/.test(id))
      .slice(-50);
  } catch {
    return [];
  }
}

function jsonWithCookie(body: { likes: number; liked: boolean }, liked: Set<string>) {
  const response = Response.json(body);
  const ids = [...liked].slice(-50);
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  response.headers.append(
    "set-cookie",
    `${cookieName}=${encodeURIComponent(ids.join(","))}; Path=/; Max-Age=${cookieMaxAge}; HttpOnly; SameSite=Lax${secure}`,
  );
  return response;
}
