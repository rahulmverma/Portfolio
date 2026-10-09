"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  Check,
  ChevronDown,
  CircleDot,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  MapPin,
  Menu,
  Move3d,
  Send,
  Sparkles,
  X,
} from "lucide-react";

const SkillsScene = dynamic(() => import("../components/SkillsScene"), {
  ssr: false,
  loading: () => <div className="scene-loading">Loading skills system...</div>,
});

const skills = [
  { name: "React", short: "R", className: "react", orbit: "frontend" },
  { name: "Next.js", short: "N", className: "next", orbit: "frontend" },
  { name: "TypeScript", short: "TS", className: "typescript", orbit: "frontend" },
  { name: "Python", short: "Py", className: "python", orbit: "ai" },
  { name: "FastAPI", short: "FA", className: "fastapi", orbit: "backend" },
  { name: "Node.js", short: "JS", className: "node", orbit: "backend" },
  { name: "Gemini", short: "✦", className: "gemini", orbit: "ai" },
  { name: "TensorFlow", short: "TF", className: "tensorflow", orbit: "ai" },
  { name: "PostgreSQL", short: "PG", className: "postgres", orbit: "data" },
  { name: "MongoDB", short: "M", className: "mongo", orbit: "data" },
  { name: "Docker", short: "D", className: "docker", orbit: "infra" },
  { name: "Three.js", short: "3D", className: "three", orbit: "frontend" },
];

const career = [
  {
    year: "2025 — now",
    role: "Full Stack Developer",
    company: "Quodeck Technologies Pvt. Ltd.",
    location: "Mumbai, India",
    description:
      "Designing and shipping AI-powered platforms across document intelligence, assessment integrity, and real-time product experiences.",
    points: [
      "Built an end-to-end RAG pipeline with IBM Docling, Gemini embeddings, vector search, and grounded LLM inference.",
      "Engineered AI resume filtering and TensorFlow proctoring systems for faster, safer online assessments.",
      "Ship production features across React, Node.js, FastAPI, PostgreSQL, MongoDB, Docker, and DigitalOcean.",
    ],
    tag: "Present",
  },
];

const projects = [
  {
    number: "01",
    title: "Relaydesk",
    type: "AI RAG SUPPORT REPLY ASSISTANT",
    description:
      "A production-ready support copilot that retrieves brand policy context, enforces guardrails, and produces reliable reply drafts.",
    stack: ["FastAPI", "pgvector", "React", "OpenRouter"],
    accent: "violet",
    link: "https://ragllmdatastraw.vercel.app",
  },
   {
    number: "02",
    title: "Medical Knowledge RAG + Clinical Assistant (MedRAG)",
    type: "Medical document retrieval and AI-powered answers",
    description:
      "Built an educational medical knowledge assistant using RAG, Docling, embeddings, and PostgreSQL with pgvector to retrieve relevant information from medical documents and generate context-aware answers using OpenRouter LLMs.",
    stack: ["React", "Next.js", "FastAPI", "PostgreSQL", "pgvector", "OpenRouter", "Redis","RQ","Docker"],
    accent: "cyan",
    link: "https://medrag-web-8p95.onrender.com/",
  },
  {
    number: "03",
    title: "Ride / realtime",
    type: "UBER-LIKE RIDE BOOKING PLATFORM",
    description:
      "A live ride booking experience with driver matching, OTP auth, Google Maps routing, and Socket.IO location broadcasting.",
    stack: ["React", "Node.js", "Socket.IO", "MongoDB"],
    accent: "cyan",
    link: "https://github.com/rahulmverma/ride-app",
  },
];

const resumeText = "RAHUL VERMA\nAI Engineer / Full Stack Developer\nMumbai, India | 9152415102 | officialvermarahul@gmail.com\n\nPROFESSIONAL SUMMARY\nAI Engineer and Full Stack Developer building AI-powered platforms end to end: document ingestion, chunking, embeddings, vector storage, semantic retrieval, and LLM inference. Experienced with RAG pipelines, Gemini, TensorFlow proctoring, AI resume filtering, backend APIs, and production full-stack delivery.\n\nEXPERIENCE\nFull Stack Developer — Quodeck Technologies Private Limited\nJanuary 2025 — Present\n- Built an AI document processing and RAG pipeline using IBM Docling, Gemini embeddings, vector search, and grounded LLM responses.\n- Developed AI resume filtering and TensorFlow-based proctoring systems.\n- Shipped real-time dashboards and backend services with React, Node.js, TypeScript, MongoDB, FastAPI, and PostgreSQL.\n- Containerized services with Docker and deployed via Nginx on DigitalOcean.\n\nPROJECTS\nRelaydesk — AI RAG Support Reply Assistant\nFastAPI backend with pgvector semantic and keyword retrieval, React frontend, OpenRouter generation, safety guardrails, and deterministic fallbacks.\n\nUber-like Ride Booking Web Application\nReal-time ride booking with Socket.IO, OTP authentication, Google Maps routing, driver-rider matching, and live location broadcasting.\n\nSKILLS\nAI/ML: TensorFlow, Google Gemini API, RAG Pipelines, IBM Docling, Vector Search, LLM Integration, Prompt Engineering\nLanguages: JavaScript, TypeScript, Python, Java, PHP\nFrontend: React.js, Next.js, HTML, CSS, Tailwind CSS\nBackend: Node.js, Express.js, FastAPI\nDatabases: MongoDB, MySQL, PostgreSQL\nTools: Git, Docker, Nginx, Jest, Claude Code, GitHub Copilot, Cursor\n\nEDUCATION\nMaster of Science (MS or MSc) in Computer Science — University of Mumbai — CGPA 8.70\nBachelor of Science in Computer Science — Mulund College of Commerce, University of Mumbai — CGPA 8.39\n\nACHIEVEMENT\nGrand Finalist — Smart India Hackathon 2023\n";

function downloadResume() {
  const pdfUrl = "/Rahul_Verma_Resume.pdf";
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.download = "Rahul_Verma_Resume.pdf";
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

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
    window.location.href = `mailto:officialvermarahul@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    window.setTimeout(() => setSent(false), 4500);
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

      <section className="hero section-wrap" id="home">
        <div className="hero-copy reveal-up">
          <div className="eyebrow"><span className="status-dot" /> Available for select opportunities</div>
          <p className="hero-kicker">AI ENGINEER <span>/</span> FULL STACK DEVELOPER</p>
          <h1>
            Building the
            <em>intelligence</em>
            <span>behind the interface.</span>
          </h1>
          <p className="hero-intro">
            I turn complex AI systems into useful, dependable products — from retrieval pipelines and LLM orchestration to full-stack experiences people actually enjoy using.
          </p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={() => navigate("projects")}>
              Explore my work <ArrowDownRight size={16} />
            </button>
            <button className="text-button" onClick={() => navigate("contact")}>
              Let&apos;s connect <ArrowUpRight size={16} />
            </button>
          </div>
          <div className="hero-meta">
            <span><MapPin size={14} /> Mumbai, India</span>
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
          <div className="hero-core"><BrainCircuit size={33} strokeWidth={1.1} /><span>AI<br />CORE</span></div>
          <div className="orbit-node node-a" />
          <div className="orbit-node node-b" />
          <div className="orbit-node node-c" />
          <div className="orbit-node node-d" />
          <svg className="network-lines" viewBox="0 0 500 500" aria-hidden="true">
            <path d="M83 125 L250 250 L414 128 M83 125 L114 377 L250 250 M414 128 L384 388 L250 250 M114 377 L384 388" />
          </svg>
          <div className="visual-caption">A system is only<br /><strong>as good as its connections.</strong></div>
        </div>
        <div className="hero-scroll"><ChevronDown size={16} /> <span>Discover</span></div>
      </section>

      <section className="marquee-section" aria-label="Areas of expertise">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, index) => (
            <div className="marquee-content" key={index}>
              <span>RAG PIPELINES</span><i>✦</i><span>LLM INTEGRATION</span><i>✦</i><span>FULL STACK SYSTEMS</span><i>✦</i><span>RELIABLE AI</span><i>✦</i>
            </div>
          ))}
        </div>
      </section>

      <section className="about section-wrap" id="about">
        <div className="section-intro reveal-up">
          <div className="section-index">01 <span>/</span> 04</div>
          <p className="section-label">The person behind the systems</p>
          <h2>Curiosity in.<br /><em>Clarity out.</em></h2>
        </div>
        <div className="about-content reveal-up delay-one">
          <p className="large-copy">I work where thoughtful engineering meets emerging intelligence.</p>
          <p className="body-copy">As an AI Engineer and Full Stack Developer, I build from first principles: understand the signal, design the system, then make the experience feel inevitable. My work spans document intelligence, semantic search, real-time computer vision, and the interfaces that bring it all to life.</p>
          <p className="body-copy">I care about the part after the demo — the edge cases, the fallbacks, the observability, and the quiet details that make a product trustworthy.</p>
          <div className="about-facts">
            <div><span>Based in</span><strong>Mumbai, India</strong></div>
            <div><span>Experience</span><strong>Full Stack / AI</strong></div>
            <div><span>Currently</span><strong>Building at Quodeck</strong></div>
          </div>
        </div>
      </section>

      <section className="skills section-wrap" id="skills">
        <div className="skills-heading">
          <div>
            <p className="section-label">The working toolkit</p>
            <h2>Systems I speak <em>fluently.</em></h2>
          </div>
          <p className="skills-instruction"><Move3d size={16} /> Drag to orbit <span>·</span> auto-rotating</p>
        </div>
        <div className="skills-layout">
          <div className="skills-scene-wrap"><SkillsScene /></div>
          <div className="skill-list">
            <p className="skill-list-intro">A stack designed for the distance between an idea and a shipped product.</p>
            <div className="skill-groups">
              <div><span className="group-number">01</span><h3>Intelligence</h3><p>RAG / Gemini / TensorFlow / Prompt design</p></div>
              <div><span className="group-number">02</span><h3>Interfaces</h3><p>React / Next.js / TypeScript / Three.js</p></div>
              <div><span className="group-number">03</span><h3>Infrastructure</h3><p>FastAPI / Node.js / PostgreSQL / Docker</p></div>
            </div>
          </div>
        </div>
        <div className="skill-chips" aria-label="Technical skills">
          {skills.map((skill) => <span key={skill.name} className={`skill-chip ${skill.className}`}><i>{skill.short}</i>{skill.name}</span>)}
        </div>
      </section>

      <section className="career section-wrap" id="career">
        <div className="career-timeline">
          {career.map((job) => (
            <article className="career-entry" key={job.company}>
              <div className="career-date"><span>{job.year}</span><i /></div>
              <div className="career-detail">
                <div className="career-heading"><div><h3>{job.role}</h3><p>{job.company}</p></div><span className="career-tag">{job.tag}</span></div>
                <p className="career-location"><MapPin size={13} /> {job.location}</p>
                <p className="career-description">{job.description}</p>
                <ul>{job.points.map((point) => <li key={point}><Check size={14} /> {point}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="projects section-wrap" id="projects">
        <div className="projects-top">
          <div><p className="section-label">Selected work</p><h2>Built for the<br /><em>real world.</em></h2></div>
          <p className="projects-aside">A small selection of systems, experiments, and products that made it past the whiteboard.</p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className={`project-card ${project.accent}`} key={project.title}>
              <div className="project-card-top"><span>{project.number}</span><a href={project.link} target={project.link.startsWith("http") ? "_blank" : undefined} rel="noreferrer"><ExternalLink size={16} /></a></div>
              <div className="project-art" aria-hidden="true">
                {project.accent === "violet" ? <><div className="relay-ring ring-a" /><div className="relay-ring ring-b" /><div className="relay-ring ring-c" /><Sparkles className="relay-spark" /></> : <><div className="route-line route-one" /><div className="route-line route-two" /><div className="route-pin pin-one" /><div className="route-pin pin-two" /><div className="route-car"><CircleDot size={18} /></div></>}
              </div>
              <p className="project-type">{project.type}</p><h3>{project.title}</h3><p className="project-description">{project.description}</p>
              <div className="project-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="education section-wrap" id="education">
        <div className="education-heading"><div className="section-index">03 <span>/</span> 04</div><div><p className="section-label">Foundations</p><h2>Always in<br /><em>progress.</em></h2></div></div>
        <div className="education-list">
          <div className="education-row"><span className="education-year">2022 — 2024</span><div><h3>Master of Science (MS or MSc) in Computer Science</h3><p>NCRD&apos;s Sterling Institute of Management Studies</p></div><strong>8.70 <small>CGPA</small></strong></div>
          <div className="education-row"><span className="education-year">2019 — 2022</span><div><h3>B.Sc. in Computer Science</h3><p>Bhavan's College · University of Mumbai</p></div><strong>8.39 <small>CGPA</small></strong></div>
        </div>
        <div className="achievement"><span><Sparkles size={17} /> Achievement</span><p>Grand Finalist — <strong>Smart India Hackathon 2023</strong></p><ArrowUpRight size={18} /></div>
      </section>

      <section className="contact section-wrap" id="contact">
        <div className="contact-heading"><div className="section-index">04 <span>/</span> 04</div><div><p className="section-label">Have a good problem?</p><h2>Let&apos;s make<br /><em>something matter.</em></h2></div></div>
        <div className="contact-content"><div className="contact-note"><p>Whether you&apos;re exploring an AI product, a technical challenge, or just want to exchange ideas — my inbox is open.</p><a href="mailto:officialvermarahul@gmail.com">officialvermarahul@gmail.com <ArrowUpRight size={15} /></a><div className="social-links"><a href="https://github.com/rahulmverma" target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a><a href="https://in.linkedin.com/in/rahul-verma-6775341b0" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a></div></div>
          <form className="contact-form" onSubmit={submitContact}><label>Your name<input required name="name" type="text" placeholder="How should I call you?" /></label><label>Your email<input required name="email" type="email" placeholder="you@company.com" /></label><label>Tell me a little about it<textarea required name="message" rows={3} placeholder="The interesting part is..." /></label><button className="button button-primary" type="submit">{sent ? <>Message queued <Check size={16} /></> : <>Send a message <Send size={15} /> </>}</button>{sent && <p className="form-success">Your email client should open with the message ready to send.</p>}</form>
        </div>
      </section>

      <footer className="site-footer"><span>© 2026 Rahul Verma</span><span>Designed & built with curiosity<span className="footer-star">✦</span></span><button onClick={() => navigate("home")}>Back to top <ArrowUpRight size={13} /></button></footer>
    </main>
  );
}
