import React, { useState, useEffect, useRef } from 'react';
import { PROMO_EVENT_INFO } from '../data/caseData';
import { ExternalLink, Copy, Check, Sparkles, Flame } from 'lucide-react';

export const EventCtaCard: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const targetUrl = PROMO_EVENT_INFO.defaultUrl;

  // Trigger convergence & unblur effect when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
      ref={cardRef}
      id="promo-section"
      className={`w-full max-w-4xl mx-auto mt-14 rounded-2xl kraft-dossier-board border-2 border-[#b89f81] p-6 sm:p-10 shadow-2xl relative transition-all duration-1000 ease-out ${
        isVisible
          ? 'opacity-100 filter-none scale-100 shadow-[0_20px_60px_-15px_rgba(234,179,8,0.25)]'
          : 'opacity-25 blur-md scale-[0.98]'
      }`}
    >
      {/* Golden converging particles effect when card comes into focus */}
      {isVisible && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-20">
          {/* Subtle floating converging embers */}
          <span className="absolute top-1/4 left-8 w-2 h-2 rounded-full bg-amber-400 blur-[1px] animate-particle-converge-1 opacity-80" />
          <span className="absolute top-1/3 right-10 w-2.5 h-2.5 rounded-full bg-yellow-300 blur-[1px] animate-particle-converge-2 opacity-75" />
          <span className="absolute bottom-1/3 left-16 w-1.5 h-1.5 rounded-full bg-amber-300 blur-[0.5px] animate-particle-converge-3 opacity-70" />
          <span className="absolute top-1/2 right-20 w-2 h-2 rounded-full bg-amber-400 blur-[1px] animate-particle-converge-4 opacity-80" />
          <span className="absolute bottom-1/4 right-14 w-1.5 h-1.5 rounded-full bg-yellow-200 blur-[0.5px] animate-particle-converge-5 opacity-85" />
          <span className="absolute top-12 left-1/3 w-2 h-2 rounded-full bg-amber-200 blur-[1px] animate-particle-converge-6 opacity-75" />
        </div>
      )}

      {/* Top 3D Red Pushpin */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none z-10">
        <span className="pushpin-3d-red shadow-lg" />
      </div>

      {/* Top Temple Badge */}
      <div className="text-center max-w-2xl mx-auto pt-2">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-950 via-red-900 to-red-950 border border-amber-400/50 text-amber-100 text-xs font-bold uppercase tracking-wider mb-3 shadow-md font-sans transition-all duration-700 ${
          isVisible ? 'ring-2 ring-amber-400/40 shadow-amber-500/20 shadow-lg' : ''
        }`}>
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
          <span>{PROMO_EVENT_INFO.badge}</span>
        </div>

        {/* Main Dharma Assembly Title */}
        <h3 className="text-2xl sm:text-3xl font-black text-stone-950 font-dossier-heading tracking-wide">
          {PROMO_EVENT_INFO.title}
        </h3>

        {/* Subtitle */}
        <p className="text-sm font-bold text-red-800 mt-1 font-sans">
          {PROMO_EVENT_INFO.subTitle}
        </p>

        {/* Description */}
        <p className="mt-4 text-xs sm:text-sm text-stone-800 leading-relaxed font-sans font-medium">
          {PROMO_EVENT_INFO.description}
        </p>
      </div>

      {/* Action Zone */}
      <div className="mt-8 pt-6 border-t-2 border-stone-400/60 space-y-5">
        {/* Link Box & Copy */}
        <div className="p-4 rounded-xl bg-white/90 border border-stone-300 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex-1 w-full sm:w-auto">
            <span className="text-stone-600 text-[11px] block mb-1 font-bold font-sans">
              法會官方專屬報名網址：
            </span>
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-dossier-mono text-red-800 hover:text-red-950 font-bold underline underline-offset-2 break-all text-xs flex items-center gap-1.5"
            >
              <span>{targetUrl}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>

          <button
            onClick={handleCopy}
            className="py-2 px-4 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-100 text-xs flex items-center gap-1.5 cursor-pointer font-bold border border-stone-700 transition-colors shrink-0 shadow-md font-sans"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">已複製連結</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-yellow-400" />
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
            className="inline-flex items-center justify-center gap-2.5 py-4 px-10 rounded-xl bg-red-700 hover:bg-red-800 text-white font-black text-base sm:text-lg transition-all shadow-xl shadow-red-900/30 cursor-pointer hover:scale-105 active:scale-95 font-sans"
          >
            <Flame className="w-5 h-5 text-amber-300 fill-amber-300" />
            <span>{PROMO_EVENT_INFO.buttonText}</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};
