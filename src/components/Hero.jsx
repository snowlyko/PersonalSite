import React from "react";
import { portfolioData } from "../portfolioData";

export default function Hero({ onOpenModal }) {
  const { name, role, catchphrase, subtext, miniTags, stats, socials } = portfolioData;

  return (
    <div style={{ textAlign: "center", maxWidth: "800px" }}>
      {/* Role Subtitle in Monospace */}
      <div className="mono-title">{role}</div>

      {/* Name Title */}
      <h1>{name}</h1>

      {/* Tagline / Catchphrase */}
      <p className="tagline">{catchphrase}</p>

      {/* Subtext */}
      <p className="subtext">{subtext}</p>

      {/* Small Tech Dots */}
      <div className="tech-dots">
        {miniTags.map((tag, idx) => (
          <span key={idx}>{tag}</span>
        ))}
      </div>

      {/* Button Action Row */}
      <div className="buttons-group">
        <button
          className="btn btn-primary"
          onClick={() => onOpenModal("contact")}
          id="hero-contact-btn"
        >
          Get in Touch
        </button>
        <button
          className="btn btn-outline"
          onClick={() => onOpenModal("projects")}
          id="hero-projects-btn"
        >
          Projects Showcase
        </button>
        <button
          className="btn btn-outline"
          onClick={() => onOpenModal("skills")}
          id="hero-skills-btn"
        >
          Skills
        </button>
        <a
          href={socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
          id="hero-github-btn"
        >
          GitHub
        </a>
        <a
          href={socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
          id="hero-linkedin-btn"
        >
          LinkedIn
        </a>
      </div>

      {/* Bottom Metrics/Stats */}
      <div className="stats-container">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-item">
            <span className="stat-val">{stat.number}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
