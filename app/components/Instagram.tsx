"use client";

import { useEffect, useRef, useState } from "react";

const IMAGES = [
  "/instagram-1.jpg",
  "/instagram-2.jpg",
  "/instagram-3.jpg",
  "/instagram-4.jpg",
  "/instagram-5.jpg",
  "/instagram-6.jpg",
  "/instagram-7.jpg",
  "/instagram-8.jpg",
];

export default function Instagram() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState<Record<number, boolean>>({});
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(!!(mq && mq.matches));

    if (!containerRef.current || (mq && mq.matches)) return;

    const nodes = Array.from(containerRef.current.querySelectorAll('[data-insta]')) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-insta'));
            setVisible((s) => ({ ...s, [idx]: true }));
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-white py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFCF25] text-center">
          Follow Our Journey
          <span className="block h-1 bg-[#FFCF25] mt-4 mx-auto underline-draw" />
        </h2>

        <div ref={containerRef} className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {IMAGES.map((src, idx) => {
            const inView = !!visible[idx];
            const revealClass = prefersReducedMotion ? "" : inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4";

            return (
              <div
                key={src}
                data-insta={idx}
                className={`insta-card relative overflow-hidden rounded-md bg-white border border-transparent ${revealClass} transition-all duration-600`}
                style={{ boxShadow: '0 6px 18px rgba(0,0,0,0.04)' }}
              >
                <img src={src} alt={`Instagram post ${idx + 1}`} className="w-full h-48 object-cover block" />

                <button
                  aria-label={`Open Instagram post ${idx + 1}`}
                  className="insta-overlay absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity duration-200"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#FFCF25]">
                    <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z" stroke="#FFCF25" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" stroke="#FFCF25" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
