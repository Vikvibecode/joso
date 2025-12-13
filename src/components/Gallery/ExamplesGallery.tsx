import React from 'react';

interface Example {
    label: string;
    prompt: string;
    icon: string;
}

const EXAMPLES: Example[] = [
    {
        label: "User Profile",
        prompt: "Create a user profile schema with name, email, age, and a list of recent transactions.",
        icon: "👤"
    },
    {
        label: "Config File",
        prompt: "Generate a dark theme configuration object with primary colors, font families, and spacing tokens.",
        icon: "⚙️"
    },
    {
        label: "Blog Post",
        prompt: "Create a JSON structure for a blog post including title, slug, author info, tags, and SEO metadata.",
        icon: "📝"
    }
];

interface ExamplesGalleryProps {
    onSelect: (prompt: string) => void;
}

export const ExamplesGallery: React.FC<ExamplesGalleryProps> = ({ onSelect }) => {
    return (
        <div style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '3rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            maxWidth: '900px',
            animation: 'fadeIn 0.8s ease-out 0.2s backwards'
        }}>
            <style>
                {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
            </style>

            {EXAMPLES.map((ex) => (
                <button
                    key={ex.label}
                    onClick={() => onSelect(ex.prompt)}
                    className="glass-panel"
                    style={{
                        padding: '1rem 1.5rem',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border-subtle)',
                        background: 'var(--glass-bg)',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s',
                        minWidth: '200px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                        e.currentTarget.style.borderColor = 'var(--border-glow)';
                        e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.background = 'var(--glass-bg)';
                        e.currentTarget.style.borderColor = 'var(--border-subtle)';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                    }}
                >
                    <span style={{ fontSize: '1.25rem' }}>{ex.icon}</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{ex.label}</span>
                </button>
            ))}
        </div>
    );
};
