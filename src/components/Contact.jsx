import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  FaGithub,
  FaInstagram,
  FaPaperPlane,
  FaUser,
  FaEnvelope,
  FaComment,
  FaWhatsapp,
  FaCheckCircle,
  FaExclamationCircle,
} from 'react-icons/fa';

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    description: 'Explore my repositories',
    icon: <FaGithub />,
    url: 'https://github.com/YoussefAbbasDev',
    color: 'from-gray-700 to-gray-900',
    hoverColor: 'hover:shadow-gray-500/25',
  },
  {
    name: 'Instagram',
    description: 'See what I am building',
    icon: <FaInstagram />,
    url: 'https://www.instagram.com/y_abbas12/',
    color: 'from-pink-600 to-purple-700',
    hoverColor: 'hover:shadow-pink-500/25',
  },
  {
    name: 'WhatsApp',
    description: 'Chat with me directly',
    icon: <FaWhatsapp />,
    url: 'https://wa.me/201027295412',
    color: 'from-green-600 to-green-700',
    hoverColor: 'hover:shadow-green-500/25',
  },
];

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-base text-slate-900 transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-600/50 dark:bg-slate-800/50 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-cyan-400 dark:focus:ring-cyan-400/20';

const Contact = () => {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setStatus('sending');
    setMessage('');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'The message could not be sent.');
      }

      setStatus('success');
      setMessage('Thanks — your message is on its way. I will get back to you soon.');
      form.reset();
    } catch (error) {
      setStatus('error');
      setMessage(error.message || 'Something went wrong. Please email or message me on WhatsApp instead.');
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      {/* Floating decorative elements */}
      <div className="pointer-events-none absolute -left-10 top-10 h-20 w-20 rounded-full bg-cyan-500/10 blur-xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-10 bottom-20 h-32 w-32 rounded-full bg-emerald-500/10 blur-xl" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="mb-12 text-center sm:mb-16"
      >
        <h2 className="mb-4 font-moderniz text-4xl font-bold sm:text-5xl md:text-6xl">
          <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent dark:from-cyan-400 dark:via-emerald-400 dark:to-cyan-600">
            GET IN
          </span>{' '}
          <span className="dark:text-white text-slate-800">TOUCH</span>
        </h2>
        <p className="mx-auto max-w-lg font-cascadia text-base dark:text-slate-400 text-slate-600 sm:text-lg">
          Have a project or a role in mind? Tell me what you&apos;re building.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="space-y-8"
      >
        {/* Contact form */}
        <div className="relative">
          <div className="absolute -inset-1 hidden rounded-3xl bg-gradient-to-r from-cyan-600 to-emerald-600 opacity-25 blur transition duration-1000 group-hover:opacity-40 dark:block" aria-hidden="true" />
          <div className="relative rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-xl backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/80 dark:shadow-none sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-full bg-gradient-to-r from-cyan-600 to-emerald-600 p-3">
                <FaPaperPlane className="text-xl text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">Send a message</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">I usually reply within a day.</p>
              </div>
            </div>

            <form className="space-y-5" action="https://api.web3forms.com/submit" method="POST" onSubmit={handleSubmit}>
              <input type="hidden" name="access_key" value="bab78dcf-b328-4a7a-b6ef-35ee1cf0f22b" />
              <input type="hidden" name="subject" value="New message from youssef-abbas-portofolio.vercel.app" />
              <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

              <div>
                <label htmlFor="contact-name" className="sr-only">
                  Your name
                </label>
                <div className="group relative">
                  <FaUser className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition-colors duration-300 group-focus-within:text-cyan-600 dark:text-slate-400 dark:group-focus-within:text-cyan-400" aria-hidden="true" />
                  <input
                    id="contact-name"
                    type="text"
                    name="Name"
                    placeholder="Your name"
                    autoComplete="name"
                    aria-required="true"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-email" className="sr-only">
                  Your email address
                </label>
                <div className="group relative">
                  <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition-colors duration-300 group-focus-within:text-cyan-600 dark:text-slate-400 dark:group-focus-within:text-cyan-400" aria-hidden="true" />
                  <input
                    id="contact-email"
                    type="email"
                    name="Email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    inputMode="email"
                    aria-required="true"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="sr-only">
                  Your message
                </label>
                <div className="group relative">
                  <FaComment className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-slate-500 transition-colors duration-300 group-focus-within:text-cyan-600 dark:text-slate-400 dark:group-focus-within:text-cyan-400" aria-hidden="true" />
                  <textarea
                    id="contact-message"
                    placeholder="Tell me about your project..."
                    rows="4"
                    name="Message"
                    aria-required="true"
                    className={`${inputClass} resize-none`}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="flex min-h-[52px] w-full items-center justify-center gap-3 rounded-xl bg-cyan-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-cyan-500 hover:shadow-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-gradient-to-r dark:from-cyan-600 dark:to-emerald-600 dark:hover:from-cyan-500 dark:hover:to-emerald-500"
              >
                <FaPaperPlane aria-hidden="true" />
                <span>{status === 'sending' ? 'Sending…' : 'Send message'}</span>
              </button>

              <p
                role="status"
                aria-live="polite"
                className={`flex items-start gap-2 text-sm ${
                  status === 'success'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : status === 'error'
                      ? 'text-red-600 dark:text-red-400'
                      : 'sr-only'
                }`}
              >
                {status === 'success' && <FaCheckCircle className="mt-0.5 shrink-0" aria-hidden="true" />}
                {status === 'error' && <FaExclamationCircle className="mt-0.5 shrink-0" aria-hidden="true" />}
                {message}
              </p>
            </form>
          </div>
        </div>

        <div className="flex items-center gap-4" aria-hidden="true">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-400/40 to-transparent" />
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Or connect on</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-400/40 to-transparent" />
        </div>

        {/* Social links */}
        <div className="grid gap-4 sm:grid-cols-3">
          {SOCIAL_LINKS.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer me"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ scale: 1.02 }}
              className={`group flex min-h-[64px] items-center gap-3 rounded-xl bg-gradient-to-r ${social.color} p-4 text-white transition-all duration-300 ${social.hoverColor} hover:shadow-xl`}
            >
              <div className="text-2xl transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
                {social.icon}
              </div>
              <div className="min-w-0">
                <span className="block font-semibold">{social.name}</span>
                <p className="text-sm leading-snug opacity-90">{social.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
