import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from "framer-motion";
import { FaGithub, FaInstagram, FaDownload, FaBriefcase, FaWhatsapp } from 'react-icons/fa';
import { AnimatedGradientTextDemo } from '../components/AnimatedGradientTextDemo';
import GradientText from '../components/GradientText';
import TextGenerateEffect from "../components/text-generate-effect";
import Skills from '../components/Skills';
import { ButtonMovingBorder } from '../components/MovingBorderButton';
import ProjectSection from '../components/ProjectSection';
import Contact from '../components/Contact';
import { useTheme } from '../contexts/ThemeContext';

// Lazy load heavy components (3D / Animation-heavy)
const Lanyard = lazy(() => import('../components/Lanyard/Lanyard'));
const VelocityScroll = lazy(() => import('../components/VelocityScroll').then(m => ({ default: m.VelocityScroll })));

// Lightweight skeleton fallback for 3D
const LanyardSkeleton = () => (
    <div className="hidden lg:flex flex-1 justify-center h-[600px] w-full items-center" aria-hidden="true">
        <div className="w-32 h-32 rounded-full bg-cyan-400/10 animate-pulse border border-cyan-400/20" />
    </div>
);

const Home = () => {
    const { theme } = useTheme();
    const [load3D, setLoad3D] = useState(false);

    useEffect(() => {
        // Only load 3D on desktop screens (>=1024px) and after page is interactive
        if (typeof window === 'undefined' || window.innerWidth < 1024) return;

        const timer = setTimeout(() => {
            if ('requestIdleCallback' in window) {
                window.requestIdleCallback(() => setLoad3D(true), { timeout: 2500 });
            } else {
                setLoad3D(true);
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.main
            role="main"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 px-8 max-w-7xl mx-auto"
        >
            {/* ===================== HERO SECTION ===================== */}
            <section
                id="home"
                aria-label="Hero section"
                className="flex flex-col md:flex-row items-center gap-10 pt-20 pb-16 lg:pt-0 lg:pb-20"
            >
                <div className="flex-1 dark:text-white text-slate-800 space-y-6 pt-16 md:pt-40 order-last md:order-none text-center md:text-left flex flex-col items-center md:items-start">
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}>
                        <AnimatedGradientTextDemo />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
                        className="text-4xl md:text-4xl font-moderniz font-bold leading-tight select-none"
                        style={{
                            color: theme === 'dark' ? "#00ffdc" : "#0f172a",
                            textShadow: theme === 'dark'
                                ? "2px 2px 0 #000754, 4px 4px 0 #4079ff, 0 4px 12px #40ffaa, 0 1px 0 #00ffdc"
                                : "none"
                        }}
                    >
                        WELCOME TO MY
                        <span style={{ display: 'block', marginTop: '0.4em' }}>PORTFOLIO</span>
                    </motion.h1>
                    <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}>
                        <GradientText colors={["#40f2ffff", "#4079ff", "#40fffcff", "#4079ff", "#40f9ffff"]} animationSpeed={3} className="custom-class font-cascadia font-bold" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}>
                        <TextGenerateEffect words={'I craft responsive and visually engaging websites using React, Tailwind CSS, and modern web technologies.'} />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}>
                        <Skills />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 1.0, ease: "easeOut" }}
                        className="flex flex-row gap-4 mt-8"
                    >
                        <ButtonMovingBorder
                            as="a"
                            href="/Youssef_Abbas_FullStack_Developer_CV.pdf"
                            download
                            duration={3000}
                            borderRadius="0.75rem"
                            className="dark:bg-slate-900/[0.8] bg-white border dark:border-slate-800 border-slate-200 dark:text-white text-slate-800 font-semibold flex items-center justify-center gap-2 transition-all duration-300 dark:shadow-none shadow-md hover:shadow-lg dark:hover:shadow-[0_0_24px_8px_#40ffaa]"
                            aria-label="Download Youssef Abbas CV"
                        >
                            <FaDownload aria-hidden="true" /> Download CV
                        </ButtonMovingBorder>
                        <a
                            href="https://github.com/YoussefAbbasDev"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit Youssef Abbas GitHub Profile"
                            title="GitHub - YoussefAbbas12"
                            className="group relative flex h-12 w-12 items-center justify-center rounded-full border dark:border-slate-700 border-slate-200 dark:bg-slate-900/[0.8] bg-white text-slate-600 dark:text-white transition-all duration-300 hover:border-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-md dark:hover:shadow-[0_0_24px_2px_#00ffdc]"
                        >
                            <FaGithub className="h-6 w-6 dark:text-slate-400 text-slate-600 transition-all duration-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-300" aria-hidden="true" />
                        </a>
                        <a
                            href="https://www.instagram.com/y_abbas12/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit Youssef Abbas Instagram Profile"
                            title="Instagram - @y_abbas12"
                            className="group relative flex h-12 w-12 items-center justify-center rounded-full border dark:border-slate-700 border-slate-200 dark:bg-slate-900/[0.8] bg-white text-slate-600 dark:text-white transition-all duration-300 hover:border-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-md dark:hover:shadow-[0_0_24px_2px_#00ffdc]"
                        >
                            <FaInstagram className="h-6 w-6 dark:text-slate-400 text-slate-600 transition-all duration-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-300" aria-hidden="true" />
                        </a>
                        <a
                            href="https://wa.me/201027295412?text=السلام%20عليكم"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Contact Youssef Abbas on WhatsApp"
                            title="WhatsApp - Youssef Abbas"
                            className="group relative flex h-12 w-12 items-center justify-center rounded-full border dark:border-slate-700 border-slate-200 dark:bg-slate-900/[0.8] bg-white text-slate-600 dark:text-white transition-all duration-300 hover:border-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-md dark:hover:shadow-[0_0_24px_2px_#00ffdc]"
                        >
                            <FaWhatsapp className="h-6 w-6 dark:text-slate-400 text-slate-600 transition-all duration-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-300" aria-hidden="true" />
                        </a>
                    </motion.div>
                </div>

                {/* Deferred Lazy-loaded 3D Lanyard: Desktop only after main thread settles */}
                <div className="hidden lg:flex flex-1 justify-center h-[600px] w-full order-first lg:order-none" aria-hidden="true">
                    {load3D ? (
                        <Suspense fallback={<LanyardSkeleton />}>
                            <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} fov={18} transparent={true} />
                        </Suspense>
                    ) : (
                        <LanyardSkeleton />
                    )}
                </div>
            </section>

            {/* ===================== ABOUT SECTION ===================== */}
            <section
                id="about"
                aria-label="About Youssef Abbas"
                className="py-12 md:py-18 gap-0 w-full mx-0 pt-20"
                style={{ width: "100vw", position: "relative", left: "50%", right: "50%", marginLeft: "-50vw", marginRight: "-50vw" }}
            >
                <div className="flex flex-col md:flex-row items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                        className="md:w-1/3 flex justify-center"
                    >
                        <div className="w-full h-[420px] md:h-[530px] flex items-center justify-center">
                            <img
                                src="/MyPhoto.webp"
                                className="about-img"
                                alt="Youssef Abbas - Full Stack Web Developer"
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
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        className={`dark:text-white text-slate-800 text-center md:text-left px-4 md:px-8 transition-all duration-700 md:w-1/2`}
                    >
                        <p
                            className="text-2xl dark:text-gray-300 text-slate-500 font-moderniz my"
                            style={{ textShadow: theme === 'dark' ? "2px 2px 0 #000754, 4px 4px 0 #4079ff, 0 4px 12px #40ffaa, 0 1px 0 #00ffdc" : "none" }}
                        >
                            Hello, I'm
                        </p>
                        <h2
                            className="text-4xl font-bold dark:text-white text-slate-900 my-2 font-moderniz"
                            style={{ textShadow: theme === 'dark' ? "2px 2px 0 #000754, 4px 4px 0 #4079ff, 0 4px 12px #40ffaa, 0 1px 0 #00ffdc" : "none" }}
                        >
                            Youssef Abbas
                        </h2>
                        <p className="dark:text-white/80 text-slate-600 leading-relaxed mt-4 font-cascadia text-justify">
                            I am a Full Stack Web Developer passionate about building modern and impactful web applications. I have experience working with React.js, Node.js, and modern web technologies to create scalable and user-focused solutions. I enjoy transforming ideas into real digital products and continuously improving my skills through real projects and challenges.
                        </p>

                        <blockquote className="my-6 dark:bg-slate-900/50 bg-slate-50 border-l-4 dark:border-[#00ffdc] border-cyan-600 p-4 rounded-r-lg italic dark:text-white/70 text-slate-700 font-cascadia dark:shadow-none shadow-md">
                            "Turning ideas into real digital experiences."
                        </blockquote>

                        <div className="flex flex-row sm:flex-row gap-4 mt-8 justify-center md:justify-start items-center">
                            <ButtonMovingBorder
                                as="a"
                                href="/Youssef_Abbas_FullStack_Developer_CV.pdf"
                                download
                                duration={3000}
                                borderRadius="0.75rem"
                                className="dark:bg-slate-900/[0.8] bg-white border dark:border-slate-800 border-slate-200 dark:text-white text-slate-800 font-semibold flex items-center justify-center gap-2 transition-all duration-300 dark:shadow-none shadow-md hover:shadow-lg dark:hover:shadow-[0_0_24px_8px_#40ffaa]"
                                aria-label="Download Youssef Abbas CV"
                            >
                                <FaDownload aria-hidden="true" /> Download CV
                            </ButtonMovingBorder>
                            <ButtonMovingBorder
                                as="a"
                                href="#projects"
                                duration={3000}
                                borderRadius="0.75rem"
                                className="dark:bg-slate-900/[0.8] bg-white border dark:border-slate-800 border-slate-200 dark:text-white text-slate-800 font-semibold flex items-center justify-center gap-2 transition-all duration-300 dark:shadow-none shadow-md hover:shadow-lg dark:hover:shadow-[0_0_24px_8px_#40ffaa]"
                                aria-label="View projects"
                            >
                                <FaBriefcase aria-hidden="true" /> View Projects
                            </ButtonMovingBorder>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ===================== PROJECTS SECTION ===================== */}
            <section id="projects" aria-label="Projects and Certificates">
                <ProjectSection />
            </section>

            {/* ===================== CONTACT SECTION ===================== */}
            <section id="contact" aria-label="Contact Youssef Abbas" className="py-20 pb-16">
                <Contact />
            </section>

            {/* ===================== FOOTER ===================== */}
            <footer
                role="contentinfo"
                className="py-12 pb-16 text-center text-gray-400 dark:bg-gradient-to-t dark:from-slate-900/50 dark:to-transparent bg-gradient-to-t from-slate-100/50 to-transparent"
            >
                <div className="text-sm">
                    © {new Date().getFullYear()}{' '}
                    <span itemProp="name">Youssef Mohamed Abbas</span>. All rights reserved.
                </div>
            </footer>
        </motion.main>
    );
};

export default Home;
