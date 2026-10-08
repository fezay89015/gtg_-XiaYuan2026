import React from 'react';
import {
  FolderArchive,
  Instagram,
  Globe,
  ExternalLink,
  Lock,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export interface CaseArchiveItem {
  id: string;
  slug: string;
  caseNumber: string; // 'CASE 001' | 'CASE 002'
  title: string;
  subtitle: string;
  brief: string;
  isOpen: boolean;
  igPostUrl: string;
}

// 案件狀態與 IG 貼文網址設定（後續隨時可直接替換真實貼文網址）
export const DOSSIER_CASES: CaseArchiveItem[] = [
  {
    id: 'case-01',
    slug: 'acheng',
    caseNumber: 'CASE 001',
    title: '深夜透天火場離奇蒸發案',
    subtitle: '消失的阿城叔',
    brief: '深夜透天惡火僅單一臥室炭化，百公斤肥漢憑空蒸發。現場留有高規格防火漆與修容筆，背後暗藏金蟬脫殼保護恩人之謎……',
    isOpen: true,
    igPostUrl: 'https://www.instagram.com/gtg52168/' // 待提供案件 001 真實 IG 貼文網址
  },
  {
    id: 'case-02',
    slug: 'wings',
    caseNumber: 'CASE 002',
    title: '獨奏會前夕後台重傷案',
    subtitle: '折翅的蝴蝶',
    brief: '國際獨奏會前夕，後台休息室突發急性過敏休克、右手重創骨折與禮服遭破壞。現場扣押六大極度矛盾物證，案情正深入調查中……',
    isOpen: false, // 待正式發布後再開啟
    igPostUrl: 'https://www.instagram.com/gtg52168/' // 待提供案件 002 真實 IG 貼文網址
  }
];

interface ArchiveDossierHubProps {
  onSelectCase?: (slug: string) => void;
}

export const ArchiveDossierHub: React.FC<ArchiveDossierHubProps> = ({ onSelectCase }) => {
  const handleEnterReport = (slug: string) => {
    if (onSelectCase) {
      onSelectCase(slug);
    } else {
      window.location.search = `?case=${slug}`;
    }
  };

  return (
    <div className="min-h-screen bg-[#120e0a] text-stone-200 py-10 px-4 sm:px-6 lg:px-8 relative font-sans flex flex-col justify-between selection:bg-amber-800 selection:text-amber-100">
      {/* Background Vintage Desk Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1c1611]/80 via-[#120e0a]/95 to-[#0a0806] pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto relative z-10 space-y-8 sm:space-y-10 my-auto py-4">
        {/* ================= 1. HEADER: 案卷庫標題設計 ================= */}
        <div className="text-center space-y-3 pb-6 border-b-2 border-stone-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 border border-amber-600/50 text-amber-300 font-dossier-mono text-xs font-bold tracking-widest uppercase shadow-md">
            <FolderArchive className="w-3.5 h-3.5 text-amber-400" />
            <span>OFFICIAL DOSSIER ARCHIVE // 刑偵案件卷宗庫</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-amber-100 font-dossier-heading tracking-tight">
            重大刑案特查科 · 機密案卷庫
          </h1>

          <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto leading-relaxed font-sans">
            本案卷庫收錄重大刑案調查檔案與鑑識卷宗。
            <br />
            點選懸案進入偵查報告書，掌握矛盾破綻進行推理論證！
          </p>
        </div>

        {/* ================= 2. TWO DOSSIER CARDS: CASE 001 & CASE 002 ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {DOSSIER_CASES.map((dossier) => {
            return (
              <div
                key={dossier.id}
                className={`rounded-2xl p-6 sm:p-7 border-2 shadow-2xl relative flex flex-col justify-between overflow-visible transition-all duration-300 ${
                  dossier.isOpen
                    ? 'kraft-dossier-board border-[#b89f81] shadow-stone-950/40'
                    : 'bg-[#18130e]/85 border-stone-800/80 opacity-55 grayscale cursor-not-allowed select-none'
                }`}
              >
                {/* 3D Pushpin at top center */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                  <span className={`pushpin-3d-red shadow-md ${!dossier.isOpen ? 'opacity-40' : ''}`} />
                </div>

                {/* Upper Dossier Content */}
                <div className="space-y-4">
                  {/* Top Bar: CASE 001 / CASE 002 & Status Tag */}
                  <div className="flex items-center justify-between gap-2 border-b border-stone-400/40 pb-3">
                    <span className="px-2.5 py-0.5 rounded bg-stone-900 text-amber-200 font-dossier-mono font-black text-xs shadow-sm tracking-wider">
                      {dossier.caseNumber}
                    </span>

                    {dossier.isOpen ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-900/90 text-emerald-200 border border-emerald-600/60 text-xs font-bold font-sans shadow-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>已開放偵查</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-stone-900 text-stone-500 border border-stone-700 text-xs font-bold font-sans">
                        <Lock className="w-3.5 h-3.5 text-stone-500" />
                        <span>尚未開放</span>
                      </span>
                    )}
                  </div>

                  {/* Unified Dossier Icon & Case Title */}
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                        dossier.isOpen
                          ? 'bg-amber-900/40 text-amber-300 border border-amber-600/50'
                          : 'bg-stone-900 text-stone-600 border border-stone-800'
                      }`}
                    >
                      <FolderArchive className="w-6 h-6" />
                    </div>

                    <div className="space-y-1">
                      <h2
                        className={`text-lg sm:text-xl font-black font-dossier-heading leading-snug ${
                          dossier.isOpen ? 'text-stone-950' : 'text-stone-400'
                        }`}
                      >
                        {dossier.title}
                      </h2>
                      <p
                        className={`text-xs font-bold font-dossier-mono ${
                          dossier.isOpen ? 'text-red-900' : 'text-stone-500'
                        }`}
                      >
                        // {dossier.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Brief Description */}
                  <p
                    className={`text-xs leading-relaxed font-sans line-clamp-3 pt-1 ${
                      dossier.isOpen ? 'text-stone-800 font-medium' : 'text-stone-500'
                    }`}
                  >
                    {dossier.brief}
                  </p>
                </div>

                {/* Bottom Action Area: 分開設計「進入偵查報告書」與「IG 貼文」 */}
                <div className="mt-6 pt-4 border-t border-stone-400/30 space-y-2.5">
                  {dossier.isOpen ? (
                    <>
                      {/* 主按鈕：進入懸案偵查報告書 */}
                      <button
                        onClick={() => handleEnterReport(dossier.slug)}
                        className="w-full py-3 px-4 rounded-xl bg-red-800 hover:bg-red-700 active:scale-98 text-white font-black text-sm transition-all shadow-lg shadow-red-950/30 flex items-center justify-center gap-2 cursor-pointer font-sans"
                      >
                        <span>📂 進入懸案偵查報告書</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      {/* 獨立按鈕：查看本案 IG 貼文 */}
                      <a
                        href={dossier.igPostUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 px-3 rounded-lg bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-pink-300 text-xs font-medium border border-stone-700/80 hover:border-pink-500/50 flex items-center justify-center gap-1.5 transition-colors group cursor-pointer"
                      >
                        <Instagram className="w-3.5 h-3.5 text-pink-400 group-hover:scale-110 transition-transform" />
                        <span>查看本案 IG 貼文</span>
                        <ExternalLink className="w-3 h-3 text-stone-500" />
                      </a>
                    </>
                  ) : (
                    <>
                      {/* 未開放按鈕 */}
                      <div className="w-full py-3 px-4 rounded-xl bg-stone-900/80 text-stone-500 font-bold text-xs sm:text-sm text-center border border-stone-850 select-none flex items-center justify-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" />
                        <span>偵查報告書尚未開放</span>
                      </div>

                      {/* 未開放 IG 貼文按鈕 */}
                      <div className="w-full py-2 px-3 rounded-lg bg-stone-950/40 text-stone-600 text-xs text-center border border-stone-900 select-none">
                        <span>本案 IG 貼文尚未釋出</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= 3. 下元節法會報名（高層級專屬區塊） ================= */}
        <div className="rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-[#2a170d] via-[#3a1d10] to-[#24130a] border-2 border-amber-500/70 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 text-2xl shrink-0 shadow-inner">
              🔥
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-red-900 text-amber-200 text-[10px] font-bold font-dossier-mono tracking-wider">
                  歲末科儀
                </span>
                <span className="text-xs text-amber-300 font-bold">
                  台中廣天宮 · 財神開基祖廟
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-amber-100 font-serif tracking-wide">
                【金龍如意消災轉運賜財大法會】
              </h3>
              <p className="text-xs text-stone-300 font-sans leading-relaxed">
                解冤釋結 · 消除宿世愆尤 · 轉運賜財
              </p>
            </div>
          </div>

          <a
            href="https://www.gtg.org.tw/signup-detail/xiayuan-1?fb=20261123"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto py-3 px-6 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-stone-950 font-black text-xs sm:text-sm transition-all shadow-xl shadow-amber-950/40 flex items-center justify-center gap-2 cursor-pointer shrink-0 hover:scale-105 active:scale-95 font-sans"
          >
            <span>前往法會線上報名</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* ================= 4. COMPANION LINKS: IG & 官網（陪襯、精簡文字） ================= */}
        <div className="flex items-center justify-center gap-4 pt-1 text-xs font-sans">
          <span className="text-stone-500 text-[11px]">更多資訊：</span>
          <a
            href="https://www.instagram.com/gtg52168/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-pink-300 border border-stone-800 hover:border-pink-500/40 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Instagram className="w-3.5 h-3.5 text-pink-400" />
            <span>Instagram</span>
            <ExternalLink className="w-3 h-3 text-stone-600" />
          </a>

          <a
            href="https://www.gtg.org.tw/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-amber-300 border border-stone-800 hover:border-amber-500/40 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>官方網站</span>
            <ExternalLink className="w-3 h-3 text-stone-600" />
          </a>
        </div>
      </div>

      {/* ================= 5. FOOTER: TEMPLE LOGO & COPYRIGHT ================= */}
      <footer className="w-full text-center space-y-3 pt-8 pb-4 text-xs text-stone-200 font-sans border-t border-amber-900/40 relative z-10">
        <div className="max-w-2xl mx-auto space-y-2">
          {/* Temple Logo */}
          <div className="flex justify-center mb-3">
            <img
              src="https://github.com/user-attachments/assets/ec3ed119-9cbb-4cde-b551-5c8ac9e56032"
              alt="台中廣天宮 財神開基祖廟 Logo"
              referrerPolicy="no-referrer"
              className="h-14 sm:h-16 w-auto object-contain opacity-95 drop-shadow-md"
            />
          </div>

          <div className="font-dossier-mono text-amber-300 font-bold space-x-2 text-xs sm:text-sm">
            <span>Tel. 04-2243 4146 | 0800-221-988</span>
            <span className="hidden sm:inline text-amber-500/70">|</span>
            <span className="block sm:inline">Fax. 04-2247 6921</span>
          </div>

          <div className="text-amber-100/90 font-medium">
            <span>參拜時間 08:00-21:00</span>
            <span className="mx-2 text-amber-500/70">·</span>
            <span>台中市北屯區遼陽五街131號</span>
          </div>

          <div className="pt-2 text-[11px] text-stone-300 font-dossier-mono">
            © 台中廣天宮 財神開基祖廟 ALL RIGHTS RESERVED
          </div>
        </div>
      </footer>
    </div>
  );
};
