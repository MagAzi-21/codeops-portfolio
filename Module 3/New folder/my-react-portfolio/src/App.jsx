import { useState, useEffect } from "react";
import "./App.css";

const projectsData = [
  {
    id: 1,
    title: "Addis Eats Platform",
    subtitle: "Enterprise Food Logistics & Ordering",
    category: "React / Full Stack",
    description:
      "A scalable food-ordering engine engineered with React, Zustand persistent state architecture, code-split route chunks, and resilient error boundary isolation.",
    stats: "Sub-4ms commit • Zero prop drilling",
    tags: ["React 18", "Zustand", "React Router v6", "Tailwind CSS"],
    metrics: ["100% Client-Side State Safety", "Offline-Persisted Cart", "Real-Time TeleBirr Validation"],
    github: "https://github.com/MagAzi-21",
    liveDemo: "https://addis-eats.vercel.app",
    featured: true,
  },
  {
    id: 2,
    title: "ApexMKT Performance Engine",
    subtitle: "Agency Infrastructure & Web Optimization",
    category: "Web Engineering",
    description:
      "High-converting digital architecture designed for clinics and corporate clients, achieving flawless Core Web Vitals and programmatic technical SEO dominance.",
    stats: "99+ Lighthouse Score • Instant FCP",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    metrics: ["SEO Automated Indexing", "Modern Lead Capture", "Responsive Micro-Interactions"],
    github: "https://github.com/MagAzi-21",
    liveDemo: "https://apexmkt.com",
    featured: true,
  },
  {
    id: 3,
    title: "Forex Market Intelligence Suite",
    subtitle: "Real-Time Execution & Chart Visualizer",
    category: "Data & Trading",
    description:
      "Precision charting workstation analyzing price structure, supply/demand liquidity zones, and market execution signals with sub-second reactivity.",
    stats: "Sub-second Tick Aggregation",
    tags: ["JavaScript", "TradingView APIs", "REST", "Canvas"],
    metrics: ["Multi-Asset Analytics", "Clean Chart Projections", "Event-Driven Telemetry"],
    github: "https://github.com/MagAzi-21",
    liveDemo: "https://github.com/MagAzi-21",
    featured: false,
  },
  {
    id: 4,
    title: "CodeOps Cloud Architecture",
    subtitle: "Cloud Native Developer Workspaces",
    category: "Full Stack / Cloud",
    description:
      "Containerized microservices and automated CI/CD deployment pipelines orchestrating developer toolchains and isolated environment builds.",
    stats: "Dockerized • Automated Deployments",
    tags: ["AWS", "Docker", "Node.js", "Linux"],
    metrics: ["Instant Workspace Spinning", "Zero Downtime Deployments", "Isolated Sandboxes"],
    github: "https://github.com/MagAzi-21",
    liveDemo: "https://github.com/MagAzi-21",
    featured: false,
  },
];

const skillCategories = [
  {
    name: "Frontend Mastery",
    skills: ["React 18", "Next.js (App Router)", "JavaScript (ES6+)", "Tailwind CSS", "HTML5 & Semantic Web", "State Management (Zustand/Redux)"],
  },
  {
    name: "Backend & Systems",
    skills: ["Node.js", "RESTful Architecture", "Python", "C++", "SQL / JSON Modeling"],
  },
  {
    name: "Cloud & Dev Toolchain",
    skills: ["Git & GitHub CI", "AWS Cloud Services", "Docker Containers", "Vite", "Linux Environment", "Cursor & VS Code"],
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredProjects =
    activeTab === "All"
      ? projectsData
      : projectsData.filter((p) => p.category.includes(activeTab));

  return (
    <div className="portfolio-wrapper">
      {/* Background Glow Accents */}
      <div className="radial-glow glow-top"></div>
      <div className="radial-glow glow-center"></div>

      {/* Navigation Bar */}
      <nav className={`navbar-header ${scrolled ? "nav-scrolled" : ""}`}>
        <div className="nav-content">
          <a href="#" className="nav-brand">
            <span className="brand-dot"></span>
            MIKIYAS ABESHA
          </a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#projects">Work</a>
            <a href="#skills">Stack</a>
            <a href="#contact" className="nav-cta">Let's Build</a>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="hero-section" id="about">
        <div className="hero-badge">
          <span className="badge-ping"></span>
          <span>Available for High-Impact Projects</span>
        </div>
        <h1 className="hero-title">
          Architecting Scalable <span className="gradient-text">Web Platforms</span> & Refined Experiences.
        </h1>
        <p className="hero-subtitle">
          I'm <strong>Mikiyas Abesha</strong> — a Software Engineer & Founder crafting production-ready frontend architectures, high-performance web applications, and intuitive digital interfaces.
        </p>

        <div className="hero-actions">
          <a href="#projects" className="btn-glow">
            Explore Portfolio <span className="arrow-icon">→</span>
          </a>
          <a
            href="https://github.com/MagAzi-21"
            target="_blank"
            rel="noreferrer"
            className="btn-outline"
          >
            GitHub Telemetry
          </a>
        </div>

        <div className="hero-metrics-bar">
          <div className="metric-box">
            <h4>100%</h4>
            <p>Production Focused</p>
          </div>
          <div className="metric-divider"></div>
          <div className="metric-box">
            <h4>Modern</h4>
            <p>React & Next.js Stack</p>
          </div>
          <div className="metric-divider"></div>
          <div className="metric-box">
            <h4>Clean</h4>
            <p>Engineered Architecture</p>
          </div>
        </div>
      </header>

      {/* Projects Showcase */}
      <section className="section-container" id="projects">
        <div className="section-header">
          <div>
            <span className="section-tag">ENGINEERED WORK</span>
            <h2 className="section-title">Selected Projects</h2>
          </div>

          <div className="filter-pill-bar">
            {["All", "React", "Full Stack", "Web Engineering"].map((tab) => (
              <button
                key={tab}
                className={`filter-pill ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card"
              onClick={() => setSelectedProject(project)}
            >
              <div className="card-top">
                <span className="card-category">{project.category}</span>
                {project.featured && <span className="featured-pill">Featured</span>}
              </div>

              <h3 className="card-title">{project.title}</h3>
              <p className="card-sub">{project.subtitle}</p>
              <p className="card-desc">{project.description}</p>

              <div className="card-stat-chip">⚡ {project.stats}</div>

              <div className="tag-list">
                {project.tags.map((tag, i) => (
                  <span key={i} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="card-footer">
                <span className="inspect-link">View Architecture Breakdown →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills & Stack */}
      <section className="section-container" id="skills">
        <div className="section-header">
          <div>
            <span className="section-tag">CAPABILITIES</span>
            <h2 className="section-title">Technical Matrix</h2>
          </div>
        </div>

        <div className="skills-category-grid">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="skill-card">
              <h3 className="skill-category-title">{cat.name}</h3>
              <div className="skill-badge-list">
                {cat.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-container" id="contact">
        <div className="contact-banner">
          <span className="section-tag">GET IN TOUCH</span>
          <h2>Let's build something exceptional together.</h2>
          <p>Open for software engineering opportunities, product builds, and collaborative ventures.</p>
          <div className="contact-buttons">
            <a href="mailto:mikiyasabesha21@gmail.com" className="btn-glow">
              Send Direct Message
            </a>
            <a href="https://github.com/MagAzi-21" target="_blank" rel="noreferrer" className="btn-outline">
              GitHub Repositories
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-bar">
        <p>© 2026 Mikiyas Abesha.</p>
      </footer>

      {/* Interactive Project Inspection Modal */}
      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <span className="modal-category">{selectedProject.category}</span>
              <button className="modal-close" onClick={() => setSelectedProject(null)}>
                ✕
              </button>
            </div>
            <h2>{selectedProject.title}</h2>
            <p className="modal-desc">{selectedProject.description}</p>

            <h4 className="modal-spec-title">Key Architectural Highlights:</h4>
            <ul className="modal-highlights">
              {selectedProject.metrics.map((m, i) => (
                <li key={i}>✓ {m}</li>
              ))}
            </ul>

            <div className="modal-actions">
              <button
                className="btn-glow"
                onClick={() => alert(`Launching telemetry demo for ${selectedProject.title}`)}
              >
                Launch Live View
              </button>
              <button className="btn-outline" onClick={() => setSelectedProject(null)}>
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}