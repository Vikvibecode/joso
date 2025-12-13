import React from 'react';

export const WhyJoso: React.FC = () => {
    const reasons = [
        { title: 'Built for clarity', desc: 'No clutter. No distractions. Just intent and structure.' },
        { title: 'Designed for speed', desc: 'From idea to usable JSON in seconds.' },
        { title: 'Precision without complexity', desc: 'Powerful enough for production. Simple enough for anyone.' }
    ];

    return (
        <section className="container" style={{ padding: '6rem 1rem 4rem' }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '3rem',
                textAlign: 'center'
            }}>
                {reasons.map((r, i) => (
                    <div key={i}>
                        <h3 style={{
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            marginBottom: '0.75rem',
                            color: 'var(--text-primary)'
                        }}>
                            {r.title}
                        </h3>
                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: '1rem'
                        }}>
                            {r.desc}
                        </p>
                    </div>
                ))}
            </div>

            {/* Design Philosophy Note */}
            <div style={{
                marginTop: '6rem',
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '3rem',
                width: '100%',
                textAlign: 'center'
            }}>
                <p style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    color: 'var(--text-muted)',
                    marginBottom: '1rem',
                    fontStyle: 'italic'
                }}>
                    Joso is designed to feel calm, focused, and intelligent.
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', opacity: 0.7 }}>
                    No dashboards. No noisy UI. Just a quiet space where human intent becomes machine-ready logic.
                </p>
            </div>
        </section>
    );
};
