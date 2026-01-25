'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NotionRenderer } from 'react-notion-x';
import { Code } from 'react-notion-x/build/third-party/code';
import { Collection } from 'react-notion-x/build/third-party/collection';
import { Equation } from 'react-notion-x/build/third-party/equation';
import { Modal } from 'react-notion-x/build/third-party/modal';
import { Pdf } from 'react-notion-x/build/third-party/pdf';

// Import required CSS
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'katex/dist/katex.min.css';

interface ProjectDetail {
    id: string;
    title: string;
    category: string;
    summary: string;
    date: string;
    coverImage: string | null;
    recordMap: any;
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

                    <div className="notion-content-wrapper">
                        <NotionRenderer
                            recordMap={project.recordMap}
                            fullPage={false}
                            darkMode={true}
                            disableHeader
                            components={{
                                Code,
                                Collection,
                                Equation,
                                Modal,
                                Pdf
                            }}
                        />
                    </div>

                    <footer className="project-footer">
                        <Link href="/#projects" className="btn btn-outline">← Back to Projects</Link>
                    </footer>
                </div>
            </div>
        </article>
    );
}
