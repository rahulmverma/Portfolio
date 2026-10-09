import { Sparkles, ArrowUpRight } from "lucide-react";
import type { EducationEntry } from "../portfolio-types";

/**
 * Renders education history dynamically from portfolio-config.json
 * Each education entry: degree, institution, year, cgpa, institutionFull, achievement
 */
interface EducationProps {
  config: any;
}

export function Education({ config }: EducationProps) {
  const education = config?.education || [];

  return (
    <section className="education section-wrap" id="education">
      <div className="education-heading">
        <div className="section-index">03 <span>/</span> 04</div>
        <div>
          <p className="section-label">Foundations</p>
          <h2>Always in <em>progress.</em></h2>
        </div>
      </div>
      <div className="education-list">
        {education.map((edu: EducationEntry, index: number) => {
          const degree: string = edu.degree || "Master's Degree";
          const institution: string = edu.institution || "University";
          const year: string = edu.year || "2022 — 2024";
          const cgpa: string = edu.cgpa || "—";
          const institutionFull: string = edu.institutionFull || institution;

          return (
            <div
              key={index}
              className="education-row"
            >
              <span className="education-year">{year}</span>
              <div>
                <h3>{degree}</h3>
                <p>{institutionFull || institution}</p>
              </div>
              <strong>{cgpa}{" "}<small>CGPA</small></strong>
            </div>
          );
        })}
      </div>
      {education.length > 0 && (
        <div className="achievement">
          <span>
            <Sparkles size={17} />
            Achievement
          </span>
          <p>
            {education[0]?.achievement || "Grand Finalist — Smart India Hackathon 2023"}
          </p>
          <ArrowUpRight size={18} />
        </div>
      )}
    </section>
  );
}