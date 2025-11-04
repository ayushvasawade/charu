"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function AboutUs() {
	const ref = useRef<HTMLElement | null>(null);
	const [inView, setInView] = useState(false);
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	useEffect(() => {
		const mq = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
		setPrefersReducedMotion(!!(mq && mq.matches));

		if (!ref.current || (mq && mq.matches)) return;

		const obs = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setInView(true);
						obs.disconnect();
					}
				});
			},
			{ threshold: 0.15 }
		);

		obs.observe(ref.current);

		return () => obs.disconnect();
	}, []);

	return (
		<section
			id="about"
			ref={ref}
			aria-labelledby="about-heading"
			className="relative overflow-hidden bg-white py-20 px-6 md:py-28 scroll-mt-32 md:scroll-mt-40"
		>
			<div className="mx-auto max-w-6xl">
				<div className="relative flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
					{/* Text Content - Left Side */}
					<div className="md:flex-1">
						<h2
							id="about-heading"
							className="text-3xl sm:text-4xl font-extrabold text-[#FFCF25] leading-tight inline-block"
						>
							About Charu Trading Academy
							<span
								aria-hidden
								className={`block h-1 bg-[#FFCF25] mt-3 origin-left transition-all duration-700 ${
									inView ? "w-36" : "w-0"
								}`}
							/>
						</h2>

						<p
							className={`mt-6 max-w-xl text-base sm:text-lg text-[#181818] transform transition-all duration-700 ${
								inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
							}`}
							style={prefersReducedMotion ? { transition: "none" } : undefined}
						>
							We teach practical, result-driven trading strategies backed by live market sessions and experienced mentors. Our mission is to empower traders with the knowledge, tools, and community support they need to trade confidently and consistently.
						</p>

						<p
							className={`mt-4 max-w-xl text-sm text-[#181818] opacity-80 transform transition-all duration-900 delay-150 ${
								inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
							}`}
							style={prefersReducedMotion ? { transition: "none" } : undefined}
						>
							We combine proven methodologies, personalized mentorship, and a focus on risk management to create long-term traders, not quick fixes.
						</p>
					</div>

					{/* Big Logo - Right Side */}
					<div className={`md:w-96 md:flex-shrink-0 flex justify-center md:justify-end transform transition-all duration-700 delay-200 ${
						inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
					}`}
					style={prefersReducedMotion ? { transition: "none" } : undefined}>
						<Image 
							src="/Charu_Big_Logo.png" 
							alt="Charu Trading Academy" 
							width={400} 
							height={400}
							className="w-auto h-48 md:h-64 lg:h-80 object-contain"
							priority
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
