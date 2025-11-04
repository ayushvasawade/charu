"use client";

import { useEffect, useRef, useState } from "react";

interface InstagramReel {
  url: string;
  thumbnail?: string;
  title?: string;
}

export default function Instagram() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState<Record<number, boolean>>({});
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [reels, setReels] = useState<InstagramReel[]>([]);
  const [loading, setLoading] = useState(true);

  // Load Instagram links and fetch thumbnails
  useEffect(() => {
    const loadReels = async () => {
      try {
        const response = await fetch('/instagramLinks.json');
        const data = await response.json();
        const links = data.instagramLinks || [];

        // Fetch thumbnails using our API route (server-side, bypasses CORS)
        const reelsWithThumbnails = await Promise.all(
          links.map(async (url: string) => {
            try {
              // Fetch thumbnail via our Next.js API route
              const apiUrl = `/api/instagram-thumbnail?url=${encodeURIComponent(url)}`;
              const response = await fetch(apiUrl);
              
              if (response.ok) {
                const data = await response.json();
                if (data.thumbnail_url) {
                  return {
                    url,
                    thumbnail: data.thumbnail_url,
                    title: data.title,
                  };
                }
              }
              
              // If API route fails, try direct Instagram embed image
              // Extract reel ID for embed URL
              const reelIdMatch = url.match(/\/reel\/([^\/]+)/);
              if (reelIdMatch) {
                const reelId = reelIdMatch[1];
                // Instagram embed image URL (this usually works)
                const embedImageUrl = `https://www.instagram.com/reel/${reelId}/embed/`;
                
                return {
                  url,
                  thumbnail: `https://www.instagram.com/p/${reelId}/media/?size=l`,
                  embedUrl: embedImageUrl,
                };
              }
              
              return { url, thumbnail: undefined };
            } catch (error) {
              console.error(`Error fetching thumbnail for ${url}:`, error);
              return { url, thumbnail: undefined };
            }
          })
        );

        setReels(reelsWithThumbnails);
        setLoading(false);
      } catch (error) {
        console.error('Error loading Instagram links:', error);
        setLoading(false);
      }
    };

    loadReels();
  }, []);

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
  }, [reels]);

  return (
    <section id="instagram" className="bg-white py-20 px-6 scroll-mt-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFCF25] text-center">
          Follow Our Journey
          <span className="block h-1 bg-[#FFCF25] mt-4 mx-auto underline-draw" />
        </h2>

        <div ref={containerRef} className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? (
            <div className="col-span-full text-center py-8 text-[#333333]">Loading Instagram reels...</div>
          ) : reels.length === 0 ? (
            <div className="col-span-full text-center py-8 text-[#333333]">No Instagram reels available.</div>
          ) : (
            reels.map((reel, idx) => {
              const inView = !!visible[idx];
              const revealClass = prefersReducedMotion ? "" : inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4";
              
              // Extract reel ID for better thumbnail handling
              const reelIdMatch = reel.url.match(/\/reel\/([^\/]+)/);
              const reelId = reelIdMatch ? reelIdMatch[1] : '';
              
              // Use Instagram's embed thumbnail URL pattern
              // Note: Instagram may block direct thumbnail access, so we use oEmbed or embed
              const thumbnailUrl = reel.thumbnail || `https://www.instagram.com/p/${reelId}/media/?size=l`;

              return (
                <a
                  key={idx}
                  href={reel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-insta={idx}
                  className={`insta-card relative overflow-hidden rounded-md bg-white border border-transparent ${revealClass} transition-all duration-600 block group cursor-pointer`}
                  style={{ boxShadow: '0 6px 18px rgba(0,0,0,0.04)' }}
                >
                  <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                    {thumbnailUrl ? (
                      <img 
                        src={thumbnailUrl} 
                        alt={reel.title || `Instagram reel ${idx + 1}`} 
                        className="w-full h-full object-cover block"
                        loading="lazy"
                        onError={async (e) => {
                          // If image fails, try to fetch from Instagram embed
                          const img = e.target as HTMLImageElement;
                          const reelIdMatch = reel.url.match(/\/reel\/([^\/]+)/);
                          if (reelIdMatch) {
                            const reelId = reelIdMatch[1];
                            // Try Instagram's CDN directly
                            const cdnUrl = `https://scontent.cdninstagram.com/v/t51.29350-15/${reelId}_n.jpg`;
                            img.src = cdnUrl;
                            img.onerror = () => {
                              // If CDN also fails, try one more method
                              img.src = `https://www.instagram.com/p/${reelId}/media/?size=l`;
                            };
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FFCF25]/20 to-[#FFCF25]/5">
                        <div className="text-center">
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#FFCF25] mb-2 mx-auto">
                            <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="text-xs text-[#181818] font-medium block">Loading...</span>
                        </div>
                      </div>
                    )}

                    {/* Overlay with Instagram icon */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#FFCF25]">
                        <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z" stroke="#FFCF25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" stroke="#FFCF25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </a>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
