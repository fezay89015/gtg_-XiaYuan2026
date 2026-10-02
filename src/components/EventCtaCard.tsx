import React, { useState } from 'react';
import { PROMO_EVENT_INFO } from '../data/caseData';
import { ExternalLink, Copy, Check, Sparkles, Edit3 } from 'lucide-react';

export const EventCtaCard: React.FC = () => {
  const [url, setUrl] = useState(PROMO_EVENT_INFO.defaultUrl);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempUrl, setTempUrl] = useState(url);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = () => {
    if (tempUrl.trim()) {
      setUrl(tempUrl.trim());
      setIsEditing(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 rounded-2xl border-2 border-yellow-400 bg-gradient-to-b from-[#181a24] to-[#111219] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Top Banner */}
      <div className="text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{PROMO_EVENT_INFO.badge}</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-100 font-dossier-heading">
          {PROMO_EVENT_INFO.title}
        </h3>

        <p className="mt-3 text-sm sm:text-base text-stone-300 leading-relaxed">
          {PROMO_EVENT_INFO.description}
        </p>
      </div>

      {/* Action Zone */}
      <div className="mt-8 pt-6 border-t border-stone-800 space-y-4">
        {/* URL configuration & copy */}
        <div className="p-3.5 rounded-xl bg-black/60 border border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex-1 w-full sm:w-auto">
            <span className="text-stone-500 text-[11px] block mb-1">
              活動專屬報名網址：
            </span>
            {isEditing ? (
              <div className="flex items-center gap-2 mt-1 w-full">
                <input
                  type="url"
                  value={tempUrl}
                  onChange={(e) => setTempUrl(e.target.value)}
                  placeholder="請輸入自訂報名網址"
                  className="flex-1 px-3 py-1.5 rounded bg-stone-900 border border-yellow-400 text-stone-100 text-xs focus:outline-none"
                />
                <button
                  onClick={handleSave}
                  className="px-3 py-1.5 rounded bg-yellow-400 text-stone-950 font-bold text-xs hover:bg-yellow-300 cursor-pointer"
                >
                  儲存
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-2 py-1.5 rounded bg-stone-800 text-stone-400 text-xs cursor-pointer"
                >
                  取消
                </button>
              </div>
            ) : (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-dossier-mono text-yellow-400 hover:text-yellow-300 underline underline-offset-2 break-all text-xs"
              >
                {url}
              </a>
            )}
          </div>

          {!isEditing && (
            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-[11px] flex items-center gap-1 cursor-pointer"
                title="修改為真實報名網址"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>更換網址</span>
              </button>

              <button
                onClick={handleCopy}
                className="py-1.5 px-3 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-[11px] flex items-center gap-1 cursor-pointer font-medium"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">已複製</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>複製連結</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Primary CTA Button */}
        <div className="pt-2 text-center">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 py-4 px-10 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-stone-950 font-black text-base sm:text-lg transition-all shadow-xl shadow-yellow-500/20 cursor-pointer hover:scale-105 active:scale-95"
          >
            <span>{PROMO_EVENT_INFO.buttonText}</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};
