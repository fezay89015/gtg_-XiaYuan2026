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

  // Border styling: changes permanently once flipped (even after flipping back to front)
  const borderClass = hasBeenFlipped
    ? 'border-2 border-yellow-400 shadow-xl shadow-yellow-500/15 ring-1 ring-yellow-400/60'
    : 'border-2 border-blue-950/70 hover:border-blue-800/80';

  return (
    <div className="perspective-1000 w-full min-h-[500px] h-full select-none">
      <div
        className={`relative w-full h-full transition-transform duration-500 preserve-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={handleFlip}
      >
        {/* ================= CARD FRONT ================= */}
        {/* 正面只放圖片、地點、證物名稱 */}
        <div
          className={`absolute inset-0 w-full h-full backface-hidden rounded-xl bg-[#0b1120] transition-all flex flex-col overflow-hidden ${borderClass}`}
        >
          {/* Evidence Image */}
          <div className="relative w-full h-64 bg-stone-950 overflow-hidden shrink-0 group">
            <img
              src={evidence.image}
              alt={evidence.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Top corner code badge */}
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/85 border border-yellow-400/60 text-yellow-400 font-dossier-mono font-bold text-xs tracking-wider">
              {evidence.code}
            </div>

            {hasBeenFlipped && (
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-yellow-400 text-stone-950 font-bold text-[10px] tracking-wider">
                已檢視
              </div>
            )}
          </div>

          {/* Front Content: 證物名稱與地點 */}
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              {/* 證物名稱 */}
              <h3 className="text-xl font-bold text-stone-100 font-dossier-heading">
                {evidence.code}：{evidence.name}
              </h3>

              {/* 地點 */}
              <div className="flex items-start gap-2 text-xs sm:text-sm text-stone-300 bg-[#0f172a]/90 p-3 rounded-lg border border-blue-950/80">
                <MapPin className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-blue-300/70 text-xs block">查扣地點</span>
                  <span className="font-medium text-stone-200">{evidence.locationFound}</span>
                </div>
              </div>
            </div>

            {/* Bottom flip affordance */}
            <div className="pt-3 border-t border-blue-950/80 flex items-center justify-between text-xs text-yellow-400 font-medium">
              <span className="flex items-center gap-1.5">
                <RotateCw className="w-3.5 h-3.5" />
                點擊翻轉查看鑑識與推測
              </span>
              <span className="text-stone-500 text-[11px]">背面 ➔</span>
            </div>
          </div>
        </div>

        {/* ================= CARD BACK ================= */}
        {/* 背面：證物名稱、地點 分上下層（上層：說明，下層：推測） */}
        <div
          className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl bg-[#0c1222] text-stone-200 flex flex-col justify-between overflow-hidden p-5 sm:p-6 ${borderClass}`}
        >
          {/* Back Header: 證物名稱與地點 */}
          <div className="pb-3 border-b border-blue-950 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-yellow-400 font-dossier-heading">
                {evidence.code}：{evidence.name}
              </span>
              <span className="text-[11px] font-dossier-mono text-blue-300/80 bg-[#070b14] px-2 py-0.5 rounded border border-blue-950">
                FORENSIC REPORT
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-stone-400">
              <MapPin className="w-3.5 h-3.5 text-yellow-400/80 shrink-0" />
              <span className="truncate">{evidence.locationFound}</span>
            </div>
          </div>

          {/* Middle: Split into Upper Layer (說明) and Lower Layer (推測) */}
          <div className="flex-1 my-3 overflow-y-auto space-y-3.5 pr-1">
            {/* 上層：說明 (客觀鑑識與現場調查) */}
            <div className="p-3.5 rounded-lg bg-[#080d19]/90 border border-blue-950/80 text-xs sm:text-sm leading-relaxed">
              <div className="flex items-center gap-1.5 text-yellow-400 font-bold text-xs uppercase tracking-wider mb-1.5">
                <Search className="w-3.5 h-3.5" />
                <span>【說明】鑑識調查事實</span>
              </div>
              <p className="text-stone-300 font-sans">{evidence.explanation}</p>
            </div>

            {/* 下層：推測 (幾乎完美的解析，以警方檢方角度敘述) */}
            <div className="p-3.5 rounded-lg bg-[#0e172a] border border-blue-800/40 text-xs sm:text-sm leading-relaxed">
              <div className="flex items-center gap-1.5 text-blue-300 font-bold text-xs uppercase tracking-wider mb-1.5">
                <BrainCircuit className="w-3.5 h-3.5 text-yellow-400" />
                <span>【推測】檢警案情偵查心證</span>
              </div>
              <p className="text-stone-200 font-sans">{evidence.speculation}</p>
            </div>
          </div>

          {/* Bottom Flip back trigger */}
          <div className="pt-2.5 border-t border-blue-950 flex items-center justify-between text-xs text-stone-400">
            <span className="text-[11px] text-yellow-400/80">
              邊緣已變色標記
            </span>
            <span className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 font-medium cursor-pointer">
              <RotateCw className="w-3.5 h-3.5" />
              點擊翻回正面
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
