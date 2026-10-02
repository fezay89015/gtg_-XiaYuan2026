import React, { useState, useEffect } from 'react';
import { EVIDENCE_07_CONFESSION } from '../data/caseData';
import { playUnlockVaultSound } from '../utils/audio';
import { Mail, HeartHandshake, Unlock, Sparkles, Lock, ShieldCheck, RotateCw } from 'lucide-react';

interface ConfessionLetterProps {
  isJustUnlocked?: boolean;
}

export const ConfessionLetter: React.FC<ConfessionLetterProps> = ({
  isJustUnlocked = true
}) => {
  // Animation stages: 'verifying' -> 'unlocking' -> 'revealed'
  const [animStage, setAnimStage] = useState<'verifying' | 'unlocking' | 'revealed'>('verifying');

  const startUnlockSequence = () => {
    setAnimStage('verifying');

    // After 1.2s of verifying, trigger mechanical crack
    const t1 = setTimeout(() => {
      setAnimStage('unlocking');
      playUnlockVaultSound();
    }, 1200);

    // After 2.4s, completely reveal the letter
    const t2 = setTimeout(() => {
      setAnimStage('revealed');
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  };

  useEffect(() => {
    const cleanup = startUnlockSequence();
    return cleanup;
  }, [isJustUnlocked]);

  return (
    <div
      id="confession-section"
      className="w-full max-w-4xl mx-auto rounded-2xl border-2 border-yellow-400 bg-[#141622] shadow-2xl shadow-yellow-500/15 overflow-hidden p-6 sm:p-10 relative scroll-mt-10 transition-all duration-700"
    >
      {/* ================= STAGE 1 & 2: VAULT UNSEALING OVERLAY ================= */}
      {animStage !== 'revealed' && (
        <div className="absolute inset-0 z-30 bg-[#0b0e17]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
          <div className="max-w-md w-full p-8 rounded-2xl border-2 border-yellow-400/80 bg-[#121524] shadow-2xl relative overflow-hidden">
            {/* Caution border stripe */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-police-tape" />

            {/* Lock status icon */}
            <div className="my-4 relative">
              {animStage === 'verifying' ? (
                <div className="w-20 h-20 rounded-full bg-red-950/80 border-2 border-red-500 flex items-center justify-center mx-auto text-red-400 shadow-xl shadow-red-500/20 animate-pulse">
                  <Lock className="w-10 h-10" />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-yellow-400/20 border-2 border-yellow-400 flex items-center justify-center mx-auto text-yellow-400 shadow-2xl shadow-yellow-500/40 animate-vault-unlock scale-110 transition-transform">
                  <Unlock className="w-10 h-10 animate-bounce" />
                </div>
              )}
            </div>

            {/* Stage title */}
            <h3 className="text-xl sm:text-2xl font-black text-stone-100 font-dossier-heading tracking-wide">
              {animStage === 'verifying'
                ? '【耐火暗格 · 身分權限驗證中】'
                : '【🔓 權限核准 · 機密封印解除中】'}
            </h3>

            {/* Stage description */}
            <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed font-dossier-mono">
              {animStage === 'verifying'
                ? '全案 3 題推理論證報告比對無誤，正在解開耐火保險暗格之重裝機械鎖……'
                : '鋼鎖機構開啟！防護封條斷裂，正在提取【線索 07 自白書原件】……'}
            </p>

            {/* Progress bar */}
            <div className="mt-6 w-full bg-stone-900 h-2 rounded-full overflow-hidden border border-stone-700">
              <div
                className={`h-full bg-gradient-to-r from-yellow-500 to-amber-300 transition-all duration-1000 ${
                  animStage === 'verifying' ? 'w-2/5 animate-pulse' : 'w-full'
                }`}
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= STAGE 3: UNLOCKED LETTER ================= */}
      {/* Top Golden Unlock Banner */}
      <div className="mb-6 p-3.5 rounded-xl bg-gradient-to-r from-yellow-500/20 via-amber-400/10 to-yellow-500/20 border border-yellow-400/60 flex items-center justify-between gap-3 text-xs sm:text-sm text-yellow-300 shadow-md">
        <div className="flex items-center gap-2 font-bold">
          <ShieldCheck className="w-4 h-4 text-yellow-400 shrink-0" />
          <span>推理論證完備 · 檢方核准解開耐火暗格封印</span>
        </div>

        <button
          onClick={startUnlockSequence}
          className="text-[11px] font-dossier-mono text-yellow-400/90 hover:text-white flex items-center gap-1 hover:underline cursor-pointer bg-black/40 px-2.5 py-1 rounded border border-yellow-400/30"
          title="重新播放解鎖動畫"
        >
          <RotateCw className="w-3 h-3" />
          <span>重播解鎖</span>
        </button>
      </div>

      {/* Red sealed stamp */}
      <div className="absolute top-6 right-6 stamp-sealed text-xs hidden sm:block">
        解鎖絕密 · 親筆自白
      </div>

      {/* Header */}
      <div className="pb-6 border-b border-stone-800">
        <div className="flex items-center gap-2 text-yellow-400 font-bold text-xs uppercase tracking-widest mb-1.5">
          <Mail className="w-4 h-4" />
          <span>{EVIDENCE_07_CONFESSION.code} // 特偵封存之真相</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-100 font-dossier-heading">
          {EVIDENCE_07_CONFESSION.title}
        </h3>
        <p className="text-xs text-stone-400 mt-1 font-dossier-mono">
          {EVIDENCE_07_CONFESSION.subTitle}
        </p>
      </div>

      {/* Letter Container styled as vintage confidential paper */}
      <div className="mt-8 p-6 sm:p-8 rounded-xl bg-[#1e202a] border border-stone-700/80 text-stone-200 text-sm sm:text-base leading-relaxed whitespace-pre-line font-serif shadow-inner">
        {EVIDENCE_07_CONFESSION.letterContent}
      </div>

      {/* Post-letter Reflection note */}
      <div className="mt-6 p-4 rounded-xl bg-yellow-950/20 border border-yellow-500/30 flex items-start gap-3 text-xs sm:text-sm text-yellow-200/90 leading-relaxed">
        <HeartHandshake className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-yellow-300 block mb-1">【檢方結案勘驗心證】</strong>
          <p>
            阿城以自身的縱火專業，在暗夜火海中精準救下了收留他十餘年的恩人家眷；並用「假死」將黑幫的索命焦點引離此地。十幾年描摹的雙下巴與發福身形雖為虛妄，但對威仔與家人的守護之情，赤誠無偽。
          </p>
        </div>
      </div>
    </div>
  );
};
