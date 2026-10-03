import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, AlertTriangle, Layers, Cpu, BarChart3, ArrowRight } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';
import { sound } from '../utils/sound';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sound.playClick();
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200"
    >
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0d1017] border border-cyan-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-slate-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#0d1017]/95 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-500/40 text-cyan-300">
              ARCHIVE // {project.number}
            </span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-colors"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Code</span>
              </a>
            )}
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              onMouseEnter={() => sound.playHover()}
              aria-label="Close project showcase"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Main Title & Hero Banner */}
          <div className="space-y-4">
            <h2 id="modal-project-title" className="text-2xl sm:text-4xl font-display font-bold tracking-tight text-white">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-cyan-300 font-medium leading-relaxed">
              {project.tagline}
            </p>

            {/* Project Image Mockup */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video max-h-[380px] bg-slate-900 shadow-2xl">
              <img
                src={project.image}
                alt={`${project.title} system interface`}
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1017] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-cyan-300/90 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <span>SYSTEM INTERFACE PREVIEW</span>
                <span>STATUS: STABLE DEPLOYMENT</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            {project.stats.map((st, idx) => (
              <div key={idx} className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400">
                  {st.value}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-1">
                  {st.label}
                </div>
              </div>
            ))}
          </div>

          {/* Problem vs Solution Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-semibold tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>CHALLENGE & PROBLEM</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>ENGINEERED SOLUTION</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Core System Capabilities</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.keyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5 text-sm text-slate-200"
                >
                  <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* System Architecture & Results */}
          <div className="p-5 rounded-2xl bg-[#131722] border border-white/10 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 tracking-wider">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>SYSTEM ARCHITECTURE</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                {project.architecture}
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-violet-300 tracking-wider">
                <BarChart3 className="w-4 h-4 text-violet-400" />
                <span>BENCHMARK RESULTS & IMPACT</span>
              </div>
              <ul className="space-y-1.5 text-sm text-slate-300">
                {project.results.map((res, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-violet-400 font-bold">›</span>
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              Technologies & Frameworks
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono text-slate-200 bg-white/5 border border-white/10 rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs in footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="text-xs text-slate-400 font-mono">
              ENGINEERED BY JEEVASHREE S
            </div>
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-mono rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>Inspect Codebase</span>
                </a>
              )}
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 transition-all shadow-md shadow-cyan-500/20"
                >
                  <span>Launch Live System</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
