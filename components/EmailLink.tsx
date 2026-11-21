"use client";

import { useState } from "react";
import { links, profile } from "@/lib/profile";

export function EmailLink({
  className,
  children,
  copiedLabel,
  href = links.email,
}: {
  className?: string;
  children: React.ReactNode;
  copiedLabel?: string;
  href?: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <a
      className={className}
      href={href}
      onClick={() => {
        const done = () => {
          window.dispatchEvent(new Event("email-copied"));
          if (!copiedLabel) return;
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2200);
        };
        const fallback = () => {
          const area = document.createElement("textarea");
          area.value = profile.email;
          area.setAttribute("readonly", "");
          area.style.position = "fixed";
          area.style.left = "-9999px";
          document.body.appendChild(area);
          area.select();
          const ok = document.execCommand("copy");
          area.remove();
          if (ok) done();
        };
        if (navigator.clipboard?.writeText) {
          navigator.clipboard.writeText(profile.email).then(done).catch(fallback);
          return;
        }
        fallback();
      }}
    >
      {copied && copiedLabel ? copiedLabel : children}
    </a>
  );
}
