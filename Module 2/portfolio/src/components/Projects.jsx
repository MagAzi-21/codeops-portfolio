import { ExternalLink, Github } from 'lucide-react'

function Projects() {
  const projects = [
    {
      title: 'Debi Dental Clinic',
      description: 'A custom web application and digital marketing framework built for Debi Dental Clinic in Jimma under ApexMKT.',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop',
      tags: ['React', 'Tailwind', 'SEO'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      title: 'Green House Burger AI',
      description: 'A custom website and automated AI assistant setup configured for Green House Burger in Jimma.',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&h=400&fit=crop',
      tags: ['JavaScript', 'HTML/CSS', 'AI Integration'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      title: 'ApexMKT Agency Portfolio',
      description: 'A modern, responsive agency platform showcasing web development and digital marketing services.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      tags: ['React', 'Next.js', 'Tailwind'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      title: 'Personal Portfolio Website',
      description: 'A responsive personal portfolio website built with React featuring smooth animations and modern design principles.',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&h=400&fit=crop',
      tags: ['React', 'Vite', 'CSS'],
      liveUrl: '#',
      githubUrl: '#',
    },
  ]

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <p className="section-subtitle">Some things I've built</p>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-image-wrapper">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="project-image"
                  loading="lazy"
                />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href={project.liveUrl} className="project-link" title="View Live">
                      <ExternalLink size={20} />
                    </a>
                    <a href={project.githubUrl} className="project-link" title="View Code">
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .projects {
          padding: var(--section-padding);
          background: linear-gradient(to bottom, rgba(99,102,241,0.05), var(--bg-dark));
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
        .project-card {
          background: var(--bg-card);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.05);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        .project-image-wrapper {
          position: relative;
          overflow: hidden;
          aspect-ratio: 16/10;
        }
        .project-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }
        .project-card:hover .project-image {
          transform: scale(1.1);
        }
        .project-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .project-card:hover .project-overlay {
          opacity: 1;
        }
        .project-links {
          display: flex;
          gap: 1rem;
        }
        .project-link {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: transform 0.3s, background 0.3s;
        }
        .project-link:hover {
          transform: scale(1.1);
          background: var(--secondary);
        }
        .project-content {
          padding: 1.5rem;
        }
        .project-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }
        .project-desc {
          color: var(--text-muted);
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .project-tag {
          background: rgba(99, 102, 241, 0.1);
          color: var(--primary);
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}

export default Projects
