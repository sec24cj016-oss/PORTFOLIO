import React, { useState } from 'react';
import { Award, Trophy, CheckCircle, ShieldAlert, Sparkles, Terminal } from 'lucide-react';
import { ACHIEVEMENTS_DATA, AchievementItem } from '../data/portfolioData';
import { sound } from '../utils/sound';

export const AchievementsSection: React.FC = () => {
  const [activeAchievement, setActiveAchievement] = useState<AchievementItem | null>(ACHIEVEMENTS_DATA[0]);

  return (
    <section id="achievements" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#090b13]/75 backdrop-blur-[2px]">
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20">
            <Trophy className="w-3.5 h-3.5" />
            <span>MISSION LOG // UNLOCKED ACHIEVEMENTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Mission Log & Recognition
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl font-sans">
            Competitive innovation awards, verified professional language certifications, and continuous development benchmarks.
          </p>
        </div>

        {/* Mission Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ACHIEVEMENTS_DATA.map((ach) => {
            const isSelected = activeAchievement?.id === ach.id;
            const isTrophy = ach.badge.includes('🏆');

            return (
              <div
                key={ach.id}
                onClick={() => {
                  sound.playClick();
                  setActiveAchievement(ach);
                }}
                onMouseEnter={() => sound.playHover()}
                data-cursor-interactive="true"
                className={`relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-[#121726] border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.25)]'
                    : isTrophy
                    ? 'bg-[#0f1422] border-amber-500/30 hover:border-amber-400/60'
                    : 'bg-[#0b0e17] border-white/10 hover:border-cyan-500/30 hover:bg-[#0e1320]'
                }`}
              >
                {/* Top Badge & Unlock Status */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 font-bold text-cyan-300">
                    {ach.badge}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{ach.unlockedStatus}</span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-2">
                  <h3 className="text-lg font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {ach.title}
                  </h3>
                  <div className="text-xs font-mono text-cyan-400/90 font-medium">
                    {ach.subtitle}
                  </div>
                  <p className="text-xs text-slate-300/80 leading-relaxed font-sans pt-1">
                    {ach.description}
                  </p>
                </div>

                {/* Footer Impact note */}
                <div className="mt-5 pt-3 border-t border-white/5 text-[11px] font-mono text-slate-400">
                  <span className="text-cyan-400 font-semibold">IMPACT: </span>
                  {ach.impact}
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Banner: Solveathon 5.0 2nd Prize Spotlight */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-cyan-500/10 to-transparent border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-400">
              <Trophy className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono text-amber-400 font-bold tracking-wider uppercase">
                SPOTLIGHT WIN // SOLVEATHON 5.0
              </div>
              <h4 className="text-xl font-display font-bold text-white">
                2nd Prize Winner — SDG Goal 2 Innovation Challenge
              </h4>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Engineered an intelligent computational prototype addressing Sustainable Development Goal 2 (Zero Hunger) through automated logistics telemetry and predictive distribution.
              </p>
            </div>
          </div>

          <div className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs whitespace-nowrap">
            GRAND FINALE AWARD
          </div>
        </div>
      </div>
    </section>
  );
};
