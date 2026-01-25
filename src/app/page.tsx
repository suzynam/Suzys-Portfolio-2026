"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Evolution from '@/components/Evolution';
import Projects from '@/components/Projects';
import Hero from '@/components/Hero';
import Contact from '@/components/Contact';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Intersection Observer for Scroll Animation
    const sections = document.querySelectorAll('section');

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

    return () => {
      sectionObserver.disconnect();
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
        <Hero />

        {/* Evolution Section (Dynamic) */}
        <Evolution />

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

        {/* Projects Section (Dynamic) */}
        <Projects />

        {/* Speaking Section */}
        <section id="speaking" className="section speaking-section">
          <div className="container">
            <h2 className="section-title">Speaking & Teaching</h2>
            <p className="section-desc">지식을 나누고 함께 성장합니다.</p>
          </div>
        </section>

        <Contact />
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>&copy; 2024 Suzy Nam. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
