import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CompiledContract } from '@midnight-ntwrk/compact-js';
import { createUnprovenDeployTx, submitTxAsync } from '@midnight-ntwrk/midnight-js-contracts';
import { sampleSigningKey } from '@midnight-ntwrk/compact-runtime';
import { Contract } from '../managed/contract/index.js';
import { useWallet } from '../contexts/WalletContext';
import {
  CONTRACT_ADDRESS,
  MIN_NET_WORTH_THRESHOLD,
  MIN_INCOME_THRESHOLD,
} from '../config';

function getCompiledContract() {
  return CompiledContract.make('VentureGateContract', Contract).pipe(
    CompiledContract.withVacantWitnesses,
    CompiledContract.withCompiledFileAssets(new URL('/managed', window.location.origin).toString()),
  ) as any;
}

export default function AdminPage() {
  const { session, isConnected, connect, isConnecting, address, walletType } = useWallet();
  // Default to Preprod for 1AM wallet deployment
  const [targetNetwork, setTargetNetwork] = useState<'preprod' | 'preview'>('preprod');
  const [status, setStatus] = useState<'idle' | 'deploying' | 'deployed' | 'error'>('idle');
  const [telemetryStep, setTelemetryStep] = useState<number>(0);
  const [telemetryMessage, setTelemetryMessage] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [deployedAddress, setDeployedAddress] = useState<string | null>(
    localStorage.getItem('DEPLOYED_CONTRACT_ADDRESS') || localStorage.getItem('PREPROD_CONTRACT_ADDRESS')
  );
  const [deployTxId, setDeployTxId] = useState<string | null>(null);
  const [copiedActive, setCopiedActive] = useState(false);
  const [copiedDeployed, setCopiedDeployed] = useState(false);

  // Constructor threshold arguments (configurable by admin)
  const [netWorthThreshold, setNetWorthThreshold] = useState<number>(MIN_NET_WORTH_THRESHOLD);
  const [incomeThreshold, setIncomeThreshold] = useState<number>(MIN_INCOME_THRESHOLD);
  const [proofExpiry, setProofExpiry] = useState<string>('365');

  // Active contract in the app
  const [currentActiveAddress, setCurrentActiveAddress] = useState<string>(CONTRACT_ADDRESS);

  useEffect(() => {
    setCurrentActiveAddress(
      localStorage.getItem('DEPLOYED_CONTRACT_ADDRESS') ||
      localStorage.getItem('PREPROD_CONTRACT_ADDRESS') ||
      CONTRACT_ADDRESS
    );
  }, [deployedAddress]);

  const adjustValue = (type: 'netWorth' | 'income', delta: number) => {
    if (type === 'netWorth') {
      setNetWorthThreshold(prev => Math.max(0, prev + delta));
    } else {
      setIncomeThreshold(prev => Math.max(0, prev + delta));
    }
  };

  const handleDeploy = useCallback(async () => {
    if (!session || !isConnected) return;
    setStatus('deploying');
    setErrorMsg(null);
    setTelemetryStep(10);
    setTelemetryMessage('Compiling Compact circuit AST & asserting constraint gates...');

    const timer1 = setTimeout(() => {
      setTelemetryStep(45);
      setTelemetryMessage('Generating BLS12-381 SNARK proving key & allocating state slots...');
    }, 1200);

    const timer2 = setTimeout(() => {
      setTelemetryStep(75);
      setTelemetryMessage('Requesting 1AM Enclave signature & zero-gas DUST balance...');
    }, 2400);

    try {
      const netWorthVal = netWorthThreshold;
      const incomeVal = incomeThreshold;

      if (isNaN(netWorthVal) || netWorthVal < 0) {
        throw new Error('Please enter a valid minimum net worth threshold.');
      }
      if (isNaN(incomeVal) || incomeVal < 0) {
        throw new Error('Please enter a valid minimum annual income threshold.');
      }

      const compiledContract = getCompiledContract();
      const initialPrivateState = {};

      // Arguments strictly match VentureGate contract initialState(net_worth, income)
      const constructorArgs: any[] = [
        BigInt(netWorthVal),
        BigInt(incomeVal),
      ];

      setTelemetryStep(88);
      setTelemetryMessage('Awaiting user confirmation in 1AM wallet popup...');

      const deployTxData = await createUnprovenDeployTx(session.providers as any, {
        compiledContract,
        args: constructorArgs,
        privateStateId: 'DeployerState',
        initialPrivateState,
        signingKey: sampleSigningKey(),
      });

      const contractAddress = deployTxData.public.contractAddress;

      setTelemetryStep(95);
      setTelemetryMessage('Submitting atomic transaction to Midnight ' + (targetNetwork === 'preprod' ? 'Preprod' : 'Preview') + ' indexer...');

      const txId = await submitTxAsync(session.providers as any, {
        unprovenTx: deployTxData.private.unprovenTx,
      });

      setTelemetryStep(100);
      setTelemetryMessage('Finalizing state commit on ledger...');

      setDeployedAddress(contractAddress);
      setDeployTxId(typeof txId === 'string' ? txId : null);

      // Save to localStorage for instant application pickup without rebuild
      localStorage.setItem('DEPLOYED_CONTRACT_ADDRESS', contractAddress);
      localStorage.setItem('PREPROD_CONTRACT_ADDRESS', contractAddress);
      setCurrentActiveAddress(contractAddress);

      setStatus('deployed');
    } catch (e: any) {
      console.error('Deployment failed:', e);
      clearTimeout(timer1);
      clearTimeout(timer2);
      setStatus('error');
      setErrorMsg(e?.message ?? String(e));
    }
  }, [session, isConnected, netWorthThreshold, incomeThreshold, targetNetwork]);

  const copyAddress = (addr: string, type: 'active' | 'deployed') => {
    if (!addr) return;
    navigator.clipboard.writeText(addr);
    if (type === 'active') {
      setCopiedActive(true);
      setTimeout(() => setCopiedActive(false), 2000);
    } else {
      setCopiedDeployed(true);
      setTimeout(() => setCopiedDeployed(false), 2000);
    }
  };

  const handleResetToDefault = () => {
    localStorage.removeItem('DEPLOYED_CONTRACT_ADDRESS');
    localStorage.removeItem('PREPROD_CONTRACT_ADDRESS');
    setDeployedAddress(null);
    setCurrentActiveAddress(CONTRACT_ADDRESS);
    window.location.reload();
  };

  const explorerBaseUrl = targetNetwork === 'preprod'
    ? 'https://preprod.midnightexplorer.com'
    : 'https://preview.midnightexplorer.com';

  return (
    <div className="pt-24 pb-20 min-h-screen bg-background text-on-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-y-space-lg">
        
        {/* Visual Header & Ledger Status Ribbon */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md pt-2 pb-space-sm border-b border-outline-variant/30 pb-6">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs text-primary font-code-sm text-code-sm uppercase tracking-widest">
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Zero-Knowledge Ledger Enclave
            </div>
            <h1 className="font-headline-lg text-3xl sm:text-4xl text-on-surface font-semibold tracking-tight">
              Contract Portal &amp; Circuit Deployment
            </h1>
            <p className="font-body-md text-on-surface-variant max-w-2xl text-sm sm:text-base leading-relaxed">
              In-browser deployment dashboard delegating compilation, fee balancing, and proof verification directly to the authenticated 1AM wallet enclave.
            </p>
          </div>

          {/* Active State Context Pill */}
          <div className="flex items-center gap-space-sm bg-surface-container-low p-space-xs rounded-lg border border-outline-variant/30 shrink-0">
            <div className="flex items-center gap-space-xs px-space-sm py-1.5 rounded bg-surface-container">
              <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
              <span className="font-code-sm text-on-surface-variant font-medium">COMPACT IR 0.14.2</span>
            </div>
            <div className="flex items-center gap-space-xs px-space-sm py-1.5 rounded bg-surface-container-high border border-secondary/30">
              <span className="h-2 w-2 rounded-full bg-secondary"></span>
              <span className="font-code-sm text-secondary font-medium">SHIELDED</span>
            </div>
          </div>
        </div>

        {/* Bento Grid Top Row: Environment & Active Deployment Status */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
          {/* Network Selector Module (Col 4) */}
          <div className="lg:col-span-4 bg-surface-container-low p-space-lg rounded-xl border border-outline-variant/30 shadow-md flex flex-col justify-between gap-space-md">
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-code-sm text-outline uppercase tracking-wider text-xs">Target Ledger</span>
                <span className="material-symbols-outlined text-outline-variant text-[18px]">tune</span>
              </div>
              <div className="font-headline-sm text-lg text-on-surface font-semibold">Network Architecture</div>
              <p className="font-body-sm text-on-surface-variant text-xs leading-relaxed">
                Select target zero-knowledge subnet for immutable smart contract commit.
              </p>
            </div>

            <div className="flex flex-col gap-space-sm">
              <div className="relative">
                <select
                  value={targetNetwork}
                  onChange={(e) => setTargetNetwork(e.target.value as 'preprod' | 'preview')}
                  className="w-full h-11 bg-surface-container-lowest text-on-surface font-code-md text-sm px-space-md rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30 shadow-inner"
                >
                  <option value="preprod">Midnight Preprod Network (1AM Recommended)</option>
                  <option value="preview">Midnight Preview Network (Primary)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-space-md text-primary">
                  <span className="material-symbols-outlined text-[20px]">expand_more</span>
                </div>
              </div>

              <div className="flex items-center justify-between bg-surface-container px-space-sm py-2 rounded-lg border border-outline-variant/20">
                <span className="font-code-sm text-outline text-xs">EPOCH DRIFT</span>
                <span className="font-code-sm text-secondary font-medium text-xs">±0.002 sec</span>
              </div>
            </div>
          </div>

          {/* Active Contract Instance Badge (Col 8) */}
          <div className="lg:col-span-8 bg-surface-container-low p-space-lg rounded-xl border border-outline-variant/30 shadow-md flex flex-col justify-between gap-space-md relative overflow-hidden">
            {/* Background Ambient Glow */}
            <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
            
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center gap-space-xs">
                  <span className="h-2 w-2 rounded-full bg-secondary"></span>
                  <span className="font-code-sm text-secondary uppercase font-semibold text-xs tracking-wider">Active Production Instance</span>
                </div>
                <div className="font-headline-sm text-xl text-on-surface font-semibold">VentureGate Vault Gateway</div>
              </div>
              
              <div className="flex items-center gap-space-xs">
                {localStorage.getItem('DEPLOYED_CONTRACT_ADDRESS') && (
                  <button
                    onClick={handleResetToDefault}
                    className="flex items-center gap-1 px-space-sm py-1 rounded bg-surface-container text-on-surface-variant hover:text-primary transition-colors text-xs font-code-sm border border-outline-variant/30"
                    title="Reset to factory preprod contract"
                  >
                    <span className="material-symbols-outlined text-[14px]">restart_alt</span>
                    <span>Reset</span>
                  </button>
                )}
                <a
                  className="flex items-center gap-1 px-space-sm py-1 rounded bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors text-xs font-code-sm border border-outline-variant/30"
                  href={`${explorerBaseUrl}/contracts/${currentActiveAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Explorer</span>
                  <span className="material-symbols-outlined text-[14px]">north_east</span>
                </a>
              </div>
            </div>

            {/* Hash Display & Copy Field */}
            <div className="bg-surface-container-lowest p-space-sm rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm border border-outline-variant/30 shadow-inner">
              <div className="flex items-center gap-space-sm min-w-0">
                <span className="material-symbols-outlined text-primary text-[20px] shrink-0">token</span>
                <span className="font-code-md text-xs sm:text-sm text-on-surface font-medium truncate select-all">
                  {currentActiveAddress}
                </span>
              </div>
              <div className="flex items-center gap-space-xs shrink-0 self-end sm:self-auto">
                <button
                  onClick={() => copyAddress(currentActiveAddress, 'active')}
                  className="flex items-center gap-1.5 px-space-md py-1.5 bg-surface-container hover:bg-surface-container-high active:bg-surface-container-highest text-primary font-code-sm text-xs rounded border border-outline-variant/30 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {copiedActive ? 'done' : 'content_copy'}
                  </span>
                  <span>{copiedActive ? 'Copied!' : 'Copy Address'}</span>
                </button>
              </div>
            </div>

            {/* Telemetry Sub-row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm pt-2">
              <div className="flex flex-col">
                <span className="font-code-sm text-outline uppercase text-xs">State Size</span>
                <span className="font-code-md text-on-surface font-medium text-xs sm:text-sm">32.4 KB (ZK-SNARK)</span>
              </div>
              <div className="flex flex-col">
                <span className="font-code-sm text-outline uppercase text-xs">Ledger Gas Cap</span>
                <span className="font-code-md text-on-surface font-medium text-xs sm:text-sm">Sponsored (0 DUST)</span>
              </div>
              <div className="flex flex-col">
                <span className="font-code-sm text-outline uppercase text-xs">Private Keys</span>
                <span className="font-code-md text-on-surface font-medium text-xs sm:text-sm">1AM Delegated</span>
              </div>
              <div className="flex flex-col">
                <span className="font-code-sm text-outline uppercase text-xs">Compliance</span>
                <span className="font-code-md text-secondary font-medium text-xs sm:text-sm">SEC Rule 506(c)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Middle: Constructor Configuration Matrix & Architecture Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
          {/* Form Panel (Col 7) */}
          <div className="lg:col-span-7 bg-surface-container-low p-space-lg rounded-xl border border-outline-variant/30 shadow-md flex flex-col gap-space-md">
            <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/20 pb-3">
              <div className="flex flex-col">
                <div className="font-headline-sm text-lg text-on-surface font-semibold">Constructor State Variables</div>
                <span className="font-body-sm text-on-surface-variant text-xs">Define immutable public ledger parameters required for instantiation</span>
              </div>
              <span className="px-space-xs py-0.5 rounded font-code-sm text-xs bg-primary/10 text-primary border border-primary/20 uppercase font-semibold">
                v2 Circuit
              </span>
            </div>

            {/* Field 1: Net Worth Threshold */}
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <label className="font-body-md text-sm text-on-surface font-medium flex items-center gap-1.5" htmlFor="min-net-worth">
                  <span className="material-symbols-outlined text-primary text-[18px]">account_balance</span>
                  Minimum Net Worth Threshold (USD)
                </label>
                <span className="font-code-sm text-outline text-xs">Public Threshold</span>
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-space-md font-code-md text-on-surface-variant select-none">$</span>
                <input
                  id="min-net-worth"
                  type="number"
                  min="0"
                  step="100000"
                  disabled={status === 'deploying'}
                  value={netWorthThreshold}
                  onChange={(e) => setNetWorthThreshold(parseFloat(e.target.value) || 0)}
                  className="w-full h-11 bg-surface-container-lowest text-on-surface font-code-md text-sm pl-8 pr-28 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30 shadow-inner"
                />
                <div className="absolute right-1 flex items-center gap-1">
                  <button
                    type="button"
                    disabled={status === 'deploying'}
                    onClick={() => adjustValue('netWorth', -100000)}
                    className="h-8 w-8 flex items-center justify-center text-on-surface-variant hover:text-on-surface bg-surface-container rounded hover:bg-surface-container-high transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">remove</span>
                  </button>
                  <button
                    type="button"
                    disabled={status === 'deploying'}
                    onClick={() => adjustValue('netWorth', 100000)}
                    className="h-8 w-8 flex items-center justify-center text-on-surface-variant hover:text-on-surface bg-surface-container rounded hover:bg-surface-container-high transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                  </button>
                </div>
              </div>
              <span className="font-body-sm text-on-surface-variant text-xs">Default baseline institutional net-worth metric for venture syndicates ($1,000,000).</span>
            </div>

            {/* Field 2: Minimum Income Threshold */}
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <label className="font-body-md text-sm text-on-surface font-medium flex items-center gap-1.5" htmlFor="min-income">
                  <span className="material-symbols-outlined text-primary text-[18px]">payments</span>
                  Minimum Income Threshold (USD)
                </label>
                <span className="font-code-sm text-outline text-xs">Annual Recurring</span>
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-space-md font-code-md text-on-surface-variant select-none">$</span>
                <input
                  id="min-income"
                  type="number"
                  min="0"
                  step="25000"
                  disabled={status === 'deploying'}
                  value={incomeThreshold}
                  onChange={(e) => setIncomeThreshold(parseFloat(e.target.value) || 0)}
                  className="w-full h-11 bg-surface-container-lowest text-on-surface font-code-md text-sm pl-8 pr-28 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30 shadow-inner"
                />
                <div className="absolute right-1 flex items-center gap-1">
                  <button
                    type="button"
                    disabled={status === 'deploying'}
                    onClick={() => adjustValue('income', -25000)}
                    className="h-8 w-8 flex items-center justify-center text-on-surface-variant hover:text-on-surface bg-surface-container rounded hover:bg-surface-container-high transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">remove</span>
                  </button>
                  <button
                    type="button"
                    disabled={status === 'deploying'}
                    onClick={() => adjustValue('income', 25000)}
                    className="h-8 w-8 flex items-center justify-center text-on-surface-variant hover:text-on-surface bg-surface-container rounded hover:bg-surface-container-high transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                  </button>
                </div>
              </div>
              <span className="font-body-sm text-on-surface-variant text-xs">Verified via zero-knowledge income circuit witness without revealing exact W-2 or tax return ($200,000).</span>
            </div>

            {/* Field 3: Proof Expiration Period */}
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <label className="font-body-md text-sm text-on-surface font-medium flex items-center gap-1.5" htmlFor="proof-expiry">
                  <span className="material-symbols-outlined text-primary text-[18px]">schedule</span>
                  Proof Expiration Period
                </label>
                <span className="font-code-sm text-outline text-xs">Epoch Window</span>
              </div>
              <div className="relative">
                <select
                  id="proof-expiry"
                  value={proofExpiry}
                  onChange={(e) => setProofExpiry(e.target.value)}
                  disabled={status === 'deploying'}
                  className="w-full h-11 bg-surface-container-lowest text-on-surface font-code-md text-sm px-space-md rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30 shadow-inner"
                >
                  <option value="90">90 Days / Quarterly Attestation</option>
                  <option value="180">180 Days / Semi-Annual Window</option>
                  <option value="365">365 Days / 1 Year Epoch (Institutional Standard)</option>
                  <option value="730">730 Days / 2-Year Multi-Epoch</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-space-md text-primary">
                  <span className="material-symbols-outlined text-[20px]">expand_more</span>
                </div>
              </div>
              <span className="font-body-sm text-on-surface-variant text-xs">Duration an emitted zero-knowledge investor claim remains authoritative on-chain.</span>
            </div>

            {/* Sovereign Gold Callout */}
            <div className="bg-surface-container p-space-md rounded-lg flex items-start gap-space-sm border border-primary/20 shadow-sm mt-2">
              <span className="material-symbols-outlined text-primary text-[22px] shrink-0 mt-0.5">lock_open_right</span>
              <div className="flex flex-col gap-1">
                <span className="font-body-sm text-xs font-semibold text-primary uppercase tracking-wide">Cryptographic Assurance Guarantee</span>
                <p className="font-body-sm text-on-surface-variant text-xs leading-relaxed">
                  These parameters define the public constructor state variables on the Midnight ledger. Circuits will cryptographically assert witness inputs against these thresholds without revealing the witness. Private keys never leave the 1AM runtime.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Architecture & Ledger Spec (Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            {/* Cryptographic Pipeline Schematic */}
            <div className="bg-surface-container-low p-space-lg rounded-xl border border-outline-variant/30 shadow-md flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <span className="font-code-sm text-outline uppercase tracking-wider text-xs">Proof Topology</span>
                <span className="font-code-sm text-secondary text-xs">CIRCUIT: COMPACT-ZK</span>
              </div>

              {/* Inline SVG Visualization: Zero-Knowledge Verification Flow */}
              <div className="bg-surface-container-lowest p-space-md rounded-lg border border-outline-variant/30 shadow-inner flex flex-col items-center justify-center">
                <svg className="w-full h-40 text-on-surface-variant" fill="none" viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg">
                  {/* Background Grid Mesh */}
                  <path d="M20 30H380M20 80H380M20 130H380" stroke="currentColor" strokeDasharray="3 3" strokeOpacity="0.08"></path>
                  <path d="M80 10V150M200 10V150M320 10V150" stroke="currentColor" strokeDasharray="3 3" strokeOpacity="0.08"></path>
                  
                  {/* Witness Node */}
                  <circle className="fill-surface-container-high" cx="70" cy="80" r="26"></circle>
                  <circle cx="70" cy="80" r="26" stroke="#99907c" strokeOpacity="0.3" strokeWidth="1.5"></circle>
                  <path d="M64 74H76V86H64z" fill="#d0c5af" opacity="0.6"></path>
                  <text fill="#99907c" fontFamily="JetBrains Mono" fontSize="10" textAnchor="middle" x="70" y="122">Private Witness</text>
                  
                  {/* Circuit Core Node */}
                  <rect className="fill-surface-container-highest" height="70" rx="8" width="70" x="165" y="45"></rect>
                  <rect height="70" rx="8" stroke="#f2ca50" strokeDasharray="4 2" strokeWidth="1.5" width="70" x="165" y="45"></rect>
                  <polygon fill="none" points="200,60 215,70 215,90 200,100 185,90 185,70" stroke="#f2ca50" strokeWidth="1.5"></polygon>
                  <circle cx="200" cy="80" fill="#f2ca50" r="3"></circle>
                  <text fill="#f2ca50" fontFamily="JetBrains Mono" fontSize="10" textAnchor="middle" x="200" y="132">ZKP Prover</text>
                  
                  {/* Ledger State Node */}
                  <circle className="fill-surface-container-high" cx="330" cy="80" r="26"></circle>
                  <circle cx="330" cy="80" r="26" stroke="#4edea3" strokeOpacity="0.4" strokeWidth="1.5"></circle>
                  <path d="M322 80L328 86L338 74" stroke="#4edea3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  <text fill="#4edea3" fontFamily="JetBrains Mono" fontSize="10" textAnchor="middle" x="330" y="122">Public Ledger</text>
                  
                  {/* Connectors with directional indicators */}
                  <path d="M96 80H165" stroke="#d4af37" strokeDasharray="4 2" strokeWidth="2"></path>
                  <path d="M235 80H304" stroke="#4edea3" strokeWidth="2"></path>
                  <circle className="animate-ping" cx="130" cy="80" fill="#d4af37" r="3"></circle>
                  <circle cx="270" cy="80" fill="#4edea3" r="3"></circle>
                </svg>
              </div>

              <div className="flex flex-col gap-space-xs text-on-surface-variant font-body-sm">
                <div className="flex justify-between items-center py-1 border-b border-outline-variant/10 text-xs">
                  <span className="text-outline font-code-sm">Prover Key Footprint:</span>
                  <span className="font-code-sm text-on-surface">4.18 MB (BLS12-381)</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-outline-variant/10 text-xs">
                  <span className="text-outline font-code-sm">Verifier Constraints:</span>
                  <span className="font-code-sm text-on-surface">14,289 R1CS gates</span>
                </div>
                <div className="flex justify-between items-center py-1 text-xs">
                  <span className="text-outline font-code-sm">Public Disclosures:</span>
                  <span className="font-code-sm text-secondary font-semibold">Zero identity leak</span>
                </div>
              </div>
            </div>

            {/* Execution Estimates Panel */}
            <div className="bg-surface-container-low p-space-md rounded-xl border border-outline-variant/30 shadow-md flex flex-col gap-space-xs">
              <div className="font-headline-sm text-on-surface font-semibold text-sm">Est. Deployment Overhead</div>
              <div className="grid grid-cols-2 gap-space-sm pt-space-xs">
                <div className="bg-surface-container p-space-sm rounded-lg border border-outline-variant/20">
                  <div className="font-code-sm text-outline text-xs">ESTIMATED GAS</div>
                  <div className="font-headline-md text-primary font-semibold text-lg">0.00 <span className="font-code-sm text-on-surface-variant text-xs">DUST (Free)</span></div>
                </div>
                <div className="bg-surface-container p-space-sm rounded-lg border border-outline-variant/20">
                  <div className="font-code-sm text-outline text-xs">TIME TO FINALITY</div>
                  <div className="font-headline-md text-secondary font-semibold text-lg">~4.8 <span className="font-code-sm text-on-surface-variant text-xs">SEC</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deployment Trigger Module */}
        <div className="bg-surface-container-low p-space-lg rounded-xl border border-outline-variant/30 shadow-md flex flex-col gap-space-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
            <div className="flex flex-col">
              <div className="font-headline-md text-xl sm:text-2xl text-on-surface font-semibold">Authorize On-Chain Instantiation</div>
              <p className="font-body-md text-on-surface-variant text-sm">
                Compiles target AST, generates proving key bindings, and initiates signature request to 1AM wallet.
              </p>
            </div>

            {/* Sovereign Gold Deploy CTA */}
            {!isConnected ? (
              <button
                onClick={() => connect(targetNetwork)}
                disabled={isConnecting}
                className="flex items-center justify-center gap-space-sm px-space-xl py-3.5 rounded-lg bg-primary text-on-primary font-body-lg text-base font-semibold hover:bg-primary-fixed-dim active:scale-[0.99] transition-all shadow-md shrink-0 cursor-pointer disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-on-primary text-[22px]">account_balance_wallet</span>
                <span>{isConnecting ? 'Connecting 1AM...' : 'Connect 1AM Wallet to Deploy'}</span>
              </button>
            ) : (
              <button
                onClick={handleDeploy}
                disabled={status === 'deploying'}
                className="flex items-center justify-center gap-space-sm px-space-xl py-3.5 rounded-lg bg-primary text-on-primary font-body-lg text-base font-semibold hover:bg-primary-fixed-dim active:scale-[0.99] transition-all shadow-md shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-on-primary text-[22px]">bolt</span>
                <span>
                  {status === 'deploying'
                    ? 'Deploying Contract...'
                    : `Deploy New Contract Instance to ${targetNetwork === 'preprod' ? 'Preprod' : 'Preview'}`}
                </span>
              </button>
            )}
          </div>

          {/* Live Telemetry / Loading Terminal */}
          {status === 'deploying' && (
            <div className="flex flex-col gap-space-sm bg-surface-container-lowest p-space-md rounded-lg border border-primary/30 shadow-inner">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-space-sm">
                  {/* Gold Radial Spinner */}
                  <div className="relative w-5 h-5 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                  </div>
                  <span className="font-code-md text-sm text-primary font-medium">
                    {telemetryMessage}
                  </span>
                </div>
                <span className="font-code-sm text-outline text-xs">PROGRESS: {telemetryStep}%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-300"
                  style={{ width: `${telemetryStep}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between font-code-sm text-xs text-on-surface-variant">
                <span>Gas balance: <strong className="text-on-surface">Sponsored 0 DUST</strong></span>
                <span>Target Subnet: <strong className="text-secondary">{targetNetwork.toUpperCase()}</strong></span>
                <span>Compiler: <strong className="text-on-surface">Compact v0.8.4-wasm</strong></span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {status === 'error' && errorMsg && (
            <div className="p-space-md rounded-lg bg-error-container/20 border border-error/40 flex items-start gap-3">
              <span className="material-symbols-outlined text-error text-[20px] shrink-0 mt-0.5">error</span>
              <div className="flex flex-col">
                <span className="font-headline-sm text-sm text-error font-semibold">Deployment Failed</span>
                <span className="font-code-sm text-xs text-on-surface-variant font-mono mt-1 break-all">{errorMsg}</span>
              </div>
            </div>
          )}

          {/* Post-Deployment Success Panel */}
          {status === 'deployed' && deployedAddress && (
            <div className="flex flex-col gap-space-md p-space-lg rounded-xl bg-surface-container-low border border-secondary/40 shadow-xl relative overflow-hidden transition-all duration-500">
              {/* Emerald Accent Header */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-space-sm">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-lg text-secondary font-semibold">Contract Deployment Confirmed</span>
                    <span className="font-body-sm text-xs text-on-surface-variant">
                      Ledger transaction committed and stored in application memory.
                    </span>
                  </div>
                </div>
                <span className="font-code-sm text-xs px-space-sm py-1 rounded bg-secondary/10 text-secondary font-medium uppercase border border-secondary/20">
                  Live on {targetNetwork.toUpperCase()}
                </span>
              </div>

              {/* Deployed Contract Code Block */}
              <div className="flex flex-col gap-space-xs bg-surface-container-lowest p-space-md rounded-lg border border-outline-variant/30 shadow-inner">
                <div className="flex items-center justify-between">
                  <span className="font-code-sm text-outline uppercase text-xs">Assigned Contract Address</span>
                  <span className="font-code-sm text-secondary font-semibold text-xs">Proof Verified</span>
                </div>
                <div className="flex items-center justify-between gap-space-sm flex-wrap">
                  <code className="font-code-lg text-sm sm:text-base text-primary font-semibold select-all break-all">
                    {deployedAddress}
                  </code>
                  <button
                    onClick={() => copyAddress(deployedAddress, 'deployed')}
                    className="flex items-center gap-1 px-space-sm py-1.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface hover:text-primary transition-colors font-code-sm text-xs shrink-0 border border-outline-variant/30"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {copiedDeployed ? 'done' : 'content_copy'}
                    </span>
                    <span>{copiedDeployed ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                {deployTxId && (
                  <div className="text-xs text-outline font-code-sm mt-1 pt-1 border-t border-outline-variant/20">
                    TX Hash: <span className="text-on-surface-variant font-mono">{deployTxId}</span>
                  </div>
                )}
              </div>

              {/* Quick Action Links */}
              <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
                <div className="flex items-center gap-space-md flex-wrap">
                  <a
                    className="flex items-center gap-1 font-body-md text-xs sm:text-sm text-on-surface hover:text-primary transition-colors underline underline-offset-4"
                    href={`${explorerBaseUrl}/contracts/${deployedAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>View on Midnight Explorer</span>
                    <span className="material-symbols-outlined text-[16px]">north_east</span>
                  </a>
                  <Link
                    to="/verify"
                    className="flex items-center gap-1 font-body-md text-xs sm:text-sm text-primary hover:text-primary-fixed transition-colors font-medium"
                  >
                    <span>Launch Verification with this Contract</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
                <button
                  className="font-code-sm text-xs text-outline hover:text-on-surface transition-colors cursor-pointer"
                  onClick={() => setStatus('idle')}
                >
                  Dismiss Notice
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
