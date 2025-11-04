"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CTASection() {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="start"
      ref={ref}
      className="relative overflow-hidden bg-[#EAEAEA] py-14 md:py-20 scroll-mt-20"
      aria-labelledby="start-journey-heading"
    >
      {/* Trading Background Graphics */}
      {/* Chart Lines - Top Left */}
      <svg
        className="absolute top-10 left-10 w-32 h-32 md:w-48 md:h-48 opacity-12 pointer-events-none"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M20 160 Q60 120, 100 100 T180 60"
          stroke="#FFCF25"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M20 140 Q50 110, 80 100 T160 80"
          stroke="#FFCF25"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>

      {/* Stock Graph - Top Right */}
      <svg
        className="absolute top-20 right-10 w-40 h-40 md:w-56 md:h-56 opacity-10 pointer-events-none"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <polyline
          points="20,180 40,160 60,170 80,140 100,150 120,130 140,110 160,90 180,70"
          stroke="#181818"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="180" r="3" fill="#FFCF25" />
        <circle cx="180" cy="70" r="3" fill="#FFCF25" />
      </svg>

      {/* Trading Candlesticks - Bottom Left */}
      <svg
        className="absolute bottom-20 left-5 md:left-20 w-24 h-24 md:w-32 md:h-32 opacity-10 pointer-events-none"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        {/* Candle 1 */}
        <rect x="30" y="120" width="8" height="40" fill="#181818" />
        <line x1="34" y1="100" x2="34" y2="120" stroke="#181818" strokeWidth="2" />
        <line x1="34" y1="160" x2="34" y2="180" stroke="#181818" strokeWidth="2" />
        
        {/* Candle 2 */}
        <rect x="60" y="100" width="8" height="50" fill="#FFCF25" />
        <line x1="64" y1="80" x2="64" y2="100" stroke="#FFCF25" strokeWidth="2" />
        <line x1="64" y1="150" x2="64" y2="170" stroke="#FFCF25" strokeWidth="2" />
        
        {/* Candle 3 */}
        <rect x="90" y="110" width="8" height="45" fill="#181818" />
        <line x1="94" y1="90" x2="94" y2="110" stroke="#181818" strokeWidth="2" />
        <line x1="94" y1="155" x2="94" y2="175" stroke="#181818" strokeWidth="2" />
      </svg>

      {/* Trend Arrow - Bottom Right */}
      <svg
        className="absolute bottom-10 right-20 md:right-32 w-28 h-28 md:w-36 md:h-36 opacity-12 pointer-events-none"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M30 150 L150 50 M150 50 L130 70 M150 50 L130 30"
          stroke="#FFCF25"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Currency Symbols - Center Left */}
      <svg
        className="absolute top-1/2 left-1/4 w-20 h-20 md:w-28 md:h-28 opacity-8 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <text x="50" y="120" fontSize="120" fontFamily="Arial" fontWeight="bold" fill="#FFCF25">₹</text>
      </svg>

      {/* Market Indicators - Center Right */}
      <svg
        className="absolute top-1/3 right-1/4 w-16 h-16 md:w-24 md:h-24 opacity-10 pointer-events-none"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <circle cx="100" cy="100" r="60" stroke="#181818" strokeWidth="3" fill="none" />
        <path
          d="M100 40 L100 100 L140 100"
          stroke="#FFCF25"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Additional Chart Lines - Top Center */}
      <svg
        className="absolute top-5 left-1/2 w-36 h-36 md:w-48 md:h-48 opacity-10 pointer-events-none transform -translate-x-1/2"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M20 150 L50 130 L80 140 L110 110 L140 90 L170 60"
          stroke="#181818"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="150" r="2.5" fill="#FFCF25" />
        <circle cx="170" cy="60" r="2.5" fill="#FFCF25" />
      </svg>

      {/* Bar Chart - Bottom Center */}
      <svg
        className="absolute bottom-5 left-1/2 w-32 h-32 md:w-40 md:h-40 opacity-12 pointer-events-none transform -translate-x-1/2"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect x="30" y="120" width="15" height="50" fill="#FFCF25" />
        <rect x="55" y="100" width="15" height="70" fill="#181818" />
        <rect x="80" y="110" width="15" height="60" fill="#FFCF25" />
        <rect x="105" y="90" width="15" height="80" fill="#181818" />
        <rect x="130" y="70" width="15" height="100" fill="#FFCF25" />
      </svg>

      {/* More Candlesticks - Top Right Corner */}
      <svg
        className="absolute top-5 right-5 w-20 h-20 md:w-28 md:h-28 opacity-10 pointer-events-none"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect x="40" y="140" width="6" height="30" fill="#FFCF25" />
        <line x1="43" y1="120" x2="43" y2="140" stroke="#FFCF25" strokeWidth="1.5" />
        <line x1="43" y1="170" x2="43" y2="190" stroke="#FFCF25" strokeWidth="1.5" />
        
        <rect x="70" y="120" width="6" height="40" fill="#181818" />
        <line x1="73" y1="100" x2="73" y2="120" stroke="#181818" strokeWidth="1.5" />
        <line x1="73" y1="160" x2="73" y2="180" stroke="#181818" strokeWidth="1.5" />
        
        <rect x="100" y="110" width="6" height="50" fill="#FFCF25" />
        <line x1="103" y1="90" x2="103" y2="110" stroke="#FFCF25" strokeWidth="1.5" />
        <line x1="103" y1="160" x2="103" y2="180" stroke="#FFCF25" strokeWidth="1.5" />
      </svg>

      {/* Trading Grid Pattern - Background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-8 pointer-events-none"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#181818" strokeWidth="0.5" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#grid)" />
      </svg>

      {/* Dollar Sign - Left Side */}
      <svg
        className="absolute top-1/3 left-5 md:left-10 w-16 h-16 md:w-20 md:h-20 opacity-8 pointer-events-none"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <text x="30" y="120" fontSize="100" fontFamily="Arial" fontWeight="bold" fill="#FFCF25">$</text>
      </svg>

      {/* Trading Volume Bars - Right Side */}
      <svg
        className="absolute bottom-1/3 right-5 md:right-10 w-20 h-20 md:w-24 md:h-24 opacity-10 pointer-events-none"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect x="30" y="150" width="8" height="20" fill="#FFCF25" />
        <rect x="50" y="130" width="8" height="40" fill="#181818" />
        <rect x="70" y="140" width="8" height="30" fill="#FFCF25" />
        <rect x="90" y="120" width="8" height="50" fill="#181818" />
        <rect x="110" y="110" width="8" height="60" fill="#FFCF25" />
      </svg>

      {/* Percentage Symbol - Center */}
      <svg
        className="absolute top-2/3 left-1/2 w-14 h-14 md:w-18 md:h-18 opacity-8 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <text x="50" y="120" fontSize="80" fontFamily="Arial" fontWeight="bold" fill="#181818">%</text>
      </svg>

      {/* Additional Trend Lines - Scattered */}
      <svg
        className="absolute top-1/4 left-1/3 w-24 h-24 md:w-32 md:h-32 opacity-10 pointer-events-none"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M20 170 L80 100 L160 40"
          stroke="#FFCF25"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="4,4"
        />
      </svg>

      <svg
        className="absolute bottom-1/4 right-1/3 w-24 h-24 md:w-32 md:h-32 opacity-10 pointer-events-none"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M40 30 L100 80 L180 150"
          stroke="#181818"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="3,3"
        />
      </svg>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2
          id="start-journey-heading"
          className="text-2xl md:text-3xl font-extrabold"
          style={{ color: '#FFCF25' }}
        >
          Start Your Journey with Charu Wealth Academy Today!
        </h2>
  <p className="text-[var(--charcoal)] mt-3 mb-6 max-w-2xl mx-auto">Join a proven program with live mentors, practical strategies and an active community to support your growth.</p>

        <div className="mt-6">
          <a
            href="#enroll"
            role="button"
            aria-label="Start your journey - enroll now"
            onClick={() => {
              /* quick scale/shadow handled by CSS; we keep a small JS hint for focus */
            }}
            className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform transition duration-200 ease-out hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-yellow-300 bg-gradient-to-r from-[var(--accent)] to-[#FFCF25] text-[var(--charcoal)]"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-semibold">Start Your Journey</span>
          </a>
        </div>
      </div>
    </section>
  );
}
