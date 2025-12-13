import { useState, Suspense, lazy, useEffect } from 'react';
import { MainLayout } from './components/Layout/MainLayout';
import { Header } from './components/Layout/Header';
import { InputArea } from './components/PromptPortal';
import { OutputPanel } from './components/JsonDisplay/OutputPanel';
import { GeminiService } from './services/gemini';

// Lazy load landing sections to improve initial TTI (Time to Interactive)
const TrustSection = lazy(() => import('./components/Landing/TrustSection').then(m => ({ default: m.TrustSection })));
const HowItWorks = lazy(() => import('./components/Landing/HowItWorks').then(m => ({ default: m.HowItWorks })));
const FeaturesGrid = lazy(() => import('./components/Landing/FeaturesGrid').then(m => ({ default: m.FeaturesGrid })));
const AudienceSection = lazy(() => import('./components/Landing/AudienceSection').then(m => ({ default: m.AudienceSection })));
const ExamplesSection = lazy(() => import('./components/Landing/ExamplesSection').then(m => ({ default: m.ExamplesSection })));

const Footer = lazy(() => import('./components/Landing/Footer').then(m => ({ default: m.Footer })));

// Lazy load page components
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const DocsPage = lazy(() => import('./pages/DocsPage').then(m => ({ default: m.DocsPage })));

function App() {
  const [prompt, setPrompt] = useState('');
  const [jsonOutput, setJsonOutput] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiKey] = useState(''); // simplified
  const [showApp, setShowApp] = useState(false); // View switcher
  const [currentPage, setCurrentPage] = useState(''); // Hash-based routing

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setJsonOutput(null);

    try {
      if (apiKey) {
        const service = new GeminiService(apiKey);
        const result = await service.generateJson(prompt);
        setJsonOutput(result);
      } else {
        // Fallback Mock Logic
        setTimeout(() => {
          const mockResponse = {
            meta: { intent: "generated_from_prompt", model: "joso-v1-beta" },
            data: {
              prompt: prompt,
              status: "success",
              entities: [
                { id: 1, type: "concept", value: "Natural Language" },
                { id: 2, type: "target", value: "JSON" }
              ],
              timestamp: new Date().toISOString()
            }
          };
          setJsonOutput(JSON.stringify(mockResponse, null, 2));
          setIsGenerating(false);
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      setIsGenerating(false);
    }
  };

  // Clear prompt and output
  const handleClear = () => {
    setPrompt('');
    setJsonOutput(null);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+N or Cmd+N for new prompt
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        handleClear();
      }
      // Escape to clear output only
      if (e.key === 'Escape' && showApp) {
        setJsonOutput(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showApp]);

  // Hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setCurrentPage(hash);
      // Reset app view when navigating to pages
      if (hash === 'privacy' || hash === 'terms' || hash === 'docs') {
        setShowApp(false);
      }
    };

    handleHashChange(); // Initial check
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Render pages based on hash
  if (currentPage === 'privacy') {
    return (
      <MainLayout>
        <Header />
        <Suspense fallback={<div style={{ padding: '8rem 1rem' }}>Loading...</div>}>
          <PrivacyPage />
        </Suspense>
      </MainLayout>
    );
  }

  if (currentPage === 'terms') {
    return (
      <MainLayout>
        <Header />
        <Suspense fallback={<div style={{ padding: '8rem 1rem' }}>Loading...</div>}>
          <TermsPage />
        </Suspense>
      </MainLayout>
    );
  }

  if (currentPage === 'docs') {
    return (
      <MainLayout>
        <Header />
        <Suspense fallback={<div style={{ padding: '8rem 1rem' }}>Loading...</div>}>
          <DocsPage />
        </Suspense>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Header />

      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '3rem', marginTop: '6rem' }}>
        <h1 className="title-hero">
          Turn intent into <br />
          <span style={{ fontStyle: 'italic' }}>structured <span style={{ fontFamily: 'var(--font-mono)', fontStyle: 'normal', color: '#a78bfa' }}>&#123;JSON&#125;</span>.</span>
        </h1>
        <p style={{
          marginTop: '1.5rem',
          color: 'var(--text-secondary)',
          fontSize: '1.25rem',
          letterSpacing: '0.01em',
          fontWeight: 300,
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: '1.5'
        }}>
          Write in natural language.<br />
          Joso converts it into clean, validated, production-ready JSON — instantly.
        </p>
      </div>

      {!showApp ? (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '3rem' }}>
          <InputArea
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={() => setShowApp(true)}
            isGenerating={false}
            isLanding={true}
          />
          <div style={{ marginTop: '1.5rem', opacity: 0.7, fontSize: '0.9rem', display: 'flex', gap: '0.75rem', alignItems: 'center', color: 'var(--text-secondary)' }}>
            <span>No sign up required</span>
            <span style={{ opacity: 0.3 }}>|</span>
            <a href="#examples" style={{ color: 'var(--text-secondary)', textDecoration: 'none', borderBottom: '1px solid transparent', transition: 'border-color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = 'var(--text-secondary)'}
              onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = 'transparent'}
            >
              View examples
            </a>
          </div>
        </div>
      ) : (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeIn 0.5s ease' }}>
          <InputArea
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={handleGenerate}
            onClear={handleClear}
            isGenerating={isGenerating}
          />
          <OutputPanel
            data={jsonOutput}
            isLoading={isGenerating}
          />
          <button
            onClick={() => setShowApp(false)}
            style={{
              marginTop: '2rem',
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '0.9rem',
              opacity: 0.7
            }}
          >
            ← Back to Home
          </button>

          {/* Tips Section Below App */}
          <div style={{
            marginTop: '6rem',
            width: '100%',
            maxWidth: '1000px',
            padding: '0 1rem'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: '3rem',
              textAlign: 'center',
              fontFamily: 'var(--font-serif)'
            }}>
              How to get <span style={{ color: '#a78bfa' }}>perfect results</span>
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem'
            }}>
              {[
                {
                  title: 'Be Specific',
                  desc: 'List exact field names and types you need in the output.',
                  icon: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />,
                  color: '#f97316', // Orange
                  gradient: 'linear-gradient(180deg, rgba(249, 115, 22, 0) 0%, rgba(249, 115, 22, 0.15) 100%)',
                  glow: '0 0 40px -10px rgba(249, 115, 22, 0.3)'
                },
                {
                  title: 'Add Context',
                  desc: 'Mention if it is for an API response, config, or database schema.',
                  icon: <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z" />,
                  color: '#3b82f6', // Blue
                  gradient: 'linear-gradient(180deg, rgba(59, 130, 246, 0) 0%, rgba(59, 130, 246, 0.15) 100%)',
                  glow: '0 0 40px -10px rgba(59, 130, 246, 0.3)'
                },
                {
                  title: 'Use Examples',
                  desc: 'Provide a sample input to help the model understand the pattern.',
                  icon: <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />,
                  color: '#10b981', // Green
                  gradient: 'linear-gradient(180deg, rgba(16, 185, 129, 0) 0%, rgba(16, 185, 129, 0.15) 100%)',
                  glow: '0 0 40px -10px rgba(16, 185, 129, 0.3)'
                }
              ].map((card, i) => (
                <div key={i} style={{
                  position: 'relative',
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '24px',
                  padding: '2rem',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'default'
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = card.glow;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Glow Gradient Background */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '100%',
                    background: card.gradient,
                    pointerEvents: 'none',
                    opacity: 0.8
                  }} />

                  {/* Icon Box */}
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    color: card.color,
                    position: 'relative',
                    zIndex: 2
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      {card.icon}
                    </svg>
                  </div>

                  {/* Text */}
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem', color: '#fff' }}>
                      {card.title}
                    </h4>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '4rem',
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              flexWrap: 'wrap',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              opacity: 0.6
            }}>
              <span><kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.4rem', borderRadius: '4px', marginRight: '0.25rem' }}>Ctrl</kbd>+<kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.4rem', borderRadius: '4px', marginLeft: '0.25rem' }}>N</kbd> New prompt</span>
              <span><kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.4rem', borderRadius: '4px', marginRight: '0.25rem' }}>Esc</kbd> Clear output</span>
            </div>
          </div>
        </div>
      )}

      {/* Landing Content - Only show on Landing View */}
      {!showApp && (
        <>
          {/* Secondary CTA / Scroll Hint */}


          <Suspense fallback={<div style={{ height: '200px' }} />}>
            <TrustSection />
            <HowItWorks />
            <FeaturesGrid />
            <AudienceSection />
            <ExamplesSection />

          </Suspense>


          {/* Bottom CTA */}
          <div style={{ textAlign: 'center', margin: '8rem 0 4rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1rem' }}>Ready to structure your ideas?</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Start with a sentence. End with perfect JSON.</p>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => setShowApp(true), 800);
              }}
              className="btn-premium-glow"
              style={{ margin: '0 auto' }}
            >
              <span className="btn-premium-glow-content">Generate JSON</span>
            </button>
          </div>

          {/* Footer is always visible or maybe only on landing? Let's keep it visible but maybe conditionally if desired, but user didn't specify. Keeping it for now inside the conditional block above makes sense if we want "App Mode" to be clean. */}
          {/* Actually, user said "redirect for the actual application". Usually apps don't have the marketing footer. */}
          {/* I'll move footer inside the landing view block as well. */}

          <Suspense fallback={null}>
            <Footer />
          </Suspense>

        </>
      )}
    </MainLayout >
  )
}

export default App
