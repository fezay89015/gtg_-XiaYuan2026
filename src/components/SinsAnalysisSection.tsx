import React, { useState } from 'react';
import { SINS_ANALYSIS } from '../data/caseData';
import { playCardFlip } from '../utils/audio';
import { Scale, Flame, Unlock, RotateCw, Sparkles, CheckCircle2 } from 'lucide-react';

export const SinsAnalysisSection: React.FC = () => {
  // Set of revealed card IDs
  const [flippedIds, setFlippedIds] = useState<Set<string>>(new Set());

  const handleToggleCard = (id: string) => {
    playCardFlip();
    setFlippedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleRevealAll = () => {
    playCardFlip();
    if (flippedIds.size === SINS_ANALYSIS.length) {
      setFlippedIds(new Set());
    } else {
      setFlippedIds(new Set(SINS_ANALYSIS.map((item) => item.id)));
    }
  };

  const isAllRevealed = flippedIds.size === SINS_ANALYSIS.length;

  return (
    <div className="w-full max-w-5xl mx-auto mt-14 rounded-2xl border-2 border-yellow-500/40 bg-[#0d0f18] p-6 sm:p-10 shadow-2xl relative">
      {/* Top Header */}
      <div className="pb-6 border-b border-stone-800 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-yellow-400 font-bold text-xs uppercase tracking-widest mb-1.5">
            <Scale className="w-4 h-4" />
            <span>宗教道教科儀典籍考證 · 太上三十六解</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-100 font-dossier-heading">
            【因果封印 · 阿城生前五重罪結揭露】
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
            讀完自白信，你為阿城的自我犧牲動容；然而這場烈火與十餘年的東躲西藏，究竟種下了何種過去？
            <br />
            請<strong>點擊下方牌卡撕開封印</strong>，對照阿城生前的五大殘酷行徑，揭曉其在道家典籍中對應的因果罪結！
          </p>
        </div>

        {/* Action Controls: Reveal Count & Flip All Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
          <div className="text-xs font-dossier-mono px-3 py-1.5 rounded-lg bg-[#141724] border border-blue-950 text-stone-300">
            解開罪結：<span className="text-yellow-400 font-bold">{flippedIds.size}</span> / {SINS_ANALYSIS.length}
          </div>

          <button
            onClick={handleRevealAll}
            className="px-3.5 py-1.5 rounded-lg bg-yellow-400/10 hover:bg-yellow-400 text-yellow-400 hover:text-stone-950 font-bold text-xs border border-yellow-400/50 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAllRevealed ? '全部覆蓋回封印' : '一鍵撕開全部罪結'}</span>
          </button>
        </div>
      </div>

      {/* 5 Interactive Flip Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
        {SINS_ANALYSIS.map((item, idx) => {
          const isFlipped = flippedIds.has(item.id);

          return (
            <div
              key={item.id}
              className="perspective-1000 min-h-[300px] w-full select-none cursor-pointer group"
              onClick={() => handleToggleCard(item.id)}
            >
              <div
                className={`relative w-full h-full transition-transform duration-500 preserve-3d rounded-xl ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* ================= FRONT: 生前事實 (封印面) ================= */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl bg-[#141622] border-2 border-stone-800 hover:border-red-500/60 p-5 flex flex-col justify-between transition-all shadow-md group-hover:shadow-red-500/10">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-2 border-b border-stone-800/80">
                      <span className="px-2 py-0.5 rounded bg-red-950/80 text-red-400 font-dossier-mono font-bold text-xs border border-red-900/60">
                        {item.factNumber}
                      </span>
                      <span className="text-[11px] font-dossier-mono text-stone-500">
                        SEALED SIN
                      </span>
                    </div>

                    {/* Fact Title */}
                    <h4 className="text-base font-bold text-stone-100 font-dossier-heading leading-snug">
                      {item.factTitle}
                    </h4>

                    {/* Fact Description */}
                    <p className="text-xs text-stone-300 leading-relaxed">
                      {item.factSummary}
                    </p>
                  </div>

                  {/* Stamp & Action Button */}
                  <div className="pt-3 border-t border-stone-800/80 mt-4 space-y-2">
                    <div className="py-2 px-3 rounded-lg bg-red-950/30 border border-red-900/50 text-red-300 text-xs font-semibold flex items-center justify-center gap-2 group-hover:bg-red-950/50 transition-colors">
                      <Flame className="w-3.5 h-3.5 text-red-400" />
                      <span>撕開封印 · 顯現三十六解罪結</span>
                    </div>
                  </div>
                </div>

                {/* ================= BACK: 因果罪結 (揭露面) ================= */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl bg-[#121626] border-2 border-yellow-400 p-5 flex flex-col justify-between shadow-xl shadow-yellow-500/15">
                  <div className="space-y-2.5">
                    {/* Header with Taoist Knot Theme */}
                    <div className="flex items-center justify-between pb-2 border-b border-blue-900/50">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-yellow-400">
                        <Unlock className="w-3.5 h-3.5 text-yellow-400" />
                        <span>因果罪結已顯現</span>
                      </span>
                      <span className="text-[10px] font-dossier-mono text-blue-300 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-900">
                        36 SINS KNOT
                      </span>
                    </div>

                    {/* Sin Knot Name */}
                    <h4 className="text-base font-black text-yellow-400 font-dossier-heading leading-snug">
                      {item.sinName}
                    </h4>

                    {/* Category */}
                    <div className="inline-block px-2 py-0.5 rounded bg-yellow-400/10 text-yellow-300 text-[11px] font-medium border border-yellow-400/30">
                      業報類別：{item.category}
                    </div>

                    {/* Explanation */}
                    <p className="text-xs text-stone-200 leading-relaxed pt-1">
                      {item.description}
                    </p>
                  </div>

                  {/* Return Button */}
                  <div className="pt-3 border-t border-blue-900/60 mt-4">
                    <div className="py-2 px-3 rounded-lg bg-yellow-400/10 hover:bg-yellow-400 text-yellow-400 hover:text-stone-950 text-xs font-bold transition-all flex items-center justify-center gap-2 border border-yellow-400/40">
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>翻回生前事實</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Banner when all 5 are revealed */}
      {isAllRevealed && (
        <div className="mt-8 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-yellow-950/40 via-blue-950/50 to-yellow-950/40 border border-yellow-400/50 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-500 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-yellow-400 text-stone-950 flex items-center justify-center shrink-0 font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-yellow-400 font-black text-sm block">
                五重因果罪結全數揭露破除！
              </span>
              <p className="text-xs text-stone-300 mt-0.5">
                阿城用烈火了結了現世恩怨，但其內心難解的罪疚，唯有經由懺悔釋結方得安寧。
              </p>
            </div>
          </div>

          <a
            href="#promo-section"
            className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-stone-950 font-black text-xs transition-all shadow-md shrink-0 flex items-center gap-1.5"
          >
            <span>探索人生課題推理展 ↓</span>
          </a>
        </div>
      )}
    </div>
  );
};
