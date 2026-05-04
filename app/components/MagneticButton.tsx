"use client";

import { useRef } from "react";
import gsap from "gsap";

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  onClick?: () => void;
}

export default function MagneticButton({ children, className, style, href, onClick }: Props) {
  const wrapRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  function onEnter() {
    gsap.to(wrapRef.current, { scale: 1.08, duration: 0.35, ease: "power2.out" });
  }

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const el = wrapRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 18;
    const y = ((e.clientY - top) / height - 0.5) * 10;
    gsap.to(el, { x, y, duration: 0.3, ease: "power2.out" });
  }

  function onLeave() {
    gsap.to(wrapRef.current, {
      x: 0, y: 0, scale: 1,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
    });
  }

  const events = {
    onMouseEnter: onEnter,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    onClick,
    className,
    style,
  };

  if (href != null) {
    return (
      <a ref={wrapRef as React.RefObject<HTMLAnchorElement>} href={href} {...events}>
        {children}
      </a>
    );
  }

  return (
    <button ref={wrapRef as React.RefObject<HTMLButtonElement>} {...events}>
      {children}
    </button>
  );
}
