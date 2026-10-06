import React from 'react';
import { CASE_SUMMARY } from '../data/caseData';
import { MapPin, Calendar, CheckCircle2, Fingerprint } from 'lucide-react';

interface CaseHeaderProps {
  isUnlockedFinal: boolean;
}

export const CaseHeader: React.FC<CaseHeaderProps> = ({ isUnlockedFinal }) => {
  return (
    <header className="relative w-full pt-6 pb-10 px-3 sm:px-6 max-w-6xl mx-auto">
      {/* ================= MAIN KRAFT PAPER DOSSIER ENVELOPE ================= */}
      <div className="kraft-dossier-board rounded-2xl p-6 sm:p-10 md:p-12 relative overflow-hidden border border-[#c4b195]">
        {/* Subtle Fold Shadow Accents */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-black/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-black/10 via-transparent to-transparent pointer-events-none" />

        {/* ================= TOP ROW: RETRO HEADLINE + POLAROID SUSPECT ================= */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 sm:gap-8 pb-8 border-b-2 border-[#b59e80]/60 relative">
          {/* Left Title Area */}
          <div className="flex-1 space-y-3">
            {/* Stitched Tag */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="stitched-case-tag rounded font-dossier-mono font-black text-sm text-stone-900 tracking-wider">
                <span className="text-red-700 font-bold mr-1">CASE No.</span>
                <span>{CASE_SUMMARY.caseCode}</span>
              </div>

              <span className="px-2.5 py-0.5 rounded bg-red-800 text-white font-dossier-mono font-bold text-xs tracking-widest uppercase shadow-sm">
                CONFIDENTIAL
              </span>

              <span className="text-xs font-serif text-stone-700 italic">
                {CASE_SUMMARY.classification}
              </span>
            </div>

            {/* Retro Bold Condensed Title (Inspired by THE SUSPICIOUS... styling) */}
            <div className="pt-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-950 font-headline-retro tracking-tight leading-none uppercase">
                THE SUSPICIOUS
                <br />
                <span className="text-red-800">MIDNIGHT FIRE</span>
              </h1>
              <div className="inline-block mt-2 px-3 py-1 border-2 border-stone-900 bg-stone-900 text-amber-100 font-dossier-mono font-bold text-xs sm:text-sm tracking-widest uppercase shadow-sm">
                CR-0930《深夜透天火場離奇蒸發案》· 消失的阿誠叔
              </div>
            </div>
          </div>

          {/* Right Polaroid Photo of Crime Scene / Target */}
          <div className="shrink-0 self-center md:self-start relative group">
            {/* Metallic Brass Paperclip holding the photo */}
            <div className="absolute -top-3 left-6 z-20 pointer-events-none">
              <div className="paperclip-accent border-stone-600 scale-90" />
            </div>

            {/* Red Pushpin */}
            <div className="absolute -top-2 right-8 z-20 pointer-events-none">
              <span className="pushpin-3d-red scale-90" />
            </div>

            {/* Polaroid Frame */}
            <div className="polaroid-frame rounded-sm rotate-[2deg] hover:rotate-0 transition-transform duration-300 w-52 sm:w-60">
              <div className="w-full h-44 sm:h-48 overflow-hidden bg-stone-900 border border-stone-300">
                <img
                  src="https://github.com/user-attachments/assets/13dc3d56-9e03-49a5-9cea-d3f0b8e24788"
                  alt="失蹤涉案人 · 阿城叔照片"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover contrast-105"
                />
              </div>
              <div className="pt-2.5 text-center">
                <span className="font-dossier-mono font-bold text-xs text-stone-800 tracking-wider">
                  TARGET PHOTO // 失蹤人·阿城叔
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= MIDDLE ROW: PINNED TORN MEMO SHEETS ================= */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 relative">
          {/* Sheet 1: PLACE & DATE + MISSING PERSON (Left Column 5 cols) */}
          <div className="md:col-span-5 paper-memo-sheet rounded-lg p-5 sm:p-6 rotate-[-1deg] hover:rotate-0 transition-transform duration-300 relative">
            {/* Top Red Pushpin */}
            <div className="absolute -top-2 left-6 z-10 pointer-events-none">
              <span className="pushpin-3d-red" />
            </div>

            {/* Red Fingerprint Stamp in the corner */}
            <div className="absolute top-4 right-4 text-red-700/60 pointer-events-none">
              <Fingerprint className="w-10 h-10 opacity-70" />
            </div>

            <div className="space-y-4 font-sans text-xs sm:text-sm text-stone-900">
              {/* Place & Date */}
              <div>
                <h4 className="font-headline-retro text-lg text-stone-950 font-black tracking-wide uppercase border-b border-stone-300 pb-1">
                  PLACE & DATE:
                </h4>
                <div className="mt-2 space-y-1.5 font-sans font-medium text-stone-800">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                    <span>{CASE_SUMMARY.incidentLocation}</span>
                  </div>
                  <div className="flex items-start gap-2 text-red-800 font-bold">
                    <Calendar className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                    <span>{CASE_SUMMARY.incidentDate}</span>
                  </div>
                </div>
              </div>

              {/* Missing Suspect */}
              <div className="pt-2">
                <h4 className="font-headline-retro text-lg text-stone-950 font-black tracking-wide uppercase border-b border-stone-300 pb-1">
                  TARGET / MISSING PERSON:
                </h4>
                <div className="mt-2 space-y-1.5 text-stone-800 leading-relaxed font-sans">
                  <p className="font-bold text-red-800">
                    • 姓名：{CASE_SUMMARY.missingPerson}
                  </p>
                  <p className="text-stone-700 text-xs">
                    • 現場矛盾：{CASE_SUMMARY.mainSuspicion}
                  </p>
                  <p className="text-stone-700 text-xs">
                    • 特偵提示：借住十餘年，平日體態臃腫、行動遲緩；但起火後房內未見受困逃生痕跡，亦無骨骸殘留，下落成謎、疑點重重。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sheet 2: NOTICE & BRIEF (Right Column 7 cols) */}
          <div className="md:col-span-7 paper-memo-sheet rounded-lg p-5 sm:p-6 rotate-[0.5deg] hover:rotate-0 transition-transform duration-300 relative flex flex-col justify-between">
            {/* Top Red Pushpins */}
            <div className="absolute -top-2 left-6 z-10 pointer-events-none">
              <span className="pushpin-3d-red" />
            </div>
            <div className="absolute -top-2 right-8 z-10 pointer-events-none">
              <span className="pushpin-3d-red" />
            </div>

            {/* Distressed Classified Red Stamp */}
            <div className="absolute bottom-4 right-4 pointer-events-none">
              <div className="stamp-classified-circle text-[10px]">
                <div className="border border-red-700/80 px-2 py-0.5">
                  CLASSIFIED
                  <br />
                  <span className="text-[8px] font-normal tracking-normal">TOP SECRET</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 font-sans text-xs sm:text-sm">
              <h4 className="font-headline-retro text-lg text-stone-950 font-black tracking-wide uppercase border-b border-stone-300 pb-1">
                INVESTIGATION NOTICE & EVIDENCE BRIEF:
              </h4>

              <div className="space-y-2.5 font-sans text-stone-900 leading-relaxed pr-8">
                {CASE_SUMMARY.briefLines.map((line, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="font-dossier-mono font-bold text-red-700 shrink-0">
                      {idx + 1}.
                    </span>
                    <span className="font-medium text-stone-800">{line}</span>
                  </div>
                ))}
              </div>
            </div>

            {isUnlockedFinal && (
              <div className="mt-4 pt-3 border-t border-stone-300 flex items-center gap-2 text-emerald-800 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>全案推理論證成立 · 證物 07 絕密自白信已解除封存</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
