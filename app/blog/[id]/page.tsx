import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { LikeButton } from "@/components/LikeButton";
import { getPost } from "@/lib/posts";

export const dynamic = "force-dynamic";

type Params = { id: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);
  return post ? { title: post.title, description: post.body.replace(/<[^>]*>/g, " ").slice(0, 160) } : { title: "Blog" };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) notFound();
  const jar = await cookies();
  const rawLikes = jar.get("blog-likes")?.value ?? "";
  let likedIds = rawLikes;
  try {
    likedIds = decodeURIComponent(rawLikes);
  } catch {
    // Ignore malformed cookie data and render the post as not yet liked.
  }
  const liked = likedIds.split(",").includes(id);
  return (
    <main className="work-page blog-page">
      <article className="wrap blog-article">
        <Link className="back-link" href="/blog">← All posts</Link>
        <time className="blog-date" dateTime={post.createdAt}>Published {formatDate(post.createdAt)}</time>
        <h1 className="blog-title">{post.title}</h1>
        <div className="blog-body" dangerouslySetInnerHTML={{ __html: post.body }} />
        <LikeButton id={post.id} likes={post.likes} liked={liked} />
      </article>
    </main>
  );
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Europe/Lisbon" }).format(new Date(iso));
}
