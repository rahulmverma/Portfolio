import { useState, useEffect } from "react";

/**
 * Renders the marquee section with rotating expertise terms
 * Reads from portfolio-config.json for marquee items
 */
export function Marquee({ config }: { config: any }) {
  const [items, setItems] = useState<string[]>(config.marquee?.items || []);

  useEffect(() => {
    // Initialize marquee items from config
    setItems(config.marquee?.items || ["RAG PIPELINES", "LLM INTEGRATION", "FULL STACK SYSTEMS", "RELIABLE AI"]);
  }, [config]);

  return (
    <section className="marquee-section" aria-label="Areas of expertise">
      <div className="marquee-track">
        <div className="marquee-content" key="0">
          {items.map((item, index) => (
            <span key={index}>
              {item}
              {index < items.length - 1 && " | "}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}