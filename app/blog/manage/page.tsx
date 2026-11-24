import type { Metadata } from "next";
import { BlogManager } from "@/components/BlogManager";
import { listPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Manage blog" };

export default async function ManageBlogPage() {
  return <BlogManager initialPosts={await listPosts()} />;
}
