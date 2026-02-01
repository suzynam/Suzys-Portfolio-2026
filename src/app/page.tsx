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
          <Link href="#" className="logo">Suzy Nam</Link>
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
        <section className="section capabilities-section">
          <div className="container">
            <h2 className="section-title">Capabilities</h2>
            <div className="grid-3">
              <div className="card">
                <h3>Product Design</h3>
                <p>대기업 SI부터 스타트업 초기 멤버까지, 블록체인 DID, 스마트 물류 등 다양한 도메인에서 0 to 1 제품 구축과 GTM 전략을 주도했습니다.</p>
              </div>
              <div className="card">
                <h3>Community Building</h3>
                <p>디자인 다오를 설립하고 1년 만에 국내 주요 블록체인 컨퍼런스 3곳과 파트너쉽을 체결하며 강력한 커뮤니티를 구축했습니다.</p>
              </div>
              <div className="card">
                <h3>Teaching & Education</h3>
                <p>500명 이상의 디자이너 및 현업자를 대상으로 강의를 진행하며 평균 만족도 4.8을 기록했습니다. 실시간 부트캠프와 생성형 AI 실무 교육을 전문으로 합니다.</p>
              </div>
              <div className="card">
                <h3>Content Creation</h3>
                <p>코드잇 디자인 커리큘럼 설계부터 영상 콘텐츠, 교안 제작까지. 지식을 구조화하여 효과적으로 전달하는 콘텐츠를 만듭니다.</p>
              </div>
              <div className="card">
                <h3>AI Development</h3>
                <p>1인 개발로 휴먼디자인 기반 자기이해 서비스를 운영하며, 프롬프트 엔지니어링과 UXUI를 결합해 AI 제품을 직접 구축합니다.</p>
              </div>
              <div className="card">
                <h3>System Design</h3>
                <p>KDT 부트캠프 사업을 견인하는 리드로서 AX 기반 교육 운영 시스템과 수강생-강사 경험을 설계하여 지속 가능한 성장을 만듭니다.</p>
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
