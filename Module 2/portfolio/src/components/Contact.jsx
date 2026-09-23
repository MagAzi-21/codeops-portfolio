import { useState } from 'react'
import { Send, Mail, MapPin, Phone } from 'lucide-react'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  const contactInfo = [
    {
      icon: <Mail size={22} />,
      label: 'Email',
      value: 'mikiyasabesha21@gmail.com',
      href: 'mailto:mikiyasabesha21@gmail.com'
    },
    {
      icon: <Phone size={22} />,
      label: 'Phone',
      value: '+251 95 027 6929',
      href: 'tel:+251950276929'
    },
    {
      icon: <MapPin size={22} />,
      label: 'Location',
      value: 'Addia Ababa, Ethiopia',
      href: '#'
    },
  ]

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">Let's work together</p>

        <div className="contact-grid">
          <div className="contact-info">
            <h3 className="contact-heading">Let's talk about everything!</h3>
            <p className="contact-text">
              Feel free to reach out if you have a project in mind, 
              want to collaborate, or just want to say hi!
            </p>

            <div className="contact-items">
              {contactInfo.map((item, index) => (
                <a 
                  key={index} 
                  href={item.href}
                  className="contact-item"
                >
                  <div className="contact-icon">{item.icon}</div>
                  <div className="contact-details">
                    <span className="contact-label">{item.label}</span>
                    <span className="contact-value">{item.value}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="contact-form-wrapper">
            <form onSubmit={handleSubmit} className="contact-form">
              {submitted ? (
                <div className="success-message">
                  <div className="success-icon">✓</div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. I'll get back to you soon!</p>
                </div>
              ) : (
                <>
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      rows={5}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="submit-btn">
                    <Send size={18} />
                    Send Message
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .contact {
          padding: var(--section-padding);
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          max-width: 1000px;
          margin: 0 auto;
        }
        .contact-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .contact-heading {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        .contact-text {
          color: var(--text-muted);
          margin-bottom: 2rem;
          line-height: 1.8;
        }
        .contact-items {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          text-decoration: none;
          color: inherit;
          padding: 1rem;
          border-radius: 12px;
          transition: background 0.3s;
        }
        .contact-item:hover {
          background: var(--bg-card);
        }
        .contact-icon {
          width: 48px;
          height: 48px;
          background: rgba(99, 102, 241, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
        }
        .contact-details {
          display: flex;
          flex-direction: column;
        }
        .contact-label {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .contact-value {
          font-weight: 500;
        }
        .contact-form-wrapper {
          background: var(--bg-card);
          border-radius: 16px;
          padding: 2rem;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-group label {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-muted);
        }
        .form-group input,
        .form-group textarea {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 0.875rem 1rem;
          color: var(--text-light);
          font-family: inherit;
          font-size: 1rem;
          transition: border-color 0.3s;
          resize: vertical;
        }
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--primary);
        }
        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: rgba(148, 163, 184, 0.5);
        }
        .submit-btn {
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          color: white;
          border: none;
          padding: 1rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
        }
        .success-message {
          text-align: center;
          padding: 2rem;
        }
        .success-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin: 0 auto 1.5rem;
        }
        .success-message h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .success-message p {
          color: var(--text-muted);
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
    </section>
  )
}

export default Contact
