"use client";

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ProjectDetail {
    id: string;
    title: string;
    category: string;
    summary: string;
    date: string;
    coverImage: string | null;
    properties: Record<string, any>;
    content: string;
}

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [project, setProject] = useState<ProjectDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProject() {
            try {
                const res = await fetch(`/api/projects/${id}`);
                const json = await res.json();
                if (json.data) {
                    setProject(json.data);
                }
            } catch (err) {
                console.error('Failed to fetch project', err);
            } finally {
                setLoading(false);
            }
        }
        fetchProject();
    }, [id]);

    if (loading) {
        return (
            <div className="container" style={{ paddingTop: '100px', textAlign: 'center' }}>
                <div className="loading-shimmer">Loading project content...</div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="container" style={{ paddingTop: '100px', textAlign: 'center' }}>
                <h2>Project not found</h2>
                <Link href="/" className="btn btn-primary">Go Back Home</Link>
            </div>
        );
    }

    // Filter out internal or handled properties
    const ignoredProps = ['Name', 'Title', 'Tag', 'Category', 'Description', 'Summary', 'Date', 'Timeline'];
    const displayProperties = Object.entries(project.properties || {})
        .filter(([key]) => !ignoredProps.includes(key));

    return (
        <article className="project-detail">
            {project.coverImage && (
                <div className="project-hero" style={{ backgroundImage: `url(${project.coverImage})` }}>
                    <div className="hero-overlay"></div>
                    <div className="container hero-container">
                        <div className="project-meta">
                            <span className="tag-pill">{project.category}</span>
                            <span className="date-text">{new Date(project.date).toLocaleDateString()}</span>
                        </div>
                        <h1 className="project-title">{project.title}</h1>
                    </div>
                </div>
            )}

            {!project.coverImage && (
                <div className="project-header container">
                    <div className="project-meta">
                        <span className="tag-pill">{project.category}</span>
                        <span className="date-text">{new Date(project.date).toLocaleDateString()}</span>
                    </div>
                    <h1 className="project-title">{project.title}</h1>
                </div>
            )}

            <div className="container main-layout">
                <aside className="project-sidebar">
                    <div className="info-grid">
                        <div className="info-item">
                            <label>Timeline</label>
                            <span>{project.properties.Timeline || new Date(project.date).toLocaleDateString()}</span>
                        </div>
                        {displayProperties.map(([key, value]) => (
                            <div className="info-item" key={key}>
                                <label>{key}</label>
                                <span>{Array.isArray(value) ? value.join(', ') : (typeof value === 'string' && value.startsWith('http') ? <a href={value} target="_blank" rel="noopener noreferrer">{value}</a> : String(value))}</span>
                            </div>
                        ))}
                    </div>
                </aside>

                <div className="content-area">
                    {project.summary && (
                        <div className="project-summary">
                            <p>{project.summary}</p>
                        </div>
                    )}

                    <div className="markdown-content">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {project.content}
                        </ReactMarkdown>
                    </div>

                    <footer className="project-footer">
                        <Link href="/#projects" className="btn btn-outline">← Back to Projects</Link>
                    </footer>
                </div>
            </div>

            <style jsx global>{`
                .project-detail {
                    padding-bottom: 100px;
                    background-color: var(--bg-color);
                }
                .project-hero {
                    height: 70vh;
                    min-height: 500px;
                    background-size: cover;
                    background-position: center;
                    position: relative;
                    display: flex;
                    align-items: flex-end;
                    padding-bottom: 80px;
                    margin-bottom: 80px;
                }
                .hero-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, transparent 20%, rgba(10, 10, 10, 0.95));
                }
                .hero-container {
                    position: relative;
                    z-index: 2;
                }
                .project-meta {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 20px;
                }
                .tag-pill {
                    background: var(--accent-color);
                    color: white;
                    padding: 0.4rem 1rem;
                    border-radius: 50px;
                    font-size: 0.85rem;
                    font-weight: 700;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                }
                .date-text {
                    color: var(--text-secondary);
                    font-size: 0.95rem;
                    font-weight: 500;
                }
                .project-title {
                    font-size: clamp(3rem, 7vw, 5rem);
                    font-weight: 800;
                    margin: 0;
                    line-height: 1.1;
                    letter-spacing: -0.04em;
                    color: var(--text-primary);
                }
                .project-header {
                    padding-top: 180px;
                    margin-bottom: 80px;
                }
                .main-layout {
                    display: grid;
                    grid-template-columns: 280px 1fr;
                    gap: 80px;
                    align-items: start;
                }
                .project-sidebar {
                    position: sticky;
                    top: 120px;
                }
                .info-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 30px;
                    padding: 30px;
                    background: var(--surface-color);
                    border-radius: 24px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .info-item label {
                    display: block;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: var(--text-secondary);
                    margin-bottom: 8px;
                    font-weight: 700;
                }
                .info-item span {
                    display: block;
                    font-size: 1.1rem;
                    color: var(--text-primary);
                    font-weight: 500;
                    word-break: break-word;
                }
                .info-item a {
                    color: var(--accent-color);
                    text-decoration: underline;
                }
                .content-area {
                    max-width: 800px;
                }
                .project-summary {
                    font-size: 1.4rem;
                    line-height: 1.6;
                    color: var(--text-primary);
                    margin-bottom: 60px;
                    font-weight: 400;
                    border-left: 4px solid var(--accent-color);
                    padding-left: 30px;
                }
                .markdown-content {
                    font-size: 1.15rem;
                    line-height: 1.9;
                    color: var(--text-secondary);
                }
                .markdown-content h1, .markdown-content h2, .markdown-content h3 {
                    color: var(--text-primary);
                    margin-top: 3em;
                    margin-bottom: 1.2em;
                    font-weight: 700;
                }
                .markdown-content h2 { font-size: 2.2rem; }
                .markdown-content h3 { font-size: 1.8rem; }
                .markdown-content p { margin-bottom: 2rem; }
                .markdown-content img {
                    max-width: 100%;
                    border-radius: 20px;
                    margin: 4rem 0;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
                }
                .project-footer {
                    margin-top: 100px;
                    border-top: 1px solid rgba(255,255,255,0.1);
                    padding-top: 60px;
                }
                @media (max-width: 1100px) {
                    .main-layout {
                        grid-template-columns: 1fr;
                        gap: 60px;
                    }
                    .project-sidebar {
                        position: static;
                    }
                    .info-grid {
                        flex-direction: row;
                        flex-wrap: wrap;
                    }
                    .info-item {
                        flex: 1 1 200px;
                    }
                }
                @media (max-width: 768px) {
                    .project-title { font-size: 3rem; }
                    .project-hero { height: 50vh; }
                }
            `}</style>
        </article>
    );
}
