import React, { memo } from 'react';

export const HowItWorks: React.FC = memo(() => {
    const steps = [
        {
            num: '01',
            title: 'Describe your intent',
            desc: 'Write what you want in plain English.',
            quote: '“Create a product recommendation schema with user preferences and pricing.”'
        },
        {
            num: '02',
            title: 'Choose how strict you want it',
            desc: 'Balanced, strict, or creative — you stay in control of structure and flexibility.'
        },
        {
            num: '03',
            title: 'Get clean JSON',
            desc: 'Structured, readable, and ready to use.',
            sub: ['Copy it.', 'Validate it.', 'Ship it.']
        }
    ];

    return (
        <section className="container" style={{ padding: '6rem 1rem' }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '4rem',
                marginTop: '2rem'
            }}>
                {steps.map((step, idx) => (
                    <div key={idx} style={{ position: 'relative' }}>
                        <span style={{
                            fontSize: '4rem',
                            fontWeight: 700,
                            color: 'rgba(255,255,255,0.2)',
                            position: 'absolute',
                            top: '-2.5rem',
                            left: '-4.5rem',
                            fontFamily: 'var(--font-serif)',
                            zIndex: 0
                        }}>
                            {step.num}
                        </span>
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h3 style={{
                                fontSize: '1.25rem',
                                marginBottom: '1rem',
                                fontFamily: 'var(--font-serif)',
                                color: 'var(--text-primary)'
                            }}>
                                {step.title}
                            </h3>
                            <p style={{
                                color: 'var(--text-secondary)',
                                lineHeight: '1.6',
                                marginBottom: '1rem',
                                fontSize: '1rem'
                            }}>
                                {step.desc}
                            </p>
                            {step.quote && (
                                <blockquote style={{
                                    borderLeft: '2px solid var(--accent-purple)',
                                    paddingLeft: '1rem',
                                    color: 'var(--text-muted)',
                                    fontStyle: 'italic',
                                    fontSize: '0.9rem'
                                }}>
                                    {step.quote}
                                </blockquote>
                            )}
                            {step.sub && (
                                <ul style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    gap: '1rem',
                                    marginTop: '0.5rem'
                                }}>
                                    {step.sub.map(s => <li key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: 'var(--accent-green)' }}>•</span> {s}</li>)}
                                </ul>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
});

HowItWorks.displayName = 'HowItWorks';
