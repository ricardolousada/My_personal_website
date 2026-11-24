"use client";

import { useState } from "react";

export function LikeButton({ id, likes, liked }: { id: string; likes: number; liked: boolean }) {
  const [count, setCount] = useState(likes);
  const [done, setDone] = useState(liked);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function onClick() {
    if (done || pending) return;
    setPending(true);
    setError("");
    try {
      const response = await fetch(`/api/posts/${id}/like`, { method: "POST" });
      const raw = await response.text();
      let data: { likes?: number; liked?: boolean; error?: string } = {};
      try {
        data = JSON.parse(raw) as typeof data;
      } catch {
        // A failed server response may not contain JSON.
      }
      if (!response.ok || typeof data.likes !== "number") {
        setError(data.error || "Your like could not be saved. Please try again.");
        return;
      }
      setCount(data.likes);
      setDone(Boolean(data.liked));
    } catch {
      setError("Your like could not be saved. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="post-like-wrap">
      <button
        type="button"
        className="post-like"
        onClick={() => void onClick()}
        disabled={done || pending}
        aria-pressed={done}
        aria-describedby={error ? `like-error-${id}` : undefined}
        aria-label={done ? `Liked, ${count} likes` : `Like this post, ${count} likes`}
      >
        <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true">
          <path
            d="M12 20.2s-6.6-4.1-6.6-8.7C5.4 8.4 7.2 6.6 9.5 6.6c1.3 0 2.3.6 2.5 1.5.2-.9 1.2-1.5 2.5-1.5 2.3 0 4.1 1.8 4.1 4.9 0 4.6-6.6 8.7-6.6 8.7z"
            fill={done ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
        <span>{done ? "Liked" : pending ? "Saving…" : "Like"}</span>
        <span>{count}</span>
      </button>
      {error ? <p id={`like-error-${id}`} className="post-like-error" role="status">{error}</p> : null}
    </div>
  );
}
