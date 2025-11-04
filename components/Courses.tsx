"use client";

import { useEffect, useRef, useState } from "react";

type Course = {
  id: string;
  level: "Beginner" | "Advanced";
  title: string;
  desc: string;
  icon?: React.ReactNode;
};

const COURSES: Course[] = [
  {
    id: "c1",
    level: "Beginner",
    title: "Foundations of Trading",
    desc: "Learn market basics, chart reading, and risk rules to start trading with confidence.",
  },
  {
    id: "c2",
    level: "Advanced",
    title: "Technical Patterns & Setups",
    desc: "High-probability setups and how to combine indicators into a working strategy.",
  },
  {
    id: "c3",
    level: "Advanced",
    title: "Options & Derivatives",
    desc: "Advanced option strategies, hedging, and position management for active traders.",
  },
 
];

export default function Courses() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visibleIds, setVisibleIds] = useState<string[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(!!(mq && mq.matches));

    if (!containerRef.current || (mq && mq.matches)) return;

    const els = Array.from(containerRef.current.querySelectorAll('[data-course]')) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-course") || "";
            setVisibleIds((s) => (s.includes(id) ? s : [...s, id]));
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="courses" className="bg-white py-20 px-6 scroll-mt-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFCF25] text-center">
          Our Courses
          <span className="block h-1 bg-[#FFCF25] mt-4 mx-auto underline-draw" />
        </h2>

        <div ref={containerRef} className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES.map((c, idx) => {
            const inView = visibleIds.includes(c.id);
            const delay = `${idx * 80}`;
            const revealClass = inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4";

            return (
              <article
                key={c.id}
                data-course={c.id}
                className={`rounded-lg bg-white shadow-soft p-5 transform transition-all duration-500 ${revealClass} hover:scale-[1.02] hover:shadow-[0_12px_30px_rgba(255,207,37,0.08)]`}
                style={prefersReducedMotion ? undefined : { transitionDelay: `${delay}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-1 rounded-sm bg-[#FFCF25]" aria-hidden />
                    <span className="text-sm font-medium text-[#FFCF25]">{c.level}</span>
                  </div>
                  <div className="ml-auto">
                    {/* optional small icon */}
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#FFCF25]" aria-hidden>
                      <path d="M12 2v20M2 12h20" stroke="#FFCF25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                <h3 className="mt-4 text-lg font-bold text-[#181818]">{c.title}</h3>
                <p className="mt-2 text-sm text-[#212121]">{c.desc}</p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-[#666]">&nbsp;</div>
                  <a
                    href="/"
                    className="btn-enroll inline-block rounded-full bg-[#FFBF00] px-4 py-2 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105 hover:bg-[#FFCF25]"
                    aria-label={`Enroll in ${c.title}`}
                  >
                    Enroll Now
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
