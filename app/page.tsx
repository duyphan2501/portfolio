import { Reveal } from "@/components/effects/reveal";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Phan Nhut Duy",
    jobTitle: "Fullstack Engineer Intern",
    email: "mailto:duyphan2501@gmail.com",
    telephone: "+84 85 918 6979",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Ton Duc Thang University",
    },
    sameAs: ["https://github.com/duyphan2501"],
    knowsAbout: [
      "Next.js",
      "Node.js",
      "Redis",
      "RabbitMQ",
      "WebRTC",
      "MongoDB",
      "MySQL",
    ],
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Reveal direction="up" id="about">
          <About />
        </Reveal>
        <Reveal direction="left" id="projects">
          <Projects />
        </Reveal>
        <Reveal direction="right" id="skills">
          <Skills />
        </Reveal>
        <Reveal direction="up" id="contact">
          <Contact />
        </Reveal>
      </main>
      <Reveal direction="up">
        <Footer />
      </Reveal>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
