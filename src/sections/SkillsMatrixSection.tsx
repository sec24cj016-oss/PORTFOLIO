import React, { useState } from 'react';
import { SKILLS_DATA, SkillNode } from '../data/portfolioData';
import { sound } from '../utils/sound';

const CATEGORIES = [
  'ALL',
  'AI & MACHINE LEARNING',
  'COMPUTER VISION',
  'PROGRAMMING',
  'DATA SCIENCE & ANALYTICS',
  'TOOLS'
] as const;

export const SkillsMatrixSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const filteredSkills = activeCategory === 'ALL'
    ? SKILLS_DATA
    : SKILLS_DATA.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#090b10]">
      <div className="relative max-w-5xl mx-auto space-y-10 text-left">
        {/* Header */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-sky-400">
            Technical Stack
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Skills &amp; Technologies
          </h2>
          <p className="text-sm text-slate-400 max-w-xl font-sans leading-relaxed">
            Core competencies across machine learning frameworks, computer vision libraries, and Python data pipelines.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/5 rounded-xl border border-white/10 w-fit text-xs font-medium">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  sound.playClick();
                  setActiveCategory(cat);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat === 'ALL' ? 'All Skills' : cat}
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="p-5 rounded-2xl bg-[#0d1017] border border-white/8 hover:border-white/20 transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">
                    {skill.category}
                  </span>
                  <span className="font-mono text-white font-medium">
                    {skill.proficiency}%
                  </span>
                </div>

                <h3 className="text-base font-semibold text-white group-hover:text-sky-300 transition-colors">
                  {skill.name}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {skill.description}
                </p>
              </div>

              {/* Clean Metric Progress Bar */}
              <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5">
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sky-400 rounded-full transition-all duration-300"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-slate-500">
                  <span>Proficiency</span>
                  <span>{skill.experience}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
