import React, { useRef, useEffect, useState } from 'react';

export const AudienceSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [progress, setProgress] = useState(0);

    const audience = [
        { role: 'Developers', benefit: 'Stop fighting syntax. Focus on logic.' },
        { role: 'Product Teams', benefit: 'Prototype faster without technical friction.' },
        { role: 'AI Builders', benefit: 'Design structured prompts with confidence.' },
        { role: 'Designers & No-Code Builders', benefit: 'Create valid JSON without touching documentation.' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Start filling when the section is in the middle of the viewport
            // We want it to be 0% when section top is at roughly 75% viewport height
            // And 100% when section bottom is at roughly 25% viewport height

            const startOffset = windowHeight * 0.75;
            // const endOffset = windowHeight * 0.25;

            // const totalDistance = rect.height + startOffset - endOffset;
            const scrolled = startOffset - rect.top;

            let val = scrolled / (rect.height * 0.8); // Adjust multiplier to control speed
            val = Math.max(0, Math.min(val, 1));

            setProgress(val * 100);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section ref={sectionRef} className="container" style={{ padding: '6rem 1rem', position: 'relative' }}>
            {/* Scroll Line (Desktop Only via CSS) */}
            <div className="scroll-line-container">
                <div className="scroll-line-fill" style={{ height: `${progress}%` }}></div>
            </div>

            <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.5rem',
                textAlign: 'center',
                marginBottom: '4rem',
                color: 'var(--text-primary)',
                position: 'relative',
                zIndex: 1
            }}>
                Who It’s For
            </h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '4rem',
                position: 'relative',
                zIndex: 1
            }}>
                {audience.map((a, i) => (
                    <div key={i} style={{
                        padding: '1.5rem',
                        // Remove borderLeft as we have the center line now, or keep it? 
                        // User said "add a straight vertical line", didn't say remove others.
                        // But usually simpler is better. I'll keep the design clean.
                        // Actually, I'll switch to a centered alignment or card style to match the split.
                        // Keeping previous style but ensuring it looks good with the line.
                        textAlign: 'left',
                        // "repeat(auto-fit)" doesn't guarantee 2 columns.
                        // Let's stick to simple card style but maybe add a glass panel background to make them pop over the line?
                        background: 'var(--glass-bg)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: 'var(--radius-lg)',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <h3 style={{
                            fontSize: '1.25rem',
                            fontWeight: 600,
                            marginBottom: '0.5rem',
                            color: 'var(--accent-purple)'
                        }}>
                            {a.role}
                        </h3>
                        <p style={{
                            fontSize: '1rem',
                            color: 'var(--text-secondary)',
                            lineHeight: '1.5'
                        }}>
                            {a.benefit}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};
