import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Squares from './components/Squares';
import { NavbarProvider } from './contexts/NavbarContext';
import { useTheme } from './contexts/ThemeContext';

// Pages
import Home from './pages/Home';

function App() {
  const { theme } = useTheme();
  const location = useLocation();

  return (
    <NavbarProvider>
      <div className="relative min-h-screen dark:bg-[#060010] bg-slate-50 transition-colors duration-500 overflow-x-clip">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-cyan-500 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-slate-950 focus:shadow-lg"
        >
          Skip to content
        </a>

        {/* Decorative animated background */}
        <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
          <Squares
            speed={0.2}
            squareSize={35}
            direction="diagonal"
            borderColor={theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(15, 23, 42, 0.05)'}
            hoverFillColor={theme === 'dark' ? 'rgba(31, 137, 187, 0.53)' : 'rgba(8, 145, 178, 0.1)'}
            gradientColorStart={theme === 'dark' ? '#000428' : '#f1f5f9'}
            gradientColorEnd={theme === 'dark' ? '#002545ff' : '#e2e8f0'}
          />
        </div>

        <Header />

        {/* Page Routing with Transitions */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
          </Routes>
        </AnimatePresence>

        <footer className="safe-bottom relative z-10 py-10 text-center text-sm dark:text-gray-400 text-slate-600">
          © {new Date().getFullYear()} Youssef Mohamed Abbas. All rights reserved.
        </footer>
      </div>
    </NavbarProvider>
  );
}

export default App;
