import { OpenTwinButton } from "@/components/OpenTwinButton";
import { links, profile, ticker } from "@/lib/profile";

export function Hero() {
  const loop = [...ticker, ...ticker];

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap">
        <div className="hero-top">
          <p className="kicker">DXC Technology · Portugal</p>
          <p className="status">
            <i />
            {profile.availability}
          </p>
        </div>
        <h1 id="hero-title" className="display">
          Ricardo
          <em>Lousada</em>
        </h1>
        <div className="hero-bottom">
          <p className="lede">{profile.lede}</p>
          <div className="cta-row">
            <a className="btn" href={links.email}>
              Start a conversation
            </a>
            <a className="btn btn-ghost" href="#journey">
              Career journey
            </a>
            <OpenTwinButton className="btn btn-ghost">Ask the twin</OpenTwinButton>
          </div>
        </div>
        <dl className="meta">
          <div>
            <dt>Role</dt>
            <dd>Director of AI Consulting</dd>
          </div>
          <div>
            <dt>Base</dt>
            <dd>{profile.location}</dd>
          </div>
          <div>
            <dt>Languages</dt>
            <dd>PT · EN · ES</dd>
          </div>
          <div>
            <dt>Focus</dt>
            <dd>AI, alliances, delivery</dd>
          </div>
        </dl>
      </div>
      <div className="marquee" aria-label="Organizations and partners">
        <div className="marquee-track">
          <ul>
            {loop.map((name, index) => (
              <li key={`${name}-${index}`} aria-hidden={index >= ticker.length}>
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
