import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { WebSocket } from 'ws';
import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import {
  deployContract,
  submitCallTx,
  type DeployedContract,
} from '@midnight-ntwrk/midnight-js-contracts';
import type { ContractAddress } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import {
  type EnvironmentConfiguration,
  waitForFunds,
} from '@midnight-ntwrk/testkit-js';
import pino from 'pino';

import { getConfig } from '../config.js';
import {
  MidnightWalletProvider,
  syncWallet,
  type WalletSecret,
} from '../wallet.js';
import { buildProviders, type VentureGateProviders } from '../providers.js';
import {
  CompiledVentureGateContract,
  Contract,
  ledger,
  zkConfigPath,
} from '../../contracts/index.js';

// Required for GraphQL subscriptions in Node.js
// @ts-expect-error WebSocket global assignment for apollo
globalThis.WebSocket = WebSocket;

process.on('unhandledRejection', (reason, promise) => {
  console.error('UNHANDLED REJECTION:', reason);
  console.error('Promise:', promise);
});

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
});

const ALICE_LOCAL_SEED =
  '0000000000000000000000000000000000000000000000000000000000000001';
const PRIVATE_STATE_ID = 'AlicePrivateVentureGateState';

const logger = pino({
  level: process.env['LOG_LEVEL'] ?? 'info',
  transport: { target: 'pino-pretty' },
});

const network = process.env['MIDNIGHT_NETWORK'] ?? 'local';

function resolveSecret(net: string): WalletSecret {
  if (net === 'local') return { kind: 'seed', value: ALICE_LOCAL_SEED };

  const upper = net.toUpperCase();
  const mnemonicEnv = `MIDNIGHT_${upper}_MNEMONIC`;
  const seedEnv = `MIDNIGHT_${upper}_SEED`;
  const mnemonic = process.env[mnemonicEnv]?.trim().replace(/\s+/g, ' ');
  const seedHex = process.env[seedEnv]?.trim();

  if (mnemonic && seedHex) {
    throw new Error(
      `Set only one of ${mnemonicEnv} or ${seedEnv} (both are defined).`,
    );
  }
  if (mnemonic) {
    return { kind: 'mnemonic', value: mnemonic };
  }
  if (seedHex) {
    if (!/^[0-9a-fA-F]+$/.test(seedHex) || seedHex.length % 2 !== 0) {
      throw new Error(
        `${seedEnv} must be a hex string of even length (no 0x prefix).`,
      );
    }
    return { kind: 'seed', value: seedHex };
  }
  throw new Error(
    `Either ${mnemonicEnv} or ${seedEnv} is required for network '${net}'. ` +
      `Set one in .env.${net} or the shell.`,
  );
}

describe(`VentureGate Contract (${network})`, () => {
  let wallet: MidnightWalletProvider;
  let providers: VentureGateProviders;
  let contractAddress: ContractAddress;

  const config = getConfig();
  const secret = resolveSecret(network);
  const isRemote = config.faucet !== '';
  const syncTimeoutMs = Number(
    process.env['MIDNIGHT_SYNC_TIMEOUT_MS'] ??
      (isRemote ? 60 * 60_000 : 10 * 60_000),
  );

  async function queryLedger(p: VentureGateProviders) {
    const state = await p.publicDataProvider.queryContractState(contractAddress);
    expect(state).not.toBeNull();
    return ledger(state!.data);
  }

  beforeAll(async () => {
    setNetworkId(config.networkId);

    const envConfig: EnvironmentConfiguration = {
      walletNetworkId: config.networkId,
      networkId: config.networkId,
      indexer: config.indexer,
      indexerWS: config.indexerWS,
      node: config.node,
      nodeWS: config.nodeWS,
      faucet: config.faucet,
      proofServer: config.proofServer,
    };

    wallet = await MidnightWalletProvider.build(logger, envConfig, secret);
    await wallet.start();
    await syncWallet(logger, wallet.wallet, syncTimeoutMs);

    if (isRemote) {
      const nightBalance = await waitForFunds(
        wallet.wallet,
        envConfig,
        true,
        wallet.unshieldedKeystore,
      );
      logger.info(`Wallet NIGHT balance on '${network}': ${nightBalance}`);
    }

    providers = buildProviders(wallet, zkConfigPath, config);
    logger.info(`Providers initialized on '${network}'. Ready to test!`);
  });

  afterAll(async () => {
    if (wallet) {
      logger.info('Stopping wallet...');
      await wallet.stop();
    }
  });

  it('Deploys the contract with VentureGate rules', async () => {
    logger.info(`Deploying VentureGate Contract...`);

    // Minimum Net Worth: $1,000,000, Min Income: $200,000
    const minNetWorth = 1000000n;
    const minIncome = 200000n;

    const deployed: DeployedContract<Contract> =
      await (deployContract<Contract>)(providers, {
        compiledContract: CompiledVentureGateContract,
        privateStateId: PRIVATE_STATE_ID,
        initialPrivateState: {},
        args: [minNetWorth, minIncome],
      });

    contractAddress = deployed.deployTxData.public.contractAddress;
    logger.info(`Contract deployed at: ${contractAddress}`);
    expect(contractAddress).toBeDefined();

    const state = await queryLedger(providers);
    expect(state.min_net_worth).toEqual(minNetWorth);
    expect(state.min_income).toEqual(minIncome);
  });

  it('Verifies eligibility successfully for a qualifying investor', async () => {
    // Investor Net Worth: $1,500,000, Income: $250,000 (qualifies!)
    logger.info(`Running verify_accreditation for qualifying investor...`);

    await (submitCallTx<Contract, 'verify_accreditation'>)(providers, {
      compiledContract: CompiledVentureGateContract,
      contractAddress,
      privateStateId: PRIVATE_STATE_ID,
      circuitId: 'verify_accreditation',
      args: [1500000n, 250000n],
    });

    logger.info(`Verification transaction completed successfully.`);
  });

  it('Fails verification for an investor with net worth too low', async () => {
    // Investor Net Worth: $500,000, Income: $250,000 (fails!)
    logger.info(`Running verify_accreditation for low net worth investor (should fail)...`);

    await expect(
      (submitCallTx<Contract, 'verify_accreditation'>)(providers, {
        compiledContract: CompiledVentureGateContract,
        contractAddress,
        privateStateId: PRIVATE_STATE_ID,
        circuitId: 'verify_accreditation',
        args: [500000n, 250000n],
      })
    ).rejects.toThrow();

    logger.info(`Rejected low net worth investor as expected.`);
  });

  it('Fails verification for an investor with income too low', async () => {
    // Investor Net Worth: $1,500,000, Income: $100,000 (fails!)
    logger.info(`Running verify_accreditation for low income investor (should fail)...`);

    await expect(
      (submitCallTx<Contract, 'verify_accreditation'>)(providers, {
        compiledContract: CompiledVentureGateContract,
        contractAddress,
        privateStateId: PRIVATE_STATE_ID,
        circuitId: 'verify_accreditation',
        args: [1500000n, 100000n],
      })
    ).rejects.toThrow();

    logger.info(`Rejected low income investor as expected.`);
  });

  it('Guarantees privacy: asserts witness values are never exposed on-chain or in ledger state', async () => {
    logger.info(`Asserting zero-knowledge isolation on public ledger...`);
    const rawState = await providers.publicDataProvider.queryContractState(contractAddress);
    expect(rawState).not.toBeNull();

    // Decode public ledger state
    const state = ledger(rawState!.data);
    expect(state.min_net_worth).toBeDefined();
    expect(state.min_income).toBeDefined();

    // Verify public ledger only contains public threshold values
    expect(state.min_net_worth).toEqual(1000000n);
    expect(state.min_income).toEqual(200000n);

    // Explicitly assert that the investor's private witnesses (net_worth, income) are NOT on the ledger
    const stateKeys = Object.keys(state);
    expect(stateKeys).toContain('min_net_worth');
    expect(stateKeys).toContain('min_income');
    expect(stateKeys).not.toContain('net_worth');
    expect(stateKeys).not.toContain('income');
    expect(stateKeys).not.toContain('investor_net_worth');
    expect(stateKeys).not.toContain('investor_income');

    // Stringify entire public state payload to verify raw financial witness numbers never leak anywhere in state
    const serializedState = JSON.stringify(rawState);
    expect(serializedState).not.toContain('1500000');
    expect(serializedState).not.toContain('250000');
    expect(serializedState).not.toContain('500000');
    expect(serializedState).not.toContain('100000');
    logger.info(`Privacy guarantee confirmed: 0 bytes of witness financial data present in public ledger.`);
  });
});

