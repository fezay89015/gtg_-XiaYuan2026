import React, { useState } from 'react';
import { PROMO_EVENT_INFO } from '../data/caseData';
import { ExternalLink, Copy, Check, Sparkles, Flame } from 'lucide-react';

export const EventCtaCard: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const targetUrl = PROMO_EVENT_INFO.defaultUrl;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(targetUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      id="promo-section"
      className="w-full max-w-4xl mx-auto mt-14 rounded-2xl border-2 border-yellow-400 bg-gradient-to-b from-[#1b1c28] via-[#12131d] to-[#0d0e16] p-6 sm:p-10 shadow-2xl relative overflow-hidden"
    >
      {/* Auspicious background glow */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Temple Badge */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-400/15 border border-yellow-400/40 text-yellow-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          <span>{PROMO_EVENT_INFO.badge}</span>
        </div>

        {/* Main Dharma Assembly Title */}
        <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-100 font-dossier-heading tracking-wide">
          {PROMO_EVENT_INFO.title}
        </h3>

        {/* Subtitle */}
        <p className="text-sm font-bold text-yellow-400/90 mt-1 font-serif">
          {PROMO_EVENT_INFO.subTitle}
        </p>

        {/* Description */}
        <p className="mt-4 text-xs sm:text-sm text-stone-300 leading-relaxed font-serif">
          {PROMO_EVENT_INFO.description}
        </p>
      </div>

      {/* Action Zone */}
      <div className="mt-8 pt-6 border-t border-stone-800 space-y-5">
        {/* Link Box & Copy */}
        <div className="p-3.5 rounded-xl bg-black/60 border border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex-1 w-full sm:w-auto">
            <span className="text-stone-400 text-[11px] block mb-1 font-medium">
              法會官方專屬報名網址：
            </span>
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-dossier-mono text-yellow-400 hover:text-yellow-300 underline underline-offset-2 break-all text-xs flex items-center gap-1.5"
            >
              <span>{targetUrl}</span>
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
          </div>

          <button
            onClick={handleCopy}
            className="py-1.5 px-3.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs flex items-center gap-1.5 cursor-pointer font-medium border border-stone-700 transition-colors shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">已複製連結</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>複製法會連結</span>
              </>
            )}
          </button>
        </div>

        {/* Primary CTA Button */}
        <div className="pt-2 text-center">
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 py-4 px-10 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 text-stone-950 font-black text-base sm:text-lg transition-all shadow-xl shadow-yellow-500/25 cursor-pointer hover:scale-105 active:scale-95"
          >
            <Flame className="w-5 h-5 text-stone-950 fill-stone-950" />
            <span>{PROMO_EVENT_INFO.buttonText}</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};
