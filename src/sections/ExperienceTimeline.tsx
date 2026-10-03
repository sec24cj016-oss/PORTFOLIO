import React, { useState } from 'react';
import { TIMELINE_DATA, TimelineMilestone } from '../data/portfolioData';
import { sound } from '../utils/sound';

export const ExperienceTimeline: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<TimelineMilestone>(TIMELINE_DATA[0]);

  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#090b10]">
      <div className="relative max-w-5xl mx-auto space-y-10 text-left">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-sky-400">
            Journey &amp; Education
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Academic &amp; Project Path
          </h2>
          <p className="text-sm text-slate-400 max-w-xl font-sans leading-relaxed">
            Key academic milestones, project developments, and continuous specialization in artificial intelligence.
          </p>
        </div>

        {/* Step Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {TIMELINE_DATA.map((item) => {
            const isSelected = selectedMilestone.step === item.step;

            return (
              <button
                key={item.step}
                onClick={() => {
                  sound.playClick();
                  setSelectedMilestone(item);
                }}
                className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-white/10 border-white/25 text-white'
                    : 'bg-[#0d1017] border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/15'
                }`}
              >
                <div className="text-[11px] font-mono text-sky-400 mb-1">
                  {item.period}
                </div>
                <div className="text-xs font-medium line-clamp-1">
                  {item.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Milestone Detail Card */}
        <div className="p-6 rounded-2xl bg-[#0d1017] border border-white/10 space-y-4 shadow-xl shadow-black/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/8 pb-4">
            <div>
              <span className="text-xs font-mono text-sky-400">
                Phase {selectedMilestone.step} · {selectedMilestone.period}
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">
                {selectedMilestone.title}
              </h3>
            </div>
            <div className="text-xs font-mono text-slate-400">
              {selectedMilestone.institutionOrContext}
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            {selectedMilestone.description}
          </p>

          <div className="space-y-2 pt-2">
            <div className="text-xs font-mono text-slate-400">
              Key Focus &amp; Competencies:
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {selectedMilestone.keyLearnings.map((learning, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-white/5 text-slate-300 border border-white/5"
                >
                  {learning}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
