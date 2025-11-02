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
      ref={ref}
      className="relative overflow-hidden bg-[var(--subtle)] py-14 md:py-20"
      aria-labelledby="start-journey-heading"
    >
      {/* Decorative shapes */}
      <svg
        className="absolute -left-8 -top-6 w-72 h-72 opacity-90 float-shape pointer-events-none"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path fill="var(--accent)" d="M43.6,-54.7C57.2,-45,70.4,-36.3,73.7,-24.3C77,-12.3,70.5,2.1,64.4,16.3C58.3,30.5,52.6,44.6,40.4,51.6C28.2,58.6,9.6,58.6,-6.6,62.2C-22.9,65.8,-45.8,73,-55,66.9C-64.3,60.8,-59.8,41.4,-58.1,25.7C-56.4,10.1,-57.6,-2.2,-53.4,-13.8C-49.1,-25.5,-39.5,-36.5,-28.1,-46.5C-16.7,-56.5,-8.4,-65.4,4.1,-70.3C16.7,-75.1,33.5,-75.4,43.6,-54.7Z" transform="translate(100 100)" />
      </svg>

      <svg
        className="absolute right-0 bottom-0 w-64 h-64 opacity-80 float-shape pointer-events-none"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path fill="var(--accent)" d="M39.1,-55.8C50.3,-45.6,58.4,-33.1,63.5,-18.6C68.6,-4.1,70.7,12.6,66.3,25.9C61.9,39.1,50.8,49.1,37.3,55.1C23.8,61.1,7.9,63.2,-7.6,68.8C-23.2,74.5,-38.3,83.7,-47.4,78.9C-56.5,74.1,-59.6,55.4,-62.1,38.2C-64.6,20.9,-66.4,5.2,-65.4,-11.6C-64.5,-28.4,-60.6,-46.3,-50.8,-57.8C-41.1,-69.3,-25.4,-74.4,-9.4,-70.9C6.6,-67.4,13.2,-55.9,39.1,-55.8Z" transform="translate(100 100)" />
      </svg>

      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2
          id="start-journey-heading"
          className="text-2xl md:text-3xl font-extrabold"
          style={{ color: '#FFCF25' }}
        >
          Start Your Journey with Charu Trading Academy Today!
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
