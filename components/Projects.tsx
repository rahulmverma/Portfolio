import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { Project } from "../portfolio-types";

/**
 * Renders project cards dynamically from portfolio-config.json
 */
interface ProjectsProps {
  config: any;
}

export function Projects({ config }: ProjectsProps) {
  const projects = config?.projects || [];

  return (
    <section className="projects section-wrap" id="projects">
      <div className="projects-top">
        <div>
          <p className="section-label">Selected work</p>
          <h2>Built for the <em>real world.</em></h2>
        </div>
        <p className="projects-aside">
          A small selection of systems, experiments, and products that made it past the whiteboard.
        </p>
      </div>
      <div className="project-grid">
        {projects.map((project: any) => {
          const {
            number,
            title,
            type,
            description,
            stack,
            accent,
            liveDemo,
            github,
            screenshots,
          } = project;

          return (
            <article
              key={title}
              className={`project-card ${accent}`}
            >
              <div className="project-card-top">
                <span>{number}</span>
                <a
                  href={liveDemo}
                  target={liveDemo.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
              <div className="project-art" aria-hidden="true">
                {/* Art is rendered via CSS based on accent color */}
                {screenshots && screenshots.length > 0 && (
                  <Image
                    src={screenshots[0]}
                    alt={`${title} screenshot`}
                    loading="lazy"
                    className="project-screenshot"
                  />
                )}
              </div>
              <p className="project-type">{type}</p>
              <h3>{title}</h3>
              <p className="project-description">{description}</p>
              <div className="project-stack">
                {stack.map((item: string) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div style={{ marginTop: "12px" }}>
                <a
                  href={github}
                  target={github.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  style={{ fontSize: "0.75em", color: "var(--muted)" }}
                >
                  GitHub <ExternalLink size={12} />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}