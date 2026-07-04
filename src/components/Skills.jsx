import React from "react";
import { portfolioData } from "../portfolioData";

export default function Skills() {
  const { skills } = portfolioData;

  return (
    <div>
      <div className="modal-header">
        <h2 className="modal-title">Skills & Technologies</h2>
      </div>

      <div className="skills-section">
        {skills.map((skillGroup, idx) => (
          <div key={idx} className="skills-category">
            <h3 className="skills-category-title">
              <span style={{ color: "var(--accent-blue-hover)" }}>//</span>{" "}
              {skillGroup.category}
            </h3>
            
            <div className="skills-list">
              {skillGroup.items.map((skill, skillIdx) => (
                <div key={skillIdx} className="skill-tag">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
