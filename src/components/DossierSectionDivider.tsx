import React from 'react';

interface DossierSectionDividerProps {
  label: string;
  subLabel?: string;
  accentColor?: 'red' | 'amber';
}

export const DossierSectionDivider: React.FC<DossierSectionDividerProps> = ({
  label,
  subLabel,
  accentColor = 'amber'
}) => {
  const isRed = accentColor === 'red';

  return (
    <div className="relative z-20 w-full max-w-5xl mx-auto my-8 sm:my-10 px-4 select-none">
      <div className="relative flex items-center justify-center">
        {/* Left Stitch Line */}
        <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#b89467] to-[#cba374] shadow-[0_1px_3px_rgba(0,0,0,0.8)]" />

        {/* Center Pill / Badge */}
        <div className="mx-3 sm:mx-5 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-[#fbf7ee] border-2 border-[#b59e80] shadow-xl flex items-center gap-2 sm:gap-2.5 text-stone-900 shrink-0">
          <span
            className={`w-2.5 h-2.5 rounded-full animate-pulse shadow-sm shrink-0 ${
              isRed ? 'bg-red-700 ring-2 ring-red-400/40' : 'bg-amber-600 ring-2 ring-amber-400/40'
            }`}
          />
          <span className="font-bold font-sans text-xs sm:text-sm tracking-wider text-stone-900">
            {label}
          </span>
          {subLabel && (
            <span className="hidden sm:inline-block font-dossier-mono text-[11px] text-stone-600 font-bold border-l border-stone-300 pl-2">
              {subLabel}
            </span>
          )}
        </div>

        {/* Right Stitch Line */}
        <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-[#b89467] to-[#cba374] shadow-[0_1px_3px_rgba(0,0,0,0.8)]" />
      </div>
    </div>
  );
};
