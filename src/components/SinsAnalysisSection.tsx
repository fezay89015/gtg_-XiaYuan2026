import React, { useState, useEffect, useRef } from 'react';
import { SINS_ANALYSIS } from '../data/caseData';
import { playTearTapeSound } from '../utils/audio';
import { Scale, Flame, CheckCircle2, Sparkles, Check, ArrowDown, Wind } from 'lucide-react';

export const SinsAnalysisSection: React.FC = () => {
  // IDs of cards that have been torn open
  const [tornIds, setTornIds] = useState<Set<string>>(new Set());
  // IDs currently undergoing the tearing rip animation
  const [tearingIds, setTearingIds] = useState<Set<string>>(new Set());
  // Mist parting animation trigger state
  const [hasPlayedMist, setHasPlayedMist] = useState(false);
  const [isMistActive, setIsMistActive] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Trigger mist parting animation when scrolled into view for the first time
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasPlayedMist) {
          setHasPlayedMist(true);
          setIsMistActive(true);
          setTimeout(() => {
            setIsMistActive(false);
          }, 2200);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasPlayedMist]);

  const triggerMistAgain = () => {
    setIsMistActive(true);
    setTimeout(() => {
      setIsMistActive(false);
    }, 2200);
  };

  const handleTearCard = (id: string) => {
    if (tornIds.has(id) || tearingIds.has(id)) return;

    // Start tear animation & play sound
    playTearTapeSound();
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

  const handleTearAll = () => {
    playTearTapeSound();
    const remaining = SINS_ANALYSIS.filter((item) => !tornIds.has(item.id)).map((item) => item.id);
    if (remaining.length === 0) return;

    setTearingIds(new Set(remaining));

    setTimeout(() => {
      setTornIds(new Set(SINS_ANALYSIS.map((item) => item.id)));
      setTearingIds(new Set());
    }, 450);
  };

  const isAllTorn = tornIds.size === SINS_ANALYSIS.length;

  const handleScrollToPromo = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('promo-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      ref={sectionRef}
      className="w-full max-w-5xl mx-auto mt-14 rounded-2xl border-2 border-yellow-500/40 bg-[#0d0f18] p-6 sm:p-10 shadow-2xl relative overflow-hidden"
    >
      {/* ================= ETHEREAL TEMPLE MIST PARTING OVERLAY ================= */}
      {isMistActive && (
        <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden flex">
          {/* Left billowing mist cloud */}
          <div className="w-1/2 h-full bg-gradient-to-r from-stone-900/95 via-slate-800/90 to-transparent backdrop-blur-xl animate-mist-left flex items-center justify-end pr-8">
            <span className="text-yellow-400/40 font-dossier-heading tracking-widest text-lg hidden sm:inline">
              ✦ 冤結漸明 ✦
            </span>
          </div>

          {/* Right billowing mist cloud */}
          <div className="w-1/2 h-full bg-gradient-to-l from-stone-900/95 via-slate-800/90 to-transparent backdrop-blur-xl animate-mist-right flex items-center justify-start pl-8">
            <span className="text-yellow-400/40 font-dossier-heading tracking-widest text-lg hidden sm:inline">
              ✦ 解冤釋結 ✦
            </span>
          </div>
        </div>
      )}

      {/* Top Header */}
      <div className="pb-6 border-b border-stone-800 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-yellow-400 font-bold text-xs uppercase tracking-widest mb-1.5">
            <Scale className="w-4 h-4" />
            <span>傳統科儀典籍考證 · 正統三十六解冤結</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-100 font-dossier-heading">
            【因果罪結 · 阿城生前五重冤結揭露】
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
            讀完自白信，你為阿城的自我犧牲動容；然而這場烈火與十餘年的東躲西藏，究竟種下了何種過去？
            <br />
            每張卡片<strong>上半部為生前事實</strong>，<strong>下半部為因果罪結</strong>。點擊撕開封條，即可顯現對應之因果冤結！
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
          <button
            onClick={triggerMistAgain}
            className="px-2.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-yellow-300 text-xs border border-stone-800 flex items-center gap-1 cursor-pointer transition-colors"
            title="重新播放雲霧飄開效果"
          >
            <Wind className="w-3.5 h-3.5" />
            <span>重現雲霧</span>
          </button>

          <div className="text-xs font-dossier-mono px-3 py-1.5 rounded-lg bg-[#141724] border border-blue-950 text-stone-300">
            已撕開封印：<span className="text-yellow-400 font-bold">{tornIds.size}</span> / {SINS_ANALYSIS.length}
          </div>

          {!isAllTorn && (
            <button
              onClick={handleTearAll}
              className="px-3.5 py-1.5 rounded-lg bg-yellow-400/10 hover:bg-yellow-400 text-yellow-400 hover:text-stone-950 font-bold text-xs border border-yellow-400/50 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>一鍵撕開全部封印</span>
            </button>
          )}
        </div>
      </div>

      {/* 5 Cards (Top Half Fact + Bottom Half Sin Knot with Tearing Seal) */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {SINS_ANALYSIS.map((item) => {
          const isTorn = tornIds.has(item.id);
          const isTearing = tearingIds.has(item.id);

          return (
            <div
              key={item.id}
              className={`rounded-xl border-2 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg ${
                isTorn
                  ? 'border-yellow-400/70 bg-[#121626] shadow-yellow-500/10'
                  : 'border-stone-800 bg-[#141622] hover:border-red-500/50'
              }`}
            >
              {/* ================= CARD UPPER HALF: 生前行徑事實 ================= */}
              <div className="p-5 border-b border-stone-800/80 space-y-2.5 bg-[#0f111a]">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-red-950/80 text-red-400 font-dossier-mono font-bold text-xs border border-red-900/60">
                    {item.factNumber} · 生前事實
                  </span>
                  <span className="text-[10px] font-dossier-mono text-stone-500">
                    FACT LOG
                  </span>
                </div>

                <h4 className="text-base font-bold text-stone-100 font-dossier-heading leading-snug">
                  {item.factTitle}
                </h4>

                <p className="text-xs text-stone-300 leading-relaxed">
                  {item.factSummary}
                </p>
              </div>

              {/* ================= CARD LOWER HALF: 因果罪結 (封印 or 撕開顯現) ================= */}
              <div className="p-5 flex-1 relative flex flex-col justify-between min-h-[170px] bg-[#121626]">
                {/* 1. SEALED OVERLAY (When not yet torn) */}
                {!isTorn && (
                  <div
                    className={`absolute inset-0 z-10 bg-gradient-to-b from-[#180a0a] to-[#250d0d] p-4 flex flex-col items-center justify-center text-center cursor-pointer select-none transition-all ${
                      isTearing ? 'animate-tape-rip' : 'hover:brightness-110'
                    }`}
                    onClick={() => handleTearCard(item.id)}
                  >
                    {/* Diagonal Caution / Seal Tape Banner */}
                    <div className="w-full py-2.5 px-3 rounded-lg bg-red-950/90 border-2 border-red-500/80 shadow-lg flex items-center justify-center gap-2 group">
                      <Flame className="w-4 h-4 text-red-400 animate-pulse shrink-0" />
                      <span className="text-xs font-bold text-red-200 tracking-wider">
                        【因果宿怨封印 · 點擊撕開】
                      </span>
                    </div>

                    <p className="text-[11px] text-red-300/70 mt-3 font-dossier-mono">
                      ⚡ 撕開印條 · 顯現對應之三十六解因果罪結
                    </p>
                  </div>
                )}

                {/* 2. REVEALED CONTENT (Once torn) */}
                <div className={`space-y-2.5 transition-all duration-500 ${isTorn ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-yellow-400">
                      <Check className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                      <span>對應解冤罪結</span>
                    </span>
                    <span className="text-[10px] font-dossier-mono text-blue-300 bg-blue-950/90 px-2 py-0.5 rounded border border-blue-900/60">
                      因果冤結
                    </span>
                  </div>

                  {/* Sin Knot Title */}
                  <h5 className="text-base font-black text-yellow-400 font-dossier-heading leading-snug">
                    {item.sinName}
                  </h5>

                  {/* Category Tag */}
                  <div className="inline-block px-2 py-0.5 rounded bg-yellow-400/10 text-yellow-300 text-[11px] font-medium border border-yellow-400/30">
                    因果業障：{item.category}
                  </div>

                  {/* Karmic Explanation */}
                  <p className="text-xs text-stone-200 leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>

                {isTorn && (
                  <div className="pt-3 mt-3 border-t border-blue-900/50 flex items-center justify-end text-[11px] text-emerald-400 font-medium">
                    <span>✓ 冤結封印已撕開顯現</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Banner when all 5 are revealed */}
      {isAllTorn && (
        <div className="mt-8 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-yellow-950/40 via-blue-950/50 to-yellow-950/40 border border-yellow-400/50 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-500 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-yellow-400 text-stone-950 flex items-center justify-center shrink-0 font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-yellow-400 font-black text-sm block">
                五重因果罪結全數撕開顯現！
              </span>
              <p className="text-xs text-stone-300 mt-0.5">
                阿城用烈火了結了現世恩怨，但其累世因果與未解冤結，唯有至誠參與解冤釋結法會方得化消。
              </p>
            </div>
          </div>

          <button
            onClick={handleScrollToPromo}
            className="px-5 py-2.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-stone-950 font-black text-xs transition-all shadow-md shrink-0 flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <span>探索消災轉運賜財法會</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      )}
    </div>
  );
};
