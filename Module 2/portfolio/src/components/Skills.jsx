import { 
  Code2, Palette, Database, Globe, 
  Smartphone, GitBranch, Figma, Terminal 
} from 'lucide-react'

function Skills() {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: <Code2 size={24} />,
      skills: [
        { name: 'React', level: 65 },
        { name: 'JavaScript', level: 70 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'Tailwind CSS', level: 80 },
      ]
    },
    {
      title: 'Design',
      icon: <Palette size={24} />,
      skills: [
        { name: 'UI/UX Design', level: 75 },
        { name: 'Figma', level: 80 },
        { name: 'Responsive Design', level: 90 },
        { name: 'Prototyping', level: 70 },
      ]
    },
    {
      title: 'Backend',
      icon: <Database size={24} />,
      skills: [
        { name: 'Python', level: 80 },
        { name: 'C++', level: 75 },
        { name: 'Node.js', level: 70 },
        { name: 'REST APIs', level: 75 },
      ]
    },
    {
      title: 'Tools',
      icon: <Terminal size={24} />,
      skills: [
        { name: 'Git & GitHub', level: 85 },
        { name: 'VS Code', level: 90 },
        { name: 'Linux', level: 80 },
        { name: 'Docker', level: 70 },
      ]
    },
  ]

  const technologies = [
    'React', 'JavaScript', 'Python', 'C++', 'HTML5', 'CSS3', 
    'Tailwind', 'Next.js', 'Git', 'Linux', 'Docker', 'Vite'
  ]

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">My Skills</h2>
        <p className="section-subtitle">Technologies I work with</p>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-card">
              <div className="skill-header">
                <div className="skill-icon">{category.icon}</div>
                <h3 className="skill-title">{category.title}</h3>
              </div>
              <div className="skill-list">
                {category.skills.map((skill, i) => (
                  <div key={i} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percent">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="tech-tags-section">
          <h3 className="tags-title">Technologies</h3>
          <div className="tags-container">
            {technologies.map((tech, index) => (
              <span key={index} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .skills {
          padding: var(--section-padding);
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin-bottom: 4rem;
        }
        .skill-card {
          background: var(--bg-card);
          border-radius: 16px;
          padding: 2rem;
          border: 1px solid rgba(255,255,255,0.05);
          transition: transform 0.3s, border-color 0.3s;
        }
        .skill-card:hover {
          transform: translateY(-5px);
          border-color: var(--primary);
        }
        .skill-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .skill-icon {
          color: var(--primary);
          background: rgba(99, 102, 241, 0.1);
          padding: 0.75rem;
          border-radius: 12px;
        }
        .skill-title {
          font-size: 1.25rem;
          font-weight: 600;
        }
        .skill-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .skill-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        .skill-name {
          font-size: 0.9rem;
          color: var(--text-light);
        }
        .skill-percent {
          font-size: 0.8rem;
          color: var(--primary);
          font-weight: 600;
        }
        .skill-bar {
          height: 6px;
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
          overflow: hidden;
        }
        .skill-progress {
          height: 100%;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          border-radius: 3px;
          transition: width 1s ease-out;
        }
        .tech-tags-section {
          text-align: center;
        }
        .tags-title {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
          color: var(--text-muted);
        }
        .tags-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem;
        }
        .tech-tag {
          background: var(--bg-card);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 0.5rem 1.25rem;
          border-radius: 50px;
          font-size: 0.9rem;
          color: var(--text-muted);
          transition: all 0.3s;
          cursor: default;
        }
        .tech-tag:hover {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
          transform: translateY(-2px);
        }
        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}

export default Skills
