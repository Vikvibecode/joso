import React from 'react';

export const TrustSection: React.FC = () => {
    const companies = [
        { name: 'Acme AI', icon: '⚡' },
        { name: 'Nebulon', icon: '🪐' },
        { name: 'Vertex', icon: '📐' },
        { name: 'Quant', icon: '📊' },
        { name: 'Synergy', icon: '🔗' },
        { name: 'Echo', icon: '🔊' },
        { name: 'Flux', icon: '🌊' },
        { name: 'Orbit', icon: '🛸' },
    ];

    return (
        <section style={{
            textAlign: 'center',
            padding: '2rem 1rem 2rem',
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            letterSpacing: '0.02em',
            overflow: 'hidden'
        }}>
            <div className="marquee-container" style={{ marginBottom: '2rem' }}>
                <div className="marquee-content" style={{ gap: '2rem', paddingRight: '2rem' }}>
                    {[...companies, ...companies, ...companies].map((company, i) => (
                        <div key={i} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            opacity: 0.4,
                            filter: 'grayscale(100%)',
                            transition: 'opacity 0.3s',
                            cursor: 'default',
                            whiteSpace: 'nowrap'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.4'}
                        >
                            <span style={{ fontSize: '1.8rem' }}>{company.icon}</span>
                            <span style={{ fontWeight: 600, fontFamily: 'var(--font-sans)', fontSize: '1.4rem' }}>{company.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            <p style={{ maxWidth: '90%', margin: '0 auto', lineHeight: '1.6' }}>Used by builders, designers, and product teams shaping AI-first workflows.</p>
        </section>
    );
};
