"use client";

import { useEffect, useRef, useState } from "react";

type Feature = {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
};

const FEATURES: Feature[] = [
  {
    id: "live",
    title: "Live Trading Sessions",
    desc: "Real-time market sessions to learn trade execution and live decision making.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M3 12h3l2 4 3-8 4 6 2-4h3" stroke="#FFCF25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "mentor",
    title: "Expert Mentorship Program",
    desc: "One-on-one guidance from experienced traders to accelerate learning.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 20a8 8 0 0116 0" stroke="#FFCF25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "strategies",
    title: "Practical, Result-Driven Strategies",
    desc: "Tactical approaches focused on consistency and risk management.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M3 7h18M3 12h12M3 17h6" stroke="#FFCF25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "community",
    title: "Community Support & Networking",
    desc: "Connect with peers, share ideas, and grow together.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" stroke="#FFCF25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="7" r="4" stroke="#FFCF25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "track",
    title: "Proven Track Record",
    desc: "Results and testimonials from students who trade with confidence.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M20 6L9 17l-5-5" stroke="#FFCF25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Features() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visibleIds, setVisibleIds] = useState<string[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(!!(mq && mq.matches));

    if (!containerRef.current || (mq && mq.matches)) return;

    const items = Array.from(containerRef.current.querySelectorAll('[data-feature]')) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-feature") || "";
          if (entry.isIntersecting && id && !visibleIds.includes(id)) {
            setVisibleIds((s) => [...s, id]);
          }
        });
      },
      { threshold: 0.12 }
    );

    items.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [visibleIds.length]);

  return (
    <section id="features" className="bg-white py-20 px-6 scroll-mt-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#181818]">Our Features</h3>
          <div className="mt-3 h-2 w-24 bg-[#FFCF25]" aria-hidden />
        </div>

        <div className="border-t border-[#F6F6F6] pt-8">
          <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, idx) => {
              const isVisible = visibleIds.includes(f.id);
              const delay = `${idx * 75}`;
              return (
                <article
                  key={f.id}
                  data-feature={f.id}
                  className={`relative overflow-hidden rounded-lg bg-[#F6F6F6] p-6 transition-transform duration-500 ease-out transform ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  } hover:scale-[1.02]`}
                  style={prefersReducedMotion ? { transition: "none" } : { transitionDelay: `${delay}ms` }}
                >
                  <div className="absolute left-0 top-0 h-1 w-full bg-transparent" aria-hidden />
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 rounded-md p-3 bg-white border-t-4 border-[#FFCF25] drop-shadow-sm transition-shadow duration-300 hover:shadow-[0_10px_30px_rgba(255,207,37,0.16)]">
                      <div className="text-[#FFCF25]">{f.icon}</div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-[#181818]">{f.title}</h4>
                      <p className="mt-1 text-sm text-[#181818] opacity-80">{f.desc}</p>
                    </div>
                  </div>

                  {/* hover glow */}
                  <span className="pointer-events-none absolute inset-0 rounded-lg ring-0 transition-shadow duration-300" />
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
