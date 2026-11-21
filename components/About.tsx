import { offers, skills } from "@/lib/profile";

export function About() {
  return (
    <section className="section section-bone" id="about">
      <div className="wrap">
        <div className="section-head">
          <p className="section-index">01</p>
          <h2>About</h2>
        </div>
        <div className="about-grid">
          <p className="statement">
            The useful distance is the one between a technology decision and a business that can operate it on Monday.
          </p>
          <div className="prose">
            <p>
              I am a senior executive who has worked inside top-tier consulting and global systems-integration firms, and as an independent operator when the work needed an owner. National accounts and multinational ones. The through-line is the same: stand up the offer, win the trust, and leave an organization that can deliver without me in the room.
            </p>
            <p>
              That has meant AI and automation practices, alliances with Microsoft, ServiceNow, and UiPath, managed-service transitions, and the unglamorous craft of P&amp;L, bids, and people. The technical root is still there — development, data, cloud, and generative AI — because a strategy that cannot be implemented is only a meeting.
            </p>
            <ul className="offer-list">
              {offers.map((offer) => (
                <li className="offer" key={offer.index}>
                  <span className="offer-index">{offer.index}</span>
                  <div>
                    <b>{offer.title}</b>
                    <span>{offer.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="skill-row" aria-label="Core skills">
          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
