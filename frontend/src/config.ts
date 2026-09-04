// Dynamic Contract Address Resolution
// We prioritize DEPLOYED_CONTRACT_ADDRESS (from in-browser Admin deployments)
// or PREPROD_CONTRACT_ADDRESS from localStorage.
// If neither exists, we fallback to VITE_CONTRACT_ADDRESS or the hardcoded default.
export const CONTRACT_ADDRESS =
  localStorage.getItem('DEPLOYED_CONTRACT_ADDRESS') ||
  localStorage.getItem('PREPROD_CONTRACT_ADDRESS') ||
  import.meta.env.VITE_CONTRACT_ADDRESS ||
  '8c34b5c05fe7ae32e5de68635a08d670c9a4ff5049ab2c2f76ffc95597b9082e';

// Alias for backward-compatibility with existing views
export const PREPROD_CONTRACT_ADDRESS = CONTRACT_ADDRESS;

export const MIN_NET_WORTH_THRESHOLD = import.meta.env.VITE_MIN_NET_WORTH_THRESHOLD
  ? parseInt(import.meta.env.VITE_MIN_NET_WORTH_THRESHOLD, 10)
  : 1000000;

export const MIN_INCOME_THRESHOLD = import.meta.env.VITE_MIN_INCOME_THRESHOLD
  ? parseInt(import.meta.env.VITE_MIN_INCOME_THRESHOLD, 10)
  : 200000;
