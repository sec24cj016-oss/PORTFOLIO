import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/sound';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5 bg-[#07090e] py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Info */}
        <div className="flex flex-col items-center sm:items-start gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2 text-slate-100 font-semibold text-sm">
            <span>Jeevashree S</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400 text-xs font-mono font-normal">M.Tech CSE</span>
          </div>
          <p className="text-slate-500 text-xs">
            Computer Vision · Machine Learning · Python Engineering
          </p>
        </div>

        {/* Links & Scroll to top */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-4 text-slate-400">
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => sound.playHover()}
              className="hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => sound.playHover()}
              className="hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              onMouseEnter={() => sound.playHover()}
              className="hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer ml-3 pl-4 border-l border-white/10"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
