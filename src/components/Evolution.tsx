"use client";

import { useEffect, useState } from 'react';

interface EvolutionItem {
    id: string;
    title: string; // Used as Role/Title
    role: string;
    period: string; // Used as Year/Phase
    description: string;
    category: string;
}

export default function Evolution() {
    const [items, setItems] = useState<EvolutionItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/api/evolution');
                const json = await res.json();
                if (json.data && Array.isArray(json.data)) {
                    setItems(json.data);
                }
            } catch (err) {
                console.error('Failed to fetch evolution data', err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    // Fallback data if API returns empty
    const displayItems = items.length > 0 ? items : [
        { id: '1', period: 'Phase 1', role: 'Product Designer', title: 'Product Designer', description: 'User Experience & UI Design (5 Years)', category: 'Design' },
        { id: '2', period: 'Phase 2', role: 'Content Creator', title: 'Content Creator', description: 'Design & AI Knowledge Sharing', category: 'Content' },
        { id: '3', period: 'Phase 3', role: 'Lecturer', title: 'Lecturer', description: 'Offline/Online Teaching', category: 'Education' },
        { id: '4', period: 'Phase 4', role: 'Team Lead', title: 'Team Lead', description: 'Education Ops & System Building', category: 'Systems' },
        { id: '5', period: 'Current', role: 'AI Solopreneur', title: 'AI Solopreneur', description: 'Building profitable AI Products', category: 'AI' },
    ];

    return (
        <section id="evolution" className="section evolution-section">
            <div className="container">
                <h2 className="section-title">The Evolution {loading && <span style={{ fontSize: '0.5em', opacity: 0.5 }}>(Syncing...)</span>}</h2>
                <div className="timeline">
                    {displayItems.map((item, index) => (
                        <div key={item.id || index} className={`timeline-item ${index === displayItems.length - 1 ? 'highlight' : ''}`}>
                            <span className="year">{item.period || `Phase ${index + 1}`}</span>
                            <h3>{item.role || item.title || 'Untitled'}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
