import { certifications, education, languages } from "@/lib/profile";

export function Credentials() {
  return (
    <section className="section section-bone" id="credentials">
      <div className="wrap">
        <div className="section-head">
          <p className="section-index">05</p>
          <h2>Credentials</h2>
        </div>
        <div className="cred-grid">
          <div className="cred-block">
            <h3>Education</h3>
            <ul className="cred-list">
              {education.map((item) => (
                <li key={item.school + item.when}>
                  <div>
                    <strong>{item.school}</strong>
                    <span>{item.detail}</span>
                  </div>
                  <time>{item.when}</time>
                </li>
              ))}
            </ul>
          </div>
          <div className="cred-block">
            <h3>Certifications</h3>
            <ul className="cred-list">
              {certifications.map((item) => (
                <li key={item}>
                  <strong>{item}</strong>
                </li>
              ))}
            </ul>
            <div className="lang-row" aria-label="Languages">
              {languages.map((language) => (
                <div key={language.name}>
                  <b>{language.name}</b>
                  <span>{language.level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
