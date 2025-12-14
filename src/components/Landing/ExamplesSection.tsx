import React from 'react';

export const ExamplesSection: React.FC = () => {
    return (
        <section id="examples" className="container" style={{ padding: '6rem 1rem' }}>
            <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.5rem',
                textAlign: 'center',
                marginBottom: '4rem',
                color: 'var(--text-primary)'
            }}>
                Examples
            </h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                alignItems: 'center'
            }}>
                {/* From This */}
                <div style={{ padding: '2rem' }}>
                    <div style={{
                        fontSize: '0.9rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: 'var(--text-muted)',
                        marginBottom: '1rem'
                    }}>
                        From this…
                    </div>
                    <blockquote style={{
                        fontSize: '1.5rem',
                        fontFamily: 'var(--font-serif)',
                        lineHeight: '1.4',
                        borderLeft: '4px solid var(--accent-purple)',
                        paddingLeft: '1.5rem',
                        margin: 0,
                        color: 'var(--text-primary)'
                    }}>
                        “Generate a JSON prompt for an AI assistant that summarizes meeting notes.”
                    </blockquote>
                </div>

                {/* To This */}
                <div className="glass-panel" style={{
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.5rem',
                    background: 'rgba(0,0,0,0.3)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        fontSize: '0.9rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: 'var(--accent-green)',
                        marginBottom: '1rem'
                    }}>
                        To this…
                    </div>
                    <pre style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.9rem',
                        lineHeight: '1.6',
                        color: 'var(--text-secondary)',
                        overflowX: 'auto'
                    }}>
                        {`{
  "task": "summarize_meeting_notes",
  "inputs": {
    "meeting_transcript": "string",
    "summary_length": "short | medium | long",
    "tone": "formal | casual"
  }
}`}
                    </pre>
                    <div style={{
                        marginTop: '1rem',
                        fontSize: '0.85rem',
                        color: 'var(--text-muted)',
                        display: 'flex',
                        gap: '1rem'
                    }}>
                        <span>Clear.</span>
                        <span>Structured.</span>
                        <span>Ready.</span>
                    </div>
                </div>
            </div>
        </section>
    );
};
