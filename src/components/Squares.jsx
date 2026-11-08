import { useRef, useEffect, useState } from 'react';

const Squares = ({
  direction = 'right',
  speed = 1,
  borderColor = 'rgba(255, 255, 255, 0.1)',
  squareSize = 40,
  hoverFillColor = 'rgba(255, 255, 255, 0.05)',
  gradientColorStart = '#000428',
  gradientColorEnd = '#002545ff',
}) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquareRef = useRef(null);
  const timeRef = useRef(0);
  const lastFrameTime = useRef(0);
  const [isActive, setIsActive] = useState(true);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  // Refs keep the animation loop from restarting when colors change.
  const gradientStartRef = useRef(gradientColorStart);
  const gradientEndRef = useRef(gradientColorEnd);
  const hoverFillRef = useRef(hoverFillColor);
  const borderRef = useRef(borderColor);

  useEffect(() => {
    gradientStartRef.current = gradientColorStart;
    gradientEndRef.current = gradientColorEnd;
    hoverFillRef.current = hoverFillColor;
    borderRef.current = borderColor;
  }, [gradientColorStart, gradientColorEnd, hoverFillColor, borderColor]);

  // Animating a full-screen canvas is wasted work on phones and for users who
  // prefer reduced motion — draw one static frame there instead.
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const widthQuery = window.matchMedia('(min-width: 768px)');

    const update = () => setShouldAnimate(widthQuery.matches && !motionQuery.matches);
    update();

    motionQuery.addEventListener('change', update);
    widthQuery.addEventListener('change', update);
    return () => {
      motionQuery.removeEventListener('change', update);
      widthQuery.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => setIsActive(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (!isActive) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d', { alpha: true, willReadFrequently: false });
    if (!ctx) return undefined;

    let width = 0;
    let height = 0;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };

    const draw = (timestamp) => {
      if (!width || !height) return;

      // Throttle to ~30 FPS.
      const elapsed = timestamp - lastFrameTime.current;
      if (shouldAnimate && elapsed < 33) return;
      lastFrameTime.current = timestamp - (shouldAnimate ? elapsed % 33 : 0);

      timeRef.current = timestamp / 5000;

      ctx.clearRect(0, 0, width, height);

      const angle = timeRef.current;
      const r = width * 0.75;
      const x1 = width / 2 + Math.cos(angle) * r;
      const y1 = height / 2 + Math.sin(angle) * r;
      const x2 = width / 2 - Math.cos(angle) * r;
      const y2 = height / 2 - Math.sin(angle) * r;

      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      gradient.addColorStop(0, gradientStartRef.current);
      gradient.addColorStop(1, gradientEndRef.current);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      if (hoveredSquareRef.current) {
        const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
        const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;
        const hx = hoveredSquareRef.current.x * squareSize + startX - (gridOffset.current.x % squareSize);
        const hy = hoveredSquareRef.current.y * squareSize + startY - (gridOffset.current.y % squareSize);
        ctx.fillStyle = hoverFillRef.current;
        ctx.fillRect(hx, hy, squareSize, squareSize);
      }

      ctx.beginPath();
      ctx.strokeStyle = borderRef.current;
      ctx.lineWidth = 1;

      const offsetX = gridOffset.current.x % squareSize;
      const offsetY = gridOffset.current.y % squareSize;

      for (let x = -offsetX; x <= width + squareSize; x += squareSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = -offsetY; y <= height + squareSize; y += squareSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      if (!shouldAnimate) return;

      const effectiveSpeed = Math.max(speed, 0.1);
      switch (direction) {
        case 'right':
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          break;
        case 'left':
          gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
          break;
        case 'up':
          gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
          break;
        case 'down':
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        case 'diagonal':
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        default:
          break;
      }
    };

    const updateAnimation = (timestamp) => {
      if (!isActive) return;
      draw(timestamp);
      if (shouldAnimate) requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event) => {
      if (!shouldAnimate) return;
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        hoveredSquareRef.current = null;
        return;
      }

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;
      const hoveredSquareX = Math.floor((mouseX + gridOffset.current.x - startX) / squareSize);
      const hoveredSquareY = Math.floor((mouseY + gridOffset.current.y - startY) / squareSize);

      if (
        !hoveredSquareRef.current ||
        hoveredSquareRef.current.x !== hoveredSquareX ||
        hoveredSquareRef.current.y !== hoveredSquareY
      ) {
        hoveredSquareRef.current = { x: hoveredSquareX, y: hoveredSquareY };
      }
    };

    const handleMouseLeave = () => {
      hoveredSquareRef.current = null;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    resizeCanvas();
    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [direction, speed, squareSize, isActive, shouldAnimate]);

  return <canvas ref={canvasRef} className="block h-full w-full border-none" aria-hidden="true" />;
};

export default Squares;
