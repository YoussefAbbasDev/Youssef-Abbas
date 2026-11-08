import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Projects from './Projects';
import { LuBadge } from 'react-icons/lu';
import { PiCodeBold } from 'react-icons/pi';

const TABS = [
  { id: 'Projects', label: 'Projects', icon: <PiCodeBold className="mb-1 text-[1.7em]" aria-hidden="true" /> },
  { id: 'Certificate', label: 'Certificates', icon: <LuBadge className="mb-1 text-[1.5em]" aria-hidden="true" /> },
];

const ProjectSection = () => {
  const [activeTab, setActiveTab] = useState('Projects');

  const handleTabKeyDown = (event, index) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const nextIndex = event.key === 'ArrowRight' ? (index + 1) % TABS.length : (index - 1 + TABS.length) % TABS.length;
    const next = TABS[nextIndex];
    setActiveTab(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  };

  return (
    <motion.div
      initial={{ y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-12 text-center sm:mb-16">
        <h2
          id="portfolio-heading"
          className="mb-4 text-3xl font-bold dark:text-white text-slate-900 sm:text-4xl md:text-5xl"
        >
          Selected{' '}
          <span className="bg-gradient-to-r from-cyan-500 to-emerald-500 bg-clip-text text-transparent dark:from-cyan-400 dark:to-emerald-400">
            Work
          </span>
        </h2>
        <p className="mx-auto max-w-xl px-2 text-base dark:text-slate-400 text-slate-600 sm:text-lg">
          Projects I have shipped and certificates I have earned along the way.
        </p>
      </div>

      <div className="mb-10 w-full sm:mb-12">
        <div className="flex justify-center">
          <div
            role="tablist"
            aria-label="Portfolio sections"
            className="inline-flex w-full max-w-md rounded-3xl border dark:border-slate-800 border-slate-200 bg-white p-2 shadow-lg backdrop-blur-md dark:bg-gradient-to-r dark:from-[#101624] dark:via-[#0a1627] dark:to-[#0a223a]"
            style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
          >
            {TABS.map((tab, index) => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls="portfolio-panel"
                tabIndex={activeTab === tab.id ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={`relative flex flex-1 flex-col items-center justify-center rounded-2xl px-2 py-5 font-semibold text-base transition-colors duration-300 outline-none sm:py-6 ${
                  activeTab === tab.id
                    ? 'dark:text-white text-slate-900'
                    : 'text-slate-500 hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-300'
                }`}
                style={{ zIndex: 1, minWidth: 0 }}
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute inset-0 rounded-2xl border border-slate-200 bg-slate-100 dark:border-transparent dark:bg-gradient-to-br dark:from-[#0a223a] dark:to-[#101624]"
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                    style={{ zIndex: -1, opacity: 0.96 }}
                  />
                )}
                <span className="relative z-10 flex flex-col items-center gap-1.5">
                  {tab.icon}
                  <span className="font-bold">{tab.label}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        role="tabpanel"
        id="portfolio-panel"
        aria-labelledby={`tab-${activeTab}`}
      >
        <Projects activeTab={activeTab} />
      </div>
    </motion.div>
  );
};

export default ProjectSection;
