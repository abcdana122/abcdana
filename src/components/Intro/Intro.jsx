import { profile } from "../../data/portfolioData";
import "./Intro.css";

export function Intro({ introRef }) {
  return (
    <section id="about" className="intro-section snap-section" ref={introRef}>
      <div className="intro-sticky">
        <div className="intro-label" data-reveal>
          <span className="eyebrow">ABOUT ME</span>
        </div>

        <div className="profile-grid">
          <div className="profile-main" data-reveal style={{ "--reveal-delay": "80ms" }}>
            <h2>
              <a className="name-logo">kda.</a>
              <span>{profile.title}</span>
            </h2>
          </div>

          <div className="profile-list" data-reveal style={{ "--reveal-delay": "160ms" }}>
            {profile.rows.map((row) => (
              <div key={row.label}>
                <span className="profile-title">{row.label}</span>

                <span className="profile-value">
                  <span>{row.value}</span>

                  <a href={row.link} target="_blank" rel="noopener noreferrer" className="profile-logo-link">
                    {row.logo && (<img src={row.logo} alt={`${row.label} logo`} className="profile-logo"/>)}
                  </a>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
