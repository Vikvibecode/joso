import React from 'react';

export const PrivacyPage: React.FC = () => {
    return (
        <div className="container" style={{ padding: '8rem 1rem 4rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '2rem' }}>
                Privacy Policy
            </h1>

            <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1rem' }}>
                <p style={{ marginBottom: '1.5rem' }}>
                    <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>

                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>
                    1. Information We Collect
                </h2>
                <p style={{ marginBottom: '1rem' }}>
                    Joso is designed with privacy in mind. We collect minimal data necessary to provide our service:
                </p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
                    <li>Text prompts you enter (processed in real-time, not stored)</li>
                    <li>Anonymous usage analytics to improve the service</li>
                    <li>Browser type and version for compatibility purposes</li>
                </ul>

                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>
                    2. How We Use Your Information
                </h2>
                <p style={{ marginBottom: '1.5rem' }}>
                    Your prompts are processed in real-time to generate JSON output. We do not store, log, or use your input data for training purposes. Analytics data is aggregated and anonymized.
                </p>

                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>
                    3. Data Security
                </h2>
                <p style={{ marginBottom: '1.5rem' }}>
                    All data transmission is encrypted using industry-standard TLS. We implement security best practices to protect any data processed through our service.
                </p>

                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>
                    4. Third-Party Services
                </h2>
                <p style={{ marginBottom: '1.5rem' }}>
                    Joso may use AI services (such as Google's Gemini API) to process your requests. These services have their own privacy policies. We recommend reviewing them for complete transparency.
                </p>

                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>
                    5. Contact Us
                </h2>
                <p style={{ marginBottom: '1.5rem' }}>
                    If you have questions about this Privacy Policy, please contact us at privacy@joso.app
                </p>
            </div>

            <a href="#" style={{
                display: 'inline-block',
                marginTop: '2rem',
                color: 'var(--accent-purple)',
                textDecoration: 'none',
                fontSize: '0.9rem'
            }}>
                ← Back to Home
            </a>
        </div>
    );
};
