import { deletePost, updatePost } from "@/lib/posts";
import { authorizationError, readPostInput } from "@/lib/blogAdmin";

export const runtime = "nodejs";

type Context = { params: Promise<{ id: string }> };

export async function PUT(request: Request, context: Context) {
  const authError = authorizationError(request);
  if (authError) return authError;
  const { id } = await context.params;
  if (!/^[a-z0-9-]{1,80}$/.test(id)) return Response.json({ error: "Unknown post." }, { status: 404 });
  const input = await readPostInput(request);
  if (input instanceof Response) return input;
  const post = await updatePost(id, input.title, input.body);
  if (!post) return Response.json({ error: "Unknown post." }, { status: 404 });
  return Response.json({ post });
}

export async function DELETE(request: Request, context: Context) {
  const authError = authorizationError(request);
  if (authError) return authError;
  const { id } = await context.params;
  if (!/^[a-z0-9-]{1,80}$/.test(id) || !(await deletePost(id))) {
    return Response.json({ error: "Unknown post." }, { status: 404 });
  }
  return Response.json({ deleted: true });
}
