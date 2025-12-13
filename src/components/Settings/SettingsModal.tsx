import React, { useState, useEffect } from 'react';

interface SettingsModalProps {
    apiKey: string;
    onSave: (key: string) => void;
    onClose: () => void;
    isOpen: boolean;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ apiKey, onSave, onClose, isOpen }) => {
    const [key, setKey] = useState(apiKey);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setKey(apiKey);
        } else {
            setTimeout(() => setIsVisible(false), 300);
        }
    }, [isOpen, apiKey]);

    if (!isVisible && !isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: isOpen ? 'rgba(0,0,0,0.6)' : 'transparent',
            backdropFilter: isOpen ? 'blur(4px)' : 'none',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            opacity: isOpen ? 1 : 0
        }} onClick={onClose}>

            <div style={{
                width: '90%',
                maxWidth: '450px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-glow)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(10px)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }} onClick={e => e.stopPropagation()}>

                <h2 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.75rem',
                    marginBottom: '0.5rem',
                    color: 'var(--text-primary)'
                }}>
                    Settings
                </h2>

                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                    Connect your Google Gemini API key to enable real conversions.
                </p>

                <label style={{
                    display: 'block',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    color: 'var(--text-muted)',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}>
                    API Key
                </label>

                <input
                    type="password"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="sk-..."
                    style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border-subtle)',
                        background: 'rgba(255,255,255,0.03)',
                        color: 'var(--text-primary)',
                        fontSize: '1rem',
                        outline: 'none',
                        marginBottom: '1.5rem',
                        fontFamily: 'var(--font-mono)'
                    }}
                />

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                    <button onClick={onClose} style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontSize: '0.95rem'
                    }}>
                        Cancel
                    </button>
                    <button onClick={() => onSave(key)} style={{
                        background: 'var(--text-primary)',
                        color: 'var(--bg-primary)',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0.6rem 1.25rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}>
                        Save Key
                    </button>
                </div>

            </div>
        </div>
    );
};
