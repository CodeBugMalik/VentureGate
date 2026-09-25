import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import VaultEmblem from './VaultEmblem';
import ContractAddressBar from './ContractAddressBar';
import { useWallet } from '../contexts/WalletContext';
import { Shield, Wallet, Power, Menu, X, ExternalLink } from 'lucide-react';

export default function NavBar() {
  const location = useLocation();
  const { address, isConnected, isConnecting, connect, disconnect } = useWallet();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Overview', path: '/' },
    { name: 'Verify Credentials (ZK)', path: '/verify' },
    { name: 'Attestation Registry', path: '/registry' },
    { name: 'Syndicate Admin', path: '/admin' },
    { name: 'Architecture & Docs', path: '/about' },
  ];

  return (
    <>
      <ContractAddressBar />
      <header
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          backgroundColor: 'rgba(12, 13, 16, 0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(201, 168, 106, 0.2)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            padding: '0 24px',
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          {/* Brand Identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <VaultEmblem size={34} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', lineHeight: 1 }}>
                  <span
                    className="font-display"
                    style={{
                      fontSize: '20px',
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      color: '#ffffff',
                    }}
                  >
                    Venture
                  </span>
                  <span
                    className="font-display text-gold-gradient"
                    style={{
                      fontSize: '20px',
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Gate
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '9px',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'var(--gold-champagne)',
                    fontWeight: 600,
                    marginTop: '2px',
                  }}
                >
                  Sovereign ZK Gateway
                </span>
              </div>
            </Link>

            <div
              style={{
                height: '24px',
                width: '1px',
                background: 'rgba(255, 255, 255, 0.1)',
                display: 'none',
              }}
              className="d-desktop-block"
            />

            {/* Network Indicator Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 10px',
                borderRadius: '20px',
                backgroundColor: 'rgba(18, 20, 24, 0.8)',
                border: '1px solid rgba(201, 168, 106, 0.25)',
                fontSize: '11px',
                letterSpacing: '0.04em',
              }}
            >
              <span className="beacon-dot" />
              <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Midnight Preprod</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="desktop-nav">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'var(--gold-light)' : 'var(--text-secondary)',
                    backgroundColor: isActive ? 'rgba(212, 175, 55, 0.12)' : 'transparent',
                    border: `1px solid ${isActive ? 'rgba(212, 175, 55, 0.3)' : 'transparent'}`,
                    transition: 'all 0.2s ease',
                  }}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Wallet Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {isConnected && address ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '6px 12px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(24, 26, 32, 0.9)',
                  border: '1px solid rgba(201, 168, 106, 0.35)',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Wallet size={15} color="var(--gold-champagne)" />
                  <span
                    className="font-mono"
                    style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}
                  >
                    {address.slice(0, 6)}...{address.slice(-4)}
                  </span>
                </div>
                <button
                  onClick={disconnect}
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '4px',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title="Disconnect Wallet"
                >
                  <Power size={13} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => connect('preprod')}
                disabled={isConnecting}
                className="gold-shimmer-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 18px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: isConnecting ? 'wait' : 'pointer',
                  opacity: isConnecting ? 0.7 : 1,
                }}
              >
                <Wallet size={15} color="#0c0d10" />
                <span>{isConnecting ? 'Connecting...' : 'Connect 1AM'}</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--text-primary)',
                padding: '6px',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
              className="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: '16px 24px',
              backgroundColor: 'rgba(12, 13, 16, 0.98)',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'var(--gold-light)' : 'var(--text-secondary)',
                    backgroundColor: isActive ? 'rgba(212, 175, 55, 0.12)' : 'transparent',
                  }}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        )}
      </header>
    </>
  );
}
