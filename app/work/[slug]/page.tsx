import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWork, work } from "@/lib/profile";

type Params = { slug: string };

export function generateStaticParams() {
  return work.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) return { title: "Work" };
  return {
    title: item.title,
    description: item.summary,
  };
}

export default async function WorkPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) notFound();

  return (
    <main className="work-page">
      <div className="wrap">
        <Link className="back-link" href="/#work">
          ← All work
        </Link>
        <p className="kicker">
          {item.index} · Case study in preparation
        </p>
        <h1>{item.title}</h1>
        <p className="brief">{item.brief}</p>
        <ul className="points">
          {item.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <p className="soon">Full narrative forthcoming</p>
      </div>
    </main>
  );
}
