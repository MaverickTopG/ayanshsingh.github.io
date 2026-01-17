import React, { useState, useEffect } from 'react';
import IntroOverlay from './components/IntroOverlay';
import CursorTrail from './components/CursorTrail';
import NoiseOverlay from './components/NoiseOverlay';
import PathBackdrop from './components/PathBackdrop';
import TopBar from './components/TopBar';
import LaunchPage from './pages/LaunchPage';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Prevent scroll during intro
  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isLoaded]);

  return (
    <>
      <PathBackdrop />
      <NoiseOverlay />
      
      {/* Hide cursor on touch devices to prevent issues, show on desktop */}
      <div className="hidden md:block">
        <CursorTrail />
      </div>

      {!isLoaded && <IntroOverlay onComplete={() => setIsLoaded(true)} />}

      <TopBar />

      <main className="w-full relative z-10 bg-void min-h-screen">
        <LaunchPage />
      </main>
    </>
  );
}

export default App;
