import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const [proofMode, setProofMode] = useState<'nw' | 'inc'>('nw');
  const [witnessValue, setWitnessValue] = useState('1,850,000.00');
  const [isProving, setIsProving] = useState(false);
  const [proofProgress, setProofProgress] = useState(0);
  const [proofSuccess, setProofSuccess] = useState(false);
  const [copiedTokens, setCopiedTokens] = useState(false);

  const handleModeToggle = (mode: 'nw' | 'inc') => {
    setProofMode(mode);
    setProofSuccess(false);
    if (mode === 'nw') {
      setWitnessValue('1,850,000.00');
    } else {
      setWitnessValue('340,000.00');
    }
  };

  const handleSimulateProof = () => {
    setIsProving(true);
    setProofProgress(0);
    setProofSuccess(false);

    const interval = setInterval(() => {
      setProofProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProving(false);
            setProofSuccess(true);
          }, 250);
          return 100;
        }
        return prev + 15;
      });
    }, 100);
  };

  const copyTokens = () => {
    const tokens = `:root {
  --bg-obsidian: #090A0C;
  --surface-carbon: #111317;
  --gold-primary: #D4AF37;
  --gold-highlight: #F3E5AB;
  --zk-emerald: #10B981;
  --slate-subtle: #94A3B8;
  --zk-soundness: 128bit;
}`;
    navigator.clipboard.writeText(tokens);
    setCopiedTokens(true);
    setTimeout(() => setCopiedTokens(false), 2000);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Sovereign Ambient Glow Scrim */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-primary/10 rounded-full blur-[140px] pointer-events-none"></div>

        {/* 1. HERO SECTION */}
        <section className="max-w-[1440px] mx-auto px-margin md:px-margin-desktop pt-space-xl pb-space-xl md:pt-20 md:pb-28 relative z-10 flex flex-col items-center text-center">
          {/* Super-Title Micro Pill Badge */}
          <div className="inline-flex items-center gap-space-sm px-4 py-1.5 rounded-full bg-surface-container-low shadow-sm mb-space-lg group hover:shadow-md transition-all">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="font-code-sm text-code-sm text-primary uppercase tracking-[0.14em]">
              INSTITUTIONAL ZERO-KNOWLEDGE PROOFS ON MIDNIGHT
            </span>
            <span className="material-symbols-outlined text-primary text-[14px]">lock</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero text-on-surface max-w-5xl tracking-tight mb-space-md">
            Prove Accredited Wealth.
            <br className="hidden sm:inline" />{' '}
            <span className="bg-gradient-to-r from-[#F3E5AB] via-primary to-primary-container bg-clip-text text-transparent">
              Disclose Zero Financials.
            </span>
          </h1>

          {/* Executive Subtitle */}
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed mb-space-xl">
            A decentralized institutional gateway enabling LPs, family offices, angel syndicates, and fund managers to
            cryptographically verify regulatory accreditation without uploading bank statements, W-2s, or tax identities to
            vulnerable centralized third parties.
          </p>

          {/* CTA Sovereign Action Cluster */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-space-md w-full max-w-md mb-space-xl">
            <Link
              to="/verify"
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-gradient-to-r from-[#F3E5AB] via-primary to-primary-container text-on-primary font-body-md text-body-md font-semibold flex items-center justify-center gap-space-sm shadow-xl hover:brightness-110 active:scale-[0.99] transition-all"
            >
              <span>Verify Accreditation (ZK)</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>

            <Link
              to="/admin"
              className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md hover:bg-surface-container-high transition-colors flex items-center justify-center gap-space-sm shadow-sm"
            >
              <span className="material-symbols-outlined text-primary text-[18px]">settings_suggest</span>
              <span>Deploy Contract Portal</span>
            </Link>
          </div>

          {/* Key Metrics Strip */}
          <div className="w-full max-w-5xl grid grid-cols-2 lg:grid-cols-4 gap-space-sm md:gap-space-md pt-space-lg">
            <div className="flex flex-col items-center justify-center p-space-md rounded-lg bg-surface-container-low/80 backdrop-blur-md shadow-sm">
              <div className="font-code-lg text-code-lg text-primary font-semibold tracking-tight mb-space-xs">$480M+</div>
              <div className="font-code-sm text-code-sm text-outline uppercase tracking-wider text-center">
                Private Value Attested
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-space-md rounded-lg bg-surface-container-low/80 backdrop-blur-md shadow-sm">
              <div className="font-code-lg text-code-lg text-secondary font-semibold tracking-tight mb-space-xs">
                &lt; 2.4s
              </div>
              <div className="font-code-sm text-code-sm text-outline uppercase tracking-wider text-center">
                Local Witness Generation
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-space-md rounded-lg bg-surface-container-low/80 backdrop-blur-md shadow-sm">
              <div className="font-code-lg text-code-lg text-primary font-semibold tracking-tight mb-space-xs">0 Bytes</div>
              <div className="font-code-sm text-code-sm text-outline uppercase tracking-wider text-center">
                Financial Data Leaked
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-space-md rounded-lg bg-surface-container-low/80 backdrop-blur-md shadow-sm">
              <div className="font-code-lg text-code-lg text-secondary font-semibold tracking-tight mb-space-xs">100%</div>
              <div className="font-code-sm text-code-sm text-outline uppercase tracking-wider text-center">
                Midnight Compact Compliant
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 2. LIVE PROOF ARCHITECTURE BENTO GRID */}
      <section className="max-w-[1440px] mx-auto px-margin md:px-margin-desktop py-space-xl w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
          <div>
            <div className="font-code-sm text-code-sm text-primary uppercase tracking-widest mb-space-xs">
              // PROTOCOL SPECIFICATION
            </div>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
              Zero-Knowledge Architecture Matrix
            </h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-2 md:mt-0">
            Deterministic, mathematically verifiable proofs computed strictly inside local WASM memory. Zero plaintext
            disclosure at all stages.
          </p>
        </div>

        {/* 3 Bento Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter-desktop">
          {/* Card 1: Private Witness Isolation */}
          <div className="bg-surface-container-low rounded-xl p-space-lg flex flex-col justify-between shadow-lg relative overflow-hidden group hover:bg-surface-container transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between mb-space-md">
                <span className="font-code-sm text-code-sm text-on-surface-variant uppercase tracking-wider">STAGE 01</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-code-sm text-code-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  WASM Execution
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-space-sm">Private Witness Isolation</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg">
                Client-side liquidity evaluation (&gt; $1M Net Worth or $200k+ Annual Income) executes in browser memory via
                1AM WebAssembly runtime. No plain amounts touch network packets.
              </p>

              <div className="p-space-md rounded-lg bg-surface-container-lowest shadow-inner mb-space-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-code-sm text-code-sm text-outline">Client Sandbox Environment</span>
                  <span className="font-code-sm text-code-sm text-secondary">ISOLATED</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded bg-surface-container-low">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[16px]">key</span>
                      <span className="font-code-sm text-code-sm text-on-surface">Secret Input (Liquid Capital)</span>
                    </div>
                    <span className="font-code-sm text-code-sm text-primary tracking-widest">••••••••••</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-surface-container-low">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-[16px]">memory</span>
                      <span className="font-code-sm text-code-sm text-on-surface">Predicate Circuit Evaluator</span>
                    </div>
                    <span className="font-code-sm text-code-sm text-secondary">&gt;= $1,000,000.00</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-24 h-6 text-primary" fill="none" viewBox="0 0 100 25">
                      <path
                        d="M0 12 L20 12 L28 4 L40 20 L52 8 L65 14 L80 6 L100 12"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      />
                    </svg>
                    <span className="font-code-sm text-code-sm text-outline">Witness State Hash</span>
                  </div>
                  <span className="font-code-sm text-code-sm text-on-surface font-medium">0x8B...C2</span>
                </div>
              </div>
            </div>

            <div className="pt-space-sm flex items-center gap-2 text-on-surface-variant font-code-sm text-code-sm">
              <span className="material-symbols-outlined text-[16px] text-primary">verified_user</span>
              <span>Zero transmission to VentureGate node</span>
            </div>
          </div>

          {/* Card 2: Cryptographic ZK Proof */}
          <div className="bg-surface-container-low rounded-xl p-space-lg flex flex-col justify-between shadow-lg relative overflow-hidden group hover:bg-surface-container transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between mb-space-md">
                <span className="font-code-sm text-code-sm text-on-surface-variant uppercase tracking-wider">STAGE 02</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container text-secondary font-code-sm text-code-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Compact Circuit
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-space-sm">Cryptographic SNARK Proof</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg">
                Synthesis via Midnight Compact smart contract circuits. Mathematical SNARK proof verifies that financial
                constraint equations hold true without revealing exact figures.
              </p>

              <div className="p-space-md rounded-lg bg-surface-container-lowest shadow-inner mb-space-md font-code-sm text-code-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-outline">Circuit Artifact</span>
                  <span className="text-primary font-semibold">venturegate.compact</span>
                </div>
                <div className="p-2.5 rounded bg-surface-container-low mb-2 break-all text-on-surface-variant font-code-sm leading-relaxed">
                  <span className="text-primary">π_zk</span> = 0x9b3f41e8c467a21dc07f90e5138bc42f9da8214157d6ef62...
                </div>
                <div className="grid grid-cols-2 gap-2 text-center pt-1">
                  <div className="bg-surface-container-low p-2 rounded">
                    <span className="block text-outline text-[10px]">CONSTRAINTS</span>
                    <span className="font-code-md text-code-md text-on-surface font-semibold">14,288</span>
                  </div>
                  <div className="bg-surface-container-low p-2 rounded">
                    <span className="block text-outline text-[10px]">PROOF TIME</span>
                    <span className="font-code-md text-code-md text-secondary font-semibold">&lt; 2.0 sec</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-space-sm flex items-center gap-2 text-on-surface-variant font-code-sm text-code-sm">
              <span className="material-symbols-outlined text-[16px] text-secondary">lock_clock</span>
              <span>Zero-Knowledge Soundness ≥ 128-bit</span>
            </div>
          </div>

          {/* Card 3: On-Chain Sovereign Attestation */}
          <div className="bg-surface-container-low rounded-xl p-space-lg flex flex-col justify-between shadow-lg relative overflow-hidden group hover:bg-surface-container transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between mb-space-md">
                <span className="font-code-sm text-code-sm text-on-surface-variant uppercase tracking-wider">STAGE 03</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container/20 text-secondary font-code-sm text-code-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Ledger State
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-space-sm">On-Chain Attestation</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg">
                Midnight Preprod ledger registers a single immutable boolean validity attestation. Observers and indexers witness
                verification without balance leaks.
              </p>

              <div className="p-space-md rounded-lg bg-surface-container-lowest shadow-inner mb-space-md font-code-sm text-code-sm space-y-1.5">
                <div className="flex justify-between items-center pb-1">
                  <span className="text-outline">Midnight Network</span>
                  <span className="text-on-surface">Preprod</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-outline">Attestation State</span>
                  <span className="text-secondary font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    ACCREDITED_VALID
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-outline">ZK Proof Circuit</span>
                  <span className="text-on-surface-variant">verify_accreditation</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-outline">Exposed Balance</span>
                  <span className="text-primary font-mono font-semibold">0.00 (SHIELDED)</span>
                </div>
              </div>
            </div>

            <div className="pt-space-sm flex items-center gap-2 text-on-surface-variant font-code-sm text-code-sm">
              <span className="material-symbols-outlined text-[16px] text-primary">account_balance</span>
              <span>Reusable across all Midnight syndicates</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRIVACY MODEL COMPARISON MATRIX */}
      <section className="max-w-[1440px] mx-auto px-margin md:px-margin-desktop py-space-xl w-full">
        <div className="mb-space-lg text-left">
          <div className="font-code-sm text-code-sm text-primary uppercase tracking-widest mb-space-xs">
            // INSTITUTIONAL COMPLIANCE DISRUPTION
          </div>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
            Legacy Diligence vs. VentureGate ZK
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">
            Comparing attack surface vectors, identity liabilities, and operational turnaround between legacy centralized
            verification portals and Midnight Compact ZK proofs.
          </p>
        </div>

        <div className="w-full overflow-x-auto rounded-xl bg-surface-container-low shadow-xl">
          <table className="w-full text-left min-w-[760px]">
            <thead>
              <tr className="bg-surface-container-lowest text-outline font-code-sm text-code-sm uppercase tracking-wider">
                <th className="py-4 px-6">Verification Vector</th>
                <th className="py-4 px-6 w-1/3">Traditional KYC / Legacy Portals</th>
                <th className="py-4 px-6 w-1/3 bg-surface-container-high text-primary font-semibold">
                  VentureGate (Midnight ZK)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container font-body-md text-body-md">
              <tr className="hover:bg-surface-container/50 transition-colors">
                <td className="py-4 px-6 font-semibold text-on-surface">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">account_balance</span>
                    <span>Bank Balance &amp; Liquid Capital</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-on-surface-variant">
                  Exposes exact account amounts and statements directly to third-party clerks and offshore reviewers.
                </td>
                <td className="py-4 px-6 bg-surface-container/40 text-on-surface">
                  <div className="flex items-center gap-2 text-secondary font-code-md text-code-md font-medium">
                    <span className="material-symbols-outlined text-[16px]">shield</span>
                    <span>100% Private Local Witness</span>
                  </div>
                  <span className="text-on-surface-variant text-body-sm block mt-0.5">
                    Evaluated in browser memory. Ledger only learns boolean outcome.
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-surface-container/50 transition-colors">
                <td className="py-4 px-6 font-semibold text-on-surface">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">receipt_long</span>
                    <span>Tax Returns &amp; W-2 Records</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-on-surface-variant">
                  Permanent unencrypted or weakly encrypted PDF uploads sitting in AWS S3 compliance buckets.
                </td>
                <td className="py-4 px-6 bg-surface-container/40 text-on-surface">
                  <div className="flex items-center gap-2 text-secondary font-code-md text-code-md font-medium">
                    <span className="material-symbols-outlined text-[16px]">task_alt</span>
                    <span>Zero Document Transmission</span>
                  </div>
                  <span className="text-on-surface-variant text-body-sm block mt-0.5">
                    Witness inputs verified via Compact zero-knowledge circuits.
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-surface-container/50 transition-colors">
                <td className="py-4 px-6 font-semibold text-on-surface">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">timelapse</span>
                    <span>Accreditation Verification Speed</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-on-surface-variant">
                  3 to 5 business days of manual compliance back-and-forth, risking missed private allocations.
                </td>
                <td className="py-4 px-6 bg-surface-container/40 text-on-surface">
                  <div className="flex items-center gap-2 text-primary font-code-md text-code-md font-medium">
                    <span className="material-symbols-outlined text-[16px]">bolt</span>
                    <span>Instant Autonomous SNARK (&lt; 2.4s)</span>
                  </div>
                  <span className="text-on-surface-variant text-body-sm block mt-0.5">
                    Immediate eligibility signature registered on Midnight Network.
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-surface-container/50 transition-colors">
                <td className="py-4 px-6 font-semibold text-on-surface">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">security</span>
                    <span>Data Breach &amp; Subpoena Risk</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-on-surface-variant">
                  Catastrophic high-net-worth target profile for ransomware syndicates and identity theft rings.
                </td>
                <td className="py-4 px-6 bg-surface-container/40 text-on-surface">
                  <div className="flex items-center gap-2 text-secondary font-code-md text-code-md font-medium">
                    <span className="material-symbols-outlined text-[16px]">lock_reset</span>
                    <span>Mathematically Eliminated Surface</span>
                  </div>
                  <span className="text-on-surface-variant text-body-sm block mt-0.5">
                    No centralized credentials store exists to breach or compromise.
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. LIVE INTERACTIVE PROVING SIMULATOR & DESIGN STATES */}
      <section className="max-w-[1440px] mx-auto px-margin md:px-margin-desktop py-space-xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop">
          {/* Left Column: Interactive Demonstration Simulator (7 cols) */}
          <div className="lg:col-span-7 bg-surface-container-low rounded-xl p-space-lg shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-space-md">
                <div>
                  <span className="font-code-sm text-code-sm text-primary uppercase tracking-widest block">
                    // TEST HARNESS
                  </span>
                  <h3 className="font-headline-md text-headline-md text-on-surface">Client Proof Synthesizer</h3>
                </div>
                <span className="font-code-sm text-code-sm text-outline px-2.5 py-1 rounded bg-surface-container-lowest">
                  Compact IR 0.16.0
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg">
                Simulate an institutional LP proving eligibility under SEC Rule 501(a) (Net Worth &gt; $1,000,000 USD exclusive
                of primary residence) on the Midnight Preprod test engine.
              </p>

              {/* Interactive Form Controls */}
              <div className="space-y-space-md mb-space-lg">
                <div>
                  <label className="block font-code-sm text-code-sm text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Proof Objective
                  </label>
                  <div className="grid grid-cols-2 gap-2 p-1 rounded-lg bg-surface-container-lowest">
                    <button
                      onClick={() => handleModeToggle('nw')}
                      className={`py-2 rounded font-body-md text-body-md text-center font-medium transition-colors ${
                        proofMode === 'nw' ? 'bg-surface-container text-on-surface' : 'text-outline hover:text-on-surface'
                      }`}
                      type="button"
                    >
                      Liquid Net Worth (&gt;$1M)
                    </button>
                    <button
                      onClick={() => handleModeToggle('inc')}
                      className={`py-2 rounded font-body-md text-body-md text-center font-medium transition-colors ${
                        proofMode === 'inc' ? 'bg-surface-container text-on-surface' : 'text-outline hover:text-on-surface'
                      }`}
                      type="button"
                    >
                      Annual Income (&gt;$200k)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-code-sm text-code-sm text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Local Asset Witness Value (Stays in Browser Memory)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-code-md text-code-md text-outline">$</span>
                    <input
                      className="w-full bg-surface-container-lowest pl-8 pr-4 py-2.5 rounded-lg text-on-surface font-code-md text-code-md focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
                      type="text"
                      value={witnessValue}
                      onChange={(e) => setWitnessValue(e.target.value)}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 font-code-sm text-code-sm text-secondary flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">lock</span>
                      SHIELDED
                    </span>
                  </div>
                </div>
              </div>

              {/* Proof Progress Bar */}
              {isProving && (
                <div className="mb-space-lg p-space-md rounded-lg bg-surface-container-lowest shadow-inner">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-code-sm text-code-sm text-primary flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                      Synthesizing ZK SNARK Circuit...
                    </span>
                    <span className="font-code-sm text-code-sm text-on-surface font-mono">{proofProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-150"
                      style={{ width: `${proofProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Proof Output Success Badge */}
              {proofSuccess && (
                <div className="mb-space-lg p-space-md rounded-lg bg-secondary-container/20 text-on-surface shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-secondary text-[20px]">verified</span>
                    <span className="font-code-md text-code-md text-secondary font-semibold">
                      Proof Generated &amp; Verified Valid
                    </span>
                  </div>
                  <p className="font-code-sm text-code-sm text-on-surface-variant break-all">
                    Nullifier: <span className="text-on-surface font-mono">0x4ae8c17...f93b</span> | Midnight Attestation:{' '}
                    <span className="text-secondary font-mono">CONFIRMED (TX #0x92a4)</span>
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-space-sm pt-2">
              <button
                onClick={handleSimulateProof}
                disabled={isProving}
                className="flex-1 py-3.5 rounded-lg bg-gradient-to-r from-[#F3E5AB] via-primary to-primary-container text-on-primary font-body-md text-body-md font-semibold flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-50"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">lock_open</span>
                <span>{isProving ? 'Synthesizing Proof...' : 'Generate Local ZK Attestation'}</span>
              </button>

              <Link
                to="/verify"
                className="px-6 py-3.5 rounded-lg bg-surface-container text-on-surface font-body-md text-body-md hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Full Terminal</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Tokens & State Specs (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-space-md">
            {/* Token Inspector Preview Card */}
            <div className="bg-surface-container-low rounded-xl p-space-lg shadow-xl">
              <div className="flex items-center justify-between mb-space-sm">
                <span className="font-code-sm text-code-sm text-primary uppercase tracking-wider">// DESIGN TOKENS</span>
                <button
                  onClick={copyTokens}
                  className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 font-code-sm text-code-sm"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {copiedTokens ? 'check' : 'content_copy'}
                  </span>
                  <span>{copiedTokens ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface mb-space-sm">Midnight Sovereign Tokens</h4>
              <pre className="bg-surface-container-lowest p-space-md rounded-lg text-on-surface-variant font-code-sm text-code-sm overflow-x-auto leading-relaxed shadow-inner">
                <code>{`:root {
  --bg-obsidian: #090A0C;
  --surface-carbon: #111317;
  --gold-primary: #D4AF37;
  --gold-highlight: #F3E5AB;
  --zk-emerald: #10B981;
  --slate-subtle: #94A3B8;
  --zk-soundness: 128bit;
}`}</code>
              </pre>
            </div>

            {/* Component Verification States Showcase */}
            <div className="bg-surface-container-low rounded-xl p-space-lg shadow-xl">
              <div className="font-code-sm text-code-sm text-primary uppercase tracking-wider mb-space-xs">// STATE SPECS</div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface mb-space-md">Proof State Badge Tokens</h4>
              <div className="flex flex-wrap gap-2.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-code-sm text-code-sm shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-outline"></span>
                  <span>IDLE / READY</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-tertiary-container/20 text-tertiary font-code-sm text-code-sm shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
                  <span>PROVING CIRCUIT</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-container/20 text-secondary font-code-sm text-code-sm shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span>ACCREDITED (ZK)</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-code-sm text-code-sm shadow-sm">
                  <span className="material-symbols-outlined text-[14px]">shield</span>
                  <span>SHIELDED WITNESS</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-error-container/20 text-error font-code-sm text-code-sm shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-error"></span>
                  <span>CONSTRAINT FAILED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ARCHITECTURAL CALLOUT / SOVEREIGN GUARANTEE */}
      <section className="max-w-[1440px] mx-auto px-margin md:px-margin-desktop pt-space-md pb-space-xl w-full">
        <div className="p-space-lg md:p-space-xl rounded-xl bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-low shadow-2xl flex flex-col md:flex-row items-center justify-between gap-space-lg">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-primary font-code-sm text-code-sm uppercase tracking-wider mb-1">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Institutional Verification Standard
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">
              Ready to Integrate VentureGate into Your Syndicate?
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Deploy the Compact predicate circuit on your Midnight LP portal in under 15 minutes. Compatible with all Midnight
              wallet providers.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              to="/admin"
              className="w-full md:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-[#F3E5AB] via-primary to-primary-container text-on-primary font-body-md text-body-md font-semibold text-center shadow-lg hover:brightness-110 transition-all"
            >
              Deploy Portal Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
