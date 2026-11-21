import Link from "next/link";
import { links, work } from "@/lib/profile";

export function Portfolio() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="section-head">
          <p className="section-index">04</p>
          <h2>Work</h2>
        </div>
        <ul className="channels">
          <li>
            <a href={links.github} target="_blank" rel="noreferrer">
              <span>
                <strong>GitHub</strong>
                <em> Technical study and prototypes</em>
              </span>
              <span>Open ↗</span>
            </a>
          </li>
          <li>
            <a href={links.medium} target="_blank" rel="noreferrer">
              <span>
                <strong>Medium</strong>
                <em> Writing</em>
              </span>
              <span>Open ↗</span>
            </a>
          </li>
          <li>
            <a href={links.linkedin} target="_blank" rel="noreferrer">
              <span>
                <strong>LinkedIn</strong>
                <em> Full profile</em>
              </span>
              <span>Open ↗</span>
            </a>
          </li>
        </ul>
        <div className="work-grid">
          {work.map((item) => (
            <Link className="work-card" href={`/work/${item.slug}`} key={item.slug}>
              <div>
                <small>{item.index}</small>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </div>
              <footer>
                <span>Case study</span>
                <span>In preparation</span>
              </footer>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
