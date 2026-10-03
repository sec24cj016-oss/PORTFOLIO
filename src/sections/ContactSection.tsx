import React, { useState } from 'react';
import { Mail, Linkedin, Github, Send, CheckCircle2, ShieldCheck, Sparkles, Terminal, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/sound';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    roleOrSubject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    sound.playClick();
    setIsSubmitting(true);

    // Simulate message transmission & acknowledgment
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      sound.playSuccess();

      // Launch subtle celebratory cyber confetti
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.75 },
        colors: ['#00f2fe', '#4facfe', '#a855f7', '#38bdf8'],
      });
    }, 1200);
  };

  const handleCopyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#090b10]">
      <div className="relative max-w-5xl mx-auto space-y-10 text-left">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-sky-400">
            Contact
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Get in Touch
          </h2>
          <p className="text-sm text-slate-400 max-w-xl font-sans leading-relaxed">
            Interested in discussing artificial intelligence, computer vision roles, or collaborating on innovative projects? Feel free to reach out.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Communication Hub */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 rounded-2xl bg-[#0d1017] border border-white/10 space-y-5 shadow-xl">
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-white">
                  Direct Contact
                </h3>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Available for full-time graduate opportunities, machine learning roles, and research projects.
                </p>
              </div>

              {/* Verified Email Card with Copy Trigger */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span>EMAIL ADDRESS</span>
                  <button
                    onClick={handleCopyEmail}
                    className="text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer text-xs"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className="text-sm font-mono font-medium text-white hover:text-sky-300 block truncate transition-colors"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>

              {/* Social Channels */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Social & Code Repositories
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={PERSONAL_INFO.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => sound.playHover()}
                    onClick={() => sound.playClick()}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 text-slate-200 transition-all cursor-pointer group"
                  >
                    <Linkedin className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform shrink-0" />
                    <div className="text-left overflow-hidden">
                      <div className="text-xs font-mono font-semibold">LinkedIn</div>
                      <div className="text-[10px] text-slate-400 truncate">jeevashree-sankar</div>
                    </div>
                  </a>

                  <a
                    href={PERSONAL_INFO.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => sound.playHover()}
                    onClick={() => sound.playClick()}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 text-slate-200 transition-all cursor-pointer group"
                  >
                    <Github className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform shrink-0" />
                    <div className="text-left overflow-hidden">
                      <div className="text-xs font-mono font-semibold">GitHub</div>
                      <div className="text-[10px] text-slate-400 truncate">@Jeevashree05</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Status Note */}
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 flex items-center gap-3 text-xs font-mono text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>CURRENT LOCATION: Chennai, India (IST UTC+5:30)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Connection Transmission Terminal / Form */}
          <div className="lg:col-span-7">
            <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/20 via-white/5 to-violet-500/20 border border-cyan-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
              <div className="p-6 sm:p-8 rounded-[22px] bg-[#0c1018]">
                {isSubmitted ? (
                  <div className="py-12 px-4 text-center space-y-6 animate-in zoom-in-95 duration-300">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-mono text-emerald-400 font-bold tracking-widest uppercase">
                        TRANSMISSION RECEIVED // ACK_200
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                        CONNECTION ESTABLISHED ✓
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                        Thank you, <span className="text-cyan-300 font-semibold">{formState.name}</span>. Your message has been received. Jeevashree S will reply promptly.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-slate-400 max-w-sm mx-auto space-y-1">
                      <div>DISPATCH PROTOCOL: TLS_1.3</div>
                      <div>STATUS: TRANSMITTED TO JEEVASHREE S</div>
                    </div>

                    <button
                      onClick={() => {
                        sound.playClick();
                        setIsSubmitted(false);
                        setFormState({ name: '', email: '', roleOrSubject: '', message: '' });
                      }}
                      className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono text-slate-200 transition-colors cursor-pointer"
                    >
                      SEND ANOTHER MESSAGE
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>DISPATCH TERMINAL INTERFACE</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        ENCRYPTED FIELD
                      </span>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-slate-300">
                          NAME <span className="text-cyan-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          placeholder="Your Name / Team"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:bg-white/10 text-slate-100 text-xs sm:text-sm font-sans outline-none transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-slate-300">
                          EMAIL <span className="text-cyan-400">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="your.email@domain.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:bg-white/10 text-slate-100 text-xs sm:text-sm font-sans outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">
                        OPPORTUNITY TYPE / SUBJECT
                      </label>
                      <input
                        type="text"
                        value={formState.roleOrSubject}
                        onChange={(e) => setFormState({ ...formState, roleOrSubject: e.target.value })}
                        placeholder="e.g. AI/ML Engineer Role, Python Development, Computer Vision Project"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:bg-white/10 text-slate-100 text-xs sm:text-sm font-sans outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">
                        MESSAGE PAYLOAD <span className="text-cyan-400">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Tell me about your project, team, or opportunity..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:bg-white/10 text-slate-100 text-xs sm:text-sm font-sans outline-none transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      onMouseEnter={() => sound.playHover()}
                      className="w-full py-4 rounded-xl text-xs sm:text-sm font-mono font-semibold tracking-wide text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-lg shadow-cyan-500/25 transition-all duration-200 cursor-pointer active:scale-98 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                          <span>TRANSMITTING MESSAGE IN PROGRESS...</span>
                        </>
                      ) : (
                        <>
                          <span>INITIALIZE CONNECTION</span>
                          <span className="font-bold">→</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
