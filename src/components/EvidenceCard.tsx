import React, { useState } from 'react';
import { EvidenceItem } from '../data/caseData';
import { playCardFlip } from '../utils/audio';
import { RotateCw, MapPin, Pin, Search, BrainCircuit, Check } from 'lucide-react';

interface EvidenceCardProps {
  evidence: EvidenceItem;
  onCardFlipped?: (id: string) => void;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({
  evidence,
  onCardFlipped
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasBeenFlipped, setHasBeenFlipped] = useState(false);

  const handleFlip = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    playCardFlip();
    setIsFlipped((prev) => {
      const next = !prev;
      if (next && !hasBeenFlipped) {
        setHasBeenFlipped(true);
        if (onCardFlipped) {
          onCardFlipped(evidence.id);
        }
      }
      return next;
    });
  };

  return (
    <div className="w-full h-[480px] select-none relative perspective-1000">
      {/* 3D Red Pushpin at top center (fixed outside card, 100% stationary) */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <span className="pushpin-3d-red shadow-md" />
      </div>

      {/* Flipping Card Shell with Brute-Force Upward Offset translateY(-14px) */}
      <div
        className={`relative w-full h-full cursor-pointer evidence-flip-card ${
          isFlipped ? 'is-flipped' : ''
        }`}
        onClick={handleFlip}
      >
        {/* ================= CARD FRONT: POLAROID + CLUE MEMO ================= */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl paper-memo-sheet shadow-lg flex flex-col justify-between p-3.5 sm:p-4 overflow-visible backface-hidden z-10 transition-all duration-300 ${
            hasBeenFlipped
              ? 'border-4 border-red-700 ring-4 ring-red-700/25'
              : 'border-2 border-[#d0bc9e] hover:border-amber-600/80'
          }`}
        >
          {/* Top Polaroid Photo Frame with Rich Drop Shadow */}
          <div className="polaroid-frame rounded-sm bg-white border border-stone-200 shrink-0 relative shadow-xl shadow-stone-900/40 p-1.5 pb-2 overflow-visible">
            {/* Paperclip sticking OUTSIDE beyond the top of the photo frame */}
            <div className="absolute -top-3 left-3 z-30 pointer-events-none">
              <div className="paperclip-accent scale-90 border-stone-500 shadow-sm" />
            </div>

            {/* Photo */}
            <div className="relative w-full h-32 sm:h-36 bg-stone-900 overflow-hidden border border-stone-300 rounded-sm">
              <img
                src={evidence.image}
                alt={evidence.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {/* Red Code Stamped Label */}
              <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-stone-900/90 text-amber-100 font-dossier-mono font-bold text-[10px] tracking-wider border border-amber-300/40">
                {evidence.code} · {evidence.type}
              </div>

              {/* Red 已勘驗 badge */}
              {hasBeenFlipped && (
                <div className="absolute top-1.5 right-1.5 px-2.5 py-0.5 rounded bg-red-700 text-white font-bold text-[10px] shadow-md tracking-wider flex items-center gap-1 font-sans">
                  <Check className="w-3 h-3" />
                  <span>已勘驗</span>
                </div>
              )}
            </div>

            {/* Polaroid bottom caption */}
            <div className="pt-1 text-center">
              <span className="font-dossier-mono font-bold text-[10px] text-stone-600 tracking-wider">
                EVIDENCE RECORD // {evidence.code}
              </span>
            </div>
          </div>

          {/* Middle: Title, Location & Clue Note (Shifted down below photo shadow) */}
          <div className="flex-1 flex flex-col justify-between space-y-1.5 pt-3 min-h-0 relative z-10 border-t border-stone-200 mt-2">
            <div>
              {/* Evidence Title */}
              <h3 className="text-base sm:text-lg font-black text-stone-950 font-dossier-heading tracking-tight leading-snug line-clamp-1">
                {evidence.name}
              </h3>

              {/* Location found */}
              <div className="flex items-start gap-1 text-[11px] text-stone-700 bg-amber-50/90 px-2 py-1 rounded-md border border-amber-200 mt-1 font-sans">
                <MapPin className="w-3 h-3 text-red-700 shrink-0 mt-0.5" />
                <span className="leading-tight font-medium line-clamp-1">
                  {evidence.locationFound}
                </span>
              </div>
            </div>

            {/* Yellow Detective Sticky Note (Tilted nicely as requested) */}
            <div className="sticky-note-yellow p-2.5 rounded-lg rotate-[-2.5deg] border border-yellow-400/80 shadow-md">
              <div className="flex items-center gap-1 text-[10px] font-bold text-stone-900 uppercase tracking-wider mb-0.5 font-sans">
                <Pin className="w-3 h-3 text-red-700 shrink-0" />
                <span>現場便條 · 矛盾疑點</span>
              </div>
              <p className="text-xs font-sans font-medium text-stone-900 leading-snug line-clamp-2">
                {evidence.clueNote}
              </p>
            </div>

            {/* Bottom Flip Button */}
            <div className="pt-1 border-t border-stone-200 shrink-0 font-sans">
              <div className="w-full py-1.5 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-100 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm group">
                <RotateCw className="w-3.5 h-3.5 text-yellow-400 transition-transform group-hover:rotate-180" />
                <span>翻閱鑑識報告與推測 ➔</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= CARD BACK: FORENSIC LAB REPORT ================= */}
        {/* Prominent Red Outer Border matching 已勘驗 badge */}
        <div className="absolute inset-0 w-full h-full rounded-2xl paper-memo-sheet border-4 border-red-700 shadow-xl shadow-red-950/20 ring-4 ring-red-700/25 flex flex-col justify-between p-3.5 sm:p-4 overflow-hidden backface-hidden rotate-y-180 z-10 bg-white">
          {/* Back Header with matching red 已勘驗 badge */}
          <div className="pb-2 border-b-2 border-red-600/50 space-y-1 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-dossier-mono font-bold text-red-800 tracking-wider">
                  {evidence.code} · {evidence.type}
                </span>
                <span className="text-[10px] font-dossier-mono text-stone-700 bg-stone-100 px-2 py-0.5 rounded border border-stone-300 font-bold">
                  LAB REPORT
                </span>
              </div>

              {/* Red 已勘驗 badge on the back */}
              <div className="px-2.5 py-0.5 rounded bg-red-700 text-white font-bold text-[11px] shadow-sm tracking-wider flex items-center gap-1 font-sans">
                <Check className="w-3.5 h-3.5" />
                <span>已勘驗</span>
              </div>
            </div>

            <h4 className="text-base sm:text-lg font-black text-stone-950 font-dossier-heading tracking-wide leading-tight line-clamp-1">
              {evidence.name}
            </h4>

            <div className="flex items-start gap-1 text-[11px] text-stone-600 font-sans">
              <MapPin className="w-3 h-3 text-red-700 shrink-0 mt-0.5" />
              <span className="leading-tight line-clamp-1">{evidence.locationFound}</span>
            </div>
          </div>

          {/* Middle: Split into Upper Layer (說明) and Lower Layer (推測) */}
          <div className="flex-1 my-1.5 overflow-y-auto dossier-scrollbar space-y-1.5 pr-1 font-sans text-xs">
            {/* 上層：鑑識事實 (白紙黑字，清晰易讀) */}
            <div className="p-2 rounded-lg bg-stone-50 border border-stone-300">
              <div className="flex items-center gap-1 text-stone-900 font-bold text-[11px] uppercase tracking-wider mb-1">
                <Search className="w-3 h-3 text-red-700" />
                <span className="text-stone-950 font-black">【說明】鑑識調查事實</span>
              </div>
              <div className="space-y-1 text-stone-800 leading-relaxed text-[11px]">
                {evidence.explanationPoints.map((point, idx) => (
                  <p key={idx} className="flex items-start gap-1">
                    <span className="text-red-700 font-bold shrink-0 mt-0.5">●</span>
                    <span className="font-medium text-stone-900">{point}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* 下層：推測 (牛皮便籤質感，高對比易讀) */}
            <div className="p-2 rounded-lg bg-amber-50/90 border border-amber-300">
              <div className="flex items-center gap-1 text-amber-900 font-bold text-[11px] uppercase tracking-wider mb-1">
                <BrainCircuit className="w-3 h-3 text-amber-800" />
                <span className="text-amber-950 font-black">【推測】檢警案情偵查心證</span>
              </div>
              <div className="space-y-1 text-stone-800 leading-relaxed text-[11px]">
                {evidence.speculationPoints.map((point, idx) => (
                  <p key={idx} className="flex items-start gap-1">
                    <span className="text-amber-800 font-bold shrink-0 mt-0.5">●</span>
                    <span className="font-medium text-stone-900">{point}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Flip Back Button */}
          <div className="pt-1 border-t border-stone-200 shrink-0 font-sans">
            <div className="w-full py-1.5 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-100 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm group">
              <RotateCw className="w-3.5 h-3.5 text-yellow-400 transition-transform group-hover:rotate-180" />
              <span>翻回照片與便條 ➔</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
