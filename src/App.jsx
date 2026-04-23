import React, { useState, useEffect, useRef } from 'react';
import Topbar from './components/layout/Topbar';
import FacebookChat from './components/FacebookChat';

// Page imports
import Home from './pages/Home';
import Service from './pages/Service';
import Queue from './pages/Queue';
import About from './pages/About';
import Price from './pages/Price';
import Portfolio from './pages/Portfolio';
import Articles from './pages/Articles';

function App() {
  const cursorRef = useRef(null);
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const [activeTab, setActiveTab] = useState(() => {
    return sessionStorage.getItem('activeTab') || 'Home';
  });

  useEffect(() => {
    sessionStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'F5') {
        e.preventDefault();
        window.location.reload();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col bg-white min-h-screen font-sans relative overflow-x-hidden">
      {/* Background Glow */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 w-[800px] h-[800px] -ml-[400px] -mt-[400px] rounded-full mix-blend-multiply opacity-50 z-0 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(114, 209, 183, 0.4) 0%, rgba(255, 255, 255, 0) 60%)',
          willChange: 'transform'
        }}
      />

      <Topbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 overflow-y-auto">
        {activeTab === 'Home' && <Home />}
        {activeTab === 'Portfolio' && <Portfolio />}
        {activeTab === 'Articles' && <Articles />}
        {activeTab === 'Service' && <Service />}
        {activeTab === 'Queue' && <Queue />}
        {activeTab === 'About' && <About />}
        {activeTab === 'Price' && <Price />}
      </main>

      <FacebookChat pageId="123456789012345" />
    </div>
  );
}

export default App;