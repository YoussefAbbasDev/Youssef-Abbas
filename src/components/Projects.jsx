import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaAward, FaCalendarAlt } from 'react-icons/fa';
import { projects } from '../data/projects';
import { certificates } from '../data/certificates';

const cardClass =
  'group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all duration-500 hover:border-cyan-500/60 hover:shadow-cyan-500/15 dark:border-slate-800/50 dark:bg-slate-900/50 dark:hover:border-cyan-400/50 dark:hover:shadow-cyan-500/20';

const primaryButton =
  'flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-700 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:from-cyan-500 hover:to-cyan-600 hover:shadow-cyan-500/30';

const secondaryButton =
  'flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition-all duration-300 hover:bg-slate-200 dark:border-slate-700/50 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-700';

const Projects = ({ activeTab }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
      <AnimatePresence mode="wait">
        {activeTab === 'Projects' ? (
          <>
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={cardClass}
                whileHover={{ y: -6 }}
              >
                {project.image_url && (
                  <div className="relative h-48 overflow-hidden bg-slate-200 dark:bg-slate-800">
                    <img
                      src={`/projects/${project.image_url}`}
                      alt={`${project.title} website screenshot`}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      width="400"
                      height="192"
                      loading="lazy"
                      decoding="async"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" aria-hidden="true" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="mb-3 line-clamp-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-cyan-700 dark:text-white dark:group-hover:text-cyan-400">
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="mb-4 line-clamp-3 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                      {project.description}
                    </p>
                  )}
                  {project.tags && project.tags.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-xs font-medium text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-auto flex gap-3 pt-4">
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open live demo of ${project.title}`}
                        className={primaryButton}
                      >
                        <FaExternalLinkAlt className="text-xs" aria-hidden="true" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View source code of ${project.title} on GitHub`}
                        className={secondaryButton}
                      >
                        <FaGithub className="text-base" aria-hidden="true" />
                        <span>Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </>
        ) : (
          <>
            {certificates.map((cert, index) => (
              <motion.article
                key={cert.id}
                initial={{ y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={cardClass}
                whileHover={{ y: -6 }}
              >
                {cert.image_url && (
                  <div className="relative h-48 overflow-hidden bg-slate-200 dark:bg-slate-800">
                    <img
                      src={`/certificate-images/${cert.image_url}`}
                      alt={`${cert.title} certificate from ${cert.issuer}`}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      width="400"
                      height="192"
                      loading="lazy"
                      decoding="async"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" aria-hidden="true" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  {cert.issuer && (
                    <div className="mb-3 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700 dark:border-cyan-400/30 dark:bg-gradient-to-r dark:from-cyan-400/20 dark:to-emerald-400/20 dark:text-cyan-300">
                        <FaAward aria-hidden="true" /> {cert.issuer}
                      </span>
                    </div>
                  )}
                  <h3 className="mb-3 line-clamp-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-cyan-700 dark:text-white dark:group-hover:text-cyan-400">
                    {cert.title}
                  </h3>
                  {cert.issue_date && (
                    <p className="mb-4 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <FaCalendarAlt aria-hidden="true" />
                      <time dateTime={cert.issue_date}>
                        {new Date(cert.issue_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </p>
                  )}
                  <div className="mt-auto flex gap-3 pt-4">
                    {cert.credential_url && (
                      <a
                        href={cert.credential_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${cert.title} certificate from ${cert.issuer}`}
                        className={primaryButton}
                      >
                        <FaExternalLinkAlt className="text-xs" aria-hidden="true" />
                        <span>View Certificate</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
