import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, CornerDownLeft, Sparkles, Trash2, HelpCircle } from 'lucide-react';
import { TERMINAL_COMMANDS } from '../data/portfolioData';
import { sound } from '../utils/sound';

interface HistoryEntry {
  type: 'command' | 'output' | 'error';
  text: string;
}

export const TerminalSection: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([
    { type: 'command', text: 'whoami' },
    { type: 'output', text: '> Jeevashree S — M.Tech Computer Science & Engineering' },
    { type: 'command', text: 'interests' },
    { type: 'output', text: '> Artificial Intelligence • Machine Learning • Computer Vision • Python Development' },
    { type: 'command', text: 'mission' },
    { type: 'output', text: '> "Build intelligent, data-driven software that solves real-world problems with clarity, efficiency, and impact."' },
  ]);

  const outputEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    sound.playTerminalBeep();

    if (trimmed === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    const newHistory: HistoryEntry[] = [...history, { type: 'command', text: trimmed }];

    if (TERMINAL_COMMANDS[trimmed]) {
      const resp = TERMINAL_COMMANDS[trimmed];
      if (Array.isArray(resp)) {
        resp.forEach((line) => {
          newHistory.push({ type: 'output', text: line });
        });
      } else {
        newHistory.push({ type: 'output', text: resp });
      }
    } else {
      newHistory.push({
        type: 'error',
        text: `Directive unrecognized: '${trimmed}'. Type 'help' for authorized system commands.`,
      });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    }
  };

  const quickCommands = ['help', 'whoami', 'skills', 'projects', 'interests', 'mission', 'status', 'clear'];

  return (
    <section id="terminal" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#090b10]">
      <div className="relative max-w-4xl mx-auto space-y-8 text-left">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-sky-400">
            Interactive CLI
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Developer Shell
          </h2>
          <p className="text-sm text-slate-400 max-w-xl font-sans leading-relaxed">
            Command-line interface to inspect credentials, engineering principles, and query portfolio data directly.
          </p>
        </div>

        {/* Terminal Window Frame */}
        <div className="rounded-2xl bg-[#0c0f17] border border-white/10 shadow-2xl shadow-black/50 overflow-hidden">
          <div
            className="flex flex-col h-[480px] font-mono cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Terminal Title Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#10141f] border-b border-white/8 select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-xs text-slate-400">
                  jeevashree@portfolio:~ (bash)
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.playClick();
                    setHistory([]);
                  }}
                  title="Clear terminal"
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Command Directives Bar */}
            <div className="px-5 py-2.5 bg-black/40 border-b border-white/5 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[11px] text-slate-500 mr-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                DIRECTIVES:
              </span>
              {quickCommands.map((qc) => (
                <button
                  key={qc}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCommand(qc);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className="px-2.5 py-0.5 rounded-md bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 text-[11px] transition-colors cursor-pointer"
                >
                  {qc}
                </button>
              ))}
            </div>

            {/* Terminal Body Logs */}
            <div className="flex-1 p-5 overflow-y-auto space-y-2 text-xs sm:text-sm">
              <div className="text-slate-500 pb-2 border-b border-white/5">
                Last login: {new Date().toLocaleDateString()} from 127.0.0.1 (Neural Python Shell v4.2)
                <br />
                Type <span className="text-cyan-400 font-bold">'help'</span> for an index of executable directives.
              </div>

              {history.map((entry, idx) => (
                <div key={idx} className="leading-relaxed">
                  {entry.type === 'command' ? (
                    <div className="flex items-center gap-2 text-cyan-400 font-semibold pt-1">
                      <span className="text-emerald-400">$</span>
                      <span>{entry.text}</span>
                    </div>
                  ) : entry.type === 'error' ? (
                    <div className="text-rose-400 pl-4">{entry.text}</div>
                  ) : (
                    <div className="text-slate-300 pl-4 whitespace-pre-wrap">{entry.text}</div>
                  )}
                </div>
              ))}

              <div ref={outputEndRef} />
            </div>

            {/* Terminal Prompt Input Bar */}
            <div className="px-5 py-3 bg-[#0d111a] border-t border-white/10 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type command ('help', 'skills', 'projects', 'whoami')..."
                className="flex-1 bg-transparent text-slate-100 text-xs sm:text-sm outline-none placeholder:text-slate-600 font-mono"
                autoComplete="off"
                spellCheck="false"
              />
              <button
                onClick={() => handleCommand(inputVal)}
                onMouseEnter={() => sound.playHover()}
                className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 transition-colors cursor-pointer"
                title="Execute command"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
