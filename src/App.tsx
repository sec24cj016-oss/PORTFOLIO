import React, { useState, useEffect } from 'react';
import { InteractiveBackground } from './components/InteractiveBackground';
import { Navbar } from './components/Navbar';
import { ProjectModal } from './components/ProjectModal';
import { CertificateModal } from './components/CertificateModal';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { SkillsMatrixSection } from './sections/SkillsMatrixSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { OpenCVVisionLab } from './sections/OpenCVVisionLab';
import { ExperienceTimeline } from './sections/ExperienceTimeline';
import { AchievementsSection } from './sections/AchievementsSection';
import { CertificationsVault } from './sections/CertificationsVault';
import { GitHubActivitySection } from './sections/GitHubActivitySection';
import { TerminalSection } from './sections/TerminalSection';
import { ContactSection } from './sections/ContactSection';
import { Footer } from './sections/Footer';
import { ProjectItem, CertificateItem } from './data/portfolioData';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);

  // Active section spy based on scroll position
  useEffect(() => {
    const sectionIds = [
      'hero',
      'about',
      'skills',
      'projects',
      'vision-lab',
      'experience',
      'achievements',
      'certifications',
      'github-activity',
      'terminal',
      'contact',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#090a0f] text-slate-100 overflow-x-hidden">
      {/* Cinematic Interactive Background */}
      <InteractiveBackground />

      {/* Floating glassmorphism navigation */}
      <Navbar
        activeSection={activeSection}
        onOpenTerminalModal={() => handleScrollTo('terminal')}
      />

      {/* Main Content Layout */}
      <main className="relative z-10 flex flex-col">
        {/* Hero Section */}
        <HeroSection
          onExploreWork={() => handleScrollTo('projects')}
          onConnect={() => handleScrollTo('contact')}
          onOpenTerminal={() => handleScrollTo('terminal')}
        />

        {/* System Profile / About Section */}
        <AboutSection />

        {/* Tech Stack Matrix / Skills Section */}
        <SkillsMatrixSection />

        {/* Intelligence Archive / Projects Section */}
        <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />

        {/* Real-Time Computer Vision & Perception / OpenCV Lab */}
        <OpenCVVisionLab />

        {/* Academic & Engineering Journey / Experience Timeline */}
        <ExperienceTimeline />

        {/* Mission Log / Achievements Section */}
        <AchievementsSection />

        {/* Certificate Vault / Verified Credentials */}
        <CertificationsVault onSelectCertificate={(cert) => setSelectedCertificate(cert)} />

        {/* GitHub Code Activity & Telemetry Section */}
        <GitHubActivitySection />

        {/* Interactive Terminal Console */}
        <TerminalSection />

        {/* Final Stage / Contact Connection Section */}
        <ContactSection />
      </main>

      {/* Minimal Futuristic Footer */}
      <Footer />

      {/* Full-Screen Project Case Study Showcase Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Holographic Certificate Verification Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </div>
  );
}
