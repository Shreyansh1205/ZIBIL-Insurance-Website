import React, { useEffect, useRef, useState } from "react";

// Swap these to match your exact brand hexes if needed
const BLUE = "#24437A";
const RED = "#DC1E2B";
const GREEN = "#93C93F";

export default function LogoRevealLoader({ onComplete }) {
  const [playKey, setPlayKey] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const reducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    setProgress(0);
    setDone(false);
    const duration = reducedMotion.current ? 500 : 2600;
    const start = performance.now();
    let raf;

    const tick = (now) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setDone(true);
        onComplete && onComplete();
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playKey, onComplete]);

  const replay = () => setPlayKey((k) => k + 1);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-(--background) px-6">
      <style>{`
        @keyframes unfoldBand {
          0% { transform: scaleX(0); opacity: 0; }
          60% { transform: scaleX(1.04); opacity: 1; }
          100% { transform: scaleX(1); opacity: 1; }
        }
        @keyframes sheenSweep {
          0% { transform: translateX(-140px); opacity: 0; }
          15% { opacity: 0.55; }
          85% { opacity: 0.55; }
          100% { transform: translateX(360px); opacity: 0; }
        }
        @keyframes fadeUp {
          0% { transform: translateY(8px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .band-blue {
          transform-origin: 0px 75px;
          animation: unfoldBand 900ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .band-red {
          transform-origin: 240px 230px;
          animation: unfoldBand 900ms cubic-bezier(0.16, 1, 0.3, 1) 280ms forwards;
        }
        .band-green {
          transform-origin: 0px 385px;
          animation: unfoldBand 900ms cubic-bezier(0.16, 1, 0.3, 1) 560ms forwards;
        }
        .sheen {
          animation: sheenSweep 1100ms ease-in-out 1500ms forwards;
        }
        .wordmark {
          opacity: 0;
          animation: fadeUp 600ms ease-out 1500ms forwards;
        }
        .progress-wrap {
          opacity: 0;
          animation: fadeUp 600ms ease-out 1650ms forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .band-blue, .band-red, .band-green, .sheen, .wordmark, .progress-wrap {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <svg
        key={playKey}
        viewBox="0 0 240 460"
        width="132"
        height="253"
        className="drop-shadow-[0_0_40px_rgba(36,67,122,0.18)]"
      >
        <defs>
          <mask id="logoMask">
            <polygon points="0,0 170,0 240,150 70,150" fill="#fff" />
            <polygon points="70,150 240,150 170,310 0,310" fill="#fff" />
            <polygon points="0,310 170,310 240,460 70,460" fill="#fff" />
          </mask>
          <linearGradient id="sheenGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="50%" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>

        <polygon className="band-blue" points="0,0 170,0 240,150 70,150" fill={BLUE} />
        <polygon className="band-red" points="70,150 240,150 170,310 0,310" fill={RED} />
        <polygon className="band-green" points="0,310 170,310 240,460 70,460" fill={GREEN} />

        <g mask="url(#logoMask)">
          <rect
            className="sheen"
            x="-70"
            y="-40"
            width="70"
            height="540"
            transform="skewX(-18)"
            fill="url(#sheenGrad)"
            style={{ mixBlendMode: "screen" }}
          />
        </g>
      </svg>

      <button
        onClick={replay}
        aria-label="Replay animation"
        className="mt-10 flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:text-slate-300"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M20 11a8 8 0 1 0-2.34 5.66" strokeLinecap="round" />
          <path d="M20 5v6h-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
