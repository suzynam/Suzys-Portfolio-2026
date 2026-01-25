"use client";

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

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
                <div className="project-hero">
                    <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        priority
                        className="hero-image"
                    />
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
                <div className="content-area">
                    {project.summary && (
                        <div className="project-summary">
                            <p>{project.summary}</p>
                        </div>
                    )}

                    <div className="markdown-content">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                        >
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
                    position: relative;
                    display: flex;
                    align-items: flex-end;
                    padding-bottom: 80px;
                    margin-bottom: 80px;
                    overflow: hidden;
                }
                .hero-image {
                    object-fit: cover;
                    z-index: 0;
                }
                .hero-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, transparent 20%, rgba(10, 10, 10, 0.95));
                    z-index: 1;
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
                    display: flex;
                    justify-content: center;
                }
                .content-area {
                    max-width: 800px;
                    width: 100%;
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
                        gap: 0;
                    }
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
