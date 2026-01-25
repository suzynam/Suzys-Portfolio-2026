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
                    6년차 프로덕트 디자이너에서 AI 빌더로 변모하며,<br />
                    전략적인 사고와 기술적 해결책을 결합해 혁신적인 제품을 만듭니다.
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
