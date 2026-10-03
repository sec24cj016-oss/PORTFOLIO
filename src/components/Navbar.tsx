import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Terminal, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/sound';

interface NavbarProps {
  activeSection: string;
  onOpenTerminalModal?: () => void;
}

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'vision-lab', label: 'Vision Lab' },
  { id: 'experience', label: 'Journey' },
  { id: 'certifications', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onOpenTerminalModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAudio = () => {
    const next = !isAudioActive;
    setIsAudioActive(next);
    sound.setEnabled(next);
    if (next) sound.playClick();
  };

  const scrollToSection = (id: string) => {
    sound.playClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-3 sm:pt-4 transition-all duration-300">
      <nav
        className={`w-full max-w-5xl transition-all duration-300 rounded-2xl ${
          isScrolled
            ? 'py-2 px-4 sm:px-6 shadow-xl shadow-black/40 border border-white/10 bg-[#0b0e14]/85 backdrop-blur-xl'
            : 'py-3 px-5 sm:px-6 border border-white/8 bg-[#0b0e14]/60 backdrop-blur-md'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand */}
          <button
            onClick={() => scrollToSection('hero')}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-sm">
              J
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-tight text-slate-100 group-hover:text-white transition-colors">
                Jeevashree S
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                M.Tech CSE · AI &amp; Vision
              </span>
            </div>
          </button>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              const isVision = item.id === 'vision-lab';

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={() => sound.playHover()}
                  className={`relative px-3 py-1.5 text-xs font-medium transition-colors rounded-lg cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'text-white bg-white/10 font-semibold'
                      : isVision
                      ? 'text-sky-300 hover:text-white hover:bg-white/5'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  {isVision && <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={toggleAudio}
              title={isAudioActive ? 'Audio ON' : 'Audio Muted'}
              aria-label={isAudioActive ? 'Mute sound effects' : 'Enable sound effects'}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors cursor-pointer"
            >
              {isAudioActive ? <Volume2 className="w-4 h-4 text-sky-400" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Terminal Button */}
            <button
              onClick={() => {
                sound.playClick();
                const termElem = document.getElementById('terminal');
                if (termElem) termElem.scrollIntoView({ behavior: 'smooth' });
                if (onOpenTerminalModal) onOpenTerminalModal();
              }}
              onMouseEnter={() => sound.playHover()}
              title="Open Terminal"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Shell</span>
            </button>

            {/* Contact Button */}
            <button
              onClick={() => scrollToSection('contact')}
              onMouseEnter={() => sound.playHover()}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-950 bg-white hover:bg-slate-100 transition-colors cursor-pointer shadow-sm active:scale-95"
            >
              Contact
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-white/10 mt-3 flex flex-col gap-1 animate-in fade-in duration-150">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left px-3 py-2 text-xs font-medium rounded-lg ${
                  activeSection === item.id
                    ? 'text-white bg-white/10 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};
