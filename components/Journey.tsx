import { chapters } from "@/lib/profile";

export function Journey() {
  return (
    <section className="section" id="journey">
      <div className="wrap">
        <div className="section-head">
          <p className="section-index">02</p>
          <h2>Career journey</h2>
        </div>
        {chapters.map((chapter) => (
          <article className="chapter" key={chapter.id} aria-labelledby={chapter.id}>
            <div className="chapter-aside">
              <p className="chapter-index">{chapter.index}</p>
              <h3 id={chapter.id}>{chapter.era}</h3>
              <p>{chapter.summary}</p>
              <span className="range">{chapter.range}</span>
            </div>
            <div>
              {chapter.roles.map((role) => (
                <article className="role" key={`${role.org}-${role.when}-${role.title}`}>
                  <div className="role-top">
                    <h4>{role.title}</h4>
                    <p className="when">{role.when}</p>
                  </div>
                  <p className="org">
                    {role.org}
                    {role.place ? ` · ${role.place}` : ""}
                  </p>
                  <p className="summary">{role.summary}</p>
                  {role.highlights ? (
                    <ul className="chips">
                      {role.highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
