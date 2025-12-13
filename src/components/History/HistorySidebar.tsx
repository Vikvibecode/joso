import React, { useEffect, useState } from 'react';

export interface HistoryItem {
    id: string;
    prompt: string;
    output: string;
    timestamp: string;
}

interface HistorySidebarProps {
    isOpen: boolean;
    onClose: () => void;
    items: HistoryItem[];
    onSelect: (item: HistoryItem) => void;
}

export const HistorySidebar: React.FC<HistorySidebarProps> = ({ isOpen, onClose, items, onSelect }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            setTimeout(() => setIsVisible(false), 300);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 90,
                    background: 'rgba(0,0,0,0.5)',
                    opacity: isOpen ? 1 : 0,
                    transition: 'opacity 0.3s',
                    pointerEvents: isOpen ? 'auto' : 'none'
                }}
            />

            {/* Panel */}
            <div style={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: '320px',
                height: '100%',
                zIndex: 95,
                background: 'var(--bg-surface-elevated)',
                borderLeft: '1px solid var(--border-glow)',
                transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{
                    padding: '1.5rem',
                    borderBottom: '1px solid var(--border-subtle)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h3 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.25rem',
                        color: 'var(--text-primary)'
                    }}>
                        History
                    </h3>
                    <button onClick={onClose} style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontSize: '1.5rem'
                    }}>×</button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                    {items.length === 0 && (
                        <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '2rem' }}>
                            No history yet. Start creating!
                        </p>
                    )}

                    {items.map(item => (
                        <div
                            key={item.id}
                            onClick={() => onSelect(item)}
                            style={{
                                padding: '1rem',
                                marginBottom: '0.75rem',
                                borderRadius: 'var(--radius-lg)',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid transparent',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                                e.currentTarget.style.borderColor = 'transparent';
                            }}
                        >
                            <p style={{
                                color: 'var(--text-primary)',
                                fontSize: '0.9rem',
                                marginBottom: '0.4rem',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical'
                            }}>
                                {item.prompt}
                            </p>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                {new Date(item.timestamp).toLocaleDateString()} • {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
