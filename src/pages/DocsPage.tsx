import React from 'react';

export const DocsPage: React.FC = () => {
    return (
        <div className="container" style={{ padding: '8rem 1rem 4rem', maxWidth: '900px', margin: '0 auto' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                Documentation
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>
                Learn how to get the most out of Joso
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

                {/* Getting Started */}
                <section>
                    <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--accent-purple)' }}>01</span> Getting Started
                    </h2>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                        <p style={{ marginBottom: '1rem' }}>
                            Joso converts natural language descriptions into structured JSON. Simply describe what you want, and Joso will generate valid JSON output.
                        </p>
                        <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '1rem', marginTop: '1rem' }}>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Input:</span> "Create a user profile with name, email, and age"
                            </p>
                        </div>
                    </div>
                </section>

                {/* Modes */}
                <section>
                    <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--accent-purple)' }}>02</span> Output Modes
                    </h2>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                        <p style={{ marginBottom: '1rem' }}>Joso offers three output modes:</p>
                        <ul style={{ marginLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Balanced</strong> — Best for general use. Clean, readable JSON with sensible defaults.</li>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Strict</strong> — Minimal output. No extra fields, strict typing, production-ready.</li>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Creative</strong> — Adds example data, nested structures, and richer schemas.</li>
                        </ul>
                    </div>
                </section>

                {/* Tips */}
                <section>
                    <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--accent-purple)' }}>03</span> Tips for Better Results
                    </h2>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                        <ul style={{ marginLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}>Be specific about field names and data types</li>
                            <li style={{ marginBottom: '0.5rem' }}>Mention if you need arrays, nested objects, or specific formats</li>
                            <li style={{ marginBottom: '0.5rem' }}>Include context (e.g., "for an API response" or "for a config file")</li>
                            <li style={{ marginBottom: '0.5rem' }}>Use examples when describing complex structures</li>
                        </ul>
                    </div>
                </section>

                {/* Examples */}
                <section>
                    <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--accent-purple)' }}>04</span> Example Prompts
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                            "Generate a REST API error response with code, message, and timestamp",
                            "Create a product catalog item with name, price, variants, and inventory",
                            "Define a user settings object with theme, notifications, and language preferences"
                        ].map((example, i) => (
                            <div key={i} style={{
                                background: 'var(--glass-bg)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '8px',
                                padding: '1rem',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.85rem',
                                color: 'var(--text-secondary)'
                            }}>
                                {example}
                            </div>
                        ))}
                    </div>
                </section>

            </div>

            <a href="#" style={{
                display: 'inline-block',
                marginTop: '3rem',
                color: 'var(--accent-purple)',
                textDecoration: 'none',
                fontSize: '0.9rem'
            }}>
                ← Back to Home
            </a>
        </div>
    );
};
