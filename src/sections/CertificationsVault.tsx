import React, { useState } from 'react';
import { Award, ExternalLink, CheckCircle } from 'lucide-react';
import { CERTIFICATES_DATA, CertificateItem } from '../data/portfolioData';
import { sound } from '../utils/sound';

interface CertificationsVaultProps {
  onSelectCertificate: (cert: CertificateItem) => void;
}

export const CertificationsVault: React.FC<CertificationsVaultProps> = ({ onSelectCertificate }) => {
  return (
    <section id="certifications" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#090b10]">
      <div className="relative max-w-5xl mx-auto space-y-10 text-left">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-sky-400">
            Accreditations
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Certifications &amp; Credentials
          </h2>
          <p className="text-sm text-slate-400 max-w-xl font-sans leading-relaxed">
            Verified qualifications across Python engineering, machine learning pipelines, and algorithmic computer science.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CERTIFICATES_DATA.map((cert) => (
            <div
              key={cert.id}
              onClick={() => {
                sound.playClick();
                onSelectCertificate(cert);
              }}
              className="p-6 rounded-2xl bg-[#0d1017] border border-white/8 hover:border-white/20 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-sky-400 font-mono font-medium">
                    {cert.issuer}
                  </span>
                  <span className="text-slate-400 font-mono">
                    {cert.date}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-white group-hover:text-sky-300 transition-colors">
                  {cert.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {cert.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <div className="flex flex-wrap gap-1">
                  {cert.skills.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className="text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                      {skill}
                    </span>
                  ))}
                </div>

                <span className="text-sky-400 font-medium group-hover:underline">
                  View Proof &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
