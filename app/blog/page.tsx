import type { Metadata } from "next";
import Link from "next/link";
import { listPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes from Ricardo Lousada on AI, alliances, and delivery.",
};

export default async function BlogPage() {
  const posts = await listPosts();
  return (
    <main className="work-page blog-page">
      <div className="wrap">
        <p className="kicker">Notes</p>
        <h1>Blog</h1>
        <p className="brief">Writing about technology, business, and the work of putting ideas into practice.</p>
        <ul className="blog-list">
          {posts.length ? posts.map((post) => (
            <li key={post.id}>
              <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
              <Link href={`/blog/${post.id}`}><strong>{post.title}</strong></Link>
              <span aria-hidden="true">Read →</span>
            </li>
          )) : <li className="blog-empty">No posts yet.</li>}
        </ul>
        <Link className="blog-manage-link" href="/blog/manage">Manage posts</Link>
      </div>
    </main>
  );
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Europe/Lisbon" }).format(new Date(iso));
}
