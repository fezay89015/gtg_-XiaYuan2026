import React from 'react';
import { EVIDENCE_07_CONFESSION } from '../data/caseData';
import { Mail, ShieldCheck, HeartHandshake } from 'lucide-react';

export const ConfessionLetter: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl border-2 border-yellow-500/60 bg-[#161720] shadow-2xl overflow-hidden p-6 sm:p-10 relative">
      {/* Background paper texture & confidential watermark */}
      <div className="absolute top-4 right-4 stamp-sealed text-xs">
        解鎖證物 · 絕密信函
      </div>

      {/* Header */}
      <div className="pb-6 border-b border-stone-800">
        <div className="flex items-center gap-2 text-yellow-400 font-bold text-xs uppercase tracking-widest mb-1.5">
          <Mail className="w-4 h-4" />
          <span>{EVIDENCE_07_CONFESSION.code} // 特偵封存之真相</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-100 font-dossier-heading">
          {EVIDENCE_07_CONFESSION.title}
        </h3>
        <p className="text-xs text-stone-400 mt-1 font-dossier-mono">
          {EVIDENCE_07_CONFESSION.subTitle}
        </p>
      </div>

      {/* Letter Container styled as vintage confidential paper */}
      <div className="mt-8 p-6 sm:p-8 rounded-xl bg-[#1e202a] border border-stone-700/80 text-stone-200 text-sm sm:text-base leading-relaxed whitespace-pre-line font-serif shadow-inner">
        {EVIDENCE_07_CONFESSION.letterContent}
      </div>

      {/* Post-letter Reflection note */}
      <div className="mt-6 p-4 rounded-xl bg-yellow-950/20 border border-yellow-500/30 flex items-start gap-3 text-xs sm:text-sm text-yellow-200/90 leading-relaxed">
        <HeartHandshake className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-yellow-300 block mb-1">【檢方結案勘驗心證】</strong>
          <p>
            阿城以自身的縱火專業，在暗夜火海中精準救下了收留他十餘年的恩人家眷；並用「假死」將黑幫的索命焦點引離此地。十幾年描摹的雙下巴與發福身形雖為虛妄，但對威仔與家人的守護之情，赤誠無偽。
          </p>
        </div>
      </div>
    </div>
  );
};
