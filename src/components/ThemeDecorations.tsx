import React from 'react';
import { Flame } from 'lucide-react';

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * High-fidelity transparent SVG Butterfly Icon
 * Clean silhouette with delicate wing veins and antenna details
 */
export const ButterflyIcon: React.FC<IconProps> = ({
  className = 'w-5 h-5 text-amber-400',
  size
}) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.5"
      className={className}
      width={size}
      height={size}
      aria-hidden="true"
    >
      {/* Butterfly Wings & Body */}
      {/* Center Body */}
      <ellipse cx="32" cy="34" rx="2.2" ry="11" />
      <circle cx="32" cy="21" r="2.5" />
      {/* Antennae */}
      <path
        d="M31 19 C28 14 23 11 20 12 M33 19 C36 14 41 11 44 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="19.5" cy="12" r="1.3" />
      <circle cx="44.5" cy="12" r="1.3" />

      {/* Left Forewing */}
      <path
        d="M30 25 C22 14 9 16 7 26 C5 34 16 38 30 36 Z"
        opacity="0.95"
      />
      {/* Left Wing Cutout Vein */}
      <path
        d="M27 26 C20 20 13 22 12 28 C15 32 22 32 27 33"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.4"
      />

      {/* Right Forewing */}
      <path
        d="M34 25 C42 14 55 16 57 26 C59 34 48 38 34 36 Z"
        opacity="0.95"
      />
      {/* Right Wing Cutout Vein */}
      <path
        d="M37 26 C44 20 51 22 52 28 C49 32 42 32 37 33"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.4"
      />

      {/* Left Hindwing */}
      <path
        d="M30 36 C18 39 12 47 16 54 C21 60 28 53 31 43 Z"
        opacity="0.88"
      />
      {/* Right Hindwing */}
      <path
        d="M34 36 C46 39 52 47 48 54 C43 60 36 53 33 43 Z"
        opacity="0.88"
      />
    </svg>
  );
};

export const FlameIcon: React.FC<IconProps> = ({
  className = 'w-5 h-5 text-red-500',
  size = 20
}) => {
  return <Flame className={className} size={size} />;
};

interface CaseThematicBadgeProps {
  caseId: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CaseThematicBadge: React.FC<CaseThematicBadgeProps> = ({
  caseId,
  className = '',
  size = 'md'
}) => {
  const isCase1 = caseId === 'case-01';

  if (isCase1) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-950/80 border border-red-500/50 text-red-300 shadow-md ${className}`}
      >
        <Flame className="w-3.5 h-3.5 text-red-400 animate-pulse shrink-0" />
        <span className="font-dossier-mono text-[11px] font-bold tracking-wider uppercase text-red-200">
          烈火餘燼 // FIRE EMBERS
        </span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-900/90 border border-amber-400/50 text-amber-200 shadow-md ${className}`}
    >
      <ButterflyIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
      <span className="font-dossier-mono text-[11px] font-bold tracking-wider uppercase text-amber-200">
        折翅羽翼 // WINGS SPECIMEN
      </span>
    </div>
  );
};

/**
 * Floating / Corner Ambient Decorator
 */
export const AmbientCaseDecor: React.FC<{ caseId: string }> = ({ caseId }) => {
  const isCase1 = caseId === 'case-01';

  if (isCase1) {
    return (
      <div className="pointer-events-none select-none absolute inset-0 overflow-hidden z-0">
        {/* Fire Corner Decor Top Left */}
        <div className="absolute top-2 left-3 flex items-center gap-1 opacity-25 hover:opacity-40 transition-opacity">
          <Flame className="w-6 h-6 text-red-600 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          <span className="text-[10px] font-dossier-mono font-bold text-red-500 tracking-widest hidden sm:inline">
            FIRE RESIDUE
          </span>
        </div>
        {/* Fire Corner Decor Top Right */}
        <div className="absolute top-2 right-4 flex items-center gap-1 opacity-25">
          <Flame className="w-5 h-5 text-amber-500 drop-shadow-[0_0_6px_rgba(245,158,11,0.8)]" />
        </div>
        {/* Subtle Ember Glow Bottom Right */}
        <div className="absolute bottom-3 right-6 flex items-center gap-1.5 opacity-20">
          <Flame className="w-7 h-7 text-red-500" />
          <span className="text-[9px] font-dossier-mono text-amber-400 font-bold">
            ARSON TRACE
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="pointer-events-none select-none absolute inset-0 overflow-hidden z-0">
      {/* Butterfly Corner Decor Top Left */}
      <div className="absolute top-2 left-3 flex items-center gap-1 opacity-30 hover:opacity-50 transition-opacity">
        <ButterflyIcon className="w-6 h-6 text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)] rotate-[-12deg]" />
        <span className="text-[10px] font-dossier-mono font-bold text-amber-400 tracking-widest hidden sm:inline">
          WING TRACE
        </span>
      </div>
      {/* Butterfly Corner Decor Top Right */}
      <div className="absolute top-2 right-4 flex items-center gap-1 opacity-30">
        <ButterflyIcon className="w-5 h-5 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)] rotate-[15deg]" />
      </div>
      {/* Subtle Butterfly Bottom Right */}
      <div className="absolute bottom-3 right-6 flex items-center gap-1.5 opacity-25">
        <ButterflyIcon className="w-7 h-7 text-amber-300 rotate-[-8deg]" />
        <span className="text-[9px] font-dossier-mono text-amber-200 font-bold">
          BUTTERFLY SPECIMEN
        </span>
      </div>
    </div>
  );
};
