import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, Power, Wallet, X } from 'lucide-react';
import VaultEmblem from './VaultEmblem';
import { useWallet } from '../contexts/WalletContext';

const navLinks = [
  { name: 'Overview', path: '/' },
  { name: 'Verify', path: '/verify' },
  { name: 'Registry', path: '/registry' },
  { name: 'Admin', path: '/admin' },
];

export default function NavBar() {
  const location = useLocation();
  const { address, isConnected, isConnecting, connect, disconnect } = useWallet();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <Link className="brand-lockup" to="/" onClick={() => setMobileMenuOpen(false)}>
            <VaultEmblem size={35} />
            <span className="brand-wordmark">Venture<span>Gate</span></span>
            <span className="brand-note">private capital / midnight</span>
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className={`nav-link ${location.pathname === link.path ? 'is-active' : ''}`}>
                {link.name}
              </Link>
            ))}
            <Link to="/about" className={`nav-link nav-link-docs ${location.pathname === '/about' ? 'is-active' : ''}`}>
              Docs <ArrowUpRight size={13} />
            </Link>
          </nav>

          <div className="header-actions">
            {isConnected && address ? (
              <div className="wallet-chip">
                <span className="wallet-chip-dot" />
                <span className="font-mono">{address.slice(0, 5)}…{address.slice(-4)}</span>
                <button type="button" onClick={disconnect} aria-label="Disconnect wallet" title="Disconnect wallet"><Power size={14} /></button>
              </div>
            ) : (
              <button type="button" className="connect-button" onClick={() => connect('preprod')} disabled={isConnecting}>
                <Wallet size={15} /> {isConnecting ? 'Connecting' : 'Connect wallet'}
              </button>
            )}
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="mobile-nav-panel" aria-label="Mobile navigation">
            {navLinks.concat({ name: 'Architecture', path: '/about' }).map((link) => (
              <Link key={link.path} to={link.path} className={`mobile-nav-link ${location.pathname === link.path ? 'is-active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
                <span>{link.name}</span><ArrowUpRight size={14} />
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
