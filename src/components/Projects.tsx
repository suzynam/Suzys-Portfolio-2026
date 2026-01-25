"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Project {
    id: string;
    title: string;
    category: string;
    summary: string;
    coverImage: string | null;
}

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadProjects() {
            try {
                const res = await fetch('/api/projects');
                const result = await res.json();

                if (result.error) {
                    setError(result.details || result.error);
                } else {
                    setProjects(result.data || []);
                }
            } catch (err) {
                setError('데이터를 불러오지 못했습니다.');
            } finally {
                setLoading(false);
            }
        }
        loadProjects();
    }, []);

    if (loading) {
        return (
            <section id="projects" className="section projects-section">
                <div className="container">
                    <h2 className="section-title">Selected Works</h2>
                    <div className="loading-state">노션에서 프로젝트를 불러오는 중...</div>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className="section projects-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Selected Works</h2>
                    <p className="section-subtitle">노션 데이터베이스와 실시간으로 연동된 프로젝트입니다.</p>
                </div>

                {error ? (
                    <div className="error-card">
                        <h3>연결 오류</h3>
                        <p>{error}</p>
                        <small>ID: 2f08db7b4141808ba8e6f44c4064ad7a</small>
                    </div>
                ) : projects.length === 0 ? (
                    <div className="empty-state">
                        <p>아직 등록된 프로젝트가 없습니다. 노션 DB에 페이지를 추가해 보세요!</p>
                    </div>
                ) : (
                    <div className="projects-grid">
                        {projects.map((project) => (
                            <Link href={`/projects/${project.id}`} key={project.id} className="new-project-card">
                                <div className="project-image-wrapper">
                                    {project.coverImage ? (
                                        <div
                                            className="project-image"
                                            style={{ backgroundImage: `url(${project.coverImage})` }}
                                        ></div>
                                    ) : (
                                        <div className="project-image placeholder"></div>
                                    )}
                                    <div className="project-overlay">
                                        <span>View Case Study</span>
                                    </div>
                                </div>
                                <div className="project-info">
                                    <span className="project-category">{project.category}</span>
                                    <h3 className="project-title">{project.title}</h3>
                                    <p className="project-summary">{project.summary}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <style jsx>{`
                .section-header {
                    margin-bottom: 4rem;
                }
                .section-subtitle {
                    margin-top: -1.5rem;
                    opacity: 0.6;
                    font-size: 1rem;
                }
                .projects-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
                    gap: 3rem;
                }
                .new-project-card {
                    display: flex;
                    flex-direction: column;
                    text-decoration: none;
                    color: inherit;
                    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                }
                .project-image-wrapper {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 16 / 10;
                    border-radius: var(--card-radius);
                    overflow: hidden;
                    background: #1a1a1a;
                    margin-bottom: 1.5rem;
                }
                .project-image {
                    width: 100%;
                    height: 100%;
                    background-size: cover;
                    background-position: center;
                    transition: transform 0.6s ease;
                }
                .project-image.placeholder {
                    background: linear-gradient(45deg, #1f1f1f, #2a2a2a);
                }
                .project-overlay {
                    position: absolute;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                .project-overlay span {
                    padding: 0.8rem 1.5rem;
                    background: white;
                    color: black;
                    border-radius: 30px;
                    font-weight: 600;
                    font-size: 0.9rem;
                    transform: translateY(10px);
                    transition: transform 0.3s ease;
                }
                .new-project-card:hover .project-image {
                    transform: scale(1.05);
                }
                .new-project-card:hover .project-overlay {
                    opacity: 1;
                }
                .new-project-card:hover .project-overlay span {
                    transform: translateY(0);
                }
                .project-category {
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: var(--accent-color);
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin-bottom: 0.5rem;
                    display: block;
                }
                .project-title {
                    font-size: 1.75rem;
                    margin-bottom: 0.75rem;
                    font-weight: 800;
                }
                .project-summary {
                    font-size: 1rem;
                    color: var(--text-secondary);
                    line-height: 1.6;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .error-card {
                    background: rgba(255, 107, 107, 0.1);
                    border: 1px solid rgba(255, 107, 107, 0.3);
                    padding: 2rem;
                    border-radius: 15px;
                    text-align: center;
                }
                .loading-state, .empty-state {
                    text-align: center;
                    padding: 5rem 0;
                    opacity: 0.5;
                }
                @media (max-width: 768px) {
                    .projects-grid {
                        grid-template-columns: 1fr;
                    }
                    .project-title {
                        font-size: 1.5rem;
                    }
                }
            `}</style>
        </section>
    );
}
