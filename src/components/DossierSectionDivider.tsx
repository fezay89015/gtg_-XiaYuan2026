import React from 'react';

interface DossierSectionDividerProps {
  label: string;
  subLabel?: string;
  accentColor?: 'red' | 'amber' | 'blue';
}

export const DossierSectionDivider: React.FC<DossierSectionDividerProps> = ({
  label,
  subLabel,
  accentColor = 'amber'
}) => {
  const isRed = accentColor === 'red';
  const isBlue = accentColor === 'blue';

  return (
    <div className="relative z-20 w-full max-w-5xl mx-auto my-8 sm:my-10 px-4 select-none">
      <div className="relative flex items-center justify-center">
        {/* Left Stitch Line */}
        <div
          className={`flex-1 h-[2px] ${
            isBlue
              ? 'bg-gradient-to-r from-transparent via-[#507d9f] to-[#3a617f]'
              : 'bg-gradient-to-r from-transparent via-[#b89467] to-[#cba374]'
          } shadow-[0_1px_3px_rgba(0,0,0,0.8)]`}
        />

        {/* Center Pill / Badge */}
        <div
          className={`mx-3 sm:mx-5 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full ${
            isBlue
              ? 'bg-[#f4f7fb] border-2 border-slate-400 text-slate-950'
              : 'bg-[#fbf7ee] border-2 border-[#b59e80] text-stone-900'
          } shadow-xl flex items-center gap-2 sm:gap-2.5 shrink-0`}
        >
          <span
            className={`w-2.5 h-2.5 rounded-full animate-pulse shadow-sm shrink-0 ${
              isRed
                ? 'bg-red-700 ring-2 ring-red-400/40'
                : isBlue
                ? 'bg-blue-700 ring-2 ring-blue-400/40'
                : 'bg-amber-600 ring-2 ring-amber-400/40'
            }`}
          />
          <span className="font-bold font-sans text-xs sm:text-sm tracking-wider">
            {label}
          </span>
          {subLabel && (
            <span
              className={`hidden sm:inline-block font-dossier-mono text-[11px] ${
                isBlue ? 'text-slate-600 border-slate-300' : 'text-stone-600 border-stone-300'
              } font-bold border-l pl-2`}
            >
              {subLabel}
            </span>
          )}
        </div>

        {/* Right Stitch Line */}
        <div
          className={`flex-1 h-[2px] ${
            isBlue
              ? 'bg-gradient-to-l from-transparent via-[#507d9f] to-[#3a617f]'
              : 'bg-gradient-to-l from-transparent via-[#b89467] to-[#cba374]'
          } shadow-[0_1px_3px_rgba(0,0,0,0.8)]`}
        />
      </div>
    </div>
  );
};
