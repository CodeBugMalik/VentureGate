import React, { useState, useEffect } from 'react';
import {
  getStoredContractAddress,
  setStoredContractAddress,
  resetContractAddressToDefault,
  getContractAddressStatus,
  DEFAULT_PREPROD_CONTRACT_ADDRESS,
  cleanContractAddress,
} from '../config';
import { Check, Copy, ExternalLink, RefreshCw, Edit2, ShieldAlert, ShieldCheck } from 'lucide-react';

export default function ContractAddressBar() {
  const [activeAddress, setActiveAddress] = useState(getStoredContractAddress());
  const [isEditing, setIsEditing] = useState(false);
  const [inputVal, setInputVal] = useState(activeAddress);
  const [copied, setCopied] = useState(false);
  const [validation, setValidation] = useState(getContractAddressStatus(activeAddress));

  useEffect(() => {
    const handleAddressChange = (e: any) => {
      const newAddr = e.detail || getStoredContractAddress();
      setActiveAddress(newAddr);
      setInputVal(newAddr);
      setValidation(getContractAddressStatus(newAddr));
    };
    window.addEventListener('venturegate-contract-changed', handleAddressChange);
    return () => window.removeEventListener('venturegate-contract-changed', handleAddressChange);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = cleanContractAddress(inputVal);
    const status = getContractAddressStatus(cleaned);
    if (status.isValid) {
      setStoredContractAddress(cleaned);
      setActiveAddress(cleaned);
      setIsEditing(false);
    }
  };

  const handleReset = () => {
    const def = resetContractAddressToDefault();
    setActiveAddress(def);
    setInputVal(def);
    setIsEditing(false);
    setValidation(getContractAddressStatus(def));
  };

  const isDefault = activeAddress === DEFAULT_PREPROD_CONTRACT_ADDRESS;

  return (
    <div
      style={{
        background: 'rgba(18, 20, 24, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(201, 168, 106, 0.2)',
        padding: '8px 24px',
        fontSize: '13px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        position: 'relative',
        zIndex: 50,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--gold-champagne)',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            fontSize: '11px',
          }}
        >
          <span className="beacon-dot" />
          Active Preprod Contract:
        </span>

        {!isEditing ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              className="font-mono"
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                padding: '3px 8px',
                borderRadius: '6px',
                color: validation.isValid ? 'var(--text-primary)' : '#f87171',
                border: `1px solid ${validation.isValid ? 'rgba(255, 255, 255, 0.1)' : 'rgba(239, 68, 68, 0.4)'}`,
                letterSpacing: '0.03em',
              }}
              title={activeAddress}
            >
              {activeAddress.slice(0, 10)}...{activeAddress.slice(-8)}
            </span>

            {isDefault && (
              <span
                style={{
                  fontSize: '10px',
                  background: 'rgba(212, 175, 55, 0.15)',
                  color: 'var(--gold-light)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  fontWeight: 500,
                }}
              >
                Official Preprod
              </span>
            )}

            <button
              onClick={handleCopy}
              style={{
                background: 'transparent',
                border: 'none',
                color: copied ? 'var(--emerald-primary)' : 'var(--text-muted)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                padding: '3px',
              }}
              title="Copy Contract Address"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>

            <a
              href={`https://preprod.midnightexplorer.com/contracts/${activeAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--text-muted)',
                display: 'inline-flex',
                alignItems: 'center',
                padding: '3px',
              }}
              title="View on Midnight Explorer"
            >
              <ExternalLink size={14} />
            </a>

            <button
              onClick={() => setIsEditing(true)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'var(--text-secondary)',
                borderRadius: '4px',
                padding: '2px 8px',
                cursor: 'pointer',
                fontSize: '11px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
              title="Edit or Paste Custom Contract Address"
            >
              <Edit2 size={11} /> Change
            </button>
          </div>
        ) : (
          <form onSubmit={handleSave} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
                setValidation(getContractAddressStatus(e.target.value));
              }}
              placeholder="Paste 64-char hex contract address..."
              className="font-mono"
              style={{
                background: '#0a0b0d',
                color: '#fff',
                border: `1px solid ${validation.isValid ? 'var(--gold-border)' : '#ef4444'}`,
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                width: '360px',
                maxWidth: '100%',
                outline: 'none',
              }}
              autoFocus
            />
            <button
              type="submit"
              disabled={!validation.isValid}
              style={{
                background: validation.isValid ? 'var(--gold-primary)' : '#444',
                color: '#000',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: validation.isValid ? 'pointer' : 'not-allowed',
              }}
            >
              Apply
            </button>
            <button
              type="button"
              onClick={() => {
                setInputVal(activeAddress);
                setIsEditing(false);
                setValidation(getContractAddressStatus(activeAddress));
              }}
              style={{
                background: 'transparent',
                color: 'var(--text-muted)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '4px',
                padding: '4px 8px',
                fontSize: '11px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </form>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}>
          {validation.isValid ? (
            <span style={{ color: 'var(--emerald-primary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={13} /> 64-char Hex Verified
            </span>
          ) : (
            <span style={{ color: '#f87171', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <ShieldAlert size={13} /> {validation.message}
            </span>
          )}
        </div>

        {!isDefault && (
          <button
            onClick={handleReset}
            style={{
              background: 'transparent',
              color: 'var(--gold-champagne)',
              border: 'none',
              cursor: 'pointer',
              fontSize: '11px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              textDecoration: 'underline',
            }}
            title="Reset to official Preprod contract"
          >
            <RefreshCw size={11} /> Reset to Official
          </button>
        )}
      </div>
    </div>
  );
}
