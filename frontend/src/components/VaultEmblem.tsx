import React from 'react';

interface VaultEmblemProps {
  size?: number;
  className?: string;
}

export default function VaultEmblem({ size = 32, className = '' }: VaultEmblemProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      width={size}
      height={size}
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient id="vaultGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F3E5AB" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#996515" />
        </linearGradient>
      </defs>
      {/* Outer Cut-Corner Diamond Shield */}
      <polygon
        points="60,10 105,35 105,85 60,110 15,85 15,35"
        stroke="url(#vaultGoldGrad)"
        strokeWidth="3"
        fill="#111317"
      />
      {/* Inner Cryptographic Facets */}
      <polygon
        points="60,22 95,42 95,78 60,98 25,78 25,42"
        stroke="rgba(212,175,55,0.4)"
        strokeWidth="1.5"
        fill="#0D0E11"
      />
      {/* Center Vault Monogram Keyhole / ZK Gate */}
      <path d="M60 38 L76 54 L60 70 L44 54 Z" fill="url(#vaultGoldGrad)" />
      <circle cx="60" cy="54" r="5" fill="#090A0C" />
      <rect x="58.5" y="54" width="3" height="12" fill="#090A0C" />
      {/* Precision Vertex Markers */}
      <circle cx="60" cy="10" r="2.5" fill="#F3E5AB" />
      <circle cx="105" cy="35" r="2.5" fill="#F3E5AB" />
      <circle cx="105" cy="85" r="2.5" fill="#F3E5AB" />
      <circle cx="60" cy="110" r="2.5" fill="#F3E5AB" />
      <circle cx="15" cy="85" r="2.5" fill="#F3E5AB" />
      <circle cx="15" cy="35" r="2.5" fill="#F3E5AB" />
    </svg>
  );
}
