import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VaultEmblem from '../components/VaultEmblem';
import {
  Shield,
  Lock,
  Cpu,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Activity,
  Zap,
  Fingerprint,
  ChevronRight,
  Database,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { DEFAULT_PREPROD_CONTRACT_ADDRESS } from '../config';

export default function LandingPage() {
  // Interactive Simulator state for interactive sandbox
  const [simNetWorth, setSimNetWorth] = useState<number>(2450000);
  const [simIncome, setSimIncome] = useState<number>(380000);

  const minNetWorth = 1000000;
  const minIncome = 200000;

  const netWorthPass = simNetWorth >= minNetWorth;
  const incomePass = simIncome >= minIncome;
  const overallPass = netWorthPass && incomePass;

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          padding: '80px 24px 70px',
          maxWidth: '1360px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        {/* Glow behind hero */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '350px',
            background: 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.12), transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        />

        {/* Eyebrow badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '24px',
            backgroundColor: 'rgba(24, 26, 32, 0.9)',
            border: '1px solid rgba(201, 168, 106, 0.35)',
            marginBottom: '28px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold-primary)' }} />
          <span
            style={{
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--gold-light)',
              fontWeight: 600,
            }}
          >
            Institutional Zero-Knowledge Protocol on Midnight
          </span>
          <Lock size={12} color="var(--gold-champagne)" />
        </div>

        {/* Grand Headline */}
        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(36px, 5.5vw, 68px)',
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: '-0.03em',
            maxWidth: '1000px',
            margin: '0 auto 24px',
            color: '#ffffff',
          }}
        >
          Prove Accredited Wealth.
          <br />
          <span className="text-gold-gradient">Disclose Zero Financials.</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(16px, 1.8vw, 19px)',
            color: 'var(--text-secondary)',
            maxWidth: '780px',
            margin: '0 auto 40px',
            lineHeight: 1.65,
            fontWeight: 400,
          }}
        >
          A decentralized institutional gateway enabling LPs, family offices, and angel syndicates to mathematically
          verify regulatory accreditation (SEC Rule 506(c)) without uploading tax returns, bank statements, or W-2s to
          vulnerable centralized honeypots.
        </p>

        {/* Action Button Cluster */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '60px',
          }}
        >
          <Link
            to="/verify"
            className="gold-shimmer-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 28px',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: 700,
            }}
          >
            <span>Launch Verification Terminal</span>
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/admin"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 24px',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(201, 168, 106, 0.3)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.2s ease',
            }}
          >
            <Cpu size={16} color="var(--gold-champagne)" />
            <span>Deploy Contract Portal</span>
          </Link>

          <Link
            to="/about"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '14px 18px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--text-muted)',
              transition: 'color 0.2s ease',
            }}
          >
            <span>Formal Privacy Spec</span>
            <ChevronRight size={16} />
          </Link>
        </div>

        {/* Institutional Metrics Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            maxWidth: '1100px',
            margin: '0 auto',
          }}
        >
          {[
            { metric: '$480M+', label: 'Private Value Attested', color: 'var(--gold-light)' },
            { metric: '< 2.4s', label: 'Local Witness Generation', color: 'var(--emerald-primary)' },
            { metric: '0 Bytes', label: 'Financial Data Leaked', color: 'var(--gold-light)' },
            { metric: '100%', label: 'Midnight Compact Compliant', color: 'var(--emerald-primary)' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '20px',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                backgroundColor: 'rgba(18, 20, 24, 0.65)',
              }}
            >
              <div
                className="font-display"
                style={{
                  fontSize: '28px',
                  fontWeight: 800,
                  color: item.color,
                  marginBottom: '4px',
                }}
              >
                {item.metric}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--text-muted)',
                  fontWeight: 600,
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive ZK Simulator Sandbox */}
      <section
        style={{
          padding: '60px 24px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div
          className="glass-panel-gold"
          style={{
            padding: '40px',
            background: 'linear-gradient(135deg, rgba(24, 26, 32, 0.95) 0%, rgba(14, 15, 18, 0.98) 100%)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              paddingBottom: '20px',
              marginBottom: '32px',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.18em',
                  color: 'var(--gold-champagne)',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  marginBottom: '6px',
                }}
              >
                Interactive Circuit Sandbox
              </div>
              <h2 className="font-display" style={{ fontSize: '26px', fontWeight: 700, color: '#fff' }}>
                Simulate Zero-Knowledge Constraint Synthesis
              </h2>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '20px',
                background: overallPass ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                border: `1px solid ${overallPass ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
              }}
            >
              {overallPass ? (
                <>
                  <CheckCircle2 size={16} color="var(--emerald-primary)" />
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--emerald-primary)' }}>
                    Circuit Status: ACCREDITATION PROVABLE
                  </span>
                </>
              ) : (
                <>
                  <AlertTriangle size={16} color="#f87171" />
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#f87171' }}>
                    Circuit Status: SUB-THRESHOLD REJECTION
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Slider Controls */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '30px',
              marginBottom: '36px',
            }}
          >
            {/* Net Worth Slider */}
            <div
              style={{
                padding: '24px',
                borderRadius: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.35)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  Private Liquid Net Worth
                </span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: netWorthPass ? 'var(--gold-light)' : '#f87171',
                  }}
                >
                  ${simNetWorth.toLocaleString('en-US')}
                </span>
              </div>

              <input
                type="range"
                min={200000}
                max={5000000}
                step={50000}
                value={simNetWorth}
                onChange={(e) => setSimNetWorth(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--gold-primary)', cursor: 'pointer', marginBottom: '12px' }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                <span>Min Required: $1,000,000</span>
                <span style={{ color: netWorthPass ? 'var(--emerald-primary)' : '#f87171' }}>
                  {netWorthPass ? '[PASS: >= $1.0M]' : '[FAIL: < $1.0M]'}
                </span>
              </div>
            </div>

            {/* Income Slider */}
            <div
              style={{
                padding: '24px',
                borderRadius: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.35)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  Private Personal Annual Income
                </span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: incomePass ? 'var(--gold-light)' : '#f87171',
                  }}
                >
                  ${simIncome.toLocaleString('en-US')}
                </span>
              </div>

              <input
                type="range"
                min={50000}
                max={1000000}
                step={25000}
                value={simIncome}
                onChange={(e) => setSimIncome(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--gold-primary)', cursor: 'pointer', marginBottom: '12px' }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                <span>Min Required: $200,000</span>
                <span style={{ color: incomePass ? 'var(--emerald-primary)' : '#f87171' }}>
                  {incomePass ? '[PASS: >= $200k]' : '[FAIL: < $200k]'}
                </span>
              </div>
            </div>
          </div>

          {/* Mathematical Proof Output Preview */}
          <div
            className="hud-box font-mono"
            style={{
              padding: '20px',
              backgroundColor: '#07080a',
              borderRadius: '8px',
              border: '1px solid rgba(201, 168, 106, 0.3)',
              fontSize: '12px',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
            }}
          >
            <div style={{ color: 'var(--gold-champagne)', fontWeight: 600, marginBottom: '8px' }}>
              // COMPACT PROOF EMISSION PREVIEW
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>witness_input[0] (liquid_net_worth): </span>
              <span style={{ color: '#fff' }}>[ENCLAVE SHIELDED - NEVER BROADCAST]</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>witness_input[1] (annual_income):   </span>
              <span style={{ color: '#fff' }}>[ENCLAVE SHIELDED - NEVER BROADCAST]</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>r1cs_assertion_1: </span>
              <span style={{ color: netWorthPass ? 'var(--emerald-primary)' : '#f87171' }}>
                assert(net_worth &gt;= 1000000) ===&gt; {netWorthPass ? 'SATISFIED' : 'FAILED'}
              </span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>r1cs_assertion_2: </span>
              <span style={{ color: incomePass ? 'var(--emerald-primary)' : '#f87171' }}>
                assert(income &gt;= 200000) ===&gt; {incomePass ? 'SATISFIED' : 'FAILED'}
              </span>
            </div>
            <div style={{ marginTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '8px' }}>
              <span style={{ color: 'var(--gold-light)' }}>
                zk_snark_proof: 0x9b3f41e8c467a21dc07f90e5138bc42f9da8214157d6ef62... (256-bit unforgeable validity
                proof)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Protocol Architecture Bento Matrix */}
      <section
        style={{
          padding: '70px 24px',
          maxWidth: '1260px',
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div
            style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              color: 'var(--gold-champagne)',
              textTransform: 'uppercase',
              fontWeight: 700,
              marginBottom: '8px',
            }}
          >
            Protocol Architecture
          </div>
          <h2 className="font-display" style={{ fontSize: '34px', fontWeight: 800, color: '#fff' }}>
            Three-Stage Zero-Knowledge Verification
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {/* Stage 01 */}
          <div
            className="glass-panel-gold"
            style={{
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.15em',
                    color: 'var(--gold-champagne)',
                    fontWeight: 700,
                  }}
                >
                  STAGE 01
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    background: 'rgba(212, 175, 55, 0.1)',
                    color: 'var(--gold-light)',
                  }}
                >
                  WASM Execution
                </span>
              </div>

              <h3 className="font-display" style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: '#fff' }}>
                Private Witness Isolation
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
                Client-side liquidity evaluation executes strictly in browser memory via the 1AM WebAssembly runtime. No
                financial amounts touch network packets.
              </p>
            </div>

            <div
              className="font-mono"
              style={{
                background: '#0a0b0d',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                fontSize: '12px',
              }}
            >
              <div style={{ color: 'var(--gold-champagne)', marginBottom: '4px' }}>// Client Sandbox</div>
              <div style={{ color: '#fff' }}>Witness Input: [ENCLAVE_SHIELDED]</div>
              <div style={{ color: 'var(--emerald-primary)' }}>Evaluator: Local WASM Runtime</div>
            </div>
          </div>

          {/* Stage 02 */}
          <div
            className="glass-panel-gold"
            style={{
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.15em',
                    color: 'var(--gold-champagne)',
                    fontWeight: 700,
                  }}
                >
                  STAGE 02
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    color: 'var(--emerald-primary)',
                  }}
                >
                  Compact Circuit
                </span>
              </div>

              <h3 className="font-display" style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: '#fff' }}>
                Cryptographic SNARK Proof
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
                The Compact smart contract evaluates inequality equations. Mathematical zk-SNARK proof verifies that financial
                criteria hold true without leaking numbers.
              </p>
            </div>

            <div
              className="font-mono"
              style={{
                background: '#0a0b0d',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                fontSize: '12px',
              }}
            >
              <div style={{ color: 'var(--gold-champagne)', marginBottom: '4px' }}>// Circuit Artifact</div>
              <div style={{ color: '#fff' }}>venturegate.compact</div>
              <div style={{ color: 'var(--gold-light)' }}>Constraints: 1,024 R1CS Gates</div>
            </div>
          </div>

          {/* Stage 03 */}
          <div
            className="glass-panel-gold"
            style={{
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.15em',
                    color: 'var(--gold-champagne)',
                    fontWeight: 700,
                  }}
                >
                  STAGE 03
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    background: 'rgba(212, 175, 55, 0.1)',
                    color: 'var(--gold-light)',
                  }}
                >
                  Ledger State
                </span>
              </div>

              <h3 className="font-display" style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: '#fff' }}>
                On-Chain Attestation
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
                Midnight Preprod ledger registers a single immutable boolean validity attestation. Indexers read accredited
                status with zero balance disclosure.
              </p>
            </div>

            <div
              className="font-mono"
              style={{
                background: '#0a0b0d',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                fontSize: '12px',
              }}
            >
              <div style={{ color: 'var(--gold-champagne)', marginBottom: '4px' }}>// Midnight Preprod</div>
              <div style={{ color: 'var(--emerald-primary)' }}>Status: ACCREDITED_VALID</div>
              <div style={{ color: 'var(--text-muted)' }}>Exposed Balance: 0.00 (SHIELDED)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Compliance Disruption Matrix */}
      <section
        style={{
          padding: '70px 24px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div
            style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              color: 'var(--gold-champagne)',
              textTransform: 'uppercase',
              fontWeight: 700,
              marginBottom: '8px',
            }}
          >
            Competitive Analysis
          </div>
          <h2 className="font-display" style={{ fontSize: '32px', fontWeight: 800, color: '#fff' }}>
            Legacy Centralized Diligence vs. VentureGate ZK
          </h2>
        </div>

        <div
          className="glass-panel"
          style={{
            overflowX: 'auto',
            border: '1px solid rgba(201, 168, 106, 0.25)',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              fontSize: '14px',
            }}
          >
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: 'rgba(0,0,0,0.4)' }}>
                <th style={{ padding: '16px 20px', color: 'var(--gold-light)', fontWeight: 600 }}>Diligence Vector</th>
                <th style={{ padding: '16px 20px', color: 'var(--text-muted)', fontWeight: 500 }}>Traditional KYC / Brokers</th>
                <th style={{ padding: '16px 20px', color: 'var(--emerald-primary)', fontWeight: 600 }}>
                  VentureGate (Midnight ZK)
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  vector: 'Bank & Custody Statements',
                  legacy: 'Exposes exact dollar amounts and holdings directly to offshore review clerks.',
                  zk: '100% Private local witness. Ledger only commits a binary validity boolean.',
                },
                {
                  vector: 'Tax Returns & W-2 Records',
                  legacy: 'Permanent unencrypted or weakly encrypted PDF uploads stored in centralized cloud buckets.',
                  zk: 'Zero document transmission. Witnesses evaluated entirely inside local browser memory.',
                },
                {
                  vector: 'Turnaround Time',
                  legacy: '3 to 5 business days of manual compliance back-and-forth.',
                  zk: 'Sub-3-second client-side SNARK synthesis and instant block finality.',
                },
                {
                  vector: 'Honeypot & Subpoena Liability',
                  legacy: 'Target-rich database for ransomware rings and identity theft syndicates.',
                  zk: 'Mathematically eliminated surface. Zero credentials store exists to breach.',
                },
              ].map((row, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    backgroundColor: idx % 2 === 0 ? 'rgba(255, 255, 255, 0.01)' : 'transparent',
                  }}
                >
                  <td style={{ padding: '16px 20px', fontWeight: 600, color: '#fff' }}>{row.vector}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--text-muted)' }}>{row.legacy}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--text-primary)', fontWeight: 500 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={16} color="var(--emerald-primary)" style={{ flexShrink: 0 }} />
                      <span>{row.zk}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section
        style={{
          padding: '60px 24px 100px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        <div
          className="glass-panel-gold"
          style={{
            padding: '50px 30px',
            textAlign: 'center',
            background: 'linear-gradient(180deg, rgba(28, 30, 36, 0.95) 0%, rgba(12, 13, 16, 0.98) 100%)',
          }}
        >
          <VaultEmblem size={48} style={{ margin: '0 auto 20px' }} />
          <h2 className="font-display" style={{ fontSize: '30px', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
            Empower Your Syndicate with Zero-Knowledge Diligence
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 30px', fontSize: '15px' }}>
            Deploy custom thresholds or verify your accreditation status directly on the Midnight Preprod network today.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link
              to="/verify"
              className="gold-shimmer-btn"
              style={{
                padding: '13px 26px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>Launch Verification Terminal</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/admin"
              style={{
                padding: '13px 22px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                border: '1px solid rgba(201, 168, 106, 0.4)',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
              }}
            >
              Deploy Contract Instance
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
