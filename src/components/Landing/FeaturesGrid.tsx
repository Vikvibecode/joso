import React, { memo } from 'react';

export const FeaturesGrid: React.FC = memo(() => {
    const features = [
        {
            title: 'Natural Language → JSON',
            desc: 'Joso understands context, hierarchy, and intent — not just keywords.'
        },
        {
            title: 'Schema-Aware Output',
            desc: 'Generate JSON that aligns with real-world data models and APIs.'
        },
        {
            title: 'Multiple Output Modes',
            desc: 'Compact for machines. Readable for humans. Strict for production.'
        },
        {
            title: 'Instant Validation',
            desc: 'Know immediately if your structure is correct and usable.'
        },
        {
            title: 'Built for AI Workflows',
            desc: 'Perfect for LLM prompts, Tool schemas, Function calling, and Automation pipelines.'
        }
    ];

    return (
        <section className="container" style={{ padding: '6rem 1rem' }}>
            <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.5rem',
                textAlign: 'center',
                marginBottom: '4rem',
                color: 'var(--text-primary)'
            }}>
                Core Features
            </h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1.5rem'
            }}>
                {features.map((f, i) => (
                    <div key={i} className="glass-panel feature-card" style={{
                        padding: '2rem',
                        borderRadius: 'var(--radius-lg)',
                        background: 'rgba(255,255,255,0.02)',
                        transition: 'transform 0.3s',
                        cursor: 'default'
                    }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <h3 style={{
                            fontSize: '1.25rem',
                            marginBottom: '0.75rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)'
                        }}>
                            {f.title}
                        </h3>
                        <p style={{
                            color: 'var(--text-secondary)',
                            lineHeight: '1.6',
                            fontSize: '1rem'
                        }}>
                            {f.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
});

FeaturesGrid.displayName = 'FeaturesGrid';
