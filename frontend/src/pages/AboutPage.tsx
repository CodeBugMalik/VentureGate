import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-background text-on-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-y-12">
        
        {/* Header Ribbon */}
        <motion.div 
          className="text-center flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant/30 text-xs font-code-sm text-primary uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            Zero-Knowledge Investor Protection
          </div>
          <h1 className="font-headline-lg text-3xl sm:text-5xl font-semibold tracking-tight text-on-surface">
            About Venture<span className="text-primary">Gate</span>
          </h1>
          <p className="font-body-md text-on-surface-variant max-w-2xl text-base sm:text-lg leading-relaxed">
            Cryptographic accreditation gateway built on the Midnight Network. We replace centralized document disclosure with mathematical zero-knowledge proofs.
          </p>
        </motion.div>

        {/* 3 Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: The Problem */}
          <motion.div 
            className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/30 shadow-md flex flex-col gap-3 relative overflow-hidden"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary border border-primary/20 mb-2">
              <span className="material-symbols-outlined text-[22px]">lock_clock</span>
            </div>
            <h3 className="font-headline-sm text-lg font-semibold text-on-surface">The Centralized Hazard</h3>
            <p className="font-body-sm text-on-surface-variant text-sm leading-relaxed">
              Traditional venture syndicates and broker-dealers mandate unencrypted W-2s, 1040 tax returns, and bank statements stored in centralized cloud databases — exposing high-net-worth investors to catastrophic identity theft and leak vectors.
            </p>
          </motion.div>

          {/* Card 2: The Solution */}
          <motion.div 
            className="bg-surface-container-low p-6 rounded-xl border border-primary/30 shadow-md flex flex-col gap-3 relative overflow-hidden"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/30 mb-2">
              <span className="material-symbols-outlined text-[22px]">enhanced_encryption</span>
            </div>
            <h3 className="font-headline-sm text-lg font-semibold text-primary">The Midnight Inversion</h3>
            <p className="font-body-sm text-on-surface-variant text-sm leading-relaxed">
              VentureGate sends verification circuits directly to your local client environment. Your private financial values stay encapsulated inside a local ZK-SNARK witness, computing an immutable mathematical assertion without revealing underlying figures.
            </p>
          </motion.div>

          {/* Card 3: Institutional Standard */}
          <motion.div 
            className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/30 shadow-md flex flex-col gap-3 relative overflow-hidden"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/30 mb-2">
              <span className="material-symbols-outlined text-[22px]">verified</span>
            </div>
            <h3 className="font-headline-sm text-lg font-semibold text-secondary">SEC Rule 506(c) Ready</h3>
            <p className="font-body-sm text-on-surface-variant text-sm leading-relaxed">
              Emits tamper-proof proof tokens compliant with statutory accredited investor metrics ($1,000,000 net worth / $200,000 recurring income), directly verifiable by issuers and syndicates on the Midnight Preprod and Preview ledgers.
            </p>
          </motion.div>
        </div>

        {/* Deep Dive Architecture Section */}
        <motion.div 
          className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/30 shadow-lg flex flex-col gap-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[24px]">terminal</span>
              <h2 className="font-headline-sm text-xl font-semibold text-on-surface">Compact Smart Contract Architecture</h2>
            </div>
            <span className="font-code-sm text-xs px-2.5 py-1 rounded bg-surface-container border border-outline-variant/30 text-on-surface-variant">
              v0.8.4 Compiler
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="flex flex-col gap-3">
              <h4 className="font-code-sm uppercase tracking-wider text-primary text-xs font-semibold">1. Private Witness Layer</h4>
              <p className="text-on-surface-variant leading-relaxed">
                Investors enter private net worth and income metrics. These figures are ingested solely by the client-side witness function and are never published to any ledger, RPC endpoint, or indexer.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-code-sm uppercase tracking-wider text-secondary text-xs font-semibold">2. Cryptographic Circuit Assertions</h4>
              <p className="text-on-surface-variant leading-relaxed">
                The Compact circuit executes zero-knowledge constraints:
                <code className="block my-2 p-2 bg-surface-container-lowest rounded border border-outline-variant/30 font-mono text-xs text-primary">
                  assert(net_worth &gt;= min_nw || income &gt;= min_inc)
                </code>
                Only the boolean truth of this condition crosses the privacy boundary.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-code-sm uppercase tracking-wider text-primary text-xs font-semibold">3. 1AM Enclave Balancing</h4>
              <p className="text-on-surface-variant leading-relaxed">
                Transactions are balanced with zero dust fees via the 1AM browser extension, ensuring frictionless institutional onboarding without gas procurement friction.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-code-sm uppercase tracking-wider text-secondary text-xs font-semibold">4. Public Ledger Settlement</h4>
              <p className="text-on-surface-variant leading-relaxed">
                The Midnight partnerchain updates the state root with verified proof attestations. Issuer smart contracts query proof validity while investor privacy remains 100% airtight.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-outline-variant/30">
            <div className="flex items-center gap-3">
              <Link 
                to="/verify" 
                className="px-5 py-2.5 rounded-lg bg-primary text-on-primary font-semibold text-sm hover:bg-primary-fixed-dim transition-colors flex items-center gap-2"
              >
                <span>Launch Verification Terminal</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
              <Link 
                to="/admin" 
                className="px-5 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-sm border border-outline-variant/30 transition-colors flex items-center gap-2"
              >
                <span>Admin Deployer</span>
                <span className="material-symbols-outlined text-[16px]">settings</span>
              </Link>
            </div>
            <a 
              href="https://github.com/CodeBugMalik/VentureGate" 
              target="_blank" 
              rel="noreferrer" 
              className="text-on-surface-variant hover:text-primary transition-colors text-xs font-code-sm flex items-center gap-1.5"
            >
              <span>GitHub Repository</span>
              <span className="material-symbols-outlined text-[14px]">north_east</span>
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
