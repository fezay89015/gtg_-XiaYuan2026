import React, { useState } from 'react';
import { EvidenceItem } from '../data/caseData';
import { playCardFlip } from '../utils/audio';
import { RotateCw, MapPin, Search, BrainCircuit } from 'lucide-react';

interface EvidenceCardProps {
  evidence: EvidenceItem;
  onCardFlipped: (id: string) => void;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({
  evidence,
  onCardFlipped
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasBeenFlipped, setHasBeenFlipped] = useState(false);

  const handleFlip = () => {
    const nextFlipped = !isFlipped;
    setIsFlipped(nextFlipped);
    playCardFlip();

    if (!hasBeenFlipped) {
      setHasBeenFlipped(true);
      onCardFlipped(evidence.id);
    }
  };

  // Border styling: switches permanently to illuminated yellow border once flipped
  const borderClass = hasBeenFlipped
    ? 'border-2 border-yellow-400 shadow-xl shadow-yellow-500/15 ring-1 ring-yellow-400/60'
    : 'border-2 border-blue-950/70 hover:border-blue-800/80';

  return (
    <div className="perspective-1000 w-full min-h-[530px] h-full select-none">
      <div
        className={`relative w-full h-full transition-transform duration-500 preserve-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={handleFlip}
      >
        {/* ================= CARD FRONT ================= */}
        <div
          className={`absolute inset-0 w-full h-full backface-hidden rounded-xl bg-[#0b1120] transition-all flex flex-col overflow-hidden ${borderClass}`}
        >
          {/* Evidence Image */}
          <div className="relative w-full h-60 bg-stone-950 overflow-hidden shrink-0 group">
            <img
              src={evidence.image}
              alt={evidence.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Top corner code badge */}
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/85 border border-yellow-400/60 text-yellow-400 font-dossier-mono font-bold text-xs tracking-wider flex items-center gap-1.5 shadow-md">
              <span>{evidence.code}</span>
              <span className="text-stone-400 font-normal">|</span>
              <span className="text-stone-300 font-sans">{evidence.type}</span>
            </div>

            {hasBeenFlipped && (
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-yellow-400 text-stone-950 font-black text-[11px] tracking-wider shadow-md">
                已勘驗
              </div>
            )}
          </div>

          {/* Front Content */}
          <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              {/* 證物 / 線索名稱 */}
              <h3 className="text-xl font-bold text-stone-100 font-dossier-heading tracking-tight leading-snug">
                {evidence.name}
              </h3>

              {/* 地點 */}
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-300 bg-[#0f172a]/95 p-3 rounded-lg border border-blue-950/80 shadow-inner">
                <MapPin className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <span className="text-stone-200 leading-relaxed break-words">
                  {evidence.locationFound}
                </span>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="pt-3 border-t border-blue-950/80 mt-3">
              <div className="w-full py-2.5 px-4 rounded-xl bg-yellow-400/10 hover:bg-yellow-400 text-yellow-400 hover:text-stone-950 font-bold text-xs sm:text-sm border border-yellow-400/60 transition-all flex items-center justify-center gap-2 shadow-sm group">
                <RotateCw className="w-4 h-4 transition-transform group-hover:rotate-180" />
                <span>查看鑑識與推測</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= CARD BACK ================= */}
        <div
          className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl bg-[#0c1222] text-stone-200 flex flex-col justify-between overflow-hidden p-4 sm:p-5 ${borderClass}`}
        >
          {/* Back Header: 證物編號與名稱分行 */}
          <div className="pb-2.5 border-b border-blue-950/80 space-y-1 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-dossier-mono font-bold text-yellow-400 tracking-wider">
                {evidence.code} · {evidence.type}
              </span>
              <span className="text-[10px] font-dossier-mono text-blue-300/80 bg-[#070b14] px-2 py-0.5 rounded border border-blue-950">
                FORENSIC REPORT
              </span>
            </div>

            {/* 證物名稱獨立成行 */}
            <h4 className="text-lg sm:text-xl font-black text-stone-100 font-dossier-heading tracking-wide leading-snug">
              {evidence.name}
            </h4>

            {/* 地點 */}
            <div className="flex items-start gap-1.5 text-xs text-stone-300 pt-0.5">
              <MapPin className="w-3.5 h-3.5 text-yellow-400/90 shrink-0 mt-0.5" />
              <span className="leading-snug break-words">{evidence.locationFound}</span>
            </div>
          </div>

          {/* Middle: Split into Upper Layer (說明) and Lower Layer (推測) */}
          <div className="flex-1 my-2 overflow-y-auto dossier-scrollbar space-y-2.5 pr-1">
            {/* 上層：說明 (精華條列分行) */}
            <div className="p-3 rounded-lg bg-[#080d19]/90 border border-blue-950/80 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 text-yellow-400 font-bold text-xs uppercase tracking-wider mb-1.5">
                <Search className="w-3.5 h-3.5" />
                <span>【說明】鑑識調查事實</span>
              </div>
              <div className="space-y-1 text-stone-300">
                {evidence.explanationPoints.map((point, idx) => (
                  <p key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-yellow-400/80 font-bold shrink-0 mt-0.5">·</span>
                    <span>{point}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* 下層：推測 (精華條列分行) */}
            <div className="p-3 rounded-lg bg-[#0e172a] border border-blue-800/40 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 text-blue-300 font-bold text-xs uppercase tracking-wider mb-1.5">
                <BrainCircuit className="w-3.5 h-3.5 text-yellow-400" />
                <span>【推測】檢警案情偵查心證</span>
              </div>
              <div className="space-y-1 text-stone-200">
                {evidence.speculationPoints.map((point, idx) => (
                  <p key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-blue-400 font-bold shrink-0 mt-0.5">·</span>
                    <span>{point}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Button */}
          <div className="pt-2.5 border-t border-blue-950 shrink-0">
            <div className="w-full py-2.5 px-4 rounded-xl bg-yellow-400/10 hover:bg-yellow-400 text-yellow-400 hover:text-stone-950 font-bold text-xs sm:text-sm border border-yellow-400/60 transition-all flex items-center justify-center gap-2 shadow-sm group">
              <RotateCw className="w-4 h-4 transition-transform group-hover:rotate-180" />
              <span>檢視外觀照片</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
