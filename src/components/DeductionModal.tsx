import React, { useState } from 'react';
import { DEDUCTION_QUIZ } from '../data/caseData';
import { playErrorSound, playSuccessSound, playStampSound } from '../utils/audio';
import { X, AlertTriangle, CheckCircle2, ShieldAlert, ArrowRight, Send, Check } from 'lucide-react';

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
                案號：CR-2026-0930《消失的下顎線》
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
            <span>推理論證階段：第 {currentQuestionIndex + 1} / {totalQuestions} 題</span>
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

              {/* Error Warning Box (User requirement: "推理方向與證物不符，請重新審視！") */}
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
            /* All completed state */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-yellow-400/20 text-yellow-400 border-2 border-yellow-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h4 className="text-xl sm:text-2xl font-bold text-stone-100 font-dossier-heading">
                三道關鍵推理論證全部成立！
              </h4>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-md mx-auto">
                您已成功穿透現場矛盾物證，破解防火漆塗布目的、偽裝雙下巴身分，以及阿城「假死銷毀身分」以保護家人的終極動機。
              </p>

              <div className="pt-4">
                <button
                  onClick={handleSubmitFinalReport}
                  className="py-3.5 px-8 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-stone-950 font-black text-sm sm:text-base transition-all flex items-center justify-center gap-2 mx-auto shadow-xl cursor-pointer hover:scale-105"
                >
                  <Send className="w-4 h-4" />
                  <span>送出推測報告 · 解鎖證物 07 自白書與真相</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        {!isAllCompleted && (
          <div className="px-6 py-4 bg-[#14151e] border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
            <span>
              {currentQuestionIndex > 0 ? (
                <button
                  onClick={() => {
                    setCurrentQuestionIndex((prev) => prev - 1);
                    setErrorMessage(null);
                  }}
                  className="hover:text-stone-200 transition-colors cursor-pointer"
                >
                  ← 返回上一題
                </button>
              ) : (
                '請選擇正確推理選項推進'
              )}
            </span>

            <span className="text-stone-500 font-dossier-mono">
              CONFIDENTIAL DEDUCTION
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
