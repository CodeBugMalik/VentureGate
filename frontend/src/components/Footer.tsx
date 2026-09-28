import React from 'react';
import { ArrowUpRight, LockKeyhole } from 'lucide-react';
import { Link } from 'react-router-dom';
import VaultEmblem from './VaultEmblem';
import { DEFAULT_PREPROD_CONTRACT_ADDRESS } from '../config';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <VaultEmblem size={31} />
          <div>
            <div className="footer-wordmark">Venture<span>Gate</span></div>
            <p>Private accreditation infrastructure<br />for the Midnight network.</p>
          </div>
        </div>
        <div className="footer-links">
          <div><span className="footer-label">Navigate</span><Link to="/verify">Verify</Link><Link to="/registry">Registry</Link><Link to="/about">Architecture</Link></div>
          <div><span className="footer-label">Network</span><a href={`https://preprod.midnightexplorer.com/contracts/${DEFAULT_PREPROD_CONTRACT_ADDRESS}`} target="_blank" rel="noopener noreferrer">Explorer <ArrowUpRight size={13} /></a><a href="https://github.com/CodeBugMalik/VentureGate" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={13} /></a></div>
        </div>
        <div className="footer-rule" />
        <div className="footer-bottom"><span>© {new Date().getFullYear()} VentureGate Protocol</span><span><LockKeyhole size={13} /> Financial witnesses stay local by design.</span></div>
      </div>
    </footer>
  );
}
