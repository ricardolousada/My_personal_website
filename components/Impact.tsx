import { stats } from "@/lib/profile";

export function Impact() {
  return (
    <section className="section" id="impact" aria-labelledby="impact-title">
      <div className="wrap">
        <div className="section-head">
          <p className="section-index">03</p>
          <h2 id="impact-title">Selected impact</h2>
        </div>
        <div className="stats">
          {stats.map((stat) => (
            <article className="stat" key={stat.value}>
              <p className="stat-num">{stat.value}</p>
              <b>{stat.label}</b>
              <p>{stat.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
