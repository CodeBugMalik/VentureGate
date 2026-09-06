import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import VaultEmblem from './VaultEmblem';
import { useWallet } from '../contexts/WalletContext';

export default function NavBar() {
  const location = useLocation();
  const { address, isConnected, isConnecting, connect, disconnect, walletType } = useWallet();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Verify Credentials', path: '/verify' },
    { name: 'Admin Deployer', path: '/admin' },
    { name: 'Docs & About', path: '/about' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl border-b border-outline-variant/30">
      <div className="h-16 max-w-[1440px] mx-auto px-margin md:px-margin-desktop flex items-center justify-between gap-space-md">
        {/* Brand & Network */}
        <div className="flex items-center gap-space-lg">
          <Link to="/" className="flex items-center gap-space-sm group">
            <VaultEmblem size={32} className="h-8 w-auto object-contain" />
            <div className="flex items-center tracking-tight">
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Venture</span>
              <span className="font-headline-sm text-headline-sm text-primary font-semibold">Gate</span>
            </div>
          </Link>

          <div className="h-4 w-[1px] bg-outline-variant/40 hidden sm:block"></div>

          <div className="hidden sm:flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-surface-container-low border border-outline-variant/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span className="font-code-sm text-code-sm text-on-surface-variant uppercase tracking-wider">
              Midnight Preprod
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-space-lg">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`font-body-md text-body-md transition-colors ${
                  isActive
                    ? 'text-primary font-medium'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Wallet Pill & Profile */}
        <div className="flex items-center gap-space-sm">
          {isConnected && address ? (
            <div className="flex items-center gap-space-sm pl-space-sm pr-space-xs py-1 rounded-lg bg-surface-container-low border border-outline-variant/40 hover:border-primary/50 transition-colors">
              <span className="material-symbols-outlined text-primary text-[18px]">account_balance_wallet</span>
              <span className="font-code-md text-code-md text-on-surface font-medium hidden sm:inline-block">
                {address.slice(0, 6)}...{address.slice(-4)}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" title="Connected"></span>
              <button
                onClick={disconnect}
                className="flex items-center justify-center p-1 text-on-surface-variant hover:text-error transition-colors"
                title="Disconnect Wallet"
              >
                <span className="material-symbols-outlined text-[16px]">power_settings_new</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => connect('preprod')}
              disabled={isConnecting}
              className="flex items-center gap-space-xs px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#F3E5AB] via-primary to-primary-container text-on-primary font-body-md text-body-md font-semibold shadow-md hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">wallet</span>
              <span>{isConnecting ? 'Connecting...' : 'Connect 1AM'}</span>
            </button>
          )}

          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-[18px]">shield</span>
          </div>
        </div>
      </div>
    </header>
  );
}
