import React, { useState, useRef, useEffect } from 'react';
import { DEDUCTION_QUIZ, DeductionQuestion } from '../data/caseData';
import { playErrorSound, playSuccessSound, playStampSound } from '../utils/audio';
import { CheckCircle2, AlertTriangle, ArrowRight, X, Sparkles, Scale } from 'lucide-react';

interface DeductionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReport: () => void;
  quiz?: DeductionQuestion[];
  caseCode?: string;
}

export const DeductionModal: React.FC<DeductionModalProps> = ({
  isOpen,
  onClose,
  onSubmitReport,
  quiz,
  caseCode = 'CR-0930'
}) => {
  const currentQuiz = quiz || DEDUCTION_QUIZ;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [shakingOptionId, setShakingOptionId] = useState<string | null>(null);
  const [isAllCompleted, setIsAllCompleted] = useState(false);
  const [isStamped, setIsStamped] = useState(false);
  const [isPaperShaking, setIsPaperShaking] = useState(false);
  const modalBodyRef = useRef<HTMLDivElement>(null);

  // When all questions are completed, immediately scroll modal body to top so stamp is front and center
  useEffect(() => {
    if (isAllCompleted && modalBodyRef.current) {
      modalBodyRef.current.scrollTop = 0;
    }
  }, [isAllCompleted]);

  if (!isOpen) return null;

  const currentQ = currentQuiz[currentQuestionIndex] || currentQuiz[0];
  const totalQuestions = currentQuiz.length;

  const handleSelectOption = (optionId: string, isCorrect: boolean) => {
    setErrorMessage(null);

    if (!isCorrect) {
      // Wrong option selected -> trigger shake, error sound, block advance
      setShakingOptionId(optionId);
      playErrorSound();
      setErrorMessage("【邏輯矛盾】此項推論與現場採樣及物證紀錄相悖，檢方無法採納！請重新審視證物便條。");

      setTimeout(() => {
        setShakingOptionId(null);
      }, 500);
      return;
    }

    // Correct option selected -> save answer & play success
    playSuccessSound();
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionId
    }));

    if (currentQuestionIndex < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
      }, 350);
    } else {
      // Completed all 3 questions!
      setIsAllCompleted(true);
      // Trigger official '真相大白' red stamp slam immediately in full view
      setTimeout(() => {
        setIsStamped(true);
        setIsPaperShaking(true);
        playStampSound();
        setTimeout(() => {
          setIsPaperShaking(false);
        }, 400);
      }, 250);
    }
  };

  const handleSubmitFinalReport = () => {
    playStampSound();
    onClose();
    onSubmitReport();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-2xl paper-memo-sheet rounded-2xl border-2 border-stone-800 shadow-2xl overflow-hidden relative my-auto animate-in zoom-in-95 duration-300 max-h-[94vh] flex flex-col ${
          isPaperShaking ? 'animate-paper-shake' : ''
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top 3D Pushpins */}
        <div className="absolute top-2 left-6 z-20 pointer-events-none">
          <span className="pushpin-3d-red scale-75" />
        </div>
        <div className="absolute top-2 right-14 z-20 pointer-events-none">
          <span className="pushpin-3d-red scale-75" />
        </div>

        {/* Modal Header */}
        <div className="px-5 py-4 bg-[#ede1ce] border-b-2 border-stone-400 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-red-800 text-white flex items-center justify-center font-bold shadow-md">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-xl font-black text-stone-950 font-dossier-heading tracking-wide">
                檢方推理論證庭 · 案件邏輯審核
              </h3>
              <span className="text-[11px] font-dossier-mono text-stone-700 font-bold">
                FORENSIC DEDUCTION DOCKET // {caseCode}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-stone-300/80 text-stone-700 transition-colors cursor-pointer"
            aria-label="關閉論證視窗"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body (Scrollable if needed, optimized for mobile) */}
        <div ref={modalBodyRef} className="p-4 sm:p-7 overflow-y-auto dossier-scrollbar">
          {!isAllCompleted ? (
            /* Question State */
            <div>
              {/* Progress Indicator */}
              <div className="flex items-center justify-between pb-2.5 border-b border-stone-300 text-xs font-dossier-mono">
                <span className="font-bold text-red-800">
                  審核關卡：QUESTION {currentQuestionIndex + 1} / {totalQuestions}
                </span>
                <span className="text-stone-600 font-medium font-sans text-[11px] hidden sm:inline">
                  以物證比對破綻 · 違背事實將被阻擋
                </span>
              </div>

              {/* Question Title */}
              <div className="mt-3.5">
                <span className="inline-block px-2.5 py-0.5 rounded bg-stone-900 text-amber-200 font-dossier-mono text-[11px] font-bold mb-1.5 shadow-sm">
                  {currentQ.questionNumber} · 案情關鍵審核
                </span>
                <h4 className="text-base sm:text-xl font-black text-stone-950 font-dossier-heading leading-snug">
                  {currentQ.question}
                </h4>
              </div>

              {/* Options */}
              <div className="mt-4 space-y-2.5 font-sans">
                {currentQ.options.map((option, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  const isSelected = selectedAnswers[currentQuestionIndex] === option.id;
                  const isShaking = shakingOptionId === option.id;

                  return (
                    <div
                      key={option.id}
                      onClick={() => handleSelectOption(option.id, option.isCorrect)}
                      className={`p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-start gap-2.5 shadow-sm select-none text-xs sm:text-sm ${
                        isShaking
                          ? 'animate-rejection border-red-600 bg-red-100/90 text-red-950 font-bold'
                          : isSelected
                          ? 'border-emerald-600 bg-emerald-50/90 text-stone-900'
                          : 'border-stone-400 bg-stone-50 hover:bg-amber-50 hover:border-amber-600 text-stone-900'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm font-dossier-mono ${
                          isSelected
                            ? 'bg-emerald-700 text-white'
                            : 'bg-stone-800 text-amber-100'
                        }`}
                      >
                        {letter}
                      </span>

                      <div className="flex-1 leading-relaxed text-stone-900 font-medium font-sans">
                        <span>{option.text}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Error Warning Box if contradiction */}
              {errorMessage && (
                <div className="mt-3.5 p-3 rounded-xl bg-red-50 border-2 border-red-500 text-red-950 text-xs sm:text-sm flex items-start gap-2 animate-in fade-in duration-200 font-sans shadow-md">
                  <AlertTriangle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-red-800 mb-0.5 text-xs">
                      檢方警示審核駁回：
                    </span>
                    <p className="font-medium text-xs leading-relaxed">{errorMessage}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* All completed state:
             * 🔴 RED OFFICIAL STAMP - PROMINENT CENTER STAGE AT TOP (100% visible immediately on mobile)
             */
            <div className="py-1 space-y-3.5 sm:space-y-4">
              {/* Top Title Banner */}
              <div className="text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-500 font-bold text-xs shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>推理論證全數成立 · 案件定讞結案</span>
                </div>
              </div>

              {/* 🔴 RED OFFICIAL STAMP HERO CARD (Full Focus Centered) */}
              <div className="p-4 sm:p-5 rounded-xl bg-white border-2 border-dashed border-red-600/80 shadow-md text-center flex flex-col items-center justify-center relative overflow-hidden">
                <span className="text-[10px] font-dossier-mono uppercase tracking-widest text-red-800 font-bold mb-1">
                  JUDICIAL CASE ENDORSEMENT // 檢察官偵查核定
                </span>

                {/* 🔴 RED OFFICIAL STAMP ('真相大白') Slam Animation */}
                <div className="my-2.5 flex items-center justify-center min-h-[72px] sm:min-h-[80px]">
                  {isStamped && (
                    <div className="stamp-prosecutor-approved animate-stamp-slam shadow-2xl scale-100 sm:scale-110">
                      <div className="text-[9px] sm:text-[10px] tracking-widest font-mono font-bold text-red-900 border-b border-red-700/60 pb-0.5 mb-0.5 uppercase">
                        VERDICT CONFIRMED
                      </div>
                      <div className="text-xl sm:text-2xl font-black tracking-widest text-red-700 font-serif px-2.5 sm:px-4 py-0.5 whitespace-nowrap">
                        【 真 相 大 白 】
                      </div>
                      <div className="text-[8px] sm:text-[9px] tracking-wider text-red-900 font-mono font-bold border-t border-red-700/60 pt-0.5 mt-0.5">
                        全 案 結 案 · 准 予 歸 檔
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-xs sm:text-sm font-black text-stone-950 font-dossier-heading leading-tight mt-0.5">
                  推理論證具備高度合理性，准予全案定讞結案。
                </p>
                <p className="text-[10px] sm:text-[11px] text-stone-600 font-sans mt-0.5">
                  勘驗紀錄已簽核封卷 · 耐火暗格防護已解除
                </p>
              </div>

              {/* 三大答案真相摘要卡 (緊湊排版，清楚易讀) */}
              <div className="p-3 sm:p-4 rounded-xl bg-amber-50/90 border border-stone-400 shadow-sm space-y-2 text-xs">
                <div className="flex items-center gap-1.5 pb-1 border-b border-amber-300 text-stone-950 font-bold text-xs tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-red-700" />
                  <span>【全案定讞：三大推論真相】</span>
                </div>

                <div className="space-y-1.5 text-stone-900 font-sans">
                  {currentQuiz.map((q) => {
                    const correctOpt = q.options.find((o) => o.isCorrect);
                    return (
                      <div key={q.id} className="flex items-start gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-stone-900 text-amber-200 font-bold text-[10px] shrink-0 mt-0.5 font-dossier-mono">
                          {q.questionNumber}
                        </span>
                        <p className="leading-snug font-medium text-[11px] sm:text-xs">
                          {correctOpt?.text || ''}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 解鎖按鈕 */}
              <div className="pt-1">
                <button
                  onClick={handleSubmitFinalReport}
                  className="w-full py-3 sm:py-3.5 px-6 rounded-xl bg-red-700 hover:bg-red-800 text-white font-black text-sm sm:text-base transition-all shadow-xl shadow-red-900/30 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-98 font-sans"
                >
                  <span>🔓 送出推論報告 · 查閱自白信</span>
                  <ArrowRight className="w-4 h-4 animate-pulse" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
