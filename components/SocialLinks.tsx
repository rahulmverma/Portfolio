import { Github, Linkedin } from "lucide-react";

/**
 * Renders social links dynamically from portfolio-config.json
 * Links can include: github, linkedin, website, portfolio, and other social media
 */
export function SocialLinks({ config }: { config: any }) {
  const { github, linkedin, website, portfolio } = config.socialLinks || {};

  return (
    <div className="social-links">
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub Profile"
        >
          <Github size={17} /> GitHub
        </a>
      )}
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn Profile"
        >
          <Linkedin size={17} /> LinkedIn
        </a>
      )}
      {website && (
        <a
          href={website}
          target="_blank"
          rel="noreferrer"
          aria-label="Personal Website"
        >
          Personal Website
        </a>
      )}
      {portfolio && (
        <a
          href={portfolio}
          target="_blank"
          rel="noreferrer"
          aria-label="Portfolio"
        >
          Portfolio
        </a>
      )}
    </div>
  );
}