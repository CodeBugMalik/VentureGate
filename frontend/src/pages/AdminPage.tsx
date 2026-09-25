import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CompiledContract } from '@midnight-ntwrk/compact-js';
import { createUnprovenDeployTx, submitTxAsync } from '@midnight-ntwrk/midnight-js-contracts';
import { Contract } from '../managed/contract/index.js';
import { useWallet } from '../contexts/WalletContext';
import {
  getStoredContractAddress,
  setStoredContractAddress,
  DEFAULT_PREPROD_CONTRACT_ADDRESS,
  MIN_NET_WORTH_THRESHOLD,
  MIN_INCOME_THRESHOLD,
  cleanContractAddress,
} from '../config';
import {
  Cpu,
  Layers,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Zap,
  Terminal,
  Shield,
  Sliders,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

function getCompiledContract() {
  return CompiledContract.make('VentureGateContract', Contract).pipe(
    CompiledContract.withVacantWitnesses,
    CompiledContract.withCompiledFileAssets(new URL('/managed', window.location.origin).toString()),
  ) as any;
}

export default function AdminPage() {
  const { session, isConnected, connect, isConnecting, address } = useWallet();

  const [status, setStatus] = useState<'idle' | 'deploying' | 'deployed' | 'error'>('idle');
  const [telemetryStep, setTelemetryStep] = useState<number>(0);
  const [telemetryMessage, setTelemetryMessage] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [deployedAddress, setDeployedAddress] = useState<string | null>(
    localStorage.getItem('DEPLOYED_CONTRACT_ADDRESS') || null
  );
  const [activeAddress, setActiveAddress] = useState<string>(getStoredContractAddress());
  const [deployTxId, setDeployTxId] = useState<string | null>(null);
  const [copiedDeployed, setCopiedDeployed] = useState(false);

  // Threshold controls
  const [netWorthThreshold, setNetWorthThreshold] = useState<number>(MIN_NET_WORTH_THRESHOLD);
  const [incomeThreshold, setIncomeThreshold] = useState<number>(MIN_INCOME_THRESHOLD);
  const [jointIncomeThreshold, setJointIncomeThreshold] = useState<number>(300000);
  const [qpCapitalThreshold, setQpCapitalThreshold] = useState<number>(5000000);

  useEffect(() => {
    const handleAddressChange = (e: any) => {
      setActiveAddress(e.detail || getStoredContractAddress());
    };
    window.addEventListener('venturegate-contract-changed', handleAddressChange);
    return () => window.removeEventListener('venturegate-contract-changed', handleAddressChange);
  }, []);

  const adjustValue = (type: 'netWorth' | 'income' | 'jointIncome' | 'qpCapital', delta: number) => {
    if (type === 'netWorth') {
      setNetWorthThreshold((prev) => Math.max(100000, prev + delta));
    } else if (type === 'income') {
      setIncomeThreshold((prev) => Math.max(25000, prev + delta));
    } else if (type === 'jointIncome') {
      setJointIncomeThreshold((prev) => Math.max(25000, prev + delta));
    } else if (type === 'qpCapital') {
      setQpCapitalThreshold((prev) => Math.max(500000, prev + delta));
    }
  };

  const handleDeploy = useCallback(async () => {
    if (!session || !isConnected) return;
    setStatus('deploying');
    setErrorMsg(null);
    setTelemetryStep(15);
    setTelemetryMessage('Compiling Compact circuit AST & asserting constraint gates...');

    const timer1 = setTimeout(() => {
      setTelemetryStep(45);
      setTelemetryMessage('Generating BLS12-381 SNARK proving keys & initial storage trie...');
    }, 1200);

    const timer2 = setTimeout(() => {
      setTelemetryStep(75);
      setTelemetryMessage('Requesting 1AM Enclave signature & zero-gas DUST fee settlement...');
    }, 2400);

    try {
      const netWorthVal = netWorthThreshold;
      const incomeVal = incomeThreshold;
      const jointIncomeVal = jointIncomeThreshold;
      const qpCapitalVal = qpCapitalThreshold;
      const adminPk = new Uint8Array(32).fill(7);

      const compiledContract = getCompiledContract();
      const initialPrivateState = {};
      const constructorArgs: any[] = [
        BigInt(netWorthVal),
        BigInt(incomeVal),
        BigInt(jointIncomeVal),
        BigInt(qpCapitalVal),
        adminPk,
      ];

      setTelemetryStep(88);
      setTelemetryMessage('Awaiting transaction authorization in 1AM wallet popup...');

      const deployTxData = await createUnprovenDeployTx(session.providers as any, {
        compiledContract,
        privateStateId: 'AlicePrivateVentureGateState',
        initialPrivateState,
        args: constructorArgs,
      });

      setTelemetryStep(94);
      setTelemetryMessage('Broadcasting balanced transaction to Midnight Preprod node...');

      const txIdentifier = await submitTxAsync(session.providers as any, {
        unprovenTx: deployTxData.private.unprovenTx,
        circuitId: undefined,
      });

      clearTimeout(timer1);
      clearTimeout(timer2);

      const contractAddr = cleanContractAddress(deployTxData.public.contractAddress);
      setDeployedAddress(contractAddr);
      setDeployTxId(typeof txIdentifier === 'string' ? txIdentifier : String(txIdentifier));
      setStoredContractAddress(contractAddr);
      setActiveAddress(contractAddr);

      localStorage.setItem('DEPLOYED_CONTRACT_ADDRESS', contractAddr);

      setTelemetryStep(100);
      setTelemetryMessage('Contract successfully deployed and active in VentureGate!');
      setStatus('deployed');
    } catch (err: any) {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setStatus('error');
      setErrorMsg(err?.message || 'Contract instantiation rejected or failed on-chain.');
    }
  }, [session, isConnected, netWorthThreshold, incomeThreshold]);

  const copyDeployed = () => {
    if (deployedAddress) {
      navigator.clipboard.writeText(deployedAddress);
      setCopiedDeployed(true);
      setTimeout(() => setCopiedDeployed(false), 2000);
    }
  };

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '40px 24px 80px' }}>
      {/* Top Banner & Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
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
          <Cpu size={12} color="var(--gold-champagne)" />
          Contract Instantiation Cockpit
        </div>
        <h1 className="font-display" style={{ fontSize: '36px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
          Admin Contract Deployer
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '680px', margin: '0 auto' }}>
          Deploy custom regulatory thresholds directly to Midnight Preprod with zero-gas DUST fee settlement using 1AM
          Wallet.
        </p>
      </div>

      {/* Main Deployment Deck */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
          gap: '30px',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Constructor Threshold Configuration */}
        <div className="glass-panel-gold" style={{ padding: '32px' }}>
          <div style={{ marginBottom: '24px' }}>
            <div
              style={{
                fontSize: '11px',
                letterSpacing: '0.15em',
                color: 'var(--gold-champagne)',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginBottom: '6px',
              }}
            >
              Constructor Arguments
            </div>
            <h2 className="font-display" style={{ fontSize: '22px', fontWeight: 700, color: '#fff' }}>
              Define Statutory Thresholds
            </h2>
          </div>

          {/* Net Worth Stepper */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
              Initial Minimum Net Worth Threshold (USD)
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: '#07080a',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <button
                type="button"
                onClick={() => adjustValue('netWorth', -100000)}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: 'none',
                  color: '#fff',
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 700,
                }}
              >
                -
              </button>
              <span
                className="font-mono"
                style={{ flex: 1, textAlign: 'center', fontSize: '18px', fontWeight: 700, color: 'var(--gold-light)' }}
              >
                ${netWorthThreshold.toLocaleString('en-US')}
              </span>
              <button
                type="button"
                onClick={() => adjustValue('netWorth', 100000)}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: 'none',
                  color: '#fff',
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 700,
                }}
              >
                +
              </button>
            </div>
          </div>

          {/* Income Stepper */}
          <div style={{ marginBottom: '28px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
              Initial Minimum Personal Income Threshold (USD)
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: '#07080a',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <button
                type="button"
                onClick={() => adjustValue('income', -25000)}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: 'none',
                  color: '#fff',
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 700,
                }}
              >
                -
              </button>
              <span
                className="font-mono"
                style={{ flex: 1, textAlign: 'center', fontSize: '18px', fontWeight: 700, color: 'var(--gold-light)' }}
              >
                ${incomeThreshold.toLocaleString('en-US')}
              </span>
              <button
                type="button"
                onClick={() => adjustValue('income', 25000)}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: 'none',
                  color: '#fff',
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 700,
                }}
              >
                +
              </button>
            </div>
          </div>

          {/* Joint Income Stepper */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
              Minimum Joint Spousal Income Threshold (USD)
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: '#07080a',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <button
                type="button"
                onClick={() => adjustValue('jointIncome', -25000)}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: 'none',
                  color: '#fff',
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 700,
                }}
              >
                -
              </button>
              <span
                className="font-mono"
                style={{ flex: 1, textAlign: 'center', fontSize: '18px', fontWeight: 700, color: 'var(--gold-light)' }}
              >
                ${jointIncomeThreshold.toLocaleString('en-US')}
              </span>
              <button
                type="button"
                onClick={() => adjustValue('jointIncome', 25000)}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: 'none',
                  color: '#fff',
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 700,
                }}
              >
                +
              </button>
            </div>
          </div>

          {/* Qualified Purchaser Stepper */}
          <div style={{ marginBottom: '28px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
              Qualified Purchaser Capital Threshold (USD)
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: '#07080a',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <button
                type="button"
                onClick={() => adjustValue('qpCapital', -500000)}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: 'none',
                  color: '#fff',
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 700,
                }}
              >
                -
              </button>
              <span
                className="font-mono"
                style={{ flex: 1, textAlign: 'center', fontSize: '18px', fontWeight: 700, color: 'var(--gold-light)' }}
              >
                ${qpCapitalThreshold.toLocaleString('en-US')}
              </span>
              <button
                type="button"
                onClick={() => adjustValue('qpCapital', 500000)}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: 'none',
                  color: '#fff',
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 700,
                }}
              >
                +
              </button>
            </div>
          </div>

          {/* Network & Wallet Connection Status */}
          <div
            style={{
              padding: '16px',
              borderRadius: '8px',
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.08)',
              marginBottom: '28px',
              fontSize: '12px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Target Network:</span>
              <span style={{ color: 'var(--gold-light)', fontWeight: 600 }}>Midnight Preprod</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>1AM Wallet:</span>
              <span style={{ color: isConnected ? 'var(--emerald-primary)' : '#f87171', fontWeight: 600 }}>
                {isConnected ? 'Connected & Synced' : 'Disconnected (Required)'}
              </span>
            </div>
          </div>

          {/* Deploy CTA */}
          {isConnected ? (
            <button
              onClick={handleDeploy}
              disabled={status === 'deploying'}
              className="gold-shimmer-btn"
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                cursor: status === 'deploying' ? 'wait' : 'pointer',
                opacity: status === 'deploying' ? 0.7 : 1,
              }}
            >
              <Cpu size={16} />
              <span>{status === 'deploying' ? 'Deploying to Midnight...' : 'Deploy Smart Contract Instance'}</span>
            </button>
          ) : (
            <button
              onClick={() => connect('preprod')}
              disabled={isConnecting}
              className="gold-shimmer-btn"
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}
            >
              <span>{isConnecting ? 'Connecting 1AM...' : 'Connect 1AM to Deploy'}</span>
            </button>
          )}
        </div>

        {/* Right Column: Deployment Telemetry & Result Deck */}
        <div
          className="glass-panel terminal-scanlines"
          style={{
            backgroundColor: '#07080a',
            border: '1px solid rgba(201, 168, 106, 0.35)',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: '#111317',
              padding: '12px 18px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Terminal size={14} color="var(--gold-champagne)" />
              <span className="font-mono" style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                deploy_telemetry_stream
              </span>
            </div>
            <span
              className="font-mono"
              style={{ fontSize: '11px', color: 'var(--gold-light)' }}
            >
              {telemetryStep}%
            </span>
          </div>

          {/* Telemetry Progress Bar */}
          <div style={{ width: '100%', height: '3px', background: 'rgba(255,255,255,0.06)' }}>
            <div
              style={{
                width: `${telemetryStep}%`,
                height: '100%',
                background: 'linear-gradient(90deg, var(--gold-champagne), var(--gold-light))',
                transition: 'width 0.3s ease',
              }}
            />
          </div>

          {/* Console Area */}
          <div
            className="font-mono"
            style={{
              padding: '24px',
              minHeight: '260px',
              fontSize: '12px',
              lineHeight: 1.8,
              color: 'var(--text-secondary)',
            }}
          >
            <div>[INITIALIZATION] Checking local managed contract assets...</div>
            <div>[COMPILER] Compact AST: contracts/venturegate.compact (v0.22.0)</div>
            <div>[CRITERIA] min_net_worth = ${netWorthThreshold.toLocaleString()}</div>
            <div>[CRITERIA] min_income    = ${incomeThreshold.toLocaleString()}</div>

            {telemetryMessage && (
              <div style={{ color: 'var(--gold-light)', marginTop: '8px' }}>
                &gt; {telemetryMessage}
              </div>
            )}

            {status === 'deployed' && deployedAddress && (
              <div style={{ color: 'var(--emerald-primary)', marginTop: '12px' }}>
                [SUCCESS] Contract deployed successfully on Midnight Preprod!
              </div>
            )}

            {errorMsg && (
              <div style={{ color: '#f87171', marginTop: '12px' }}>
                [ERROR] {errorMsg}
              </div>
            )}
          </div>

          {/* Deployed Result Box */}
          {deployedAddress && (
            <div
              style={{
                padding: '20px',
                backgroundColor: '#0a0c10',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--emerald-primary)', marginBottom: '8px' }}>
                <CheckCircle2 size={16} />
                <span style={{ fontSize: '13px', fontWeight: 700 }}>Active Deployed Instance</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#040506',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: '1px solid rgba(201, 168, 106, 0.4)',
                }}
              >
                <span className="font-mono" style={{ fontSize: '11px', color: '#fff' }}>
                  {deployedAddress.slice(0, 12)}...{deployedAddress.slice(-8)}
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={copyDeployed}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                    title="Copy Address"
                  >
                    {copiedDeployed ? <Check size={14} color="var(--emerald-primary)" /> : <Copy size={14} />}
                  </button>
                  <a
                    href={`https://preprod.midnightexplorer.com/contracts/${deployedAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--gold-champagne)', display: 'flex', alignItems: 'center' }}
                    title="View on Explorer"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              <div style={{ marginTop: '12px', textAlign: 'right' }}>
                <Link
                  to="/verify"
                  style={{
                    fontSize: '12px',
                    color: 'var(--gold-champagne)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontWeight: 600,
                  }}
                >
                  <span>Test Accreditation on New Contract</span> &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
