import React, { useState, useEffect } from 'react';
import { EVIDENCE_07_CONFESSION } from '../data/caseData';
import { playUnlockVaultSound } from '../utils/audio';
import { Mail, HeartHandshake, Unlock, Lock } from 'lucide-react';

interface ConfessionLetterProps {
  isJustUnlocked?: boolean;
  confession?: typeof EVIDENCE_07_CONFESSION;
  caseId?: string;
}

export const ConfessionLetter: React.FC<ConfessionLetterProps> = ({
  isJustUnlocked = true,
  confession = EVIDENCE_07_CONFESSION,
  caseId = 'case-01'
}) => {
  const [animStage, setAnimStage] = useState<'verifying' | 'unlocking' | 'revealed'>('verifying');
  const isCase1 = caseId === 'case-01';

  const startUnlockSequence = () => {
    setAnimStage('verifying');

    const t1 = setTimeout(() => {
      setAnimStage('unlocking');
      playUnlockVaultSound();
    }, 1800);

    const t2 = setTimeout(() => {
      setAnimStage('revealed');
    }, 3600);

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
      className="w-full max-w-4xl mx-auto rounded-2xl kraft-dossier-board border-2 border-[#b89f81] shadow-2xl overflow-hidden p-6 sm:p-10 relative scroll-mt-6 transition-all duration-700"
    >
      {/* ================= STAGE 1 & 2: VAULT UNSEALING OVERLAY ================= */}
      {animStage !== 'revealed' && (
        <div className="absolute inset-0 z-40 bg-[#16120c]/95 backdrop-blur-md flex flex-col items-center justify-start pt-4 sm:pt-8 px-4 text-center animate-in fade-in duration-300">
          <div className="max-w-md w-full p-6 sm:p-8 rounded-2xl border-2 border-amber-600/80 bg-[#251d14] shadow-2xl relative overflow-hidden mt-3 sm:mt-6">
            {/* Caution border stripe */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-police-tape" />

            {/* Lock status icon */}
            <div className="my-4 relative">
              {animStage === 'verifying' ? (
                <div className="w-20 h-20 rounded-full bg-red-950 border-2 border-red-500 flex items-center justify-center mx-auto text-red-400 shadow-xl animate-pulse">
                  <Lock className="w-10 h-10" />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center mx-auto text-amber-300 shadow-2xl animate-vault-unlock scale-110 transition-transform">
                  <Unlock className="w-10 h-10 animate-bounce" />
                </div>
              )}
            </div>

            {/* Status text */}
            <h4 className="text-xl font-bold text-amber-100 font-headline-retro tracking-wide">
              {animStage === 'verifying'
                ? 'VERIFYING DEDUCTION LOGIC...'
                : 'SECURITY VAULT UNLOCKED'}
            </h4>
            <p className="text-xs text-stone-400 mt-2 font-mono">
              {animStage === 'verifying'
                ? '檢方推理論證核准 · 正在解除保險耐火暗格封印...'
                : '耐火暗格已開啟 · 載入核心自白封函...'}
            </p>

            {/* Progress bar */}
            <div className="w-full bg-stone-950 h-2 rounded-full overflow-hidden mt-6 border border-stone-700">
              <div
                className={`h-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-1000 ${
                  animStage === 'verifying' ? 'w-2/5 animate-pulse' : 'w-full'
                }`}
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= STAGE 3: UNLOCKED LETTER ================= */}
      {/* Red sealed stamp */}
      <div className="absolute top-8 right-8 pointer-events-none hidden sm:block">
        <div className="stamp-classified-circle text-[11px]">
          TOP SECRET
          <br />
          CONFESSION
        </div>
      </div>

      {/* Header */}
      <div className="pb-6 border-b-2 border-stone-400/60">
        <div className="flex items-center gap-2 text-red-800 font-bold text-xs uppercase tracking-widest mb-1.5 font-dossier-mono">
          <Mail className="w-4 h-4" />
          <span>{confession.code} // 特偵封存之真相</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-stone-950 font-dossier-heading">
          {confession.title}
        </h3>
        <p className="text-xs text-stone-700 mt-1 font-dossier-mono font-medium">
          {confession.subTitle}
        </p>
      </div>

      {/* Letter Container styled as vintage letter paper */}
      <div className="mt-8 p-6 sm:p-10 rounded-xl paper-memo-sheet border border-stone-300 text-stone-950 text-sm sm:text-base leading-relaxed whitespace-pre-line font-serif shadow-xl relative">
        {/* Masking tape pinning letter */}
        <div className="absolute -top-3.5 left-10 w-24 h-6 masking-tape rotate-[-2deg] pointer-events-none" />
        <div className="absolute -top-3.5 right-10 w-24 h-6 masking-tape rotate-[3deg] pointer-events-none" />

        <div className="pt-2 text-stone-900 font-serif leading-loose text-sm sm:text-base selection:bg-amber-300 selection:text-stone-950">
          {confession.letterContent}
        </div>
      </div>

      {/* Post-letter Reflection note - Prominent & Structured Bullet Points */}
      <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-amber-50/95 border-2 border-[#b59e80] shadow-lg relative">
        {/* Pushpin in corner */}
        <div className="absolute -top-3 left-8 pointer-events-none">
          <span className="pushpin-3d-red scale-90" />
        </div>

        <div className="flex items-center gap-3 pb-3 border-b-2 border-amber-300/80 mb-4">
          <HeartHandshake className="w-6 h-6 text-red-800 shrink-0" />
          <h4 className="text-lg sm:text-xl font-black text-stone-950 font-dossier-heading tracking-wide">
            【檢方結案勘驗心證 · 終極判讀】
          </h4>
        </div>

        {isCase1 ? (
          <div className="space-y-3.5 font-sans text-stone-900 text-sm sm:text-base leading-relaxed">
            <div className="flex items-start gap-2.5">
              <span className="font-black text-red-800 text-base shrink-0 mt-0.5">一、</span>
              <p>
                <strong>外貌身分純屬偽飾</strong>：十餘年來令街坊深信不疑的臃腫發福與遲緩雙下巴，全是以防水眉筆精密化妝而成的假象，藉以躲避仇家長期追殺。
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="font-black text-red-800 text-base shrink-0 mt-0.5">二、</span>
              <p>
                <strong>火場精算保全恩人</strong>：運用年輕時黑道縱火的專業技術，在臥室隔間牆內預先厚塗防火漆，精確將火勢侷限於個人臥室，確保隔壁恩人家眷萬無一失。
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="font-black text-red-800 text-base shrink-0 mt-0.5">三、</span>
              <p>
                <strong>假死焚室引開殺戮</strong>：得知黑幫仇家摸排到巷口後，阿城斷然焚室製造蒸發假象，將黑道索命目標徹底誘離社區，非為逃避，實為保全恩人家門安全。
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="font-black text-red-800 text-base shrink-0 mt-0.5">四、</span>
              <p>
                <strong>人間未死恩義長存</strong>：阿城身手敏捷、早已翻窗遠走避禍；過往欺瞞雖多，但十餘年守護照顧威仔與恩人的深厚親情，赤誠無偽。
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3.5 font-sans text-stone-900 text-sm sm:text-base leading-relaxed">
            <div className="flex items-start gap-2.5">
              <span className="font-black text-amber-800 text-base shrink-0 mt-0.5">一、</span>
              <p>
                <strong>單側自毀製造襲擊假象</strong>：詩涵以左手親拉重型琴蓋砸傷右手韌帶，短時間無法演奏，左手全無外傷，意圖營造後台黑手襲擊之現場偽證。
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="font-black text-amber-800 text-base shrink-0 mt-0.5">二、</span>
              <p>
                <strong>拆線刀精巧破壞禮服</strong>：以化妝包內拆線刀等距挑斷接縫內線，製造禮服遭人為惡意撕裂之混亂現場，掩蓋自導自演痕跡。
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="font-black text-amber-800 text-base shrink-0 mt-0.5">三、</span>
              <p>
                <strong>設計圈套嫁禍同門師妹</strong>：誘導不知情師妹送來致病過敏原花束，甚至預備急救針自導自演過敏性休克，陷害純善同儕以求自身脫罪。
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="font-black text-amber-800 text-base shrink-0 mt-0.5">四、</span>
              <p>
                <strong>以命相搏索求父母關愛</strong>：多年來唯有在身負重傷、垂死痛苦時，才能換得嚴苛父母短暫的停駐與溫柔；極端悲劇的背後，實為對家庭關愛的病態渴求。
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
