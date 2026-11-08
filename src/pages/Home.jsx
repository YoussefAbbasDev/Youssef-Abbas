import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaInstagram, FaDownload, FaBriefcase, FaWhatsapp, FaMagic } from 'react-icons/fa';
import { AnimatedGradientTextDemo } from '../components/AnimatedGradientTextDemo';
import GradientText from '../components/GradientText';
import TextGenerateEffect from '../components/text-generate-effect';
import Skills from '../components/Skills';
import { ButtonMovingBorder } from '../components/MovingBorderButton';
import ProjectSection from '../components/ProjectSection';
import Contact from '../components/Contact';
import { useTheme } from '../contexts/ThemeContext';

// The 3D badge is intentionally loaded only on request. A 27 KB poster gives
// the same first impression without downloading the 3 MB physics bundle.
const Lanyard = lazy(() => import('../components/Lanyard/Lanyard'));

const LanyardSkeleton = () => (
  <div className="flex h-full w-full items-center justify-center" aria-hidden="true">
    <div className="h-32 w-32 animate-pulse rounded-full border border-cyan-400/20 bg-cyan-400/10" />
  </div>
);

const Home = () => {
  const { theme } = useTheme();
  const [enable3D, setEnable3D] = useState(false);
  // The badge only exists on desktop; gating the <img> keeps phones from
  // downloading a poster they can never see.
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
    const update = () => setShowBadge(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const activate3D = () => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setEnable3D(true);
  };

  return (
    <motion.main
      id="main-content"
      tabIndex={-1}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 outline-none"
    >
      {/* ===================== HERO SECTION ===================== */}
      <section
        id="home"
        aria-label="Introduction"
        className="flex flex-col items-center gap-8 pb-16 pt-24 sm:pt-28 lg:flex-row lg:gap-10 lg:pb-20 lg:pt-24"
      >
        <div className="order-last flex w-full flex-1 flex-col items-center space-y-6 text-center dark:text-white text-slate-800 md:order-none lg:order-none lg:items-start lg:text-left">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}>
            <AnimatedGradientTextDemo />
          </motion.div>

          {/* No opacity animation on the LCP heading: paints immediately. */}
          <motion.h1
            initial={{ y: 16 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="select-none font-moderniz text-[clamp(1.15rem,6.5vw,2.25rem)] font-bold leading-[1.1] lg:text-3xl xl:text-[2.5rem]"
            style={{
              color: theme === 'dark' ? '#00ffdc' : '#0f172a',
              textShadow:
                theme === 'dark'
                  ? '2px 2px 0 #000754, 4px 4px 0 #4079ff, 0 4px 12px #40ffaa, 0 1px 0 #00ffdc'
                  : 'none',
            }}
          >
            WELCOME TO MY
            <span className="mt-[0.35em] block">PORTFOLIO</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="min-h-[2.25rem]"
          >
            <GradientText
              colors={
                theme === 'dark'
                  ? ['#40f2ffff', '#4079ff', '#40fffcff', '#4079ff', '#40f9ffff']
                  : ['#0e7490', '#0369a1', '#0891b2', '#0369a1', '#0e7490']
              }
              animationSpeed={3}
              className="font-cascadia font-bold"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
            className="max-w-xl"
          >
            <TextGenerateEffect
              words="I craft responsive, accessible websites with React, Tailwind CSS and modern web tooling."
              filter={false}
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }} className="w-full">
            <Skills />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: 'easeOut' }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <ButtonMovingBorder
              as="a"
              href="/Youssef_Abbas_FullStack_Developer_CV.pdf"
              download
              duration={3000}
              borderRadius="0.75rem"
              className="flex items-center justify-center gap-2 border dark:border-slate-800 border-slate-200 dark:bg-slate-900/[0.8] bg-white font-semibold dark:text-white text-slate-800 shadow-md transition-all duration-300 hover:shadow-lg dark:shadow-none dark:hover:shadow-[0_0_24px_8px_#40ffaa]"
              aria-label="Download CV"
              title="Download CV (PDF)"
            >
              <FaDownload aria-hidden="true" /> Download CV
            </ButtonMovingBorder>

            <a
              href="https://github.com/YoussefAbbasDev"
              target="_blank"
              rel="noopener noreferrer me"
              aria-label="GitHub profile"
              title="GitHub — @YoussefAbbasDev"
              className="group relative flex h-12 w-12 items-center justify-center rounded-full border dark:border-slate-700 border-slate-200 dark:bg-slate-900/[0.8] bg-white text-slate-600 dark:text-white transition-all duration-300 hover:border-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-md dark:hover:shadow-[0_0_24px_2px_#00ffdc]"
            >
              <FaGithub className="h-6 w-6 dark:text-slate-400 text-slate-600 transition-all duration-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-300" aria-hidden="true" />
            </a>
            <a
              href="https://www.instagram.com/y_abbas12/"
              target="_blank"
              rel="noopener noreferrer me"
              aria-label="Instagram profile"
              title="Instagram — @y_abbas12"
              className="group relative flex h-12 w-12 items-center justify-center rounded-full border dark:border-slate-700 border-slate-200 dark:bg-slate-900/[0.8] bg-white text-slate-600 dark:text-white transition-all duration-300 hover:border-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-md dark:hover:shadow-[0_0_24px_2px_#00ffdc]"
            >
              <FaInstagram className="h-6 w-6 dark:text-slate-400 text-slate-600 transition-all duration-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-300" aria-hidden="true" />
            </a>
            <a
              href="https://wa.me/201027295412?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              title="WhatsApp — Youssef Abbas"
              className="group relative flex h-12 w-12 items-center justify-center rounded-full border dark:border-slate-700 border-slate-200 dark:bg-slate-900/[0.8] bg-white text-slate-600 dark:text-white transition-all duration-300 hover:border-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-md dark:hover:shadow-[0_0_24px_2px_#00ffdc]"
            >
              <FaWhatsapp className="h-6 w-6 dark:text-slate-400 text-slate-600 transition-all duration-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-300" aria-hidden="true" />
            </a>
          </motion.div>
        </div>

        {/* Desktop badge: static poster by default, real 3D on hover/focus/tap */}
        <div className="hidden h-[560px] w-full flex-1 justify-center lg:flex xl:h-[620px]">
          {showBadge &&
            (enable3D ? (
              <div className="h-full w-full" aria-hidden="true">
                <Suspense fallback={<LanyardSkeleton />}>
                  <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} fov={18} transparent={true} />
                </Suspense>
              </div>
            ) : (
              <button
                type="button"
                onClick={activate3D}
                onPointerEnter={activate3D}
                onFocus={activate3D}
                aria-label="Load the interactive 3D badge"
                className="group relative flex h-full w-full cursor-pointer items-start justify-center outline-none"
              >
                <img
                  src="/lanyard-hero.webp"
                  alt=""
                  width="760"
                  height="1514"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="lanyard-poster h-full w-full object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <span className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-cyan-400/30 bg-slate-950/80 px-4 py-2 text-xs font-semibold text-cyan-200 opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <FaMagic aria-hidden="true" /> Hover or tap to interact
                </span>
              </button>
            ))}
        </div>
      </section>

      {/* ===================== ABOUT SECTION ===================== */}
      <section id="about" aria-labelledby="about-heading" className="w-full py-14 lg:py-24">
        <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="flex w-full justify-center lg:w-1/3"
          >
            <div className="about-img h-[420px] w-full max-w-[400px] overflow-hidden rounded-[25px] bg-slate-800 sm:h-[480px] lg:h-[530px]">
              <img
                src="/MyPhoto.webp"
                className="h-full w-full object-cover object-center"
                alt="Youssef Abbas, Full Stack Web Developer"
                width="400"
                height="530"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="w-full max-w-xl px-1 text-center dark:text-white text-slate-800 transition-all duration-700 lg:w-1/2 lg:px-8 lg:text-left"
          >
            <p
              className="font-moderniz text-2xl dark:text-gray-300 text-slate-500"
              style={{
                textShadow:
                  theme === 'dark'
                    ? '2px 2px 0 #000754, 4px 4px 0 #4079ff, 0 4px 12px #40ffaa, 0 1px 0 #00ffdc'
                    : 'none',
              }}
            >
              Hello, I&apos;m
            </p>
            <h2
              id="about-heading"
              className="my-2 font-moderniz text-3xl font-bold dark:text-white text-slate-900 sm:text-4xl"
              style={{
                textShadow:
                  theme === 'dark'
                    ? '2px 2px 0 #000754, 4px 4px 0 #4079ff, 0 4px 12px #40ffaa, 0 1px 0 #00ffdc'
                    : 'none',
              }}
            >
              Youssef Abbas
            </h2>
            <p className="mt-4 font-cascadia text-left leading-relaxed dark:text-white/80 text-slate-600">
              I&apos;m a Full Stack Web Developer who enjoys turning ideas into fast, accessible products. I work
              across React.js, Node.js and MySQL, and I care as much about clean interfaces as I do about the
              systems behind them. Every project is a chance to solve a real problem and sharpen my craft.
            </p>

            <blockquote className="my-6 rounded-r-lg border-l-4 dark:border-[#00ffdc] border-cyan-600 dark:bg-slate-900/50 bg-slate-50 p-4 text-left font-cascadia italic dark:text-white/70 text-slate-700 shadow-md dark:shadow-none">
              &ldquo;Turning ideas into real digital experiences.&rdquo;
            </blockquote>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <ButtonMovingBorder
                as="a"
                href="/Youssef_Abbas_FullStack_Developer_CV.pdf"
                download
                duration={3000}
                borderRadius="0.75rem"
                className="flex items-center justify-center gap-2 border dark:border-slate-800 border-slate-200 dark:bg-slate-900/[0.8] bg-white font-semibold dark:text-white text-slate-800 shadow-md transition-all duration-300 hover:shadow-lg dark:shadow-none dark:hover:shadow-[0_0_24px_8px_#40ffaa]"
                aria-label="Download CV"
                title="Download CV (PDF)"
              >
                <FaDownload aria-hidden="true" /> Download CV
              </ButtonMovingBorder>
              <ButtonMovingBorder
                as="a"
                href="#projects"
                duration={3000}
                borderRadius="0.75rem"
                className="flex items-center justify-center gap-2 border dark:border-slate-800 border-slate-200 dark:bg-slate-900/[0.8] bg-white font-semibold dark:text-white text-slate-800 shadow-md transition-all duration-300 hover:shadow-lg dark:shadow-none dark:hover:shadow-[0_0_24px_8px_#40ffaa]"
                aria-label="View projects"
              >
                <FaBriefcase aria-hidden="true" /> View Projects
              </ButtonMovingBorder>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================== PROJECTS SECTION ===================== */}
      <section id="projects" aria-label="Projects and certificates" className="py-10 lg:py-16">
        <ProjectSection />
      </section>

      {/* ===================== CONTACT SECTION ===================== */}
      <section id="contact" aria-label="Contact Youssef Abbas" className="py-14 lg:py-20">
        <Contact />
      </section>
    </motion.main>
  );
};

export default Home;
