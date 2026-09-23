import { User, Calendar, MapPin, Mail } from 'lucide-react'

function About() {
  const stats = [
    { number: '2+', label: 'Years Experience' },
    { number: '10+', label: 'Projects Completed' },
    { number: '5+', label: 'Happy Clients' },
    { number: '100%', label: 'Commitment' },
  ]

  const infoItems = [
    { icon: <User size={18} />, label: 'Name', value: 'Mikiyas Abesha' },
    { icon: <Calendar size={18} />, label: 'Age', value: '19' },
    { icon: <MapPin size={18} />, label: 'Location', value: 'Addis Ababa, Ethiopia' },
    { icon: <Mail size={18} />, label: 'Email', value: 'mikiyasabesha21@gmail.com' },
  ]

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">Get to know me better</p>

        <div className="about-grid">
          <div className="about-visual">
            <div className="about-card">
              <div className="about-avatar">
                <span className="avatar-text">MA</span>
              </div>
              <div className="about-info">
                {infoItems.map((item, index) => (
                  <div key={index} className="info-row">
                    <span className="info-icon">{item.icon}</span>
                    <span className="info-label">{item.label}:</span>
                    <span className="info-value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="about-content">
            <h3 className="about-heading">
              I'm a passionate developer who loves creating 
              <span className="highlight"> amazing web experiences</span>
            </h3>
            <p className="about-text">
              I started my journey into web development 2 years ago and have been 
              hooked ever since. As the founder of ApexMKT, I enjoy turning complex 
              problems into simple, beautiful, and intuitive designs.
            </p>
            <p className="about-text">
              When I'm not coding, you can find me playing basketball, studying chess 
              tactics, or exploring new technologies. I believe in continuous learning and 
              always strive to improve my skills.
            </p>
            <p className="about-text">
              My goal is to build products that not only look great but also provide 
              real value to users. I'm currently looking for opportunities to grow 
              and contribute to exciting projects.
            </p>

            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about {
          padding: var(--section-padding);
          background: linear-gradient(to bottom, var(--bg-dark), rgba(99,102,241,0.05));
        }
        .about-grid {
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 4rem;
          align-items: start;
        }
        .about-card {
          background: var(--bg-card);
          border-radius: 16px;
          padding: 2rem;
          border: 1px solid rgba(255,255,255,0.05);
          text-align: center;
        }
        .about-avatar {
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          font-size: 2.5rem;
          font-weight: 700;
          color: white;
          box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
        }
        .about-info {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .info-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: rgba(255,255,255,0.03);
          border-radius: 8px;
        }
        .info-icon {
          color: var(--primary);
        }
        .info-label {
          color: var(--text-muted);
          font-size: 0.875rem;
        }
        .info-value {
          margin-left: auto;
          font-weight: 500;
          font-size: 0.875rem;
        }
        .about-heading {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          line-height: 1.4;
        }
        .highlight {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .about-text {
          color: var(--text-muted);
          margin-bottom: 1rem;
          line-height: 1.8;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-top: 2rem;
        }
        .stat-card {
          background: var(--bg-card);
          border-radius: 12px;
          padding: 1.5rem 1rem;
          text-align: center;
          border: 1px solid rgba(255,255,255,0.05);
          transition: transform 0.3s;
        }
        .stat-card:hover {
          transform: translateY(-5px);
          border-color: var(--primary);
        }
        .stat-number {
          display: block;
          font-size: 1.75rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .stat-label {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        @media (max-width: 968px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .about-visual {
            max-width: 350px;
            margin: 0 auto;
            width: 100%;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  )
}

export default About
