import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import { HashScroll } from "@/components/HashScroll";
import { Header } from "@/components/Header";
import { TwinChat } from "@/components/TwinChat";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ricardo Lousada — Director of AI",
    template: "%s — Ricardo Lousada",
  },
  description:
    "Ricardo Lousada is a Lisbon-based director of AI consulting. Alliances, practices, and delivery programs across DXC, Fujitsu, NTT DATA, and the companies he has built.",
  authors: [{ name: "Ricardo Lousada" }],
  openGraph: {
    title: "Ricardo Lousada — Director of AI",
    description:
      "AI consulting, strategic alliances, and delivery leadership from Lisbon.",
    type: "website",
    locale: "en_PT",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${syne.variable}`}>
      <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="3209a066-ecd3-49c5-8fcd-3ac1f0afd629"
        />
      </head>
      <body suppressHydrationWarning>
        <HashScroll />
        <Header />
        {children}
        <TwinChat />
      </body>
    </html>
  );
}
