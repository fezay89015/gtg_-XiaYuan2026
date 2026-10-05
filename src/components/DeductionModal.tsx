import React, { useState } from 'react';
import { DEDUCTION_QUIZ } from '../data/caseData';
import { playErrorSound, playSuccessSound, playStampSound } from '../utils/audio';
import { CheckCircle2, AlertTriangle, ArrowRight, X, Sparkles, Scale } from 'lucide-react';

interface DeductionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReport: () => void;
}

export const DeductionModal: React.FC<DeductionModalProps> = ({
  isOpen,
  onClose,
  onSubmitReport
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [shakingOptionId, setShakingOptionId] = useState<string | null>(null);
  const [isAllCompleted, setIsAllCompleted] = useState(false);
  const [isStamped, setIsStamped] = useState(false);
  const [isPaperShaking, setIsPaperShaking] = useState(false);

  if (!isOpen) return null;

  const currentQ = DEDUCTION_QUIZ[currentQuestionIndex];
  const totalQuestions = DEDUCTION_QUIZ.length;

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
      // Trigger official '真相大白' red stamp slam into dedicated blank area
      setTimeout(() => {
        setIsStamped(true);
        setIsPaperShaking(true);
        playStampSound();
        setTimeout(() => {
          setIsPaperShaking(false);
        }, 400);
      }, 350);
    }
  };

  const handleSubmitFinalReport = () => {
    playStampSound();
    onClose();
    onSubmitReport();

    // Smooth scroll down to confession section
    setTimeout(() => {
      const el = document.getElementById('confession-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 250);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-2xl paper-memo-sheet rounded-2xl border-2 border-stone-800 shadow-2xl overflow-hidden relative my-auto animate-in zoom-in-95 duration-300 ${
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
        <div className="px-6 py-5 bg-[#ede1ce] border-b-2 border-stone-400 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-red-800 text-white flex items-center justify-center font-bold shadow-md">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-stone-950 font-dossier-heading tracking-wide">
                檢方推理論證庭 · 案件邏輯審核
              </h3>
              <span className="text-xs font-dossier-mono text-stone-700 font-bold">
                FORENSIC DEDUCTION DOCKET // CR-0930
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

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {!isAllCompleted ? (
            /* Question State */
            <div>
              {/* Progress Indicator */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-300 text-xs font-dossier-mono">
                <span className="font-bold text-red-800">
                  審核關卡：QUESTION {currentQuestionIndex + 1} / {totalQuestions}
                </span>
                <span className="text-stone-600 font-medium font-sans">
                  以物證比對破綻 · 違背事實將被阻擋
                </span>
              </div>

              {/* Question Title */}
              <div className="mt-4">
                <span className="inline-block px-2.5 py-1 rounded bg-stone-900 text-amber-200 font-dossier-mono text-xs font-bold mb-2 shadow-sm">
                  {currentQ.questionNumber} · 案情關鍵審核
                </span>
                <h4 className="text-lg sm:text-xl font-black text-stone-950 font-dossier-heading leading-snug">
                  {currentQ.question}
                </h4>
              </div>

              {/* Options */}
              <div className="mt-5 space-y-3 font-sans">
                {currentQ.options.map((option, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  const isSelected = selectedAnswers[currentQuestionIndex] === option.id;
                  const isShaking = shakingOptionId === option.id;

                  return (
                    <div
                      key={option.id}
                      onClick={() => handleSelectOption(option.id, option.isCorrect)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-start gap-3 shadow-sm select-none text-xs sm:text-sm ${
                        isShaking
                          ? 'animate-rejection border-red-600 bg-red-100/90 text-red-950 font-bold'
                          : isSelected
                          ? 'border-emerald-600 bg-emerald-50/90 text-stone-900'
                          : 'border-stone-400 bg-stone-50 hover:bg-amber-50 hover:border-amber-600 text-stone-900'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-md font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm font-dossier-mono ${
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
                <div className="mt-4 p-3.5 rounded-xl bg-red-50 border-2 border-red-500 text-red-950 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in duration-200 font-sans shadow-md">
                  <AlertTriangle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-red-800 mb-0.5">
                      檢方警示審核駁回：
                    </span>
                    <p className="font-medium">{errorMessage}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* All completed state: 統整三大關鍵真相 with Dedicated Blank Area for Stamp */
            <div className="py-2 space-y-5">
              <div className="text-center space-y-1.5">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 border-2 border-emerald-600 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <h4 className="text-xl sm:text-2xl font-black text-stone-950 font-dossier-heading tracking-wide">
                  推理論證全數成立 · 真相綜整揭曉
                </h4>
                <p className="text-xs sm:text-sm text-stone-700 max-w-lg mx-auto font-sans font-medium">
                  根據現場 6 項矛盾物證與線索，您已破除層層假象，成功重建案情全貌：
                </p>
              </div>

              {/* 1. 三大答案真相摘要卡 (100% 乾淨清晰，印章絕不蓋在文字上) */}
              <div className="p-4 sm:p-5 rounded-xl bg-amber-50/90 border-2 border-stone-400 shadow-md space-y-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2 pb-2 border-b border-amber-300 text-stone-950 font-bold text-xs tracking-wider">
                  <Sparkles className="w-4 h-4 text-red-700" />
                  <span>【全案定讞：三大推論真相】</span>
                </div>

                <div className="space-y-2.5 text-stone-900 font-sans">
                  <div className="flex items-start gap-2.5">
                    <span className="px-2 py-0.5 rounded bg-stone-900 text-amber-200 font-bold text-xs shrink-0 mt-0.5 font-dossier-mono">
                      Q1 火場
                    </span>
                    <p className="leading-relaxed font-medium">
                      <strong>阿城預先粉刷了軍用級防火漆</strong>，所以烈火被精準圍堵，只燒毀阿城個人房間。
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="px-2 py-0.5 rounded bg-stone-900 text-amber-200 font-bold text-xs shrink-0 mt-0.5 font-dossier-mono">
                      Q2 身分
                    </span>
                    <p className="leading-relaxed font-medium">
                      <strong>阿城過去身材精壯且精通武術</strong>，十幾年來令人印象深刻的臃腫雙下巴，全是用防水眉筆畫出的假象。
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="px-2 py-0.5 rounded bg-stone-900 text-amber-200 font-bold text-xs shrink-0 mt-0.5 font-dossier-mono">
                      Q3 動機
                    </span>
                    <p className="leading-relaxed font-medium">
                      <strong>黑道仇家找上門</strong>，阿城運用早年縱火專業「假死銷毀身分」，將索命殺機徹底引開以保護恩人全家。
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. 專屬空白蓋印區塊 (Dedicated Blank Endorsement Zone - 零文字遮蔽) */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-white/95 border-2 border-dashed border-stone-400 flex flex-col sm:flex-row items-center justify-between gap-3 relative min-h-[85px] shadow-sm">
                <div className="text-left space-y-0.5 flex-1">
                  <span className="text-[10px] font-dossier-mono uppercase tracking-widest text-red-800 font-bold block">
                    JUDICIAL CASE ENDORSEMENT // 檢察官偵查覆核
                  </span>
                  <p className="text-xs sm:text-sm font-black text-stone-950 font-dossier-heading">
                    【結案核定】推理論證具備高度合理性，准予全案定讞結案。
                  </p>
                  <p className="text-[11px] text-stone-600 font-sans">
                    勘驗紀錄已簽核封卷 · 耐火暗格防護已解除
                  </p>
                </div>

                {/* 🔴 RED OFFICIAL STAMP ('真相大白') - Stamped cleanly in dedicated blank space */}
                <div className="shrink-0 flex items-center justify-center min-w-[170px] h-[72px] relative">
                  {isStamped && (
                    <div className="stamp-prosecutor-approved animate-stamp-slam shadow-2xl">
                      <div className="text-[9px] tracking-widest font-mono font-bold text-red-900 border-b border-red-700/60 pb-0.5 mb-0.5 uppercase">
                        VERDICT CONFIRMED
                      </div>
                      <div className="text-xl sm:text-2xl font-black tracking-widest text-red-700 font-serif px-2 py-0.5 whitespace-nowrap">
                        【 真 相 大 白 】
                      </div>
                      <div className="text-[8px] tracking-wider text-red-900 font-mono font-bold border-t border-red-700/60 pt-0.5 mt-0.5">
                        全 案 結 案 · 准 予 歸 檔
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-1">
                <button
                  onClick={handleSubmitFinalReport}
                  className="w-full py-3.5 px-6 rounded-xl bg-red-700 hover:bg-red-800 text-white font-black text-sm sm:text-base transition-all shadow-xl shadow-red-900/30 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-98 font-sans"
                >
                  <span>🔓 送出推論報告 · 解鎖線索 07 自白信</span>
                  <ArrowRight className="w-5 h-5 animate-pulse" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
