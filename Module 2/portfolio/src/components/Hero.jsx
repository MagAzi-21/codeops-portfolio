import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react'

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="badge">
            <span className="dot"></span>
            Available for work
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">Mikiyas Abesha</span>
          </h1>

          <h2 className="hero-subtitle">
            Frontend Developer & UI Designer
          </h2>

          <p className="hero-desc">
            I build beautiful, responsive, and user-friendly web applications 
            using modern technologies. Passionate about creating experiences 
            that make people's lives easier.
          </p>

          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              View My Work
            </a>
            <a href="#contact" className="btn btn-outline">
              Contact Me
            </a>
          </div>

          <div className="social-links">
            <a href="https://github.com/MagAzi-21" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={22} />
            </a>
            <a href="https://linkedin.com/mikiabesha" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={22} />
            </a>
            <a href="https://twitter.com/mikiabesha" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter size={22} />
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="code-block">
            <div className="code-header">
              <span className="circle red"></span>
              <span className="circle yellow"></span>
              <span className="circle green"></span>
              <span className="filename">developer.js</span>
            </div>
            <pre className="code-body">
{`const developer = {
  name: "Mikiyas Abesha",
  role: "Frontend Dev",
  skills: ["React", "JS", "CSS"],
  coffee: true,
  learning: true,
  hireable: true
};`}
            </pre>
          </div>
        </div>
      </div>

      <a href="#about" className="scroll-indicator">
        <ArrowDown size={20} />
      </a>

      <style>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--section-padding);
          padding-top: 8rem;
          position: relative;
        }
        .hero-container {
          max-width: 1200px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.3);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.875rem;
          color: var(--primary);
          margin-bottom: 1.5rem;
        }
        .dot {
          width: 8px;
          height: 8px;
          background: #22c55e;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .hero-title {
          font-size: 4rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1rem;
        }
        .gradient-text {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-subtitle {
          font-size: 1.5rem;
          color: var(--text-muted);
          font-weight: 400;
          margin-bottom: 1.5rem;
        }
        .hero-desc {
          font-size: 1.1rem;
          color: var(--text-muted);
          max-width: 500px;
          margin-bottom: 2rem;
          line-height: 1.8;
        }
        .hero-buttons {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .btn {
          padding: 0.875rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        .btn-primary {
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          color: white;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.5);
        }
        .btn-outline {
          border: 2px solid var(--primary);
          color: var(--primary);
          background: transparent;
        }
        .btn-outline:hover {
          background: var(--primary);
          color: white;
        }
        .social-links {
          display: flex;
          gap: 1rem;
        }
        .social-links a {
          color: var(--text-muted);
          transition: color 0.3s, transform 0.3s;
        }
        .social-links a:hover {
          color: var(--primary);
          transform: translateY(-3px);
        }
        .hero-visual {
          display: flex;
          justify-content: center;
        }
        .code-block {
          background: var(--bg-card);
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          width: 100%;
          max-width: 400px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          animation: float 6s ease-in-out infinite;
        }
        .code-header {
          background: rgba(0,0,0,0.3);
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .circle {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        .red { background: #ef4444; }
        .yellow { background: #eab308; }
        .green { background: #22c55e; }
        .filename {
          margin-left: auto;
          font-size: 0.8rem;
          color: var(--text-muted);
          font-family: monospace;
        }
        .code-body {
          padding: 1.5rem;
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
          line-height: 1.8;
          color: #a5b4fc;
          overflow-x: auto;
        }
        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          color: var(--text-muted);
          animation: bounce 2s infinite;
          cursor: pointer;
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }
        @media (max-width: 968px) {
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .hero-title { font-size: 3rem; }
          .hero-desc { margin: 0 auto 2rem; }
          .hero-buttons { justify-content: center; }
          .social-links { justify-content: center; }
          .hero-visual { order: -1; }
          .code-block { max-width: 300px; }
        }
        @media (max-width: 480px) {
          .hero-title { font-size: 2.5rem; }
          .hero-buttons { flex-direction: column; }
        }
      `}</style>
    </section>
  )
}

export default Hero
