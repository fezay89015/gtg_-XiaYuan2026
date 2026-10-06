import { useState, useRef, useEffect } from 'react';
import { EVIDENCE_ITEMS } from './data/caseData';
import { CaseHeader } from './components/CaseHeader';
import { EvidenceCard } from './components/EvidenceCard';
import { DeductionModal } from './components/DeductionModal';
import { ConfessionLetter } from './components/ConfessionLetter';
import { SinsAnalysisSection } from './components/SinsAnalysisSection';
import { EventCtaCard } from './components/EventCtaCard';
import { Lock, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

export function App() {
  const [reviewedCards, setReviewedCards] = useState<Set<string>>(new Set());
  const [isDeductionModalOpen, setIsDeductionModalOpen] = useState(false);
  const [isFinalUnlocked, setIsFinalUnlocked] = useState(false);
  const [isDeductionFlashing, setIsDeductionFlashing] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const finaleSectionRef = useRef<HTMLDivElement>(null);
  const deductionArenaRef = useRef<HTMLDivElement>(null);

  // Subtle parallax scroll tracker for the blurred background desk photo
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCardFlipped = (id: string) => {
    setReviewedCards((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const handleOpenDeduction = () => {
    setIsDeductionModalOpen(true);
  };

  const handleJumpToDeductionArena = () => {
    // Jump smoothly to the deduction card without opening the modal
    deductionArenaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setIsDeductionFlashing(true);
    // Flash once slowly over 1.8s then turn off
    setTimeout(() => {
      setIsDeductionFlashing(false);
    }, 1900);
  };

  const handleSubmitReport = () => {
    setIsFinalUnlocked(true);
    setTimeout(() => {
      const target = document.getElementById('confession-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        finaleSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 350);
  };

  return (
    <div className="min-h-screen text-stone-900 flex flex-col font-sans selection:bg-red-700 selection:text-white relative">
      {/* ================= BLURRED PARALLAX DESK BACKGROUND LAYER ================= */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -top-[12%] -left-[5%] -right-[5%] -bottom-[12%] bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: "url('/src/assets/images/vintage_detective_desk_bg_1791164684894.jpg')",
            filter: 'blur(5px) brightness(0.68) contrast(1.05)',
            transform: `translate3d(0, ${scrollY * 0.08}px, 0) scale(1.06)`,
          }}
        />
        {/* Ambient Dark Vignette Scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#120e0a]/40 via-[#120e0a]/65 to-[#120e0a]/85" />
      </div>

      {/* 1. TOP: Vintage Scrapboard Header (Title + Polaroid + Pinned Notices) */}
      <CaseHeader isUnlockedFinal={isFinalUnlocked} />

      {/* Elegant Detective Case Seam Divider (Natural on Mobile & Desktop) */}
      <div className="w-full max-w-4xl mx-auto my-6 sm:my-8 px-4 flex items-center justify-center gap-3 select-none">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#b89f81]/60 to-[#b89f81]" />
        <div className="px-3.5 py-1 rounded-full bg-[#fbf7ee] border border-[#b89f81] shadow-sm flex items-center gap-2 text-stone-800 text-xs font-bold font-sans">
          <span className="w-2 h-2 rounded-full bg-red-700 animate-pulse" />
          <span className="tracking-wide">現場跡證勘驗板</span>
        </div>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#b89f81]/60 to-[#b89f81]" />
      </div>

      {/* 2. MIDDLE: Evidence Cards Wall (證物 01 ～ 06) */}
      <section className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
        {/* Section Header on Kraft Board */}
        <div className="kraft-dossier-board rounded-2xl p-6 sm:p-8 border border-[#c4b195] shadow-xl relative overflow-hidden">
          {/* Top 3D Red Pushpins */}
          <div className="absolute top-2 left-8 z-10 pointer-events-none">
            <span className="pushpin-3d-red scale-75" />
          </div>
          <div className="absolute top-2 right-8 z-10 pointer-events-none">
            <span className="pushpin-3d-red scale-75" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#c4b195]">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-800 mb-1.5 font-dossier-mono">
                <span>STAGE 01: FORENSIC INVESTIGATION // 現場跡證線索板</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-950 font-dossier-heading">
                現場物證與偵查線索（編號 01 ～ 06）
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-stone-800 font-sans font-medium leading-relaxed">
                調查板已釘選 6 件關鍵物證與線索。每張相片皆附有<strong>承辦偵查便條</strong>，點擊即可翻閱【鑑識事實】與【偵查心證】。掌握矛盾關鍵，即可點擊下方啟動「推理論證」解鎖自白書！
              </p>
            </div>

            <div className="text-xs text-stone-900 font-dossier-mono bg-white/90 px-4 py-2.5 rounded-xl border border-stone-400 shrink-0 shadow-sm font-bold">
              勘驗進度：<span className="text-red-700 font-black text-sm">{reviewedCards.size}</span> / {EVIDENCE_ITEMS.length} 件
            </div>
          </div>

          {/* Clue Connection Board Notice (Mobile-optimized wrap with title on top-left) */}
          <div className="mt-4 p-3.5 sm:p-4 rounded-xl bg-amber-50/90 border border-amber-300 shadow-sm font-sans">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-1.5 text-red-900 font-bold text-xs sm:text-sm">
                <span className="pushpin-3d-red scale-75 shrink-0" />
                <span>辦案提示便條</span>
              </div>
              <span className="font-dossier-mono text-[10px] sm:text-[11px] text-stone-600 font-bold">
                EVIDENCE BOARD // CR-0930
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium pl-5 sm:pl-6">
              每張拍立得卡片皆可點擊翻轉檢視白紙黑字的鑑識報告，比對矛盾破綻！
            </p>
          </div>
        </div>

        {/* 6 Evidence Cards Grid (100% stable, zero jump, zero vertical offset) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {EVIDENCE_ITEMS.map((item) => (
            <EvidenceCard
              key={item.id}
              evidence={item}
              onCardFlipped={handleCardFlipped}
            />
          ))}
        </div>

        {/* Prominent Deduction Button directly below all evidence items */}
        <div className="mt-14 sm:mt-16 text-center">
          <div
            ref={deductionArenaRef}
            className={`kraft-dossier-board p-8 sm:p-10 rounded-2xl border-2 shadow-2xl max-w-3xl mx-auto flex flex-col items-center gap-4 relative transition-all duration-300 ${
              isDeductionFlashing
                ? 'animate-slow-single-flash'
                : 'border-stone-800'
            }`}
          >
            {/* Top Red Pushpin */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none">
              <span className="pushpin-3d-red shadow-lg" />
            </div>

            <span className="text-xs uppercase tracking-widest text-red-800 font-dossier-mono font-bold">
              LOGICAL INFERENCE & DEDUCTION ARENA
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-stone-950 font-dossier-heading">
              物證審閱完畢，進行全案邏輯論證
            </h3>
            <p className="text-xs sm:text-sm text-stone-800 max-w-xl leading-relaxed font-sans font-medium">
              點擊下方按鈕啟動推理論證庭。回答 3 道關鍵選擇題，若推論與物證相悖將被直接阻擋；推導正確即可送出報告解鎖自白書！
            </p>

            <button
              onClick={handleOpenDeduction}
              className="mt-2 py-4 px-10 rounded-xl bg-red-700 hover:bg-red-800 text-white font-black text-base sm:text-lg transition-all shadow-xl shadow-red-900/30 flex items-center justify-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95 font-sans"
            >
              <span className="text-xl">🕵️‍♂️</span>
              <span>開始推理論證</span>
              <ArrowRight className="w-5 h-5 animate-pulse" />
            </button>
          </div>
        </div>
      </section>

      {/* Elegant Detective Case Seam Divider (Natural on Mobile & Desktop) */}
      <div className="w-full max-w-4xl mx-auto my-6 sm:my-8 px-4 flex items-center justify-center gap-3 select-none">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#b89f81]/60 to-[#b89f81]" />
        <div className="px-3.5 py-1 rounded-full bg-[#fbf7ee] border border-[#b89f81] shadow-sm flex items-center gap-2 text-stone-800 text-xs font-bold font-sans">
          <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
          <span className="tracking-wide">推理論證與結案自白</span>
        </div>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#b89f81]/60 to-[#b89f81]" />
      </div>

      {/* 3. FINALE: Unlocked Content (證物 07 自白書 + 罪結總整理 + 活動 CTA) */}
      <section
        ref={finaleSectionRef}
        className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto">
          {isFinalUnlocked ? (
            <div className="space-y-12 animate-fade-in">
              {/* Unlocked banner */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-800 text-white text-xs font-bold tracking-wider mb-3 shadow-md font-sans">
                  <ShieldCheck className="w-4 h-4 text-emerald-200" />
                  <span>推理論證報告已送出採納 · 全案真相大白</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-amber-100 font-dossier-heading drop-shadow-md">
                  【結案卷宗：真相反轉與解冤釋結】
                </h2>
              </div>

              {/* 1. 【證物 07：阿城留下的自白信】 */}
              <ConfessionLetter />

              {/* 2. 【阿城因果冤結揭露】 */}
              <SinsAnalysisSection />

              {/* 3. 【活動報名 CTA 卡片 (祥雲香霧在卡片上層緩緩解開)】 */}
              <EventCtaCard />
            </div>
          ) : (
            /* Locked Placeholder */
            <div className="text-center py-14 max-w-lg mx-auto p-8 rounded-2xl kraft-dossier-board border-2 border-stone-800 shadow-2xl relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none">
                <span className="pushpin-3d-red" />
              </div>
              <div className="w-14 h-14 rounded-full bg-stone-900 text-amber-200 flex items-center justify-center mx-auto mb-4 shadow-md">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-stone-950 font-dossier-heading">
                【線索 07 自白信與結案報告】已加密封存
              </h3>
              <p className="text-xs sm:text-sm text-stone-800 mt-2 leading-relaxed font-sans font-medium">
                本案真相與阿城的終極自白受檢方封條保護。請先點擊上方物證區的「🕵️‍♂️ 開始推理論證」通過審核，方能解鎖全文與活動資訊。
              </p>
              <div className="mt-6">
                <button
                  onClick={handleJumpToDeductionArena}
                  className="py-2.5 px-6 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-100 font-bold text-xs transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-md font-sans hover:scale-105 active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                  <span>前往推理論證卡片 ➔</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Deduction Modal (3 Questions with blocking & advance logic) */}
      <DeductionModal
        isOpen={isDeductionModalOpen}
        onClose={() => setIsDeductionModalOpen(false)}
        onSubmitReport={handleSubmitReport}
      />

      {/* Official Temple Footer on Antique Wood Desk Base */}
      <footer className="w-full bg-[#140f0a]/95 pt-10 pb-6 px-4 text-center select-none space-y-3 text-xs sm:text-sm text-stone-300 shadow-2xl">
        <div className="max-w-3xl mx-auto space-y-2 font-serif">
          {/* Temple Official Logo */}
          <div className="flex justify-center mb-5">
            <img
              src="https://github.com/user-attachments/assets/ec3ed119-9cbb-4cde-b551-5c8ac9e56032"
              alt="台中廣天宮 財神開基祖廟 Logo"
              referrerPolicy="no-referrer"
              className="h-16 sm:h-20 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform"
            />
          </div>

          <div className="font-dossier-mono text-amber-300 font-bold space-x-2 text-sm">
            <span>Tel. 04-2243 4146 | 0800-221-988</span>
            <span className="hidden sm:inline text-stone-500">|</span>
            <span className="block sm:inline">Fax. 04-2247 6921</span>
          </div>

          <div className="text-stone-300 font-sans">
            <span>參拜時間 08:00-21:00</span>
            <span className="mx-2 text-stone-500">·</span>
            <span>台中市北屯區遼陽五街131號</span>
          </div>

          <div className="pt-3 text-[11px] text-stone-400 tracking-wider font-dossier-mono">
            © 台中廣天宮 財神開基祖廟 ALL RIGHTS RESERVED
          </div>
        </div>

        {/* Subtle accent line */}
        <div className="h-1 w-full bg-police-tape-thin mt-6 opacity-60" />
      </footer>
    </div>
  );
}

export default App;
