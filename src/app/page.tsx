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
              <div className="card">
                <h3>Design & Content</h3>
                <p>6년차 프로덕트 디자이너로서 정제된 비주얼 감각과 논리적인 UX 설계 능력을 보유하고 있습니다. 교육 커리큘럼 및 교안 제작을 통해 지식의 구조화에도 능숙합니다.</p>
              </div>
              <div className="card">
                <h3>Systems & Ops</h3>
                <p>대규모 부트캠프 운영 경험을 바탕으로, 데이터 기반의 효율적인 프로세스를 구축합니다. 특히 AI 툴을 활용한 업무 자동화에 강점을 가지고 있습니다.</p>
              </div>
              <div className="card">
                <h3>AI & Community</h3>
                <p>프롬프트 엔지니어링부터 AI 에이전트 개발까지 직접 수행하는 빌더입니다. AI 학습 커뮤니티를 운영하며 기술과 사람을 연결하는 가치를 만듭니다.</p>
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
            <p className="hero-subtitle" style={{ marginBottom: '48px' }}>매번 재강의 요청을 받는, 현업자 대상의 AI 및 디자인 강의를 진행합니다.</p>

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

      <footer className="footer-section">
        <div className="container">
          <p>&copy; 2024 Suzy Nam. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
