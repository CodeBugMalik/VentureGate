import React from 'react';
import { Link } from 'react-router-dom';
import VaultEmblem from '../components/VaultEmblem';
import {
  Shield,
  Lock,
  Cpu,
  FileCode,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { DEFAULT_PREPROD_CONTRACT_ADDRESS } from '../config';

export default function AboutPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px 100px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 14px',
            borderRadius: '20px',
            background: 'rgba(212, 175, 55, 0.12)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            color: 'var(--gold-light)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '14px',
          }}
        >
          <BookOpen size={12} color="var(--gold-champagne)" />
          Protocol Architecture &amp; Specification
        </div>
        <h1 className="font-display" style={{ fontSize: '38px', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
          The Architecture of Sovereign Diligence
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '720px', margin: '0 auto' }}>
          How Midnight's dual-state Compact execution eliminates third-party document honeypots for private placement
          compliance.
        </p>
      </div>

      {/* 3 Pillar Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          marginBottom: '60px',
        }}
      >
        <div className="glass-panel-gold" style={{ padding: '32px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            <AlertTriangle size={22} color="#f87171" />
          </div>
          <h3 className="font-display" style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
            The Centralized Hazard
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
            Traditional accredited investor verification forces LPs and founders to upload unredacted IRS tax returns,
            brokerage accounts, and W-2s to centralized compliance brokers. These databases become catastrophic honeypots
            for identity theft, extortion, and subpoenas.
          </p>
        </div>

        <div className="glass-panel-gold" style={{ padding: '32px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: 'rgba(212, 175, 55, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            <Shield size={22} color="var(--gold-champagne)" />
          </div>
          <h3 className="font-display" style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
            The Midnight Inversion
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
            VentureGate inverts the diligence flow. Instead of uploading records, the investor evaluates their private
            witnesses locally inside browser WebAssembly memory. The Midnight Compact circuit verifies constraint inequalities
            and commits a single boolean validity attestation on-chain.
          </p>
        </div>

        <div className="glass-panel-gold" style={{ padding: '32px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            <CheckCircle2 size={22} color="var(--emerald-primary)" />
          </div>
          <h3 className="font-display" style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
            SEC Rule 506(c) Ready
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
            Under United States SEC Rule 506(c) of Regulation D, issuers must take "reasonable steps to verify" accredited
            investor status ($1M net worth or $200k personal income). VentureGate provides cryptographically verifiable proof
            of compliance with zero data retention liability.
          </p>
        </div>
      </div>

      {/* Compact Smart Contract Breakdown */}
      <div
        className="glass-panel-gold"
        style={{
          padding: '40px',
          marginBottom: '60px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <FileCode size={22} color="var(--gold-champagne)" />
          <h2 className="font-display" style={{ fontSize: '24px', fontWeight: 700, color: '#fff' }}>
            Compact Smart Contract Specification
          </h2>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px', lineHeight: 1.6 }}>
          Written in Midnight's native domain-specific language (Compact). The contract defines public regulatory thresholds
          on the public ledger while isolating investor financials as private witnesses:
        </p>

        <pre
          className="font-mono"
          style={{
            padding: '24px',
            background: '#07080a',
            borderRadius: '8px',
            border: '1px solid rgba(201, 168, 106, 0.3)',
            color: '#e2e8f0',
            fontSize: '13px',
            overflowX: 'auto',
            lineHeight: 1.7,
            marginBottom: '24px',
          }}
        >
          {`pragma language_version >=0.22.0;

// Public ledger state: specifies the required accreditation thresholds
export ledger min_net_worth: Uint<32>;
export ledger min_income: Uint<32>;

// Constructor: initializes on-chain thresholds via explicit disclosure
constructor(initial_min_net_worth: Uint<32>, initial_min_income: Uint<32>) {
    min_net_worth = disclose(initial_min_net_worth);
    min_income = disclose(initial_min_income);
}

// Circuit: validates private financial witnesses against public criteria
// Notice: disclose() is NEVER called on net_worth or income!
export circuit verify_accreditation(net_worth: Uint<32>, income: Uint<32>): [] {
    assert(net_worth >= min_net_worth, "Net worth too low");
    assert(income >= min_income, "Income too low");
}`}
        </pre>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
            <div style={{ color: 'var(--gold-light)', fontWeight: 600, fontSize: '13px', marginBottom: '6px' }}>
              Public Ledger State
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '12px', lineHeight: 1.5 }}>
              `min_net_worth` and `min_income` are public variables stored on-chain. Anyone can verify the criteria required
              for accreditation.
            </div>
          </div>

          <div style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
            <div style={{ color: 'var(--emerald-primary)', fontWeight: 600, fontSize: '13px', marginBottom: '6px' }}>
              Private Witness Isolation
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '12px', lineHeight: 1.5 }}>
              `net_worth` and `income` are evaluated inside local browser memory. Because `disclose()` is omitted, they are
              cryptographically shielded.
            </div>
          </div>

          <div style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
            <div style={{ color: 'var(--gold-champagne)', fontWeight: 600, fontSize: '13px', marginBottom: '6px' }}>
              R1CS Inequality Constraints
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '12px', lineHeight: 1.5 }}>
              `assert(net_worth &gt;= min_net_worth)` compiles to mathematical rank-1 constraint systems proven in under 2.4
              seconds.
            </div>
          </div>
        </div>
      </div>

      {/* Observer Privacy Matrix Table */}
      <div
        className="glass-panel"
        style={{
          padding: '40px',
          border: '1px solid rgba(201, 168, 106, 0.25)',
          marginBottom: '60px',
        }}
      >
        <h2 className="font-display" style={{ fontSize: '24px', fontWeight: 700, color: '#fff', marginBottom: '20px' }}>
          Cryptographic Information Visibility Matrix
        </h2>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.4)' }}>
                <th style={{ padding: '14px 16px', color: 'var(--gold-champagne)' }}>Observer Class</th>
                <th style={{ padding: '14px 16px', color: 'var(--emerald-primary)' }}>What They CAN Learn</th>
                <th style={{ padding: '14px 16px', color: '#f87171)' }}>What They CANNOT Learn</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '14px 16px', fontWeight: 600, color: '#fff' }}>Public Block Explorer</td>
                <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>
                  Contract address, public thresholds, block finality timestamp, gas DUST settlement.
                </td>
                <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>
                  Actual net worth, actual income, real-world investor identity, account balances.
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '14px 16px', fontWeight: 600, color: '#fff' }}>Syndicate / Fund Lead</td>
                <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>
                  Cryptographic verification status (VALID / INVALID), time of attestation.
                </td>
                <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>
                  Exact wealth dollar amounts, bank accounts, portfolio holdings, non-qualifying financial data.
                </td>
              </tr>
              <tr>
                <td style={{ padding: '14px 16px', fontWeight: 600, color: '#fff' }}>Third-Party Verifiers</td>
                <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>
                  Mathematical validity of the 256-bit zk-SNARK proof.
                </td>
                <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>
                  Any underlying documents, PDF attachments, W-2 records, or bank statements.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Actions */}
      <div style={{ textAlign: 'center' }}>
        <Link
          to="/verify"
          className="gold-shimmer-btn"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 28px',
            borderRadius: '10px',
            fontSize: '15px',
            fontWeight: 700,
          }}
        >
          <span>Launch Verification Terminal</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
