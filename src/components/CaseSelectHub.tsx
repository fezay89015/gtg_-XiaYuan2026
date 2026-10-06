import React, { useState } from 'react';
import { ALL_CASES, CaseDossier } from '../data/casesRegistry';
import { FolderLock, Copy, Check, ExternalLink, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface CaseSelectHubProps {
  onSelectCase: (slug: string) => void;
}

export const CaseSelectHub: React.FC<CaseSelectHubProps> = ({ onSelectCase }) => {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const OFFICIAL_SHARED_DOMAIN = 'https://xiayuan2026.netlify.app';

  const getDirectUrl = (slug: string) => {
    return `${OFFICIAL_SHARED_DOMAIN}/?case=${slug}`;
  };

  const handleCopy = (slug: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = getDirectUrl(slug);
    navigator.clipboard.writeText(url).then(() => {
      setCopiedSlug(slug);
      setTimeout(() => {
        setCopiedSlug(null);
      }, 2500);
    });
  };

  return (
    <div className="min-h-screen bg-[#120e0a] text-stone-200 py-10 px-4 sm:px-6 lg:px-8 relative font-sans">
      {/* Background Vintage Desk Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1c1611]/80 via-[#120e0a]/95 to-[#0a0806] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-10">
        {/* Header: Classified Cold Case Archives */}
        <div className="text-center space-y-3 pb-8 border-b-2 border-stone-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-700/60 text-red-300 font-dossier-mono text-xs font-bold tracking-widest uppercase shadow-md">
            <FolderLock className="w-3.5 h-3.5 text-red-500" />
            <span>CONFIDENTIAL ARCHIVES // 機密懸案卷宗庫</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-amber-100 font-dossier-heading tracking-tight">
            重大刑案特查科 · 雙案卷宗導航
          </h1>

          <p className="text-xs sm:text-sm text-stone-400 max-w-2xl mx-auto leading-relaxed font-sans">
            此頁面為<strong>站長專屬管理選案庫</strong>。兩大懸案各自具備專屬的偵查線索、推理問答與結案自白。
            <br />
            點擊下方任一案卷即可進入偵查板；提供給觀眾時，請使用專屬<strong>「直連網址」</strong>，觀眾將直接載入該案，<strong>完全不會看到此選擇頁面</strong>。
          </p>
        </div>

        {/* 2 Cold Case Dossier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {ALL_CASES.map((caseItem: CaseDossier) => {
            const isCase1 = caseItem.id === 'case-01';
            const directUrl = getDirectUrl(caseItem.slug);

            return (
              <div
                key={caseItem.id}
                className="kraft-dossier-board rounded-2xl p-6 sm:p-8 border-2 border-[#b89f81] shadow-2xl relative flex flex-col justify-between overflow-hidden group hover:border-amber-500 transition-all duration-300"
              >
                {/* 3D Pushpin at top center */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                  <span className="pushpin-3d-red shadow-md" />
                </div>

                {/* Upper Dossier Info */}
                <div className="space-y-4">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2 border-b border-stone-300/80 pb-3">
                    <span className="px-2.5 py-1 rounded bg-stone-900 text-amber-200 font-dossier-mono font-bold text-xs shadow-sm">
                      {caseItem.caseCode}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded text-xs font-bold font-sans shadow-sm ${
                      isCase1 ? 'bg-red-800 text-white' : 'bg-emerald-800 text-amber-100'
                    }`}>
                      {caseItem.badgeText}
                    </span>
                  </div>

                  {/* Photo & Titles */}
                  <div className="flex gap-4 items-start">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden border-2 border-stone-400 bg-stone-900 shrink-0 shadow-md">
                      <img
                        src={caseItem.targetPhoto}
                        alt={caseItem.mainTitle}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-xl sm:text-2xl font-black text-stone-950 font-dossier-heading leading-snug">
                        {caseItem.mainTitle}
                      </h2>
                      <p className="text-xs font-bold text-red-900 font-dossier-mono">
                        // {caseItem.subTitle}
                      </p>
                      <p className="text-[11px] text-stone-700 font-sans line-clamp-2 pt-1 leading-relaxed">
                        {caseItem.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Description Box */}
                  <div className="p-3 rounded-xl bg-amber-50/90 border border-amber-300/80 text-xs text-stone-800 leading-relaxed font-sans font-medium">
                    {caseItem.shortDescription}
                  </div>
                </div>

                {/* Lower Action & Audience Direct Link Area */}
                <div className="mt-6 pt-4 border-t border-stone-300 space-y-3">
                  {/* Big Enter Button */}
                  <button
                    onClick={() => onSelectCase(caseItem.slug)}
                    className={`w-full py-3.5 px-5 rounded-xl font-black text-sm sm:text-base transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-98 font-sans ${
                      isCase1
                        ? 'bg-red-800 hover:bg-red-900 text-white shadow-red-950/30'
                        : 'bg-emerald-800 hover:bg-emerald-900 text-amber-100 shadow-emerald-950/30'
                    }`}
                  >
                    <span>📂 開啟【{caseItem.subTitle}】偵查板</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Audience Direct Link Box */}
                  <div className="p-2.5 rounded-lg bg-stone-900/90 border border-stone-700 text-stone-300 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-dossier-mono">
                      <span className="text-amber-300 font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-yellow-400" />
                        <span>觀眾專用直連網址（點擊直接進入）</span>
                      </span>
                      <span className="text-stone-500 hidden sm:inline">不經由選擇頁</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        readOnly
                        value={directUrl}
                        className="flex-1 bg-stone-950 border border-stone-700 rounded px-2 py-1 text-[11px] font-mono text-stone-300 select-all focus:outline-none"
                      />
                      <button
                        onClick={(e) => handleCopy(caseItem.slug, e)}
                        className={`px-3 py-1 rounded text-xs font-bold transition-all flex items-center gap-1 shrink-0 cursor-pointer ${
                          copiedSlug === caseItem.slug
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-600 hover:bg-amber-500 text-stone-950'
                        }`}
                      >
                        {copiedSlug === caseItem.slug ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>已複製</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>複製連結</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="text-center pt-6 text-stone-500 text-xs font-sans space-y-2">
          <div className="flex justify-center mb-3">
            <img
              src="https://github.com/user-attachments/assets/ec3ed119-9cbb-4cde-b551-5c8ac9e56032"
              alt="台中廣天宮 財神開基祖廟 Logo"
              referrerPolicy="no-referrer"
              className="h-12 w-auto object-contain opacity-80"
            />
          </div>
          <p>© 台中廣天宮 財神開基祖廟 · 機密懸案互動解謎系統</p>
        </div>
      </div>
    </div>
  );
};
