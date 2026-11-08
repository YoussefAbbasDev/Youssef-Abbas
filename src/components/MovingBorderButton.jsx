"use client";
import React, { useEffect, useRef } from "react";
import { useAnimationFrame } from "framer-motion";
import { cn } from "../lib/utils";

export function ButtonMovingBorder({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}) {
  return (
    <Component
      className={cn(
        "relative h-16 w-40 overflow-hidden bg-transparent p-[1px] text-xl",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}>
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}>
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 bg-[radial-gradient(#0ea5e9_40%,transparent_60%)] opacity-[0.8]",
              borderClassName
            )} />
        </MovingBorder>
      </div>
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border text-sm antialiased backdrop-blur-xl",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}>
        {children}
      </div>
    </Component>
  );
}

export const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
  ...otherProps
}) => {
  const pathRef = useRef();
  const dotRef = useRef();
  // Points along the rounded-rect path, sampled once. Without this cache the
  // SVG getPointAtLength() call ran twice per button per frame and dominated
  // the main thread on slow devices.
  const pointsRef = useRef(null);
  const visibleRef = useRef(true);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    const path = pathRef.current;
    const svg = path?.ownerSVGElement;
    if (!svg) return undefined;

    reduceMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { rootMargin: "120px" }
    );
    observer.observe(svg);

    return () => observer.disconnect();
  }, []);

  useAnimationFrame((time) => {
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!path || !dot || !visibleRef.current || reduceMotionRef.current) return;

    if (!pointsRef.current) {
      const length = path.getTotalLength();
      if (!length) return;
      const count = 360;
      const points = new Array(count);
      for (let i = 0; i < count; i += 1) {
        const point = path.getPointAtLength((i / count) * length);
        points[i] = [point.x, point.y];
      }
      pointsRef.current = points;
    }

    const points = pointsRef.current;
    const index = Math.floor(((time % duration) / duration) * points.length);
    const [x, y] = points[index];
    dot.style.transform = `translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;
  });

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}>
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </svg>
      <div
        ref={dotRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform: "translateX(-100px) translateY(-100px)",
        }}>
        {children}
      </div>
    </>
  );
};
