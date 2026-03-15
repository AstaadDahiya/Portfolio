"use client";

import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/sections/Hero"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen" style={{ background: "#050507" }} />
  ),
});

const About = dynamic(() => import("@/components/sections/About"), {
  ssr: false,
});

const Projects = dynamic(() => import("@/components/sections/Projects"), {
  ssr: false,
});

const Experience = dynamic(() => import("@/components/sections/Experience"), {
  ssr: false,
});

const Certifications = dynamic(
  () => import("@/components/sections/Certifications"),
  { ssr: false }
);

const Contact = dynamic(() => import("@/components/sections/Contact"), {
  ssr: false,
});

const GSAPScrollEffects = dynamic(
  () => import("@/components/ui/GSAPScrollEffects"),
  { ssr: false }
);

const AmbientAudio = dynamic(
  () => import("@/components/ui/AmbientAudio"),
  { ssr: false }
);

const Preloader = dynamic(
  () => import("@/components/ui/Preloader"),
  { ssr: false }
);

const Navigation = dynamic(
  () => import("@/components/ui/Navigation"),
  { ssr: false }
);

const ScrollProgress = dynamic(
  () => import("@/components/ui/ScrollProgress"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative">
      <Preloader />
      <ScrollProgress />
      <Navigation />
      <GSAPScrollEffects />
      <AmbientAudio />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Certifications />
      <Contact />
    </main>
  );
}
