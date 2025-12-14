import React, { useEffect, useState, useRef } from 'react';

interface OutputPanelProps {
    data: string | null;
    isLoading: boolean;
}

export const OutputPanel: React.FC<OutputPanelProps> = ({ data, isLoading }) => {
    const [displayedContent, setDisplayedContent] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [isMinified, setIsMinified] = useState(false);
    const timeoutsRef = useRef<number[]>([]);

    // Syntax highlighting for JSON (simulated for code)
    const syntaxHighlight = (text: string): string => {
        // Simple check if it looks like JSON
        if (text.trim().startsWith('{') || text.trim().startsWith('[')) {
            return text
                .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?)/g, (match) => {
                    if (/:$/.test(match)) {
                        return `<span style="color: #a78bfa;">${match.slice(0, -1)}</span>:`;
                    }
                    return `<span style="color: #34d399;">${match}</span>`;
                })
                .replace(/\b(true|false)\b/g, '<span style="color: #f472b6;">$1</span>')
                .replace(/\b(null)\b/g, '<span style="color: #94a3b8;">$1</span>')
                .replace(/\b(-?\d+\.?\d*)\b/g, '<span style="color: #fbbf24;">$1</span>');
        }
        // Fallback for code (basic coloring)
        return text
            .replace(/\b(interface|type|export|const|import|from|z)\b/g, '<span style="color: #f472b6;">$1</span>')
            .replace(/\b(string|number|boolean|Date)\b/g, '<span style="color: #fbbf24;">$1</span>');
    };

    const isValidJson = (text: string) => {
        try {
            JSON.parse(text);
            return true;
        } catch {
            return false;
        }
    };

    const isValidCode = (text: string) => {
        // Naive code validation
        return text.includes('interface') || text.includes('z.object') || text.includes('type ');
    };

    const isValid = data ? (isValidJson(data) || isValidCode(data)) : false;
    const isCode = data && isValidCode(data);

    useEffect(() => {
        // Reset when data changes or cleared
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];

        if (!data) {
            setDisplayedContent('');
            return;
        }

        setDisplayedContent('');
        let currentText = '';
        const speed = 2; // Faster typing for code

        data.split('').forEach((char, index) => {
            const timeout = window.setTimeout(() => {
                currentText += char;
                setDisplayedContent(currentText);
            }, index * speed);
            timeoutsRef.current.push(timeout);
        });

        return () => {
            timeoutsRef.current.forEach(clearTimeout);
        };
    }, [data]);

    // ... (rest of component) ...


    const handleCopy = () => {
        if (!data) return;
        const copyData = isMinified ? JSON.stringify(JSON.parse(data)) : data;
        navigator.clipboard.writeText(copyData);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleDownload = () => {
        if (!data) return;
        const downloadData = isMinified ? JSON.stringify(JSON.parse(data)) : data;
        const blob = new Blob([downloadData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `joso-output-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const getFormattedContent = () => {
        if (!displayedContent) return '';
        try {
            const parsed = JSON.parse(displayedContent);
            return isMinified ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2);
        } catch {
            return displayedContent; // Return as-is if not valid JSON yet
        }
    };

    const showPlaceholder = !data && !isLoading;

    if (showPlaceholder) {
        // Optional: Render nothing or a placeholder state
        // For this design, we'll keep it hidden until there is content or loading starts
        // But based on the previous code, let's show a "Waiting" state if desired, 
        // or just hide it to make the entry animation impactful.
        // Let's hide it initially as requested in design "slides upward".
        return null;
    }

    return (
        <div style={{
            width: '100%',
            maxWidth: '700px',
            marginTop: '2rem',
            animation: 'fadeInUp 0.6s ease-out forwards',
            opacity: 0,
            transform: 'translateY(20px)'
        }}>
            <style>
                {`
          @keyframes fadeInUp {
            to { opacity: 1; transform: translateY(0); }
          }
        `}
            </style>
            <div className="glass-panel" style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                background: 'rgba(10, 10, 12, 0.4)',
                border: isLoading ? '1px solid var(--accent-purple)' : '1px solid var(--glass-border)',
                transition: 'border 0.3s'
            }}>
                {/* Toolbar */}
                <div style={{
                    padding: '0.75rem 1.25rem',
                    borderBottom: '1px solid var(--border-subtle)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'rgba(255,255,255,0.02)',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent-red)' }} />
                            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent-amber)' }} />
                            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent-green)' }} />
                        </div>
                        {/* Validation Badge */}
                        {data && !isLoading && (
                            <div style={{
                                marginLeft: '1rem',
                                padding: '0.2rem 0.6rem',
                                borderRadius: 'var(--radius-pill)',
                                background: isValid ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                border: isValid ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(239, 68, 68, 0.2)',
                                color: isValid ? '#34d399' : '#f87171',
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.3rem'
                            }}>
                                {isValid ? '✓ Valid' : '⚠ Invalid'} {isCode ? 'Code' : 'JSON'}
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            onClick={() => setIsMinified(!isMinified)}
                            style={{
                                fontSize: '0.75rem',
                                color: 'var(--text-secondary)',
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'color 0.2s'
                            }}>
                            {isMinified ? 'Pretty' : 'Minify'}
                        </button>
                        <button
                            onClick={handleCopy}
                            style={{
                                fontSize: '0.75rem',
                                color: isCopied ? 'var(--accent-green)' : 'var(--text-secondary)',
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'color 0.2s'
                            }}>
                            {isCopied ? 'Copied' : 'Copy'}
                        </button>
                        <button
                            onClick={handleDownload}
                            style={{
                                fontSize: '0.75rem',
                                color: 'var(--text-secondary)',
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer'
                            }}>
                            Download
                        </button>
                    </div>
                </div>

                {/* Content with Syntax Highlighting */}
                <pre style={{
                    padding: '1.5rem',
                    margin: 0,
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem',
                    lineHeight: '1.7',
                    overflowX: 'auto',
                    whiteSpace: 'pre-wrap',
                    minHeight: '100px'
                }}>
                    {isLoading ? (
                        <span style={{ color: 'var(--text-muted)' }}>Generating structure...</span>
                    ) : (
                        <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(getFormattedContent()) }} />
                    )}
                </pre>
            </div>
        </div>
    );
};
