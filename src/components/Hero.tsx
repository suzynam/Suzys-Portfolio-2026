import Link from 'next/link';

export default function Hero() {
    return (
        <section id="hero" className="hero-section">
            <div className="container">
                <h1 className="hero-title">
                    <span className="block-reveal">Designing Systems.</span>
                    <span className="block-reveal">Building Products.</span>
                    <span className="block-reveal highlight">Scaling with AI.</span>
                </h1>
                <p className="hero-subtitle">
                    프로덕트 디자인, 팀 리딩, 그리고 AI 개발까지.<br />
                    디자인과 시스템, 그리고 AI를 통한 배움을 연결합니다.
                </p>
                <div className="hero-cta">
                    <Link href="#evolution" className="btn btn-primary">My Journey</Link>
                    <Link href="#projects" className="btn btn-outline">View Work</Link>
                </div>
            </div>
            <div className="hero-bg-gradient"></div>
        </section>
    );
}
