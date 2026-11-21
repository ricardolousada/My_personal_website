"use client";

import { useEffect } from "react";

export function HashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.replace("#", "");
      if (!id) return;
      const target = document.getElementById(id);
      if (target) target.scrollIntoView();
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return null;
}
