import { useState, useRef, useEffect } from 'react';
import { ALL_CASES, CASE_01_ACHENG, getCaseBySlugOrAlias, CaseDossier } from './data/casesRegistry';
import { CaseHeader } from './components/CaseHeader';
import { EvidenceCard } from './components/EvidenceCard';
import { DeductionModal } from './components/DeductionModal';
import { ConfessionLetter } from './components/ConfessionLetter';
import { SinsAnalysisSection } from './components/SinsAnalysisSection';
import { EventCtaCard } from './components/EventCtaCard';
import { CaseSelectHub } from './components/CaseSelectHub';
import { Lock, Sparkles, ShieldCheck, ArrowRight, FolderArchive } from 'lucide-react';

export function App() {
  // Read initial case from URL query params (e.g. ?case=acheng or ?case=case2)
  const [activeCaseSlug, setActiveCaseSlug] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(window.location.search);
    const c = params.get('case');
    if (!c || c === 'select' || c === 'hub' || c === 'all') return null;
    return c;
  });

  const [reviewedCards, setReviewedCards] = useState<Set<string>>(new Set());
  const [isDeductionModalOpen, setIsDeductionModalOpen] = useState(false);
  const [isFinalUnlocked, setIsFinalUnlocked] = useState(false);
  const [isDeductionFlashing, setIsDeductionFlashing] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const finaleSectionRef = useRef<HTMLDivElement>(null);
  const deductionArenaRef = useRef<HTMLDivElement>(null);

  // Synchronize browser history / URL when user uses back/forward buttons
  useEffect(() => {
    const onPopState = () => {
      const params = new URLSearchParams(window.location.search);
      const c = params.get('case');
      if (!c || c === 'select' || c === 'hub' || c === 'all') {
        setActiveCaseSlug(null);
      } else {
        setActiveCaseSlug(c);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Reset case state when switching cases
  useEffect(() => {
    setReviewedCards(new Set());
    setIsFinalUnlocked(false);
    setIsDeductionModalOpen(false);
  }, [activeCaseSlug]);

  // Subtle parallax scroll tracker for the blurred background desk photo
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectCase = (slug: string) => {
    setActiveCaseSlug(slug);
    const newUrl = `${window.location.pathname}?case=${slug}`;
    window.history.pushState({ case: slug }, '', newUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHub = () => {
    setActiveCaseSlug(null);
    const newUrl = window.location.pathname;
    window.history.pushState({}, '', newUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If no case is selected in URL, display the Case Selection Hub!
  if (!activeCaseSlug) {
    return <CaseSelectHub onSelectCase={handleSelectCase} />;
  }

  // Load active dossier based on URL slug
  const currentCase: CaseDossier = getCaseBySlugOrAlias(activeCaseSlug) || CASE_01_ACHENG;
  const isCase1 = currentCase.id === 'case-01';

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
    deductionArenaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setIsDeductionFlashing(true);
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
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#120e0a] text-stone-900 relative selection:bg-amber-800 selection:text-amber-100 overflow-x-hidden font-sans">
      {/* ================= ATMOSPHERIC PARALLAX VINTAGE DETECTIVE DESK BACKGROUND ================= */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.4] contrast-[1.25] saturate-[0.85] scale-105 will-change-transform"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=2000&q=80')`,
            transform: `translate3d(0, ${scrollY * 0.08}px, 0)`
          }}
        />
        {/* Ambient Dark Vignette Scrim */}
        <div className={`absolute inset-0 bg-gradient-to-b ${currentCase.themeStyle.vignetteGradient}`} />
      </div>

      {/* 1. TOP: Vintage Scrapboard Header (Title + Polaroid + Pinned Notices) */}
      <CaseHeader
        isUnlockedFinal={isFinalUnlocked}
        caseDossier={currentCase}
        onBackToHub={handleBackToHub}
      />

      {/* Elegant Detective Case Seam Divider (Natural on Mobile & Desktop) */}
      <div className="w-full max-w-4xl mx-auto my-6 sm:my-8 px-4 flex items-center justify-center gap-3 select-none">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#b89f81]/60 to-[#b89f81]" />
        <div className="px-3.5 py-1 rounded-full bg-[#fbf7ee] border border-[#b89f81] shadow-sm flex items-center gap-2 text-stone-800 text-xs font-bold font-sans">
          <span className={`w-2 h-2 rounded-full animate-pulse ${isCase1 ? 'bg-red-700' : 'bg-emerald-700'}`} />
          <span className="tracking-wide">現場跡證勘驗板</span>
        </div>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#b89f81]/60 to-[#b89f81]" />
      </div>

      {/* 2. MIDDLE: Evidence Cards Wall (證物 01 ～ 06) */}
      <section className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
        {/* Section Header on Kraft Board */}
        <div className={`kraft-dossier-board rounded-2xl p-6 sm:p-8 border shadow-xl relative overflow-hidden ${currentCase.themeStyle.boardBorder}`}>
          {/* Top 3D Red Pushpins */}
          <div className="absolute -top-3 left-10 pointer-events-none">
            <span className="pushpin-3d-red shadow-md" />
          </div>
          <div className="absolute -top-3 right-10 pointer-events-none">
            <span className="pushpin-3d-red shadow-md" />
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className={`text-xs font-dossier-mono uppercase tracking-widest font-bold ${isCase1 ? 'text-red-800' : 'text-emerald-800'}`}>
                FORENSIC BOARD // 現場證物清單
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-950 font-dossier-heading">
                現場物證與偵查線索（編號 01 ～ 06）
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-stone-800 font-sans font-medium leading-relaxed">
                調查板已釘選 6 件關鍵物證與線索。每張相片皆附有<strong>承辦偵查便條</strong>，點擊即可翻閱【鑑識事實】與【偵查心證】。掌握矛盾關鍵，即可點擊下方啟動「推理論證」解鎖自白書！
              </p>
            </div>

            <div className="text-xs text-stone-900 font-dossier-mono bg-white/90 px-4 py-2.5 rounded-xl border border-stone-400 shrink-0 shadow-sm font-bold">
              勘驗進度：<span className={`font-black text-sm ${isCase1 ? 'text-red-700' : 'text-emerald-700'}`}>{reviewedCards.size}</span> / {currentCase.evidence.length} 件
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
                EVIDENCE BOARD // {currentCase.caseCode}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium pl-5 sm:pl-6">
              每張拍立得卡片皆可點擊翻轉檢視白紙黑字的鑑識報告，比對矛盾破綻！
            </p>
          </div>
        </div>

        {/* 6 Evidence Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {currentCase.evidence.map((item) => (
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

            <span className={`text-xs uppercase tracking-widest font-dossier-mono font-bold ${isCase1 ? 'text-red-800' : 'text-emerald-800'}`}>
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
              className={`mt-2 py-4 px-10 rounded-xl text-white font-black text-base sm:text-lg transition-all shadow-xl flex items-center justify-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95 font-sans ${
                isCase1
                  ? 'bg-red-700 hover:bg-red-800 shadow-red-900/30'
                  : 'bg-emerald-800 hover:bg-emerald-900 shadow-emerald-900/30'
              }`}
            >
              <span className="text-xl">🕵️‍♂️</span>
              <span>開始推理論證</span>
              <ArrowRight className="w-5 h-5 animate-pulse" />
            </button>

            {/* Quick Helper Badge */}
            <div className="text-[11px] text-stone-700 flex items-center gap-1.5 font-dossier-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-red-700" />
              <span>全數答對 3 題即可解開耐火暗格，查閱自白信</span>
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Detective Case Seam Divider (Natural on Mobile & Desktop) */}
      <div className="w-full max-w-4xl mx-auto my-6 sm:my-8 px-4 flex items-center justify-center gap-3 select-none">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#b89f81]/60 to-[#b89f81]" />
        <div className="px-3.5 py-1 rounded-full bg-[#fbf7ee] border border-[#b89f81] shadow-sm flex items-center gap-2 text-stone-800 text-xs font-bold font-sans">
          <span className={`w-2 h-2 rounded-full animate-pulse ${isCase1 ? 'bg-amber-600' : 'bg-emerald-600'}`} />
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
            <div className="space-y-12 animate-in fade-in zoom-in-95 duration-700">
              {/* Unlocked Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/90 border-2 border-emerald-500/80 text-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl">🔓</span>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-white font-headline-retro tracking-wide">
                      VERDICT CONFIRMED // 推理論證成立 · 檔案解密
                    </h4>
                    <p className="text-xs text-emerald-200/90 font-sans">
                      耐火保險暗格已正式開啟，載入核心自白函件與三十六解冤因果罪結。
                    </p>
                  </div>
                </div>
                <span className="text-xs font-dossier-mono bg-emerald-800/80 px-3 py-1 rounded-full border border-emerald-400 font-bold shrink-0">
                  CR-0930 CONFIDENTIAL UNLOCKED
                </span>
              </div>

              {/* 1. Confession Letter */}
              <ConfessionLetter
                isJustUnlocked={isFinalUnlocked}
                confession={currentCase.confession}
                caseId={currentCase.id}
              />

              {/* 2. Sins Analysis Section */}
              <SinsAnalysisSection
                sinsList={currentCase.sins}
                caseTitle={currentCase.subTitle}
              />

              {/* 3. Temple Event CTA Promo Card */}
              <div id="promo-section" className="scroll-mt-10">
                <EventCtaCard />
              </div>
            </div>
          ) : (
            /* Locked State Card */
            <div className="p-8 sm:p-14 rounded-2xl bg-[#1c1611]/90 border-2 border-[#806950] text-center space-y-4 max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-police-tape" />

              <div className="w-16 h-16 rounded-full bg-red-950/80 border-2 border-red-600/80 text-red-400 flex items-center justify-center mx-auto shadow-xl">
                <Lock className="w-8 h-8" />
              </div>

              <span className="inline-block px-3 py-1 rounded bg-stone-900 text-stone-400 font-dossier-mono text-xs uppercase tracking-widest font-bold">
                STAGE 03 CLASSIFIED ARCHIVE
              </span>

              <h3 className="text-xl sm:text-2xl font-bold text-amber-100 font-dossier-heading">
                【機密封存：核心自白書尚未開啟】
              </h3>

              <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto leading-relaxed font-sans">
                耐火暗格設有檢方加密防護。請先檢閱上方 6 項矛盾物證，並通過「推理論證庭」之邏輯審核，即可解除封印！
              </p>

              <div className="pt-2">
                <button
                  onClick={handleJumpToDeductionArena}
                  className="py-3 px-8 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-black text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2 mx-auto cursor-pointer font-sans hover:scale-105 active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>前往審閱物證並啟動推理論證</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Deduction Modal */}
      <DeductionModal
        isOpen={isDeductionModalOpen}
        onClose={() => setIsDeductionModalOpen(false)}
        onSubmitReport={handleSubmitReport}
        quiz={currentCase.quiz}
        caseCode={currentCase.caseCode}
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

          {/* Discreet Creator Switch to Archive Hub Button */}
          <div className="pt-2">
            <button
              onClick={handleBackToHub}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/90 border border-stone-700/80 text-stone-400 hover:text-amber-300 text-[11px] font-dossier-mono transition-colors cursor-pointer"
            >
              <FolderArchive className="w-3.5 h-3.5 text-amber-400" />
              <span>切換其他懸案（機密案卷庫）</span>
            </button>
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
