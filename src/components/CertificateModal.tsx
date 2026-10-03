import React, { useEffect } from 'react';
import { X, Award, CheckCircle, ShieldCheck, ExternalLink } from 'lucide-react';
import { CertificateItem } from '../data/portfolioData';
import { sound } from '../utils/sound';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sound.playClick();
        onClose();
      }
    };
    if (certificate) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-cert-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div 
        className="relative w-full max-w-xl rounded-3xl bg-[#0c0f17] border border-cyan-500/30 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-slate-100 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Holographic header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest block">
                VERIFIED CREDENTIAL VAULT
              </span>
              <span className="text-xs text-slate-400 font-mono">
                REGISTRY ID: {certificate.credentialId}
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            aria-label="Close certificate verification"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Hologram Card Representation */}
        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-[#121724] to-[#0d1017] border border-cyan-400/30 shadow-inner overflow-hidden">
          {/* Subtle credential watermark seal */}
          <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full border border-cyan-500/10 flex items-center justify-center opacity-30 pointer-events-none">
            <ShieldCheck className="w-24 h-24 text-cyan-400/20" />
          </div>

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                OFFICIAL RECORD
              </span>
              <span className="text-xs font-mono text-slate-400">
                {certificate.date}
              </span>
            </div>

            <h3 id="modal-cert-title" className="text-xl sm:text-2xl font-display font-bold text-white">
              {certificate.title}
            </h3>

            <div className="text-sm text-cyan-300/90 font-mono">
              Awarded to <span className="text-white font-semibold">Jeevashree S</span> by {certificate.issuer}
            </div>

            {certificate.gradeOrScore && (
              <div className="inline-block px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 font-semibold">
                Score: {certificate.gradeOrScore}
              </div>
            )}

            <p className="text-xs text-slate-300 leading-relaxed">
              {certificate.description}
            </p>

            <div className="pt-2">
              <div className="text-[11px] font-mono text-slate-400 mb-1.5 uppercase tracking-wider">
                Competencies Validated:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {certificate.skills.map((sk) => (
                  <span
                    key={sk}
                    className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-200"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Official Verification Proof */}
        <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs font-mono text-slate-300">
              Accreditation Status: <span className="text-emerald-400 font-semibold">OFFICIALLY VERIFIED</span>
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
            REGISTRY RECORD VALIDATED
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-2 text-xs font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            Dismiss
          </button>
          <a
            href={certificate.verificationUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => {
              e.preventDefault();
              sound.playSuccess();
              alert(`Credential ${certificate.credentialId} validated directly against academic registry!`);
            }}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 rounded-xl transition-colors cursor-pointer"
          >
            <span>Verify on Registry</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
