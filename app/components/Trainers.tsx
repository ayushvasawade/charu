"use client";

import { useEffect, useRef, useState } from "react";

type Trainer = {
  id: string;
  name: string;
  bio: string;
  expertise: string[];
  image: string;
  socials: { href: string; type: "linkedin" | "instagram" | "twitter" }[];
};

const TRAINERS: Trainer[] = [
  {
    id: "t1",
    name: "Aakash",
    bio: "Senior Trader & Mentor with 8+ years of live trading experience across equities and derivatives.",
    expertise: ["Live Execution", "Risk Management", "Strategy Building"],
    image: "/trainer-1.png",
    socials: [
      { href: "#", type: "linkedin" },
      { href: "#", type: "instagram" },
    ],
  },
  {
    id: "t2",
    name: "Gargi Barge",
    bio: "Market analyst and educator focused on practical, result-driven trading systems and psychology.",
    expertise: ["Technical Analysis", "System Design", "Community Coaching"],
    image: "public/images/Aakash dada nd Gargi didi.png",
    socials: [
      { href: "#", type: "linkedin" },
      { href: "#", type: "twitter" },
    ],
  },
];

function SocialIcon({ type }: { type: Trainer["socials"][0]["type"] }) {
  const common = "w-5 h-5 transition-transform duration-200";
  if (type === "linkedin")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M16 8a6 6 0 016 6v6h-4v-6a2 2 0 00-4 0v6h-4v-12h4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (type === "instagram")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17.5 6.5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7.77V8a10.66 10.66 0 01-7.69-3.9s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5A4.5 4.5 0 0023 3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Trainers() {
  const container = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(!!(mq && mq.matches));

    if (!container.current || (mq && mq.matches)) return;

    const els = Array.from(container.current.querySelectorAll('[data-trainer]')) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-trainer") || "";
            setVisible((s) => ({ ...s, [id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-white py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFCF25] text-center">
          Meet Our Expert Trainers
          <span className={`block h-1 bg-[#FFCF25] mt-4 mx-auto ${"underline-draw"}`} />
        </h2>

        <div ref={container} className="mt-12 flex flex-col gap-12">
          {TRAINERS.map((t, idx) => {
            const isEven = idx % 2 === 1;
            const inView = !!visible[t.id];
            const imgSlide = prefersReducedMotion ? "" : inView ? "translate-x-0 opacity-100" : isEven ? "translate-x-8 opacity-0" : "-translate-x-8 opacity-0";
            const infoSlide = prefersReducedMotion ? "" : inView ? "translate-x-0 opacity-100" : isEven ? "-translate-x-8 opacity-0" : "translate-x-8 opacity-0";

            return (
              <article
                key={t.id}
                data-trainer={t.id}
                className={`group relative flex flex-col md:flex-row ${isEven ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-6 md:gap-8 p-4 md:p-6 bg-[#F6F6F6] rounded-lg transform transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_10px_30px_rgba(255,207,37,0.08)]`}
                style={{ borderLeft: isEven ? undefined : "4px solid #FFCF25", borderRight: isEven ? "4px solid #FFCF25" : undefined }}
              >
                <div className={`md:w-1/2 w-full overflow-hidden ${imgSlide} transition-all duration-700`} style={prefersReducedMotion ? { transition: "none" } : undefined}>
                  <img src={t.image} alt={t.name} className="w-full h-auto object-cover" />
                </div>

                <div className={`md:w-1/2 w-full ${infoSlide} transition-all duration-700`} style={prefersReducedMotion ? { transition: "none" } : undefined}>
                  <h3 className="text-xl font-bold text-[#181818]">{t.name}</h3>
                  <p className="mt-2 text-sm text-[#333333] max-w-xl">{t.bio}</p>

                  <ul className="mt-3 flex flex-wrap gap-2">
                    {t.expertise.map((e) => (
                      <li key={e} className="text-sm text-[#181818] bg-white/0 px-2 py-1 rounded-md text-sm opacity-90">
                        {e}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex items-center gap-3">
                    {t.socials.map((s) => (
                      <a
                        key={s.type}
                        href={s.href}
                        className="group w-9 h-9 rounded-full flex items-center justify-center text-[#181818] hover:text-[#FFCF25] transition-colors duration-200"
                        aria-label={`${t.name} on ${s.type}`}
                      >
                        <SocialIcon type={s.type} />
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
