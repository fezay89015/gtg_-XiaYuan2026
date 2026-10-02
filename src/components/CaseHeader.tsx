import React from 'react';
import { CASE_SUMMARY } from '../data/caseData';
import { Flame, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

interface CaseHeaderProps {
  isUnlockedFinal: boolean;
}

export const CaseHeader: React.FC<CaseHeaderProps> = ({ isUnlockedFinal }) => {
  return (
    <header className="relative border-b-2 border-yellow-500/40 bg-[#070b14]/95">
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

      {/* Main Top Header Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Top Info Strip: Case Code & Classification (Buttons removed per user request) */}
        <div className="flex items-center justify-between pb-4 border-b border-blue-950/80 text-xs text-stone-400">
          <div className="flex items-center gap-2.5">
            <span className="stamp-police-confidential font-dossier-mono text-xs font-bold">
              {CASE_SUMMARY.caseCode}
            </span>
            <span className="text-yellow-400/90 font-medium">
              {CASE_SUMMARY.classification}
            </span>
          </div>

          <div className="text-[11px] font-dossier-mono text-blue-400/80 hidden sm:block">
            INVESTIGATION UNIT // NO. 0930
          </div>
        </div>

        {/* Case Title & Structured Content */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Title (Main + Subtitle) & Clean Line-broken Brief */}
          <div className="lg:col-span-8 space-y-5">
            <div>
              {/* 副標題 */}
              <span className="text-xs sm:text-sm font-semibold tracking-widest text-yellow-400 block mb-1">
                {CASE_SUMMARY.subTitle}
              </span>
              {/* 主標題 */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-100 font-dossier-heading tracking-tight leading-tight">
                {CASE_SUMMARY.mainTitle}
              </h1>
            </div>

            {/* 案件摘要：根據句點分行，舒適行距 */}
            <div className="p-5 rounded-xl bg-[#0a101d] border-l-4 border-yellow-400 border border-blue-900/40 text-stone-200 text-xs sm:text-sm leading-relaxed shadow-lg">
              <span className="text-yellow-400 font-bold block mb-3 text-xs tracking-wider">
                【案件摘要】
              </span>
              <div className="space-y-2.5">
                {CASE_SUMMARY.briefLines.map((line, idx) => (
                  <p key={idx} className="flex items-start gap-2.5">
                    <span className="text-yellow-400 font-bold shrink-0 mt-0.5">·</span>
                    <span className="text-stone-300 leading-relaxed">{line}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Case Info Cards with tech deep blue tint */}
          <div className="lg:col-span-4 bg-[#0a101e] p-5 sm:p-6 rounded-xl border border-blue-900/50 shadow-xl space-y-3.5 text-xs">
            <div className="flex items-center justify-between pb-2.5 border-b border-blue-900/40">
              <span className="text-blue-300/80 font-medium">刑案調查要項</span>
              <span className="font-dossier-mono text-yellow-400 font-bold">{CASE_SUMMARY.caseCode}</span>
            </div>

            <div className="flex items-start gap-2.5 text-stone-300">
              <Calendar className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-stone-500 block text-[11px]">案發時間</span>
                <span className="text-stone-200">{CASE_SUMMARY.incidentDate}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-stone-300">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-stone-500 block text-[11px]">勘驗現場</span>
                <span className="text-stone-200">{CASE_SUMMARY.incidentLocation}</span>
              </div>
            </div>

            {/* 關鍵矛盾 */}
            <div className="flex items-start gap-2.5 text-stone-300">
              <Flame className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-stone-500 block text-[11px]">現場矛盾</span>
                <span className="text-red-300 font-medium leading-relaxed">
                  {CASE_SUMMARY.mainSuspicion}
                </span>
              </div>
            </div>

            {/* 失蹤人員 */}
            <div className="flex items-start gap-2.5 text-stone-300">
              <div className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                ?
              </div>
              <div>
                <span className="text-stone-500 block text-[11px]">失蹤關係人</span>
                <span className="text-stone-200 font-medium leading-relaxed">
                  {CASE_SUMMARY.missingPerson}
                </span>
              </div>
            </div>

            {isUnlockedFinal && (
              <div className="mt-3 pt-3 border-t border-blue-900/50">
                <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>推理論證已成立 · 證物 07 已解鎖</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
