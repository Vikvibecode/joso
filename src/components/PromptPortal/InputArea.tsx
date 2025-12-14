import React, { useState } from 'react';

interface InputAreaProps {
    prompt: string;
    setPrompt: (value: string) => void;
    onSubmit: () => void;
    onClear?: () => void;
    isGenerating: boolean;
    isLanding?: boolean;
    mode?: string;
    onModeChange?: (mode: string) => void;
}

export const InputArea: React.FC<InputAreaProps> = ({
    prompt,
    setPrompt,
    onSubmit,
    onClear,
    isGenerating,
    isLanding = false,
    mode = 'Balanced',
    onModeChange
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [placeholder, setPlaceholder] = useState('');

    React.useEffect(() => {
        if (isFocused || prompt) return;

        const examples = [
            'Generate a user profile schema...',
            'Create a weather API response...',
            'Define a game character config...',
            'Structure a music playlist...',
            'Format a blog post metadata...'
        ];

        let currentExampleIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let timeoutId: number;

        const type = () => {
            const currentExample = examples[currentExampleIndex];

            if (isDeleting) {
                setPlaceholder(currentExample.substring(0, currentCharIndex - 1));
                currentCharIndex--;
            } else {
                setPlaceholder(currentExample.substring(0, currentCharIndex + 1));
                currentCharIndex++;
            }

            let typeSpeed = isDeleting ? 30 : 50;

            if (!isDeleting && currentCharIndex === currentExample.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentExampleIndex = (currentExampleIndex + 1) % examples.length;
                typeSpeed = 500; // Pause before new word
            }

            timeoutId = window.setTimeout(type, typeSpeed);
        };

        type();

        return () => clearTimeout(timeoutId);
    }, [isFocused, prompt]);

    return (
        <div style={{
            width: '100%',
            maxWidth: '700px',
            position: 'relative',
            zIndex: 10
        }}>
            <div
                className="glass-panel"
                style={{
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.5rem',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: isFocused ? 'var(--shadow-glow), 0 0 0 1px rgba(139, 92, 246, 0.2)' : 'none',
                    border: isFocused ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid var(--glass-border)'
                }}
            >
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={isFocused ? "Describe what you want the JSON to represent…" : placeholder}
                    style={{
                        width: '100%',
                        minHeight: '100px',
                        resize: 'none',
                        fontSize: '1.125rem',
                        lineHeight: '1.6',
                        color: 'var(--text-primary)',
                        background: 'transparent',
                        outline: 'none',
                        border: 'none',
                        fontFamily: 'var(--font-sans)',
                        cursor: 'text'
                    }}
                />

                {/* Mode Selector & Actions */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '1.5rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border-subtle)',
                    gap: '1rem',
                    flexWrap: 'wrap'
                }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        {/* Simple Mode Pills */}
                        {['Balanced', 'Strict', 'Creative', 'TypeScript', 'Zod'].map((m) => {
                            const isActive = mode === m;
                            return (
                                <button
                                    key={m}
                                    onClick={() => onModeChange?.(m)}
                                    style={{
                                        fontSize: '0.75rem',
                                        padding: '0.3rem 0.8rem',
                                        borderRadius: 'var(--radius-pill)',
                                        // Glass effect
                                        background: isActive
                                            ? 'rgba(255, 255, 255, 0.12)'
                                            : 'rgba(255, 255, 255, 0.03)',
                                        backdropFilter: 'blur(10px)',
                                        WebkitBackdropFilter: 'blur(10px)', // Safari
                                        color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.6)',
                                        // Border & Glow
                                        border: isActive
                                            ? '1px solid rgba(255, 255, 255, 0.3)'
                                            : '1px solid rgba(255, 255, 255, 0.08)',
                                        boxShadow: isActive
                                            ? '0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.4)'
                                            : 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                        fontWeight: isActive ? 500 : 400,
                                        letterSpacing: '0.02em',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                                            e.currentTarget.style.transform = 'translateY(-1px)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }
                                    }}
                                >
                                    {m}
                                </button>
                            );
                        })}

                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        {/* Clear Button - only show in app mode */}
                        {!isLanding && onClear && (
                            <button
                                onClick={onClear}
                                style={{
                                    fontSize: '0.75rem',
                                    padding: '0.5rem 0.75rem',
                                    borderRadius: 'var(--radius-pill)',
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    color: 'var(--text-secondary)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'}
                            >
                                ✕ Clear
                            </button>
                        )}

                        <button
                            className="btn-premium-glow"
                            onClick={onSubmit}
                            disabled={!isLanding && (isGenerating || !prompt.trim())}
                            style={{
                                opacity: (!isLanding && (isGenerating || !prompt.trim())) ? 0.6 : 1,
                            }}
                        >
                            <span className="btn-premium-glow-content">
                                {isLanding ? 'Try Joso' : (isGenerating ? 'Processing...' : 'Generate')}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
