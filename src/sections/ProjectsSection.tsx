import React, { useState } from 'react';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { PROJECTS_DATA, ProjectItem } from '../data/portfolioData';
import { sound } from '../utils/sound';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#090b10]">
      <div className="relative max-w-5xl mx-auto space-y-10 text-left">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="text-xs font-mono text-sky-400">
              Featured Work
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Projects &amp; Systems
            </h2>
            <p className="text-sm text-slate-400 max-w-xl font-sans leading-relaxed">
              Applied machine learning applications, real-time computer vision models, and predictive data systems.
            </p>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS_DATA.map((project) => {
            const isHovered = hoveredProjectId === project.id;

            return (
              <div
                key={project.id}
                onMouseEnter={() => {
                  sound.playHover();
                  setHoveredProjectId(project.id);
                }}
                onMouseLeave={() => setHoveredProjectId(null)}
                onClick={() => {
                  sound.playClick();
                  onSelectProject(project);
                }}
                className={`rounded-2xl bg-[#0d1017] border overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-200 group ${
                  isHovered
                    ? 'border-white/25 shadow-lg shadow-black/40 -translate-y-1'
                    : 'border-white/8 hover:border-white/20'
                }`}
              >
                {/* Project Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1017] via-transparent to-transparent opacity-80" />
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-sky-400">
                      {project.category}
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Tech stack and Action */}
                  <div className="pt-3 border-t border-white/5 space-y-3">
                    <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-slate-400">
                      {project.technologies.slice(0, 4).map((tech, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-white/5 text-slate-300">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs font-medium text-slate-300 group-hover:text-white pt-1">
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 text-sky-400 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
