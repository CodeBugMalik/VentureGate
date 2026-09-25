// Dynamic Contract Address Resolution and Validation Engine

export const DEFAULT_PREPROD_CONTRACT_ADDRESS =
  import.meta.env.VITE_CONTRACT_ADDRESS ||
  '8c34b5c05fe7ae32e5de68635a08d670c9a4ff5049ab2c2f76ffc95597b9082e';

export function cleanContractAddress(addr: string): string {
  if (!addr) return '';
  return addr.trim().replace(/^0x/i, '');
}

export function isValidContractAddress(addr: string): boolean {
  const cleaned = cleanContractAddress(addr);
  return /^[0-9a-fA-F]{64}$/.test(cleaned);
}

export function getContractAddressStatus(addr: string): { isValid: boolean; message: string } {
  if (!addr || !addr.trim()) {
    return { isValid: false, message: 'Contract address cannot be empty' };
  }
  const cleaned = cleanContractAddress(addr);
  if (cleaned.length !== 64) {
    return {
      isValid: false,
      message: `Invalid length: ${cleaned.length}/64 characters (32 bytes required)`
    };
  }
  if (!/^[0-9a-fA-F]+$/.test(cleaned)) {
    return {
      isValid: false,
      message: 'Invalid characters: must contain only hexadecimal digits (0-9, a-f)'
    };
  }
  return { isValid: true, message: 'Valid Midnight 32-byte hexadecimal contract address' };
}

export function getStoredContractAddress(): string {
  try {
    const stored =
      localStorage.getItem('VENTUREGATE_ACTIVE_CONTRACT') ||
      localStorage.getItem('DEPLOYED_CONTRACT_ADDRESS') ||
      localStorage.getItem('PREPROD_CONTRACT_ADDRESS');
    if (stored && isValidContractAddress(stored)) {
      return cleanContractAddress(stored);
    }
  } catch {
    // Fallback if localStorage access is restricted
  }
  return DEFAULT_PREPROD_CONTRACT_ADDRESS;
}

export function setStoredContractAddress(addr: string): boolean {
  const cleaned = cleanContractAddress(addr);
  if (!isValidContractAddress(cleaned)) return false;
  try {
    localStorage.setItem('VENTUREGATE_ACTIVE_CONTRACT', cleaned);
    localStorage.setItem('PREPROD_CONTRACT_ADDRESS', cleaned);
    window.dispatchEvent(new CustomEvent('venturegate-contract-changed', { detail: cleaned }));
    return true;
  } catch {
    return false;
  }
}

export function resetContractAddressToDefault(): string {
  try {
    localStorage.removeItem('VENTUREGATE_ACTIVE_CONTRACT');
    localStorage.setItem('PREPROD_CONTRACT_ADDRESS', DEFAULT_PREPROD_CONTRACT_ADDRESS);
    window.dispatchEvent(new CustomEvent('venturegate-contract-changed', { detail: DEFAULT_PREPROD_CONTRACT_ADDRESS }));
  } catch {
    // Ignore
  }
  return DEFAULT_PREPROD_CONTRACT_ADDRESS;
}

export const CONTRACT_ADDRESS = getStoredContractAddress();
export const PREPROD_CONTRACT_ADDRESS = CONTRACT_ADDRESS;

export const MIN_NET_WORTH_THRESHOLD = import.meta.env.VITE_MIN_NET_WORTH_THRESHOLD
  ? parseInt(import.meta.env.VITE_MIN_NET_WORTH_THRESHOLD, 10)
  : 1000000;

export const MIN_INCOME_THRESHOLD = import.meta.env.VITE_MIN_INCOME_THRESHOLD
  ? parseInt(import.meta.env.VITE_MIN_INCOME_THRESHOLD, 10)
  : 200000;

export const MIN_JOINT_INCOME_THRESHOLD = 300000;
export const MIN_QP_CAPITAL_THRESHOLD = 5000000;
