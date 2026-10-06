import React, { useState } from 'react';
import { SINS_ANALYSIS, SinAnalysisItem } from '../data/caseData';
import { playSlideSound } from '../utils/audio';
import { Scale, Check, ArrowDown, Lock, ChevronRight } from 'lucide-react';

interface SinsAnalysisSectionProps {
  sinsList?: SinAnalysisItem[];
  caseTitle?: string;
}

export const SinsAnalysisSection: React.FC<SinsAnalysisSectionProps> = ({
  sinsList = SINS_ANALYSIS,
  caseTitle = '涉案因果罪結揭曉'
}) => {
  // IDs of cards that have been slid open
  const [tornIds, setTornIds] = useState<Set<string>>(new Set());
  // IDs currently undergoing the sliding open animation
  const [tearingIds, setTearingIds] = useState<Set<string>>(new Set());

  const handleTearCard = (id: string) => {
    if (tornIds.has(id) || tearingIds.has(id)) return;

    playSlideSound();
    setTearingIds((prev) => new Set(prev).add(id));

    setTimeout(() => {
      setTornIds((prev) => new Set(prev).add(id));
      setTearingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 450);
  };

  const isAllTorn = tornIds.size === sinsList.length;

  const handleScrollToPromo = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('promo-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      className="w-full max-w-5xl mx-auto mt-14 rounded-2xl kraft-dossier-board border-2 border-[#b89f81] p-6 sm:p-10 shadow-2xl relative overflow-hidden"
    >
      {/* Top Header */}
      <div className="pb-6 border-b-2 border-stone-400/60 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-red-800 font-bold text-xs uppercase tracking-widest mb-1.5 font-sans">
            <Scale className="w-4 h-4" />
            <span>傳統科儀典籍考證 · 正統三十六解冤結</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-stone-950 font-dossier-heading">
            【因果罪結 · {caseTitle}】
          </h3>
          <p className="text-xs sm:text-sm text-stone-700 mt-2 leading-relaxed font-sans font-medium">
            案情真相大白，世間仇怨雖有定論，然而牽涉其中的人心執念、欺瞞、或私慾，背後究竟種下了何種因果業結？
            <br />
            每張卡片<strong>上半部為過往行徑事實</strong>，<strong>下半部為對應之解冤罪結</strong>。點擊滑開案情封印，即可揭曉對應因果！
          </p>
        </div>

        {/* Action Controls - cleanly showing count only */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-xs font-dossier-mono px-4 py-2 rounded-xl bg-stone-100 border border-stone-400 text-stone-800 font-bold shadow-sm">
            已揭曉罪結：<span className="text-red-700 font-black text-sm">{tornIds.size}</span> / {sinsList.length}
          </div>
        </div>
      </div>

      {/* Cards (Top Half Past Action + Bottom Half Sin Knot with Smooth Horizontal Slide Shutter) */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {sinsList.map((item) => {
          const isTorn = tornIds.has(item.id);
          const isTearing = tearingIds.has(item.id);

          return (
            <div
              key={item.id}
              className={`rounded-xl border-2 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg ${
                isTorn
                  ? 'border-red-700 bg-white ring-1 ring-red-700/20'
                  : 'border-stone-400 bg-stone-50 hover:border-stone-600'
              }`}
            >
              {/* ================= CARD UPPER HALF: 過往行徑事實 ================= */}
              <div className="p-5 border-b border-stone-300 space-y-2.5 bg-[#fdfbf7]">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-red-800 text-white font-dossier-mono font-bold text-xs shadow-sm">
                    {item.factNumber} · 過往行徑
                  </span>
                  <span className="text-[10px] font-dossier-mono text-stone-500 font-bold">
                    PAST RECORD
                  </span>
                </div>

                <h4 className="text-base font-bold text-stone-950 font-dossier-heading leading-snug">
                  {item.factTitle}
                </h4>

                <p className="text-xs text-stone-800 font-sans font-medium leading-relaxed">
                  {item.factSummary}
                </p>
              </div>

              {/* ================= CARD LOWER HALF: 因果罪結 (封條滑開顯現) ================= */}
              <div className="p-5 flex-1 relative flex flex-col justify-between min-h-[185px] bg-[#faf8f4] overflow-hidden">
                {/* 1. SLIDING SEAL SHUTTER (Smoothly slides open to the right along the track) */}
                {!isTorn && (
                  <div
                    className={`absolute inset-0 z-10 bg-gradient-to-r from-[#211a14] via-[#1a1410] to-[#211a14] p-4 flex flex-col justify-between cursor-pointer select-none border-t-2 border-stone-600 shadow-inner transition-all duration-500 ease-in-out ${
                      isTearing
                        ? 'translate-x-[105%] opacity-0 pointer-events-none'
                        : 'translate-x-0 opacity-100 hover:brightness-110'
                    }`}
                    onClick={() => handleTearCard(item.id)}
                  >
                    <div className="flex items-center justify-between text-[10px] font-dossier-mono text-stone-400 border-b border-stone-700/70 pb-1.5">
                      <span className="flex items-center gap-1.5 text-amber-200/90 font-bold">
                        <Lock className="w-3 h-3 text-red-500 shrink-0" />
                        <span>CONFIDENTIAL DOCKET</span>
                      </span>
                      <span className="text-stone-400">SLIDE TO REVEAL</span>
                    </div>

                    {/* Center sliding latch bar */}
                    <div className="w-full py-2.5 px-3 rounded-lg bg-stone-900 border border-stone-600 shadow-md flex items-center justify-between gap-2 group">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                        <span className="text-xs sm:text-sm font-black text-amber-100 font-sans tracking-wide">
                          點擊滑開 · 揭曉罪結
                        </span>
                      </div>
                      <div className="flex items-center text-amber-400 group-hover:translate-x-1.5 transition-transform">
                        <ChevronRight className="w-4 h-4" />
                        <ChevronRight className="w-4 h-4 -ml-2.5" />
                      </div>
                    </div>

                    <div className="text-[10px] text-stone-400 font-sans text-center">
                      ※ 點擊後封印將向右滑開，揭曉案情因果罪結
                    </div>
                  </div>
                )}

                {/* 2. REVEALED CONTENT (Beneath sliding shutter) */}
                <div className={`space-y-2.5 transition-opacity duration-300 ${isTorn ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-800 font-sans">
                      <Check className="w-4 h-4 text-red-700 shrink-0" />
                      <span>對應罪結</span>
                    </span>
                    <span className="text-[10px] font-dossier-mono text-stone-700 bg-stone-200 px-2 py-0.5 rounded font-bold border border-stone-300">
                      解冤罪結
                    </span>
                  </div>

                  {/* Sin Knot Title */}
                  <h5 className="text-base font-black text-red-900 font-dossier-heading leading-snug">
                    {item.sinName}
                  </h5>

                  {/* Category Tag */}
                  <div className="inline-block px-2 py-0.5 rounded bg-amber-100 text-amber-950 text-[11px] font-bold border border-amber-300 font-sans">
                    因果業障：{item.category}
                  </div>

                  {/* Karmic Explanation */}
                  <p className="text-xs text-stone-800 font-sans font-medium leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>

                {isTorn && (
                  <div className="pt-3 mt-3 border-t border-stone-200 flex items-center justify-end text-[11px] text-emerald-800 font-bold font-sans">
                    <span>✓ 罪結封印已滑開揭曉</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* When all torn, show gentle guidance notice */}
      {isAllTorn && (
        <div className="mt-8 p-5 rounded-xl bg-amber-50 border-2 border-amber-400 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-900 shadow-md animate-fade-in font-sans">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🪔</span>
            <div>
              <p className="font-bold text-sm text-stone-950">
                罪結全數揭露完畢 · 唯有科儀方能化解
              </p>
              <p className="text-xs text-stone-700 mt-0.5">
                每個人心中，亦常有難解的罪疚與因果窒礙。藉由正統科儀解冤釋結、虔心懺悔，方能化消累劫冤愆，迎祥納福、轉運賜財。
              </p>
            </div>
          </div>
          <button
            onClick={handleScrollToPromo}
            className="py-2.5 px-6 rounded-lg bg-red-700 hover:bg-red-800 text-white font-bold text-xs shrink-0 transition-colors shadow-md flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
          >
            <span>檢視法會超薦資訊</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>
      )}
    </div>
  );
};
