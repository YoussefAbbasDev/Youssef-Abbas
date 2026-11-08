import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaWhatsapp } from 'react-icons/fa';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useNavbar } from '../contexts/NavbarContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLocation, useNavigate } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isNavbarVisible, isMenuOpen, setIsMenuOpen } = useNavbar();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const menuButtonRef = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    } else if (location.pathname === '/' && !location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // Close the menu on route change.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.hash, setIsMenuOpen]);

  // Lock page scroll, handle Escape and move focus while the menu is open.
  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstLinkRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen, setIsMenuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (href.startsWith('#')) {
      if (location.pathname === '/') {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', href);
        }
      } else {
        navigate('/' + href);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-40 safe-top transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? 'dark:bg-slate-900/85 bg-white/85 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a
            href="/"
            className="group flex min-h-11 min-w-11 items-center justify-center gap-2.5 rounded-lg"
            aria-label="Youssef Abbas — home"
          >
            <img
              src="/logo-64.png"
              alt=""
              width="32"
              height="32"
              className="w-8 h-8 rounded-full group-hover:scale-110 transition-transform"
            />
            <span className="font-bold text-lg dark:text-white text-slate-900 hidden sm:inline">Youssef</span>
          </a>

          <div className="flex items-center gap-1 sm:gap-2">
            <nav
              aria-label="Primary navigation"
              className={`hidden lg:flex items-center gap-1 ${isNavbarVisible ? '' : 'invisible'}`}
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-500/5 transition-colors font-semibold text-sm"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-11 w-11 items-center justify-center rounded-full border dark:border-slate-700 border-slate-200 dark:bg-slate-900/60 bg-white/70 dark:text-slate-200 text-slate-600 hover:text-cyan-600 dark:hover:text-cyan-300 hover:border-cyan-400 dark:hover:border-cyan-400 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
            </button>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full border dark:border-slate-700 border-slate-200 dark:bg-slate-900/60 bg-white/70 dark:text-white text-slate-800 hover:border-cyan-400 transition-colors"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="lg:hidden absolute top-full left-0 right-0 max-h-[calc(100dvh-5rem)] overflow-y-auto dark:bg-[#070014] bg-white backdrop-blur-xl border-t dark:border-slate-800 border-slate-200 shadow-2xl safe-bottom"
          >
            <nav aria-label="Mobile navigation" className="px-5 py-4">
              <ul className="flex flex-col">
                {NAV_ITEMS.map((item, index) => (
                  <li key={item.href}>
                    <a
                      ref={index === 0 ? firstLinkRef : null}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="flex items-center justify-between py-4 text-2xl font-bold uppercase tracking-tight dark:text-white text-slate-900 border-b dark:border-white/10 border-slate-200/80 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
                    >
                      {item.label}
                      <span className="font-cascadia text-xs font-normal tracking-widest dark:text-cyan-400/70 text-cyan-600/70">
                        0{index + 1}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-3 pt-6">
                <a
                  href="https://github.com/YoussefAbbasDev"
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="flex items-center gap-2 rounded-full border dark:border-slate-700 border-slate-200 px-4 py-2.5 text-sm font-semibold dark:text-slate-200 text-slate-700 min-h-11"
                >
                  <FaGithub aria-hidden="true" /> GitHub
                </a>
                <a
                  href="https://wa.me/201027295412"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border dark:border-slate-700 border-slate-200 px-4 py-2.5 text-sm font-semibold dark:text-slate-200 text-slate-700 min-h-11"
                >
                  <FaWhatsapp aria-hidden="true" /> WhatsApp
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
