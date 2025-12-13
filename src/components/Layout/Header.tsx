import React from 'react';

export const Header: React.FC = () => {
    return (
        <header style={{
            position: 'fixed',
            top: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
            border: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(10, 10, 11, 0.6)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '100px',
            padding: '0 2rem',
            width: 'max-content',
            maxWidth: '90%',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '3rem',
                width: '100%'
            }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="/logo.png" alt="Joso" className="logo-header" />
                </div>

                {/* Nav Links */}
                <nav style={{ display: 'flex', gap: '2rem' }}>
                    <a href="#examples" style={{
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        transition: 'color 0.2s',
                        fontWeight: 500
                    }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                    >
                        Examples
                    </a>
                    <a href="#docs" style={{
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        transition: 'color 0.2s',
                        fontWeight: 500
                    }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                    >
                        Docs
                    </a>
                </nav>
            </div>
        </header>
    );
};
