"use client";

import { useEffect, useRef, useState } from "react";
// CTAButton removed from Hero: Explore Courses link will reuse its styles

export default function Hero() {
  const [showUnderline, setShowUnderline] = useState(false);
  const [ctaIn, setCtaIn] = useState(false);
  const [imageIn, setImageIn] = useState(false);
  // Elfsight embed will be injected via script; no ref needed

  useEffect(() => {
    const u = setTimeout(() => setShowUnderline(true), 300);
    const c = setTimeout(() => setCtaIn(true), 450);
    const i = setTimeout(() => setImageIn(true), 550);
    return () => {
      clearTimeout(u);
      clearTimeout(c);
      clearTimeout(i);
    };
  }, []);

  // Inject Elfsight platform script once on client mount
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("elfsight-platform-script")) return;

    const script = document.createElement("script");
    script.id = "elfsight-platform-script";
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);

    // no cleanup: keep script for the lifetime of the app (Elfsight re-uses it)
  }, []);

  // Inject CSS override to hide ALL attribution, credits, and badges
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("elfsight-hide-badge-style")) return;

    const style = document.createElement("style");
    style.id = "elfsight-hide-badge-style";
    style.innerHTML = `
      /* Hide ALL Elfsight badge/credit elements */
      .elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20 .elfsight-badge,
      .elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20 .elfsight-credit,
      .elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20 .elfsight-copyright,
      .elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20 a[href*="elfsight"],
      /* Hide ALL Elfsight links and CTAs - be very aggressive */
      a[href*="elfsight"],
      a[href*="elfsight.com"],
      a[href*="elfsightcdn.com"],
      [class*="elfsight"] a,
      [class*="elfsight"] button,
      [id*="elfsight"] a,
      [id*="elfsight"] button,
      /* Hide any attribution or credits near the widget */
      .elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20 ~ *[class*="attribution"],
      .elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20 ~ *[class*="credit"],
      .elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20 ~ *[class*="copyright"],
      .elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20 ~ *[class*="stock"],
      .elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20 ~ *[class*="source"],
      /* Hide buttons and links near the widget - be very aggressive */
      .elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20 ~ button,
      .elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20 ~ a,
      .elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20 ~ * button,
      .elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20 ~ * a,
      .elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20 ~ *[role="button"],
      /* Hide any div or span that contains buttons/links below widget */
      .elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20 ~ div:has(button),
      .elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20 ~ div:has(a),
      .elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20 ~ span:has(button),
      .elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20 ~ span:has(a),
      /* Hide any elements with attribution-related classes in the Hero section */
      section:has(.elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20) [class*="attribution"],
      section:has(.elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20) [class*="credit"],
      section:has(.elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20) [class*="copyright"],
      section:has(.elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20) [class*="stock-image"],
      section:has(.elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20) [class*="free-stock"],
      section:has(.elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20) [class*="image-attribution"],
      section:has(.elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20) [class*="photo-credit"],
      section:has(.elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20) [class*="image-credit"],
      section:has(.elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20) [class*="photo-by"],
      section:has(.elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20) [class*="image-source"],
      section:has(.elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20) [id*="attribution"],
      section:has(.elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20) [id*="credit"],
      section:has(.elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20) [id*="copyright"],
      section:has(.elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20) [data-attribution],
      section:has(.elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20) [data-credit] {
        display: none !important;
        visibility: hidden !important;
        height: 0 !important;
        width: 0 !important;
        overflow: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
    `;

    document.head.appendChild(style);

    // Aggressively hide ALL attribution and credit elements
    const hideAllAttributions = () => {
      const widget = document.querySelector('.elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20');
      if (!widget) return;

      // Keywords to search for in text content
      const attributionKeywords = [
        'attribution', 'credit', 'copyright', 'photo by', 'image by',
        'free stock', 'stock image', 'stock photo', 'photo credit',
        'image credit', 'source', 'pexels', 'unsplash', 'pixabay',
        'freepik', 'shutterstock', 'getty', 'istock', 'adobe stock',
        'elfsight', 'powered by', 'create widget', 'get widget'
      ];

      // Check all elements in the hero section - especially buttons and links
      const heroSection = widget.closest('section');
      if (heroSection) {
        const allElements = heroSection.querySelectorAll('*');
        allElements.forEach((el) => {
          // Skip the widget itself and its children
          if (el === widget || widget.contains(el)) return;
          
          const element = el as HTMLElement;
          const text = element.textContent?.toLowerCase() || '';
          const className = element.className?.toLowerCase() || '';
          const id = element.id?.toLowerCase() || '';
          const tagName = element.tagName?.toLowerCase() || '';
          
          // Check if element is a button or link
          const isButtonOrLink = tagName === 'button' || tagName === 'a' || 
                                  element.getAttribute('role') === 'button' ||
                                  className.includes('button') ||
                                  className.includes('btn');
          
          // Check if element contains any attribution keywords
          const hasAttribution = attributionKeywords.some(keyword => 
            text.includes(keyword) || 
            className.includes(keyword) || 
            id.includes(keyword)
          );
          
          // Check for links to stock photo sites or Elfsight
          const links = element.querySelectorAll('a');
          const hasStockLink = Array.from(links).some(link => {
            const href = link.href?.toLowerCase() || '';
            return attributionKeywords.some(keyword => href.includes(keyword)) ||
                   href.includes('elfsight') || href.includes('elfsight.com') || href.includes('elfsightcdn.com');
          });
          
          // Also check if the element itself is an Elfsight link
          if (tagName === 'a') {
            const href = (element as HTMLAnchorElement).href?.toLowerCase() || '';
            if (href.includes('elfsight') || href.includes('elfsight.com') || href.includes('elfsightcdn.com')) {
              element.style.display = 'none';
              element.style.visibility = 'hidden';
              element.style.height = '0';
              element.style.width = '0';
              element.style.opacity = '0';
              element.style.pointerEvents = 'none';
              return;
            }
          }

          // Get position relative to widget
          const rect = element.getBoundingClientRect();
          const widgetRect = widget.getBoundingClientRect();
          const isBelowWidget = rect.top > widgetRect.bottom;
          const distanceFromWidget = isBelowWidget ? rect.top - widgetRect.bottom : 0;

          // Hide if:
          // 1. It contains attribution keywords
          // 2. It's a button/link below the widget (within 500px)
          // 3. It has stock photo links or Elfsight links
          // 4. It's any link/button below the widget (hide everything)
          if (hasAttribution || hasStockLink || (isButtonOrLink && isBelowWidget && distanceFromWidget < 500)) {
            element.style.display = 'none';
            element.style.visibility = 'hidden';
            element.style.height = '0';
            element.style.width = '0';
            element.style.opacity = '0';
            element.style.pointerEvents = 'none';
            element.style.position = 'absolute';
            element.style.left = '-9999px';
          }
        });
        
        // Specifically target ALL buttons and links below the widget - hide everything
        const buttonsAndLinks = heroSection.querySelectorAll('button, a, [role="button"], [class*="button"], [class*="btn"], [class*="cta"], [class*="link"]');
        buttonsAndLinks.forEach((el) => {
          if (el === widget || widget.contains(el)) return;
          
          const element = el as HTMLElement;
          const text = element.textContent?.toLowerCase() || '';
          const rect = element.getBoundingClientRect();
          const widgetRect = widget.getBoundingClientRect();
          
          // Hide ANY button/link below the widget (within 500px) - be very aggressive
          const isBelowWidget = rect.top > widgetRect.bottom;
          const distanceFromWidget = isBelowWidget ? rect.top - widgetRect.bottom : 0;
          
          // Check if it's an Elfsight link
          let isElfsightLink = false;
          const elementTagName = element.tagName?.toLowerCase() || '';
          if (elementTagName === 'a') {
            const href = (element as HTMLAnchorElement).href?.toLowerCase() || '';
            isElfsightLink = href.includes('elfsight') || href.includes('elfsight.com') || href.includes('elfsightcdn.com');
          }
          
          if (isBelowWidget && distanceFromWidget < 500) {
            // Hide if it contains stock-related text OR if it's a small button/link (likely attribution button) OR if it's Elfsight
            const hasStockText = attributionKeywords.some(keyword => text.includes(keyword));
            const isSmallElement = (rect.height < 50 && rect.width < 200) || text.length < 50;
            
            if (hasStockText || isSmallElement || isElfsightLink) {
              element.style.display = 'none';
              element.style.visibility = 'hidden';
              element.style.height = '0';
              element.style.width = '0';
              element.style.opacity = '0';
              element.style.pointerEvents = 'none';
              element.style.position = 'absolute';
              element.style.left = '-9999px';
              element.style.zIndex = '-9999';
            }
          }
        });
        
        // Also check for any elements that are direct siblings or next siblings of the widget container
        const widgetContainer = widget.parentElement;
        if (widgetContainer) {
          const widgetRect = widget.getBoundingClientRect();
          // Check next sibling
          let nextSibling = widgetContainer.nextElementSibling;
          while (nextSibling) {
            const siblingRect = nextSibling.getBoundingClientRect();
            if (siblingRect.top - widgetRect.bottom > 500) break;
            
            const text = nextSibling.textContent?.toLowerCase() || '';
            if (attributionKeywords.some(keyword => text.includes(keyword)) || 
                nextSibling.querySelector('button, a')) {
              (nextSibling as HTMLElement).style.display = 'none';
              (nextSibling as HTMLElement).style.visibility = 'hidden';
            }
            nextSibling = nextSibling.nextElementSibling;
          }
        }
      }

      // Also check parent container and all siblings
      const parent = widget.parentElement;
      if (parent) {
        Array.from(parent.children).forEach((child) => {
          if (child !== widget) {
            const element = child as HTMLElement;
            const text = element.textContent?.toLowerCase() || '';
            const className = element.className?.toLowerCase() || '';
            
            const hasAttribution = attributionKeywords.some(keyword => 
              text.includes(keyword) || className.includes(keyword)
            );
            
            if (hasAttribution) {
              element.style.display = 'none';
              element.style.visibility = 'hidden';
              element.style.height = '0';
              element.style.width = '0';
              element.style.opacity = '0';
              element.style.pointerEvents = 'none';
            }
          }
        });
      }
    };

    // Run immediately and set up aggressive observer
    hideAllAttributions();
    
    // Use requestAnimationFrame for better performance
    const observer = new MutationObserver(() => {
      requestAnimationFrame(() => {
        hideAllAttributions();
      });
    });

    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'id']
    });

    // Also run periodically to catch any missed elements
    const interval = setInterval(() => {
      hideAllAttributions();
    }, 1000);

    // Cleanup on unmount
    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative flex w-full items-center justify-center px-6 py-20 md:py-28 min-h-screen">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex w-full flex-col-reverse gap-10 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-var-text">
              {(
                "Unlock Your Financial Future with Charu Trading Academy"
              ).split(" ").map((word, idx) => (
                <span key={idx} className="inline-block mr-2">
                  <span className="fill-from-bottom" tabIndex={0} data-word={word}>
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            <div className="mb-6">
              <span className={`underline-draw ${showUnderline ? "show" : ""}`} aria-hidden />
            </div>

            <p className="mb-8 max-w-xl text-base sm:text-lg text-gray-300">
              Practical courses, personalized mentorship, and live market sessions to help you trade confidently.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#courses"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById("courses");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className="inline-flex w-full md:w-auto items-center justify-center rounded-full bg-[var(--cta)] px-5 py-3 text-sm font-semibold text-black shadow-cta transition-transform duration-200 hover:scale-105 hover:shadow-cta-glow focus:outline-none focus:ring-4 focus:ring-[var(--cta-ring)] self-start sm:self-center"
              >
                Explore Courses
              </a>
            </div>
          </div>

          <div
            className={`w-full md:flex-1 max-w-none rounded-none bg-transparent p-0 transition-transform duration-700 ease-out md:block ${
              imageIn ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            {/* TradingView widget container. We programmatically insert the TradingView embed script
                so the JSON config remains intact and initializes inside this container. */}
              {/* Elfsight Stocks embed (replaces previous TradingView widget) */}
              {/* Elfsight Stocks | Untitled Stocks */}
              <div
                className="elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20 h-[40vh] md:h-[60vh] lg:h-[80vh] w-full md:w-[480px] lg:w-[640px] md:ml-auto rounded-none overflow-hidden"
                data-elfsight-app-lazy
              />
          </div>
        </div>
      </div>
    </section>
  );
}
