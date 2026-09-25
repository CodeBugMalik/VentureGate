import React from 'react';

interface VaultEmblemProps {
  size?: number;
  className?: string;
  withGlow?: boolean;
}

export default function VaultEmblem({ size = 36, className = '', withGlow = true }: VaultEmblemProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 160"
      width={size}
      height={size}
      fill="none"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
    >
      <defs>
        {/* Luxury 24K Polished Gold Gradient */}
        <linearGradient id="vgGoldPrimary" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="25%" stopColor="#F5D061" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="75%" stopColor="#AA8222" />
          <stop offset="100%" stopColor="#6E5010" />
        </linearGradient>

        {/* Inner Platinum Highlight */}
        <linearGradient id="vgPlatinumRim" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6E5010" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#F5D061" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
        </linearGradient>

        {/* Deep Obsidian Enclave Fill */}
        <radialGradient id="vgObsidianFill" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#1B1E26" />
          <stop offset="70%" stopColor="#0F1014" />
          <stop offset="100%" stopColor="#07080A" />
        </radialGradient>

        {/* Cryptographic Core Glow */}
        <radialGradient id="vgCoreAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5D061" stopOpacity="0.35" />
          <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        {/* Ambient Drop Filter */}
        <filter id="vgShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.7" />
          <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#D4AF37" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Radiant Aura Backlight */}
      {withGlow && <circle cx="80" cy="80" r="72" fill="url(#vgCoreAura)" />}

      <g filter="url(#vgShadow)">
        {/* Outer Sovereign Hexagonal Vault Shield */}
        <path
          d="M80 14 
             L134 44 
             L134 104 
             L80 146 
             L26 104 
             L26 44 
             Z"
          fill="url(#vgObsidianFill)"
          stroke="url(#vgGoldPrimary)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Secondary Beveled Inset Rim */}
        <path
          d="M80 24 
             L124 50 
             L124 98 
             L80 134 
             L36 98 
             L36 50 
             Z"
          stroke="url(#vgPlatinumRim)"
          strokeWidth="1.2"
          strokeLinejoin="round"
          strokeOpacity="0.75"
        />

        {/* Architectural Gate Arch & Keyhole Portal */}
        {/* Left Gate Column */}
        <path d="M50 60 L50 102" stroke="url(#vgGoldPrimary)" strokeWidth="2.5" strokeLinecap="round" />
        {/* Right Gate Column */}
        <path d="M110 60 L110 102" stroke="url(#vgGoldPrimary)" strokeWidth="2.5" strokeLinecap="round" />
        {/* Romanesque Gate Arch Header */}
        <path
          d="M50 60 C50 38, 110 38, 110 60"
          stroke="url(#vgGoldPrimary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Central Geometric 'V' Monogram Incline */}
        <path
          d="M58 56 L80 96 L102 56"
          stroke="url(#vgGoldPrimary)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Central 'G' Horizon / ZK Crossbar */}
        <path
          d="M74 80 L96 80 L96 92 L80 92"
          stroke="url(#vgGoldPrimary)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Zero-Knowledge Center Eye / Diamond Singularity */}
        <polygon
          points="80,56 89,68 80,80 71,68"
          fill="url(#vgGoldPrimary)"
        />
        <circle cx="80" cy="68" r="3.2" fill="#07080A" />

        {/* Micro-Circuit Precision Nodes */}
        <circle cx="80" cy="14" r="2.8" fill="#FFF2B2" />
        <circle cx="134" cy="44" r="2.8" fill="#FFF2B2" />
        <circle cx="134" cy="104" r="2.8" fill="#FFF2B2" />
        <circle cx="80" cy="146" r="2.8" fill="#FFF2B2" />
        <circle cx="26" cy="104" r="2.8" fill="#FFF2B2" />
        <circle cx="26" cy="44" r="2.8" fill="#FFF2B2" />

        {/* Micro-Circuit Traces */}
        <line x1="80" y1="24" x2="80" y2="38" stroke="url(#vgGoldPrimary)" strokeWidth="1.5" strokeDasharray="2 2" />
        <line x1="80" y1="96" x2="80" y2="124" stroke="url(#vgGoldPrimary)" strokeWidth="1.5" strokeDasharray="2 2" />
      </g>
    </svg>
  );
}
