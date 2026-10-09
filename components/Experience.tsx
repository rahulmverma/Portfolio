import { MapPin, Check } from "lucide-react";
import type { ExperienceEntry } from "../portfolio-types";

/**
 * Renders work experience dynamically from portfolio-config.json
 * Each experience entry: year, role, company, location, description, highlights
 */
interface ExperienceProps {
  config: any;
}

export function Experience({ config }: ExperienceProps) {
  const experience = config?.experience || [];

  return (
    <section className="career section-wrap" id="career">
      <div className="career-timeline">
        {experience.map((job: ExperienceEntry, index: number) => {
          const year: string = job.year || "2025 — Present";
          const role: string = job.role || "Full Stack Developer";
          const company: string = job.company || "Company";
          const location: string = job.location || "Mumbai, India";
          const description: string = job.description || "";
          const highlights: string[] = job.highlights || [];

          return (
            <article
              key={company || index}
              className="career-entry"
            >
              <div className="career-date">
                <span>{year}</span>
                <Check size={12} />
              </div>
              <div className="career-detail">
                <div className="career-heading">
                  <div>
                    <h3>{role}</h3>
                    <p>{company}</p>
                  </div>
                  <span className="career-tag">{year.split(" ")[0] || "Present"}</span>
                </div>
                <p className="career-location">
                  <MapPin size={13} /> {location}
                </p>
                <p className="career-description">
                  {description}
                </p>
                {highlights.length > 0 && (
                  <ul>
                    {highlights.map((point, i) => (
                      <li key={i}>
                        <Check size={14} />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}