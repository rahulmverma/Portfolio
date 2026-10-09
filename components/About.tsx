/**
 * Renders the about section
 * Reads from portfolio-config.json for configurable content
 */
interface AboutProps {
  config: any;
}

export function About({ config }: AboutProps) {
  const { personal } = config;

  return (
    <section className="about section-wrap" id="about">
      <div className="section-intro reveal-up">
        <div className="section-index">01 <span>/</span> 04</div>
        <p className="section-label">The person behind the systems</p>
        <h2>Curiosity in.<br /><em>Clarity out.</em></h2>
      </div>
      <div className="about-content reveal-up delay-one">
        <p className="large-copy">I work where thoughtful engineering meets emerging intelligence.</p>
        <p className="body-copy">
          As an AI Engineer and Full Stack Developer, I build from first principles: understand the signal, design the system, then make the experience feel inevitable. My work spans document intelligence, semantic search, real-time computer vision, and the interfaces that bring it all to life.
        </p>
        <p className="body-copy">
          I care about the part after the demo — the edge cases, the fallbacks, the observability, and the quiet details that make a product trustworthy.
        </p>
        <div className="about-facts">
          <div><span>Based in</span><strong>{personal?.location || "Mumbai, India"}</strong></div>
          <div><span>Experience</span><strong>Full Stack / AI</strong></div>
          <div><span>Currently</span><strong>Building at {personal?.company || "Quodeck"}</strong></div>
        </div>
      </div>
    </section>
  );
}