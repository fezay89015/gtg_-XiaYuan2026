import React from 'react';
import { CASE_SUMMARY } from '../data/caseData';
import { ShieldAlert, Volume2, VolumeX, Flame, MapPin, Calendar, Compass } from 'lucide-react';
import { isSoundEnabled, setSoundEnabled } from '../utils/audio';

interface CaseHeaderProps {
  onOpenDeduction: () => void;
  isUnlockedFinal: boolean;
}

export const CaseHeader: React.FC<CaseHeaderProps> = ({ onOpenDeduction, isUnlockedFinal }) => {
  const [sound, setSound] = React.useState(isSoundEnabled());

  const toggleSound = () => {
    const next = !sound;
    setSound(next);
    setSoundEnabled(next);
  };

  return (
    <header className="relative border-b-2 border-yellow-500/40 bg-[#0c0d12]">
      {/* Repeating Police Crime Line Tape Banner */}
      <div className="w-full bg-police-tape py-2 px-4 shadow-md flex items-center justify-around overflow-hidden select-none">
        <span className="font-dossier-mono font-black text-stone-950 text-xs tracking-widest uppercase bg-yellow-400 px-2 py-0.5 shadow-sm">
          CRIME SCENE DO NOT CROSS // 檢警刑偵封鎖線
        </span>
        <span className="hidden sm:inline font-dossier-mono font-black text-stone-950 text-xs tracking-widest uppercase bg-yellow-400 px-2 py-0.5 shadow-sm">
          POLICE LINE DO NOT CROSS // 刑案現場嚴禁進入
        </span>
        <span className="hidden md:inline font-dossier-mono font-black text-stone-950 text-xs tracking-widest uppercase bg-yellow-400 px-2 py-0.5 shadow-sm">
          CONFIDENTIAL DOSSIER // 極機密偵查
        </span>
      </div>

      {/* Main Top Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Classification & Case Code row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-800 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span className="stamp-police-confidential font-dossier-mono text-xs font-bold">
              {CASE_SUMMARY.caseCode}
            </span>
            <span className="text-yellow-400 font-semibold">{CASE_SUMMARY.classification}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleSound}
              className="p-1.5 rounded-lg border border-stone-800 bg-stone-900 text-stone-400 hover:text-yellow-400 hover:border-yellow-500/50 transition-colors flex items-center gap-1.5 text-xs cursor-pointer"
              title={sound ? "關閉音效" : "開啟音效"}
            >
              {sound ? <Volume2 className="w-4 h-4 text-yellow-400" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{sound ? '音效已開啟' : '靜音中'}</span>
            </button>

            <button
              onClick={onOpenDeduction}
              className="py-1.5 px-3.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-stone-950 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>推理論證</span>
            </button>
          </div>
        </div>

        {/* Case Title & Brief */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-yellow-400">
              <ShieldAlert className="w-4 h-4" />
              <span>特別偵查組 · 火災與憑空蒸發偵訊專案報告</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-100 font-dossier-heading tracking-tight leading-tight">
              {CASE_SUMMARY.title}
            </h1>

            {/* Exactly the user's required brief text */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#14161f] border-l-4 border-yellow-400 border border-stone-800 text-stone-200 text-sm sm:text-base leading-relaxed shadow-lg">
              <strong className="text-yellow-400 block mb-1 text-xs">【案件簡介筆錄摘要】</strong>
              <p>{CASE_SUMMARY.briefText}</p>
            </div>
          </div>

          {/* Quick Case Metadata Card */}
          <div className="lg:col-span-4 bg-[#14151c] p-5 rounded-xl border border-stone-800 shadow-md space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-stone-800">
              <span className="text-stone-400">刑案調查要項</span>
              <span className="font-dossier-mono text-yellow-400 font-bold">{CASE_SUMMARY.caseCode}</span>
            </div>

            <div className="flex items-start gap-2.5 text-stone-300">
              <Calendar className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-stone-500 block text-[11px]">案發時間</span>
                <span>{CASE_SUMMARY.incidentDate}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-stone-300">
              <MapPin className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-stone-500 block text-[11px]">命案現場</span>
                <span>{CASE_SUMMARY.incidentLocation}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-stone-300">
              <Flame className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-stone-500 block text-[11px]">主要疑點</span>
                <span className="text-red-300">房間全毀無骨骸殘留 · 阿城憑空蒸發</span>
              </div>
            </div>

            {isUnlockedFinal && (
              <div className="mt-3 pt-3 border-t border-stone-800">
                <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold text-xs">
                  ✓ 推理論證已成立 · 證物 07 已解鎖
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
