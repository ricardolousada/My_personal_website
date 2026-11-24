import { authorizationError, readPostInput } from "@/lib/blogAdmin";
import { createPost, listPosts } from "@/lib/posts";

export const runtime = "nodejs";

export async function GET() {
  return Response.json({ posts: await listPosts() });
}

export async function POST(request: Request) {
  const authError = authorizationError(request);
  if (authError) return authError;
  const input = await readPostInput(request);
  if (input instanceof Response) return input;
  const post = await createPost(input.title, input.body);
  return Response.json({ post }, { status: 201 });
}
