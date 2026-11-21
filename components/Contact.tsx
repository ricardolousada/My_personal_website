import { links, profile } from "@/lib/profile";

export function Contact() {
  return (
    <section className="section-lime" id="contact">
      <div className="wrap contact">
        <p className="contact-kicker">06 — Contact</p>
        <h2>Tell me what needs an owner.</h2>
        <a className="contact-email" href={links.email}>
          {profile.email}
        </a>
        <div className="contact-links">
          <a href={links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={links.medium} target="_blank" rel="noreferrer">
            Medium
          </a>
          <a href={links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={links.pdf}>Profile PDF</a>
        </div>
        <footer className="footer">
          <span>© {new Date().getFullYear()} Ricardo Lousada. Lisbon.</span>
          <span>Case studies will land here as they are written.</span>
        </footer>
      </div>
    </section>
  );
}
