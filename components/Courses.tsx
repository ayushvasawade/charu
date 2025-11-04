"use client";

import { useEffect, useRef, useState } from "react";

type Course = {
  id: string;
  title: string;
  description: string;
  details: string[];
  price: number;
};

export default function Courses() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visibleIds, setVisibleIds] = useState<string[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollLinks, setEnrollLinks] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  // Fetch courses from JSON file
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/Courses.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.courses && Array.isArray(data.courses)) {
          setCourses(data.courses);
        } else {
          console.error('Invalid courses data structure:', data);
          setCourses([]);
        }
        if (data.enrollLinks && typeof data.enrollLinks === 'object') {
          setEnrollLinks(data.enrollLinks);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const mq = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(!!(mq && mq.matches));

    if (!containerRef.current || (mq && mq.matches) || courses.length === 0) return;

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
  }, [courses]);

  return (
    <section id="courses" className="bg-white py-20 px-6 scroll-mt-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFCF25] text-center">
          Our Courses
          <span className="block h-1 bg-[#FFCF25] mt-4 mx-auto underline-draw" />
        </h2>

        {loading ? (
          <div className="mt-10 text-center text-[#212121]">Loading courses...</div>
        ) : courses.length === 0 ? (
          <div className="mt-10 text-center text-[#212121]">No courses available.</div>
        ) : (
          <div ref={containerRef} className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((c, idx) => {
              const inView = visibleIds.includes(c.id) || visibleIds.length === 0;
              const delay = `${idx * 80}`;
              const revealClass = inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4";

              return (
                <article
                  key={c.id}
                  data-course={c.id}
                  className={`flex flex-col rounded-lg bg-white shadow-soft p-6 md:p-8 transform transition-all duration-500 ${revealClass} hover:scale-[1.02] hover:shadow-[0_12px_30px_rgba(255,207,37,0.08)]`}
                  style={prefersReducedMotion ? undefined : { transitionDelay: `${delay}ms`, minHeight: '420px' }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-1 rounded-sm bg-[#FFCF25]" aria-hidden />
                      <span className="text-sm font-medium text-[#FFCF25]">{c.id}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-[#181818] mb-3">{c.title}</h3>
                  
                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl md:text-4xl font-bold text-[#181818]">
                        ₹{c.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-sm text-[#666]">INR</span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-[#212121] mb-6">{c.description}</p>

                {/* Details with Bullets */}
                <ul className="flex-1 space-y-3 mb-6">
                  {c.details.map((detail, detailIdx) => (
                    <li key={detailIdx} className="flex items-start gap-3">
                      <svg 
                        className="w-5 h-5 text-[#FFCF25] mt-0.5 flex-shrink-0" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-[#212121]">{detail}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="mt-auto">
                  <a
                    href={enrollLinks[c.id] || "/"}
                    target={enrollLinks[c.id] ? "_blank" : "_self"}
                    rel={enrollLinks[c.id] ? "noopener noreferrer" : undefined}
                    className="w-full text-center rounded-full bg-[#FFBF00] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-[#FFCF25]"
                    aria-label={`Enroll in ${c.title}`}
                  >
                    Enroll Now
                  </a>
                </div>
              </article>
            );
          })}
          </div>
        )}
      </div>
    </section>
  );
}
