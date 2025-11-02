import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Features from "./components/Features";
import Trainers from "./components/Trainers";
import Courses from "./components/Courses";
import Reviews from "./components/Reviews";
import Instagram from "./components/Instagram";
import WhyChooseUs from "./components/WhyChooseUs";
import CTASection from "./components/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
  <Hero />
  <AboutUs />
  <Features />
  <Trainers />
  <Courses />
  <Reviews />
  <WhyChooseUs />
  <CTASection />
  <Instagram />
    </div>
  );
}
