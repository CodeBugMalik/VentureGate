import React from 'react';
import { Link } from 'react-router-dom';
import VaultEmblem from './VaultEmblem';

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30 py-space-xl mt-auto">
      <div className="max-w-[1440px] mx-auto px-margin md:px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-space-lg">
        <div className="flex items-center gap-space-sm">
          <VaultEmblem size={26} />
          <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Venture<span className="text-primary">Gate</span>
          </span>
          <span className="font-code-sm text-code-sm text-outline ml-space-sm hidden sm:inline">
            v1.4.2-institutional
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-space-lg text-on-surface-variant font-body-sm text-body-sm">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/verify" className="hover:text-primary transition-colors">
            Verify Credentials
          </Link>
          <Link to="/admin" className="hover:text-primary transition-colors">
            Admin Portal
          </Link>
          <Link to="/about" className="hover:text-primary transition-colors">
            Protocol Specs
          </Link>
          <a
            href="https://docs.midnight.network"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors inline-flex items-center gap-1"
          >
            <span>Midnight Docs</span>
            <span className="material-symbols-outlined text-[13px]">north_east</span>
          </a>
        </div>

        <div className="text-outline font-code-sm text-code-sm text-center md:text-right">
          © 2026 VentureGate Protocol. Zero-Knowledge Cryptography on Midnight Network.
        </div>
      </div>
    </footer>
  );
}
