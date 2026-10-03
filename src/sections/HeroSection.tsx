import React from 'react';
import { ArrowDown, ArrowUpRight, Eye, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { NeuralCore3D } from '../components/NeuralCore3D';
import { sound } from '../utils/sound';

interface HeroSectionProps {
  onExploreWork: () => void;
  onConnect: () => void;
  onOpenTerminal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreWork,
  onConnect,
  onOpenTerminal,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="relative max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Authoritative Editorial Story */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-7 z-10 text-left">
          {/* Subtle Academic Tag */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            <span>M.Tech CSE Postgraduate</span>
            <span className="text-slate-600">·</span>
            <span>Chennai, India</span>
          </div>

          {/* Name & Headline */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl font-display font-bold tracking-tight text-white leading-[1.08]">
              Jeevashree S
            </h1>

            <p className="text-xl sm:text-2xl font-display font-medium text-slate-300 max-w-xl leading-snug">
              Building intelligent, data-driven systems with Artificial Intelligence and Computer Vision.
            </p>
          </div>

          {/* Authentic Biography Prose */}
          <p className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed font-sans">
            Postgraduate student at Sri Sairam Engineering College (8.76 CGPA), specializing in machine learning algorithms, YOLO object detection, and Python data pipelines.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                sound.playClick();
                onExploreWork();
              }}
              onMouseEnter={() => sound.playHover()}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-950 bg-white hover:bg-slate-100 shadow-md shadow-black/20 transition-all duration-150 cursor-pointer active:scale-98 flex items-center gap-2"
            >
              <span>View Projects</span>
              <ArrowDown className="w-4 h-4 text-slate-700" />
            </button>

            <button
              onClick={() => {
                sound.playClick();
                const visionEl = document.getElementById('vision-lab');
                if (visionEl) visionEl.scrollIntoView({ behavior: 'smooth' });
              }}
              onMouseEnter={() => sound.playHover()}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-sky-300 bg-sky-950/40 hover:bg-sky-900/50 border border-sky-500/30 transition-all duration-150 cursor-pointer active:scale-98 flex items-center gap-2"
            >
              <Eye className="w-4 h-4 text-sky-400" />
              <span>OpenCV Vision Lab</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onConnect();
              }}
              onMouseEnter={() => sound.playHover()}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-150 cursor-pointer active:scale-98 flex items-center gap-2"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onOpenTerminal();
              }}
              onMouseEnter={() => sound.playHover()}
              title="Launch Terminal"
              className="p-2.5 rounded-xl text-slate-400 hover:text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
            >
              <Terminal className="w-4 h-4" />
            </button>
          </div>

          {/* Academic & Experience Key Metrics */}
          <div className="pt-6 border-t border-white/8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {PERSONAL_INFO.stats.map((stat, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
                  {stat.value}
                  <span className="text-xs text-sky-400 ml-0.5">{stat.suffix}</span>
                </div>
                <div className="text-[11px] font-mono text-slate-400 tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Refined 3D Neural Sphere */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px] sm:min-h-[440px]">
          <div className="relative w-full h-[380px] sm:h-[440px] flex items-center justify-center">
            <NeuralCore3D />
          </div>
        </div>
      </div>
    </section>
  );
};
