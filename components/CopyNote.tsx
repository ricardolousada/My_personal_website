"use client";

import { useEffect, useState } from "react";

export function CopyNote() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = () => setVisible(true);
    window.addEventListener("email-copied", show);
    return () => window.removeEventListener("email-copied", show);
  }, []);

  if (!visible) return null;

  return <p className="copy-note">Address copied. Paste it into your mail app.</p>;
}
