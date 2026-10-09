"use client";

import { useEffect, useState } from "react";

// Import config as value (not type) so we can use it at runtime
import PortfolioConfig from "../portfolio-config.json";

import { PersonalInfo } from "../components/PersonalInfo";
import { Marquee } from "../components/Marquee";
import { About } from "../components/About";
import { Skills } from "../components/Skills";
import { Experience } from "../components/Experience";
import { Projects } from "../components/Projects";
import { Education } from "../components/Education";
import { SocialLinks } from "../components/SocialLinks";

import { MapPin, Download, Github, Linkedin, X, Menu, Send, Check } from "lucide-react";

/**
 * Main Home component that renders the portfolio
 * All data is read from portfolio-config.json for centralized management
 */
export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-28% 0px -62% 0px", threshold: [0.1, 0.35, 0.65] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navigate = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const submitContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.get("name")}`);
    const body = encodeURIComponent(`${form.get("message")}\n\nReply to: ${form.get("email")}`);
    const email = PortfolioConfig?.contact?.preferredEmail || "officialvermarahul@gmail.com";
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSent(true);
    window.setTimeout(() => setSent(false), 4500);
  };

  const downloadResume = () => {
    const pdfUrl = "/Rahul_Verma_Resume.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Rahul_Verma_Resume.pdf";
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main>
      <div className="noise" aria-hidden="true" />
      <div className="cursor-glow" aria-hidden="true" />
      <header className="site-header">
        <button className="brand" onClick={() => navigate("home")} aria-label="Go to homepage">
          <span className="brand-mark"><span /></span>
          <span>RV<span className="brand-dot">.</span></span>
        </button>
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          {["home", "about", "career", "projects", "education", "contact"].map((item) => (
            <button
              key={item}
              className={activeSection === item ? "active" : ""}
              onClick={() => navigate(item)}
            >
              {item}
            </button>
          ))}
          <button className="nav-resume" onClick={downloadResume}>
            Resume <Download size={13} strokeWidth={1.8} />
          </button>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <aside className="side-rail">
        <span>SCROLL TO EXPLORE</span>
        <i />
      </aside>

      {/* Personal Info / Hero Section */}
      <PersonalInfo config={PortfolioConfig as any} />

      {/* Marquee Section */}
      <Marquee config={PortfolioConfig as any} />

      {/* About Section */}
      <About config={PortfolioConfig as any} />

      {/* Skills Section */}
      <Skills config={PortfolioConfig as any} />

      {/* Career / Experience Section */}
      <Experience config={PortfolioConfig as any} />

      {/* Projects Section */}
      <Projects config={PortfolioConfig as any} />

      {/* Education Section */}
      <Education config={PortfolioConfig as any} />

      {/* Contact Section */}
      <section className="contact section-wrap" id="contact">
        <div className="contact-heading">
          <div className="section-index">04 <span>/</span> 04</div>
          <div>
            <p className="section-label">Have a good problem?</p>
            <h2>Let&apos;s make<br /><em>something matter.</em></h2>
          </div>
        </div>
        <div className="contact-content">
          <div className="contact-note">
            <p>
              Whether you&apos;re exploring an AI product, a technical challenge, or just want to exchange ideas &mdash; my inbox is open.
            </p>
            <a href={`mailto:${PortfolioConfig?.contact?.preferredEmail || "officialvermarahul@gmail.com"}`}>
              {PortfolioConfig?.contact?.preferredEmail || "officialvermarahul@gmail.com"}
              <svg aria-hidden="true" width={15} height={15} viewBox="0 0 24 24">
                <path d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6-6-6 1.41-1.41z" />
              </svg>
            </a>
          </div>
          <div className="social-links">
            <SocialLinks config={PortfolioConfig as any} />
          </div>
          <form className="contact-form" onSubmit={submitContact}>
            <label>Your name<input required name="name" type="text" placeholder="How should I call you?" /></label>
            <label>Your email<input required name="email" type="email" placeholder="you@company.com" /></label>
            <label>Tell me a little about it<textarea required name="message" rows={3} placeholder="The interesting part is..." /></label>
            <button className="button button-primary" type="submit">
              {sent ? (
                <>
                  <Check size={16} /> Message queued
                </>
              ) : (
                <>
                  <Send size={15} /> Send a message
                </>
              )}
            </button>
            {sent && <p className="form-success">Your email client should open with the message ready to send.</p>}
          </form>
        </div>
      </section>

      <footer className="site-footer">
        <span>© 2026 {(PortfolioConfig as any)?.personal?.fullName || "Rahul Verma"}</span>
        <span>Designed & built with curiosity <svg aria-hidden="true" width={13} height={13} viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.21L7 14.14 2 9.27l6.91-1.02L12 2z" />
        </svg> </span>
        <button onClick={() => navigate("home")}>Back to top <svg aria-hidden="true" width={13} height={13} viewBox="0 0 24 21">
          <path d="M8 5v14l11-7z" />
        </svg></button>
      </footer>
    </main>
  );
}