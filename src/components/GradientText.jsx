import { useState, useEffect } from 'react';

const TEXTS_TO_TYPE = ['Full Stack Developer', 'UI/UX Developer'];

export default function LoopingGradientText({
  className = '',
  colors = ['#ffaa40', '#9c40ff', '#ffaa40'],
  animationSpeed = 3,
  typingSpeed = 100,
  deletingSpeed = 75,
  pauseDuration = 2000,
}) {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentText = TEXTS_TO_TYPE[textIndex];

      if (isDeleting) {
        if (displayedText.length > 0) {
          setDisplayedText(currentText.substring(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setTextIndex((prevIndex) => (prevIndex + 1) % TEXTS_TO_TYPE.length);
        }
      } else if (displayedText.length < currentText.length) {
        setDisplayedText(currentText.substring(0, displayedText.length + 1));
      } else {
        setTimeout(() => setIsDeleting(true), pauseDuration);
      }
    };

    const typingInterval = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(handleTyping, typingInterval);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, textIndex, deletingSpeed, typingSpeed, pauseDuration]);

  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <div className={`relative flex w-full items-center justify-center lg:justify-start ${className}`}>
      {/* Static text for screen readers; the typing animation is decorative. */}
      <span className="sr-only">Full Stack Developer</span>
      <div
        aria-hidden="true"
        className="relative z-2 inline-block animate-gradient bg-cover bg-clip-text text-center text-xl font-medium text-transparent lg:text-left lg:text-3xl"
        style={{
          ...gradientStyle,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          backgroundSize: '300% 100%',
        }}
      >
        <span>{displayedText}</span>
        <span
          className="ml-1 inline-block w-0.5 animate-blink bg-slate-800 dark:bg-white"
          style={{ height: '1.25em', verticalAlign: 'bottom' }}
        />
      </div>
    </div>
  );
}
