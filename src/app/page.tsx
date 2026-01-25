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
                <h3>Design & Content</h3>
                <p>6년의 프로덕트 디자인 경험과 다각도의 교육 커리큘럼 및 교안 제작 경험을 바탕으로 풍부한 사용자 경험과 배움을 설계합니다.</p>
              </div>
              <div className="card capability-card">
                <h3>Systems & Ops</h3>
                <p>팀 리더로서의 HR 및 RnR 설계, 240억 매출 견인을 위한 교육팀 운영 및 AX(AI Transformation) 기반의 효율적인 워크플로우를 구축합니다.</p>
              </div>
              <div className="card capability-card">
                <h3>AI & Community</h3>
                <p>기획부터 개발까지 직접 수행하는 AI 빌더이자, 디자인 다오(Design DAO)를 통해 강력한 커뮤니티와 파트너십을 빌딩합니다.</p>
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
            <p className="section-desc">매번 재강의 요청을 받는, 현업자 대상의 AI 및 디자인 강의를 진행합니다.</p>
            <div className="speaking-stats">
              <div className="stat-item">
                <span className="stat-value">4.8+</span>
                <span className="stat-label">Average Satisfaction</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">500+</span>
                <span className="stat-label">Total Students</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">100%</span>
                <span className="stat-label">Re-lecture Request Rate</span>
              </div>
            </div>
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
