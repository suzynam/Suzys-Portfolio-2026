"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Intersection Observer for Scroll Animation
    const sections = document.querySelectorAll('section');
    const timelineItems = document.querySelectorAll('.timeline-item');

    // Section Observer
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(section => {
      section.classList.add('fade-in-section');
      sectionObserver.observe(section);
    });

    // Timeline Observer
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.5, rootMargin: "0px 0px -50px 0px" });

    timelineItems.forEach(item => {
      timelineObserver.observe(item);
    });

    return () => {
      sectionObserver.disconnect();
      timelineObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* Header / Navigation */}
      <header className="site-header">
        <div className="container">
          <Link href="#" className="logo">Portfolio.</Link>
          <nav className={`main-nav ${mobileMenuOpen ? 'active' : ''}`}>
            <ul>
              <li><Link href="#about">About</Link></li>
              <li><Link href="#evolution">Evolution</Link></li>
              <li><Link href="#projects">Projects</Link></li>
              <li><Link href="#contact">Contact</Link></li>
            </ul>
          </nav>
          <button
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="hero" className="hero-section">
          <div className="container">
            <h1 className="hero-title">
              <span className="block-reveal">Designing Systems.</span>
              <span className="block-reveal">Building Products.</span>
              <span className="block-reveal highlight">Scaling with AI.</span>
            </h1>
            <p className="hero-subtitle">
              5년차 프로덕트 디자이너에서 AI 솔로프리너까지.<br />
              디자인과 기술을 연결하여 가치를 만듭니다.
            </p>
            <div className="hero-cta">
              <Link href="#evolution" className="btn btn-primary">My Journey</Link>
              <Link href="#projects" className="btn btn-outline">View Work</Link>
            </div>
          </div>
          {/* Background Elements */}
          <div className="hero-bg-gradient"></div>
        </section>

        {/* Evolution / Timeline Section */}
        <section id="evolution" className="section evolution-section">
          <div className="container">
            <h2 className="section-title">The Evolution</h2>
            <div className="timeline">
              {/* Static Content for now - will be Dynamic later */}
              <div className="timeline-item">
                <span className="year">Phase 1</span>
                <h3>Product Designer</h3>
                <p>User Experience & UI Design (5 Years)</p>
              </div>
              <div className="timeline-item">
                <span className="year">Phase 2</span>
                <h3>Content Creator</h3>
                <p>Design & AI Knowledge Sharing</p>
              </div>
              <div className="timeline-item">
                <span className="year">Phase 3</span>
                <h3>Lecturer</h3>
                <p>Offline/Online Teaching</p>
              </div>
              <div className="timeline-item">
                <span className="year">Phase 4</span>
                <h3>Team Lead</h3>
                <p>Education Ops & System Building</p>
              </div>
              <div className="timeline-item highlight">
                <span className="year">Current</span>
                <h3>AI Solopreneur</h3>
                <p>Building profitable AI Products</p>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section id="capabilities" className="section capabilities-section">
          <div className="container">
            <h2 className="section-title">Capabilities</h2>
            <div className="grid-3">
              <div className="card capability-card">
                <h3>Design</h3>
                <p>UI/UX, Design Systems, Brand Identity</p>
              </div>
              <div className="card capability-card">
                <h3>Systems</h3>
                <p>Ops Automation, Workflow Optimization, Team Leadership</p>
              </div>
              <div className="card capability-card">
                <h3>AI Engineering</h3>
                <p>LLM Integration, Prompt Engineering, Full-stack Build</p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section projects-section">
          <div className="container">
            <h2 className="section-title">Selected Works</h2>
            <div className="projects-grid">
              {/* Project Cards */}
              <article className="project-card">
                <div className="card-image placeholder"></div>
                <div className="card-content">
                  <h3>AI Product Name</h3>
                  <p className="tag">AI Solopreneur</p>
                </div>
              </article>
              <article className="project-card">
                <div className="card-image placeholder"></div>
                <div className="card-content">
                  <h3>Design System</h3>
                  <p className="tag">Product Design</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Speaking Section */}
        <section id="speaking" className="section speaking-section">
          <div className="container">
            <h2 className="section-title">Speaking & Teaching</h2>
            <p className="section-desc">지식을 나누고 함께 성장합니다.</p>
            {/* Speaking grid placeholder */}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section contact-section">
          <div className="container">
            <h2 className="section-title">Let's Build Something.</h2>
            <p>협업 제안이나 커피챗은 언제나 환영합니다.</p>
            <a href="mailto:contact@example.com" className="btn btn-primary">Get in Touch</a>

            <div className="social-links">
              <a href="#">LinkedIn</a>
              <a href="#">Twitter</a>
              <a href="#">Blog</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>&copy; 2024 User Name. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
