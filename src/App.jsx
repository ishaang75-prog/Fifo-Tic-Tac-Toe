import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Play } from './pages/Play';
import { HowToPlay } from './pages/HowToPlay';
import { About } from './pages/About';
import { Statistics } from './components/Statistics';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      <main className="flex-1 flex flex-col items-center justify-center">
        {activePage === 'home' && <Home setActivePage={setActivePage} />}
        {activePage === 'play' && <Play onGoHome={() => setActivePage('home')} />}
        {activePage === 'how-to-play' && <HowToPlay />}
        {activePage === 'stats' && (
          <div className="py-8 px-4 w-full">
            <Statistics />
          </div>
        )}
        {activePage === 'about' && <About />}
      </main>

      <Footer />
    </div>
  );
}