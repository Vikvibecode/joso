import React from 'react';
import { ParticleBackground } from '../Effects/ParticleBackground';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <ParticleBackground />
      {/* Ambient Background Effects */}
      <div style={{
        position: 'fixed',
        top: '-20%',
        left: '20%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
        filter: 'blur(80px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'fixed',
        bottom: '-10%',
        right: '10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(167, 139, 250, 0.1) 0%, transparent 70%)',
        filter: 'blur(100px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <main className="main-layout" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '4rem 1rem',
        position: 'relative',
        zIndex: 1,
        maxWidth: '1200px', // Increased max-width for landing pages
        margin: '0 auto'
      }}>
        {children}
      </main>
    </>
  );
};
