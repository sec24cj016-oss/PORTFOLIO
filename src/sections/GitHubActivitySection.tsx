import React from 'react';
import { GitBranch, GitCommit, GitPullRequest, Github, Terminal, ArrowUpRight, Code, Flame } from 'lucide-react';
import { GITHUB_TELEMETRY, PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/sound';

export const GitHubActivitySection: React.FC = () => {
  // Generate a mock contribution matrix grid (14 weeks x 7 days)
  const weeks = 20;
  const daysPerWeek = 7;
  const contributionGrid = React.useMemo(() => {
    const grid: number[][] = [];
    for (let w = 0; w < weeks; w++) {
      const col: number[] = [];
      for (let d = 0; d < daysPerWeek; d++) {
        // Pseudo pattern with higher intensity on recent weeks
        const val = Math.random() > 0.35 ? Math.floor(Math.random() * 4) + 1 : 0;
        col.push(val);
      }
      grid.push(col);
    }
    return grid;
  }, []);

  const getHeatmapColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-cyan-950 border border-cyan-800/40';
      case 2:
        return 'bg-cyan-700/60 border border-cyan-600/50';
      case 3:
        return 'bg-cyan-500/80 border border-cyan-400/60';
      case 4:
        return 'bg-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.8)]';
      default:
        return 'bg-white/5 border border-white/5';
    }
  };

  return (
    <section id="github-activity" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#080a10]/75 backdrop-blur-[2px]">
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20">
              <Github className="w-3.5 h-3.5" />
              <span>CODE ACTIVITY // TELEMETRY STREAM</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
              Developer Telemetry
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl font-sans">
              Algorithmic version control, active repository branches, and code velocity across intelligent systems.
            </p>
          </div>

          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono text-cyan-300 bg-cyan-950/30 border border-cyan-500/30 hover:bg-cyan-500/10 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>VISIT GITHUB PROFILE</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Dashboard Frame */}
        <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/20 via-white/5 to-violet-500/20 border border-cyan-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
          <div className="rounded-[22px] bg-[#0c0f18] p-6 sm:p-8 space-y-8">
            {/* Top Telemetry Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-white/10">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
                  <span>TOTAL REPOSITORIES</span>
                </div>
                <div className="text-2xl font-mono font-bold text-white">
                  {GITHUB_TELEMETRY.totalRepos}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <GitCommit className="w-3.5 h-3.5 text-cyan-400" />
                  <span>ANNUAL CONTRIBUTIONS</span>
                </div>
                <div className="text-2xl font-mono font-bold text-cyan-300">
                  {GITHUB_TELEMETRY.totalContributions}+
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>ACTIVE STREAK</span>
                </div>
                <div className="text-2xl font-mono font-bold text-amber-300">
                  {GITHUB_TELEMETRY.currentStreak}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <GitPullRequest className="w-3.5 h-3.5 text-violet-400" />
                  <span>INTEGRATION RATE</span>
                </div>
                <div className="text-2xl font-mono font-bold text-violet-300">
                  99.4%
                </div>
              </div>
            </div>

            {/* Simulated Live Heatmap */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>ACTIVITY MATRIX (ROLLING TELEMETRY)</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px]">Less</span>
                  <div className="w-2.5 h-2.5 rounded-xs bg-white/5" />
                  <div className="w-2.5 h-2.5 rounded-xs bg-cyan-950 border border-cyan-800" />
                  <div className="w-2.5 h-2.5 rounded-xs bg-cyan-700/60" />
                  <div className="w-2.5 h-2.5 rounded-xs bg-cyan-500/80" />
                  <div className="w-2.5 h-2.5 rounded-xs bg-cyan-300" />
                  <span className="text-[10px]">More</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 overflow-x-auto">
                <div className="flex gap-1.5 min-w-[580px] justify-between">
                  {contributionGrid.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-1.5">
                      {week.map((level, dIdx) => (
                        <div
                          key={dIdx}
                          title={`Activity Level: ${level}`}
                          className={`w-3.5 h-3.5 rounded-[3px] transition-all hover:scale-125 cursor-pointer ${getHeatmapColor(
                            level
                          )}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Language Distribution & Recent Commits Split */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
              {/* Language Distribution */}
              <div className="md:col-span-5 p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div className="text-xs font-mono text-cyan-300 font-semibold flex items-center gap-2">
                  <Code className="w-4 h-4 text-cyan-400" />
                  <span>LANGUAGE DISTRIBUTION</span>
                </div>

                {/* Progress bar composite */}
                <div className="h-2 w-full rounded-full overflow-hidden flex bg-white/10">
                  {GITHUB_TELEMETRY.primaryLanguages.map((lang) => (
                    <div
                      key={lang.name}
                      style={{
                        width: `${lang.percentage}%`,
                        backgroundColor: lang.color,
                      }}
                      className="h-full"
                    />
                  ))}
                </div>

                <div className="space-y-2 pt-2">
                  {GITHUB_TELEMETRY.primaryLanguages.map((lang) => (
                    <div key={lang.name} className="flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: lang.color }}
                        />
                        <span className="text-slate-300">{lang.name}</span>
                      </div>
                      <span className="text-slate-400 tabular-nums">{lang.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Commits Log */}
              <div className="md:col-span-7 p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div className="text-xs font-mono text-cyan-300 font-semibold flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>RECENT COMMIT TELEMETRY</span>
                </div>

                <div className="space-y-2.5">
                  {GITHUB_TELEMETRY.recentCommits.map((cmt, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-black/30 border border-white/5 text-xs font-mono space-y-1 hover:border-cyan-500/30 transition-colors"
                    >
                      <div className="flex items-center justify-between text-cyan-400">
                        <span className="font-semibold">{cmt.repo}</span>
                        <span className="text-slate-500 text-[11px]">{cmt.time}</span>
                      </div>
                      <p className="text-slate-300 truncate">
                        {cmt.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
