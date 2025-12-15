import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer style={{
            position: 'relative',
            width: '100%',
            padding: '8rem 0 0', // More top space, no bottom padding so text sits flush
            overflow: 'hidden',
            // background removed to let body ambient bg show through
            // border removed
        }}>
            {/* Massive Background Text */}
            <div style={{
                position: 'absolute',
                bottom: '-3.5rem', // Slight offset to anchor it visually
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: 'clamp(10rem, 30vw, 25rem)',
                fontWeight: 900,
                letterSpacing: '-0.06em',
                lineHeight: 1,
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                pointerEvents: 'none',
                userSelect: 'none',
                zIndex: 0,
                width: '100%',
                textAlign: 'center'
            }}>
                Joso
            </div>



            <div className="container" style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', maxWidth: '1200px' }}>

                {/* Info Column */}
                <div style={{ gridColumn: 'span 1' }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <img src="/logo.png" alt="Joso" className="logo-footer" />
                    </div>

                    {/* Status Badge */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.8rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: '999px', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 8px rgba(16,185,129,0.4)' }}></span>
                        All systems normal
                    </div>


                    {/* Peerlist Badge */}
                    <div style={{ marginBottom: '2rem' }}>
                        <a href="https://peerlist.io/vikasacharya/project/joso--intent-into-structure" target="_blank" rel="noreferrer">
                            <img
                                src="https://peerlist.io/api/v1/projects/embed/PRJHP6LRJABKMP9DDF6E6LD8GDJB7Q?showUpvote=false&theme=dark"
                                alt="JOSO | Intent Into Structure "
                                style={{ width: 'auto', height: '72px' }}
                            />
                        </a>
                    </div>

                    {/* Social Icons */}
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {['twitter', 'github'].map(platform => (
                            <a key={platform} href="#" style={{ color: 'var(--text-secondary)', opacity: 0.6, transition: 'opacity 0.2s', display: 'flex' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}>
                                {platform === 'twitter' && <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>}
                                {platform === 'github' && <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Link Columns - with proper hash routes */}
                {[
                    { title: 'Product', links: [{ label: 'Examples', href: '#examples' }, { label: 'Docs', href: '#docs' }] },
                    { title: 'Legal', links: [{ label: 'Privacy', href: '#privacy' }, { label: 'Terms', href: '#terms' }] }
                ].map((col, i) => (
                    <div key={i}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>{col.title}</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {col.links.map(link => (
                                <li key={link.label}>
                                    <a href={link.href} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

            </div>
        </footer>
    );
};
