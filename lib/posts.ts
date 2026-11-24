import { randomBytes, timingSafeEqual } from "crypto";
import { mkdir, readFile, rename, writeFile } from "fs/promises";
import path from "path";
import sanitizeHtml from "sanitize-html";

export type Post = {
  id: string;
  title: string;
  body: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
};

const file = path.join(process.cwd(), "data", "posts.json");

const richTextOptions: sanitizeHtml.IOptions = {
  allowedTags: ["p", "br", "strong", "b", "em", "i", "h2", "h3", "ul", "ol", "li", "blockquote", "pre", "code", "a"],
  allowedAttributes: { a: ["href", "target", "rel"] },
  allowedSchemes: ["http", "https", "mailto"],
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer", target: "_blank" }),
  },
};

export function sanitizePostBody(body: string) {
  return sanitizeHtml(body, richTextOptions).trim();
}

export function isPostBodyMeaningful(body: string) {
  return sanitizePostBody(body).replace(/<[^>]*>/g, "").replace(/&nbsp;|&#160;/gi, " ").trim().length > 0;
}

export async function listPosts(): Promise<Post[]> {
  try {
    const raw = await readFile(file, "utf8");
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) return [];
    return data
      .filter(isPost)
      .map((post) => ({ ...post, body: sanitizePostBody(post.body), likes: Number.isSafeInteger(post.likes) && post.likes >= 0 ? post.likes : 0 }))
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  } catch {
    return [];
  }
}

export async function getPost(id: string): Promise<Post | null> {
  return (await listPosts()).find((post) => post.id === id) ?? null;
}

export async function createPost(title: string, body: string): Promise<Post> {
  const posts = await listPosts();
  const now = new Date().toISOString();
  const post: Post = {
    id: makeId(title, posts),
    title,
    body: sanitizePostBody(body),
    likes: 0,
    createdAt: now,
    updatedAt: now,
  };
  await save([post, ...posts]);
  return post;
}

export async function updatePost(id: string, title: string, body: string): Promise<Post | null> {
  const posts = await listPosts();
  const post = posts.find((item) => item.id === id);
  if (!post) return null;
  post.title = title;
  post.body = sanitizePostBody(body);
  post.updatedAt = new Date().toISOString();
  await save(posts);
  return post;
}

export async function deletePost(id: string): Promise<boolean> {
  const posts = await listPosts();
  const remaining = posts.filter((post) => post.id !== id);
  if (remaining.length === posts.length) return false;
  await save(remaining);
  return true;
}

export async function likePost(id: string): Promise<Post | null> {
  const posts = await listPosts();
  const post = posts.find((item) => item.id === id);
  if (!post) return null;
  post.likes += 1;
  await save(posts);
  return post;
}

export function writeKeyMatches(input: string): boolean {
  const secret = process.env.BLOG_WRITE_KEY?.trim() ?? "";
  if (!secret || !input) return false;
  const given = Buffer.from(input.trim());
  const expected = Buffer.from(secret);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

async function save(posts: Post[]) {
  await mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.tmp`;
  await writeFile(temporary, JSON.stringify(posts, null, 2), "utf8");
  await rename(temporary, file);
}

function makeId(title: string, posts: Post[]) {
  const base = title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
  let id = `${base || "post"}-${randomBytes(3).toString("hex")}`;
  while (posts.some((post) => post.id === id)) id = `${base || "post"}-${randomBytes(3).toString("hex")}`;
  return id;
}

function isPost(value: unknown): value is Post {
  if (!value || typeof value !== "object") return false;
  const post = value as Partial<Post>;
  return (
    typeof post.id === "string" &&
    typeof post.title === "string" &&
    typeof post.body === "string" &&
    (post.likes === undefined || (typeof post.likes === "number" && Number.isSafeInteger(post.likes) && post.likes >= 0)) &&
    typeof post.createdAt === "string" &&
    typeof post.updatedAt === "string"
  );
}
