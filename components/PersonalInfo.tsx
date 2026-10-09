import { MapPin } from "lucide-react";
import type { PortfolioConfig } from "../portfolio-types";

/**
 * Renders personal information header section
 * Reads from portfolio-config.json for all personal details
 */
interface PersonalInfoProps {
  config: PortfolioConfig;
}

export function PersonalInfo({ config }: PersonalInfoProps) {
  const { fullName, title, summary, email, phone, location, profilePicture, tagline } = config.personal;

  const navigate = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero section-wrap" id="home">
      <div className="hero-copy reveal-up">
        <div className="eyebrow"><span className="status-dot" /> Available for select opportunities</div>
        <p className="hero-kicker">{title}</p>
        <h1>
          {tagline}
          <span>behind the interface.</span>
        </h1>
        <p className="hero-intro">
          {summary}
        </p>
        <div className="hero-actions">
          <button className="button button-primary" onClick={() => navigate("projects")}>
            Explore my work
            <svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span>ArrowDownRight</span>
          </button>
          <button className="text-button" onClick={() => window.location.href = `mailto:${email}?subject=Portfolio enquiry`}>
            Let&apos;s connect
            <svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M22 4.01c-1.5 0-3.02.82-4.21 2.09a5.49 5.49 0 0 0-1.63.87l-.32.18a4.96 4.96 0 0 0-.1 1.25l.33.32c-.2.02-.41.03-.63.03-.21 0-.42-.02-.62-.03A4.96 4.96 0 0 0 4.21 2.09a5.5 5.5 0 0 0-.88 1.31l-.31.16c-.44.29-1.03.57-1.75.68a4.53 4.53 0 0 1-1.05.1l-.34-.02c-.28-.06-.56-.12-.83-.2L.73 7.35a4.51 4.51 0 0 1 .1-1.05l-.01-.34c0-.28.02-.56.03-.83a4.95 4.95 0 0 0-1.25-.1l-.32-.32a4.95 4.95 0 0 0-1.25-1.25l-.17-.33c-.03-.21-.05-.43-.05-.65 0-.58.19-1.13.53-1.63a4.85 4.85 0 0 1 1.02-.37l.32-.16a4.97 4.97 0 0 0 .87-1.63l-.16-.32c-.03-.21-.05-.43-.05-.65 0-.58.19-1.13.53-1.63a4.86 4.86 0 0 1 1.02-.37l.33.16c.28.06.56.12.83.2l.33.02c.21.02.41.03.62.03.21 0 .42-.02.63-.03a4.95 4.95 0 0 0 .1-1.25l-.33-.32c-.21-.28-.43-.53-.65-.75a4.96 4.96 0 0 1-1.25-.1l-.32.16a4.96 4.96 0 0 0-.87 1.63l.15.32c.03.21.05.43.05.65 0 .58-.19 1.13-.53 1.63a4.86 4.86 0 0 1-1.02.37l-.32.16c-.28.06-.56.12-.83.2l-.34-.02c-.21-.02-.41-.03-.62-.03a4.95 4.95 0 0 0-.1 1.25l.32.32c.21.28.43.53.65.75a4.96 4.96 0 0 1 1.25.1l.32-.16a4.96 4.96 0 0 0 .87-1.63l-.16-.32c-.03-.21-.05-.43-.05-.65z" />
            </svg>
            <span>ArrowUpRight</span>
          </button>
        </div>
        <div className="hero-meta">
          <span><MapPin size={14} /> {location}</span>
          <span className="meta-line" />
          <span>01 / 04 <i>—</i> core disciplines</span>
        </div>
      </div>
      <div className="hero-visual" aria-label="Abstract interactive AI network illustration">
        <div className="orbital-label orbital-label-one"><span /> 01 / cognition</div>
        <div className="orbital-label orbital-label-two">RAG <span>pipeline</span></div>
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <div className="hero-orbit orbit-three" />
        <div className="hero-core">
          <svg
            className="BrainCircuit"
            width={33}
            height={33}
            viewBox="0 0 24 24"
            aria-hidden="true"
            strokeWidth={1.1}
          >
            <path d="M12 2L4.93 21a1 1 0 0 0 .67.48l1.86-9H5l1.94 8.07a1 1 0 0 0 .67-1.23L2 5.27l6.93-6.93L12 2z" />
          </svg>
          <span>AI<br />CORE</span>
        </div>
        <div className="orbit-node node-a" />
        <div className="orbit-node node-b" />
        <div className="orbit-node node-c" />
        <div className="orbit-node node-d" />
        <svg
          className="network-lines"
          viewBox="0 0 500 500"
          aria-hidden="true"
        >
          <path d="M83 125 L250 250 L414 128 M83 125 L114 377 L250 250 M414 128 L384 388 L250 250 M114 377 L384 388" />
        </svg>
        <div className="visual-caption">
          A system is only<br /><strong>as good as its connections.</strong>
        </div>
      </div>
      <div className="hero-scroll">
        <svg width={16} height={16} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>
        <span>Discover</span>
      </div>
    </div>
  );
}