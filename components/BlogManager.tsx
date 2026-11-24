"use client";

import Link from "next/link";
import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import type { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { Post } from "@/lib/posts";

export function BlogManager({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [pending, setPending] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p></p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "blog-editor-content",
        "aria-label": "Blog post content",
      },
    },
  });

  function startNew() {
    setActiveId(null);
    setTitle("");
    setError("");
    setNotice("");
    editor?.commands.setContent("<p></p>");
  }

  function editPost(post: Post) {
    setActiveId(post.id);
    setTitle(post.title);
    setError("");
    setNotice("");
    editor?.commands.setContent(post.body);
  }

  async function savePost(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editor || pending) return;
    setPending(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch(activeId ? `/api/posts/${activeId}` : "/api/posts", {
        method: activeId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({ title, body: editor.getHTML() }),
      });
      const data = (await response.json()) as { post?: Post; error?: string };
      if (!response.ok || !data.post) {
        setError(data.error || "The post could not be saved.");
        return;
      }
      setPosts((current) => [data.post!, ...current.filter((post) => post.id !== data.post!.id)]);
      setActiveId(data.post.id);
      setNotice("Post saved.");
    } catch {
      setError("The post could not be saved. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  async function removePost(post: Post) {
    if (pending || !window.confirm(`Delete “${post.title}”? This cannot be undone.`)) return;
    setPending(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${key}` },
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error || "The post could not be deleted.");
        return;
      }
      setPosts((current) => current.filter((item) => item.id !== post.id));
      if (activeId === post.id) startNew();
      setNotice("Post deleted.");
    } catch {
      setError("The post could not be deleted. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="work-page blog-page blog-manage-page">
      <div className="wrap">
        <Link className="back-link" href="/blog">← View blog</Link>
        <p className="kicker">Publishing</p>
        <h1>Manage posts</h1>
        <p className="brief">Write and format a post, or choose an existing one to edit.</p>

        <label className="blog-key-field">
          <span>Write key</span>
          <input
            type="password"
            value={key}
            onChange={(event) => setKey(event.target.value)}
            autoComplete="current-password"
            placeholder="Enter the BLOG_WRITE_KEY from .env"
          />
        </label>

        <div className="blog-manager-grid">
          <aside className="blog-manager-list" aria-label="Existing posts">
            <div className="blog-manager-list-head">
              <h2>Posts <span>{posts.length}</span></h2>
              <button type="button" className="btn btn-ghost" onClick={startNew}>New post</button>
            </div>
            {posts.length ? (
              <ul>
                {posts.map((post) => (
                  <li key={post.id} className={post.id === activeId ? "is-selected" : ""}>
                    <button type="button" className="blog-select-post" onClick={() => editPost(post)}>
                      <strong>{post.title}</strong>
                      <time dateTime={post.updatedAt}>Updated {formatDate(post.updatedAt)}</time>
                    </button>
                    <button
                      type="button"
                      className="blog-delete"
                      onClick={() => void removePost(post)}
                      disabled={pending || !key}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : <p className="blog-empty">No posts yet. Start with a new one.</p>}
          </aside>

          <form className="blog-editor-form" onSubmit={savePost}>
            <label>
              <span>Title</span>
              <input value={title} onChange={(event) => setTitle(event.target.value)} minLength={3} maxLength={140} required />
            </label>
            <div className="blog-editor-label">Post</div>
            <EditorToolbar editor={editor} />
            <EditorContent editor={editor} />
            {error ? <p className="blog-error" role="alert">{error}</p> : null}
            {notice ? <p className="blog-notice" role="status">{notice}</p> : null}
            <div className="blog-editor-actions">
              <button className="btn" type="submit" disabled={pending || !key || !title.trim()}>
                {pending ? "Saving…" : activeId ? "Save changes" : "Publish post"}
              </button>
              {activeId ? <Link href={`/blog/${activeId}`} target="_blank">Preview post ↗</Link> : null}
            </div>
            {!key ? <p className="blog-hint">Enter the write key to publish, edit, or delete posts.</p> : null}
          </form>
        </div>
      </div>
    </main>
  );
}

function EditorToolbar({ editor }: { editor: Editor | null }) {
  const tools = [
    { label: "Bold", title: "Bold", active: "bold", run: () => editor?.chain().focus().toggleBold().run(), content: <strong>B</strong> },
    { label: "Italic", title: "Italic", active: "italic", run: () => editor?.chain().focus().toggleItalic().run(), content: <em>I</em> },
    { label: "Heading", title: "Heading 2", active: "heading", run: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(), content: "H2" },
    { label: "Bulleted list", title: "Bulleted list", active: "bulletList", run: () => editor?.chain().focus().toggleBulletList().run(), content: "• List" },
    { label: "Numbered list", title: "Numbered list", active: "orderedList", run: () => editor?.chain().focus().toggleOrderedList().run(), content: "1. List" },
    { label: "Quote", title: "Block quote", active: "blockquote", run: () => editor?.chain().focus().toggleBlockquote().run(), content: "Quote" },
  ];
  return (
    <div className="blog-toolbar" role="toolbar" aria-label="Text formatting">
      {tools.map((tool) => (
        <button
          key={tool.active}
          type="button"
          title={tool.title}
          aria-label={tool.label}
          aria-pressed={!!editor?.isActive(tool.active)}
          className={editor?.isActive(tool.active) ? "is-active" : ""}
          onMouseDown={(event) => event.preventDefault()}
          onClick={tool.run}
          disabled={!editor}
        >
          {tool.content}
        </button>
      ))}
    </div>
  );
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Europe/Lisbon" }).format(new Date(iso));
}
