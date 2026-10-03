import React, { useState } from 'react';
import { User, GraduationCap, Award, MapPin, Mail, ExternalLink, CheckCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/sound';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'focus' | 'education'>('profile');

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#090b10]">
      <div className="relative max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2 text-left">
          <div className="text-xs font-mono text-sky-400">
            About Me
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Academic Background &amp; Focus
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl font-sans leading-relaxed">
            Postgraduate student specializing in machine learning, computer vision, and Python engineering with a strong mathematical foundation.
          </p>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Portrait & Key Details */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-[#0d1017] border border-white/10 p-6 space-y-6 shadow-xl shadow-black/30 text-left">
              {/* Profile Image */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/10 shrink-0">
                  <img
                    src="/src/assets/images/avatar_jeevashree_1790990420890.jpg"
                    alt="Jeevashree S"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white font-display">
                    {PERSONAL_INFO.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    M.Tech Computer Science &amp; Eng.
                  </p>
                  <p className="text-xs text-sky-400 font-mono">
                    Sri Sairam Engineering College
                  </p>
                </div>
              </div>

              {/* Academic Specs List */}
              <div className="space-y-2.5 pt-4 border-t border-white/8 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Degree</span>
                  <span className="text-slate-200">M.Tech CSE (Postgraduate)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">CGPA</span>
                  <span className="text-white font-bold">8.76 / 10.0</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Specialization</span>
                  <span className="text-slate-200">AI / ML &amp; Computer Vision</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Location</span>
                  <span className="text-slate-200">Chennai, Tamil Nadu</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Status</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Open to Opportunities
                  </span>
                </div>
              </div>

              {/* Social Quick Links */}
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 text-center text-xs font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
                >
                  GitHub
                </a>
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 text-center text-xs font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Story & Focus */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/10 w-fit text-xs font-medium">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('profile');
                }}
                className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-white text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Biography
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('focus');
                }}
                className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'focus'
                    ? 'bg-white text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Core Domains
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('education');
                }}
                className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'education'
                    ? 'bg-white text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Education &amp; Honors
              </button>
            </div>

            {/* Tab 1: Biography */}
            {activeTab === 'profile' && (
              <div className="rounded-2xl bg-[#0d1017] border border-white/10 p-6 space-y-5 animate-in fade-in duration-150">
                <h3 className="text-xl font-display font-semibold text-white">
                  Engineering Practical Intelligence
                </h3>
                <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-sans">
                  <p>
                    I am an M.Tech Computer Science and Engineering postgraduate student with a focused interest in building intelligent systems that convert raw data into actionable decisions.
                  </p>
                  <p>
                    My work spans end-to-end Machine Learning pipelines &mdash; from data wrangling and exploratory feature engineering using Pandas and NumPy to training deep neural architectures and deploying real-time Computer Vision models with OpenCV and YOLO.
                  </p>
                  <p>
                    Whether engineering automated healthcare triage algorithms or vision-guided waste categorization systems, my approach emphasizes clean code, mathematical rigor, and measurable real-world performance.
                  </p>
                </div>
              </div>
            )}

            {/* Tab 2: Focus Domains */}
            {activeTab === 'focus' && (
              <div className="rounded-2xl bg-[#0d1017] border border-white/10 p-6 space-y-4 animate-in fade-in duration-150">
                <h3 className="text-xl font-display font-semibold text-white">
                  Technical Areas of Concentration
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {[
                    {
                      title: 'Computer Vision & Detection',
                      desc: 'Real-time object localization, tracking, and image preprocessing using YOLOv8, OpenCV, and morphological operations.',
                    },
                    {
                      title: 'Predictive Machine Learning',
                      desc: 'Classification, regression, and model evaluation utilizing Scikit-Learn, PyTorch, and ensemble methodologies.',
                    },
                    {
                      title: 'Python Engineering & Automation',
                      desc: 'Robust scripting, vectorized computing, dataset transformations, and API service development in Python.',
                    },
                    {
                      title: 'Data Science & Analytics',
                      desc: 'Statistical data analysis, feature selection, and dynamic visualization with Pandas, NumPy, and Matplotlib.',
                    },
                  ].map((area, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5"
                    >
                      <h4 className="text-sm font-semibold text-white">
                        {area.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {area.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Education & Honors */}
            {activeTab === 'education' && (
              <div className="rounded-2xl bg-[#0d1017] border border-white/10 p-6 space-y-5 animate-in fade-in duration-150">
                <h3 className="text-xl font-display font-semibold text-white">
                  Academic Milestones
                </h3>
                <div className="space-y-4 text-xs font-mono">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                    <div className="flex justify-between text-white font-semibold">
                      <span>M.Tech in Computer Science &amp; Engineering</span>
                      <span className="text-sky-400">8.76 CGPA</span>
                    </div>
                    <div className="text-slate-400">
                      Sri Sairam Engineering College · Anna University (2024 &ndash; 2026)
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                    <div className="flex justify-between text-white font-semibold">
                      <span>Solveathon 5.0 Innovation Award</span>
                      <span className="text-emerald-400">2nd Prize</span>
                    </div>
                    <div className="text-slate-400">
                      Recognized for healthcare machine learning automation and clinical triage modeling.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
