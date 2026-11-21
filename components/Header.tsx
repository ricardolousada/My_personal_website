"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { links, nav } from "@/lib/profile";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="site-header">
      <a className="skip" href="#top">
        Skip to content
      </a>
      <Link href="/#top" className="logo" onClick={() => setOpen(false)}>
        <span>RL</span>
        Lousada
      </Link>
      <nav id="site-nav" className={open ? "nav-links is-open" : "nav-links"} aria-label="Primary">
        {nav.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
        <button
          type="button"
          className="nav-twin"
          onClick={() => {
            setOpen(false);
            window.dispatchEvent(new Event("open-twin"));
          }}
        >
          Twin
        </button>
      </nav>
      <a className="header-mail" href={links.email}>
        Email
      </a>
      <button
        className="nav-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <i />
      </button>
    </header>
  );
}
