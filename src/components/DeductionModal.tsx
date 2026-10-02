import React, { useState } from 'react';
import { DEDUCTION_QUIZ } from '../data/caseData';
import { playErrorSound, playSuccessSound, playStampSound } from '../utils/audio';
import { X, AlertTriangle, CheckCircle2, ShieldAlert, Send, Check, Sparkles } from 'lucide-react';

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

  if (!isOpen) return null;

  const currentQ = DEDUCTION_QUIZ[currentQuestionIndex];
  const totalQuestions = DEDUCTION_QUIZ.length;

  const handleSelectOption = (optionId: string, isCorrect: boolean) => {
    if (!isCorrect) {
      // ❌ WRONG OPTION: Block and display alert
      playErrorSound();
      setShakingOptionId(optionId);
      setErrorMessage("⚠️ 推理方向與證物不符，請重新審視！");

      setTimeout(() => {
        setShakingOptionId(null);
      }, 500);
      return;
    }

    // ✅ CORRECT OPTION: Advance to next question automatically
    playSuccessSound();
    setErrorMessage(null);
    setShakingOptionId(null);

    const nextAnswers = {
      ...selectedAnswers,
      [currentQuestionIndex]: optionId
    };
    setSelectedAnswers(nextAnswers);

    // If not the last question, auto advance to next
    if (currentQuestionIndex < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
      }, 350);
    } else {
      // Completed all 3 questions!
      setIsAllCompleted(true);
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
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 250);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#13141b] border-2 border-yellow-500 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Police Tape Strip */}
        <div className="h-2 w-full bg-police-tape" />

        {/* Header Bar */}
        <div className="px-6 py-4 bg-[#181a24] border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-yellow-400" />
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-100 font-dossier-heading">
                檢方推理論證庭 · 邏輯審核
              </h3>
              <p className="text-xs text-stone-400 font-dossier-mono">
                案號：CR-2026-0930《深夜透天火場離奇蒸發案》
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Stepper Bar */}
        <div className="px-6 pt-4 pb-2 bg-[#151620] border-b border-stone-800/80">
          <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
            <span>推理論證階段：第 {Math.min(currentQuestionIndex + 1, totalQuestions)} / {totalQuestions} 題</span>
            <span className="font-dossier-mono text-yellow-400 font-semibold">
              {Math.round(((Object.keys(selectedAnswers).length) / totalQuestions) * 100)}% 完成度
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {DEDUCTION_QUIZ.map((q, idx) => {
              const isDone = selectedAnswers[idx] !== undefined;
              const isCurrent = currentQuestionIndex === idx;

              return (
                <div
                  key={q.id}
                  className={`h-2 rounded-full transition-all ${
                    isDone
                      ? 'bg-yellow-400'
                      : isCurrent
                      ? 'bg-yellow-500/50 animate-pulse'
                      : 'bg-stone-800'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Question Area */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!isAllCompleted ? (
            <div>
              {/* Question Header */}
              <div className="flex items-start gap-3">
                <span className="px-2.5 py-1 bg-yellow-400 text-stone-950 font-dossier-mono font-black text-xs rounded shrink-0 mt-0.5">
                  {currentQ.questionNumber}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-stone-100 font-dossier-heading leading-snug">
                  {currentQ.question}
                </h4>
              </div>

              {/* Options */}
              <div className="mt-5 space-y-3">
                {currentQ.options.map((option, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  const isSelected = selectedAnswers[currentQuestionIndex] === option.id;
                  const isShaking = shakingOptionId === option.id;

                  return (
                    <div
                      key={option.id}
                      onClick={() => handleSelectOption(option.id, option.isCorrect)}
                      className={`p-4 rounded-xl border-2 text-xs sm:text-sm transition-all cursor-pointer select-none flex items-start gap-3.5 relative ${
                        isShaking
                          ? 'animate-rejection border-red-500 bg-red-950/60 text-red-100'
                          : isSelected
                          ? 'border-yellow-400 bg-yellow-400/10 text-yellow-100 shadow-md ring-1 ring-yellow-400/40'
                          : 'border-stone-800 bg-[#171822] hover:bg-[#1c1e2b] hover:border-yellow-500/50 text-stone-200'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-dossier-mono font-bold text-xs shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-yellow-400 text-stone-950'
                            : isShaking
                            ? 'bg-red-500 text-white'
                            : 'bg-stone-800 text-stone-300 border border-stone-700'
                        }`}
                      >
                        {isSelected ? <Check className="w-3.5 h-3.5" /> : letter}
                      </span>

                      <div className="flex-1 leading-relaxed">
                        <span>{option.text}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Error Warning Box */}
              {errorMessage && (
                <div className="mt-4 p-4 rounded-xl bg-red-950/60 border border-red-500 text-red-200 text-xs sm:text-sm flex items-start gap-3 animate-rejection shadow-lg">
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-red-300 block mb-0.5">
                      檢方警示審核駁回：
                    </span>
                    <p className="font-medium">{errorMessage}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* All completed state: 統整三大關鍵真相 */
            <div className="py-2 space-y-5">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-yellow-400/20 text-yellow-400 border-2 border-yellow-400 flex items-center justify-center mx-auto shadow-lg shadow-yellow-500/20 animate-bounce">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <h4 className="text-xl sm:text-2xl font-black text-stone-100 font-dossier-heading tracking-wide">
                  推理論證全數成立 · 真相綜整揭曉
                </h4>
                <p className="text-xs sm:text-sm text-stone-400 max-w-lg mx-auto">
                  根據現場 6 項矛盾物證與線索，您已精確破除假象，重建案情全貌：
                </p>
              </div>

              {/* 三大答案真相摘要卡 */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#0d121e] border border-yellow-500/50 shadow-inner space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-center gap-2 pb-2 border-b border-blue-950/80 text-yellow-400 font-bold text-xs tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>【全案定讞：三大推論真相】</span>
                </div>

                <div className="space-y-3 text-stone-200">
                  <div className="flex items-start gap-2.5">
                    <span className="px-2 py-0.5 rounded bg-yellow-400 text-stone-950 font-bold text-xs shrink-0 mt-0.5">
                      Q1 火場
                    </span>
                    <p className="leading-relaxed">
                      <strong>阿城預先粉刷了軍用級防火漆</strong>，所以烈火被精準圍堵，只燒毀阿城個人房間。
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="px-2 py-0.5 rounded bg-yellow-400 text-stone-950 font-bold text-xs shrink-0 mt-0.5">
                      Q2 身分
                    </span>
                    <p className="leading-relaxed">
                      <strong>阿城過去身材精壯且精通武術</strong>，十幾年來令人印象深刻的臃腫雙下巴，全是用防水眉筆畫出的假象。
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="px-2 py-0.5 rounded bg-yellow-400 text-stone-950 font-bold text-xs shrink-0 mt-0.5">
                      Q3 動機
                    </span>
                    <p className="leading-relaxed">
                      <strong>黑道仇家找上門</strong>，阿城運用早年縱火專業「假死銷毀身分」，將索命殺機徹底引開以保護恩人全家。
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSubmitFinalReport}
                  className="w-full py-3.5 px-6 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-stone-950 font-black text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Send className="w-4 h-4" />
                  <span>送出推論報告 · 解鎖線索 07 自白信 ➔</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        {!isAllCompleted && (
          <div className="px-6 py-3.5 bg-[#14151e] border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
            <div>
              {currentQuestionIndex > 0 && (
                <button
                  onClick={() => {
                    setCurrentQuestionIndex((prev) => prev - 1);
                    setErrorMessage(null);
                  }}
                  className="hover:text-stone-200 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  ← 返回上一題
                </button>
              )}
            </div>

            <div />
          </div>
        )}
      </div>
    </div>
  );
};
