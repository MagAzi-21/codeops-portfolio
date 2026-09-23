import { useState } from "react";
import "./App.css";

const projects = [
  {
    id: 1,
    title: "Addis Eats Platform",
    category: "React / Full Stack",
    description: "An authentic Ethiopian food ordering application built with React, Context API, custom hooks, and dynamic cart state management.",
    tags: ["React", "Context API", "Vite", "JavaScript"],
  },
  {
    id: 2,
    title: "Digital Agency Portfolio",
    category: "Web Development",
    description: "High-performance client websites built with modern web technologies, responsive layouts, and technical SEO optimization.",
    tags: ["Next.js", "Tailwind CSS", "SEO"],
  },
  {
    id: 3,
    title: "Market Analysis Dashboard",
    category: "Data & Trading",
    description: "Real-time market analytics tracking price action, order structures, and technical indicators.",
    tags: ["JavaScript", "TradingView", "API"],
  },
];

const skills = [
  "React.js", "JavaScript (ES6+)", "Next.js", "Tailwind CSS", 
  "HTML5 & CSS3", "Git & GitHub", "REST APIs", "Node.js"
];

function App() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = filter === "All"
    ? projects
    : projects.filter((p) => p.category.includes(filter));

  return (
    <div className="portfolio-container">
      {/* Hero Section */}
      <header className="hero">
        <span className="badge">Software Developer</span>
        <h1>Mikiyas Abesha</h1>
        <p className="bio">
          Full-stack developer building modern, scalable web applications with React, Next.js, and clean software architecture.
        </p>
        <div className="hero-links">
          <a href="#projects" className="btn-primary">View Projects</a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="btn-secondary">GitHub</a>
        </div>
      </header>

      {/* Skills Section */}
      <section className="section">
        <h2>Technical Skills</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <span key={index} className="skill-pill">{skill}</span>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="section" id="projects">
        <div className="section-head">
          <h2>Featured Work</h2>
          <div className="filters">
            {["All", "React", "Web Development"].map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${filter === cat ? "active" : ""}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card">
              <span className="project-cat">{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Mikiyas Abesha. Built with React & Vite.</p>
      </footer>
    </div>
  );
}

export default App;