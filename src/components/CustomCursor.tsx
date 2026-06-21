"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run cursor on fine pointer devices (desktops)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let isHovered = false;
    let hasMoved = false;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!hasMoved) {
        hasMoved = true;
        dot.style.opacity = "1";
        ring.style.opacity = "0.45";
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const hovered = !!(
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.classList.contains("clickable")
      );

      if (hovered !== isHovered) {
        isHovered = hovered;
        if (isHovered) {
          dot.style.width = "16px";
          dot.style.height = "16px";
          ring.style.width = "50px";
          ring.style.height = "50px";
        } else {
          dot.style.width = "10px";
          dot.style.height = "10px";
          ring.style.width = "36px";
          ring.style.height = "36px";
        }
      }
    };

    const updatePosition = () => {
      const dx = mouseX - ringX;
      const dy = mouseY - ringY;
      ringX += dx * 0.13;
      ringY += dy * 0.13;

      // Use translate3d for GPU acceleration (much smoother and lower CPU usage)
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        id="cur"
        className="hidden md:block fixed pointer-events-none z-[9999] rounded-full bg-brand-copper transition-[width,height,opacity] duration-300"
        style={{
          width: "10px",
          height: "10px",
          top: 0,
          left: 0,
          transform: "translate(-50%, -50%)",
          opacity: 0, // start hidden until first move
        }}
      />
      <div
        ref={ringRef}
        id="curR"
        className="hidden md:block fixed pointer-events-none z-[9998] rounded-full border-[1.5px] border-brand-copper transition-[width,height,opacity] duration-300"
        style={{
          width: "36px",
          height: "36px",
          top: 0,
          left: 0,
          transform: "translate(-50%, -50%)",
          opacity: 0, // start hidden until first move
        }}
      />
    </>
  );
}
