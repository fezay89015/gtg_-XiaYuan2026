import { useState, useRef } from 'react';
import { CaseHeader } from './components/CaseHeader';
import { EvidenceCard } from './components/EvidenceCard';
import { DeductionModal } from './components/DeductionModal';
import { ConfessionLetter } from './components/ConfessionLetter';
import { SinsAnalysisSection } from './components/SinsAnalysisSection';
import { EventCtaCard } from './components/EventCtaCard';
import { EVIDENCE_ITEMS } from './data/caseData';
import { ShieldCheck, Lock, Sparkles } from 'lucide-react';

export default function App() {
  const [isDeductionModalOpen, setIsDeductionModalOpen] = useState(false);
  const [isFinalUnlocked, setIsFinalUnlocked] = useState(false);
  const [reviewedCards, setReviewedCards] = useState<Set<string>>(new Set());

  const finaleSectionRef = useRef<HTMLDivElement>(null);

  const handleCardFlipped = (id: string) => {
    setReviewedCards((prev) => new Set(prev).add(id));
  };

  const handleOpenDeduction = () => {
    setIsDeductionModalOpen(true);
  };

  const handleSubmitReport = () => {
    setIsFinalUnlocked(true);
    // Smooth scroll down to the unlocked finale
    setTimeout(() => {
      finaleSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#090a0e] text-[#e3ded3] flex flex-col font-sans selection:bg-yellow-400 selection:text-stone-950">
      {/* 1. TOP: Case Brief & Police Crime Tape Header */}
      <CaseHeader
        onOpenDeduction={handleOpenDeduction}
        isUnlockedFinal={isFinalUnlocked}
      />

      {/* 2. MIDDLE: Evidence Cards Wall (證物 01 ～ 06) */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-stone-800">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-yellow-400 mb-1.5">
              <span>CRIME SCENE EVIDENCE // 刑事現場物證清單</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-100 font-dossier-heading">
              現場查扣矛盾物證清單（證物 01 ～ 06）
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-stone-400">
              正面僅呈現圖片、地點與證物名稱；點擊卡片 3D 翻轉至背面，分上下層檢視【說明】與【推測】；翻面後卡片邊緣會變色，翻回正面亦保留相同顏色。
            </p>
          </div>

          <div className="text-xs text-stone-400 font-dossier-mono">
            已翻閱審視：<span className="text-yellow-400 font-bold">{reviewedCards.size}</span> / {EVIDENCE_ITEMS.length} 件
          </div>
        </div>

        {/* 6 Evidence Cards Grid */}
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
        <div className="mt-16 text-center">
          <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-[#161822] to-[#101117] border-2 border-yellow-400/80 shadow-2xl max-w-3xl mx-auto flex flex-col items-center gap-4">
            <span className="text-xs uppercase tracking-widest text-yellow-400 font-dossier-mono font-bold">
              LOGICAL INFERENCE & DEDUCTION ARENA
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-100 font-dossier-heading">
              物證審閱完畢，進行全案邏輯論證
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
              點擊下方按鈕啟動推理論證彈窗。回答 3 道關鍵選擇題，若推論與物證相悖將被直接阻擋；推導正確即可送出報告解鎖自白書！
            </p>

            <button
              onClick={handleOpenDeduction}
              className="mt-2 py-4 px-10 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-stone-950 font-black text-base sm:text-lg transition-all shadow-xl shadow-yellow-500/25 flex items-center justify-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95"
            >
              <span className="text-xl">🕵️‍♂️</span>
              <span>開始推理論證</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. FOOTER: Unlocked Content (證物 07 自白書 + 罪結總整理 + 活動 CTA) */}
      <section
        ref={finaleSectionRef}
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t-2 border-yellow-500/40 bg-[#0c0d12] relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto">
          {isFinalUnlocked ? (
            <div className="space-y-12 animate-fade-in">
              {/* Unlocked banner */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500 text-emerald-300 text-xs font-bold tracking-wider mb-3">
                  <ShieldCheck className="w-4 h-4" />
                  <span>推理論證報告已送出採納 · 全案真相大白</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-100 font-dossier-heading">
                  【結案卷宗：真相反轉與解冤釋結】
                </h2>
              </div>

              {/* 1. 【證物 07：阿城留下的自白信】 */}
              <ConfessionLetter />

              {/* 2. 【阿城叔一生結下之罪結對照】 */}
              <SinsAnalysisSection />

              {/* 3. 【活動報名 CTA 卡片】 */}
              <EventCtaCard />
            </div>
          ) : (
            /* Locked Placeholder guiding user to complete deduction first */
            <div className="text-center py-16 max-w-lg mx-auto p-8 rounded-2xl border border-stone-800 bg-[#121319]">
              <div className="w-14 h-14 rounded-full bg-stone-900 border border-stone-700 flex items-center justify-center mx-auto text-stone-500 mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-200 font-dossier-heading">
                【證物 07 自白信與結案報告】已加密封存
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 mt-2 leading-relaxed">
                本案真相與阿城的終極自白受檢方封條保護。請先點擊上方的「🕵️‍♂️ 開始推理論證」通過審核，方能解鎖全文與活動資訊。
              </p>
              <div className="mt-6">
                <button
                  onClick={handleOpenDeduction}
                  className="py-2.5 px-6 rounded-lg bg-stone-800 hover:bg-stone-700 text-yellow-400 font-bold text-xs transition-colors cursor-pointer border border-stone-700 inline-flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>前往推理論證解鎖</span>
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

      {/* Police Bottom Seal Strip */}
      <footer className="w-full bg-police-tape py-2 px-4 shadow-inner text-center select-none">
        <span className="font-dossier-mono font-black text-stone-950 text-[11px] tracking-widest uppercase bg-yellow-400 px-3 py-0.5 shadow-sm">
          CR-2026-0930《消失的下顎線》· 檢方特偵組 內部機密結案卷宗
        </span>
      </footer>
    </div>
  );
}
