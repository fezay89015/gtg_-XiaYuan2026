import React from 'react';
import { SINS_ANALYSIS } from '../data/caseData';
import { BookOpen, AlertOctagon, Scale } from 'lucide-react';

export const SinsAnalysisSection: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-12 rounded-2xl border-2 border-stone-800 bg-[#121319] p-6 sm:p-10 shadow-2xl">
      {/* Title */}
      <div className="pb-6 border-b border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-widest mb-1.5">
            <Scale className="w-4 h-4" />
            <span>宗教道教科儀典籍考證 · 正統三十六解</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-stone-100 font-dossier-heading">
            【阿城叔一生結下之罪結對照】
          </h3>
          <p className="text-xs text-stone-400 mt-1">
            依據現場物證與自白書，整理阿城一生在江湖與偽裝歲月中所結下之五大深重罪名。
          </p>
        </div>

        <div className="stamp-police-confidential text-xs self-start sm:self-center">
          罪結明細列管
        </div>
      </div>

      {/* Sins Grid */}
      <div className="mt-6 space-y-3.5">
        {SINS_ANALYSIS.map((sin, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-[#181922] border border-stone-800 hover:border-yellow-500/50 transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs sm:text-sm"
          >
            <div className="space-y-1 sm:max-w-xs">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-950 text-red-400 border border-red-800 flex items-center justify-center font-dossier-mono font-bold text-xs shrink-0">
                  0{idx + 1}
                </span>
                <span className="font-bold text-stone-100">{sin.sinName}</span>
              </div>
              <span className="inline-block px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400 font-medium text-[11px] ml-8 sm:ml-0">
                關聯犯行：{sin.category}
              </span>
            </div>

            <div className="flex-1 text-stone-300 leading-relaxed sm:pt-1">
              {sin.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
