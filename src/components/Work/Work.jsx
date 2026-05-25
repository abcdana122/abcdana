import { useState } from "react";
import { projects } from "../../data/portfolioData";
import "./Work.css";

const PROJECT_PREVIEW_COUNT = 3;

function ProjectCard({ project, index }) {
  const cardContent = (
    <>
      {project.image && (
        <div className="project-thumb">
          <img
            src={project.image}
            alt={project.title}
            style={{
              objectPosition: project.imagePosition || "center center",
            }}
          />
        </div>
      )}

      <div className="project-content">
        <div className="project-top">
          <span>{project.id}</span>
          {project.link && <span>↗</span>}
        </div>

        <p className="project-category">{project.category}</p>
        <h3>{project.title}</h3>
        <p className="project-desc">{project.desc}</p>

        <div className="tag-wrap">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </>
  );

  if (project.link) {
    return (
      <a
        className="project-card project-card-link"
        href={project.link}
        target="_blank"
        rel="noreferrer"
        style={{ "--project-delay": `${index * 70}ms` }}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <article
      className="project-card"
      style={{ "--project-delay": `${index * 70}ms` }}
    >
      {cardContent}
    </article>
  );
}

export function Work() {
  const [showAllProjects, setShowAllProjects] = useState(false);

  const visibleProjects = showAllProjects
    ? projects
    : projects.slice(0, PROJECT_PREVIEW_COUNT);

  const hiddenProjectCount = Math.max(
    projects.length - PROJECT_PREVIEW_COUNT,
    0
  );

  return (
    <section id="project" className="work-panel-section snap-section">
      <div className="work-panel-title" data-reveal>
        <p className="eyebrow">PROJECTS</p>

        <h2>
          <span>Code</span>
          <span>into Impact.</span>
        </h2>
      </div>

      <div className="project-grid">
        {visibleProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {hiddenProjectCount > 0 && (
        <button
          type="button"
          className="project-more-button"
          onClick={() => setShowAllProjects((prev) => !prev)}
        >
          {showAllProjects ? "Less" : `More +${hiddenProjectCount}`}
        </button>
      )}
    </section>
  );
}