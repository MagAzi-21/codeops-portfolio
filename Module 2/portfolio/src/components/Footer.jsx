import { Heart, Github, Linkedin, Twitter } from 'lucide-react'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-name">Mikiyas Abesha</span>
            <p className="footer-tagline">Building the web, one pixel at a time.</p>
          </div>

          <div className="footer-socials">
            <a href="https://github.com/MagAzi-21" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/mikiabesha" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="https://twitter.com/mikiabesha" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} Mikiyas Abesha. Made with <Heart size={14} className="heart" /> and React.
          </p>
        </div>
      </div>

      <style>{`
        .footer {
          padding: 3rem 0 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .footer-name {
          font-size: 1.25rem;
          font-weight: 700;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .footer-tagline {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-top: 0.25rem;
        }
        .footer-socials {
          display: flex;
          gap: 1rem;
        }
        .footer-socials a {
          color: var(--text-muted);
          transition: color 0.3s, transform 0.3s;
        }
        .footer-socials a:hover {
          color: var(--primary);
          transform: translateY(-3px);
        }
        .footer-bottom {
          text-align: center;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .copyright {
          color: var(--text-muted);
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
        }
        .heart {
          color: #ef4444;
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            gap: 1.5rem;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  )
}

export default Footer
