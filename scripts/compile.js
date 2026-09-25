import { execSync } from 'node:child_process';
import os from 'node:os';
import fs from 'node:fs';
import path from 'node:path';

const isWin = os.platform() === 'win32';
const targetCompact = 'contracts/venturegate.compact';
const targetOut = 'contracts/managed/venturegate';

console.log(`[VentureGate] Compiling Compact smart contract: ${targetCompact}...`);

try {
  if (isWin) {
    // Run via WSL where compact compiler toolchain is installed
    execSync(`wsl -u deep_saha --cd "${process.cwd()}" /home/deep_saha/.local/bin/compact compile +0.31.1 ${targetCompact} ${targetOut}`, {
      stdio: 'inherit',
    });
  } else {
    // Native Linux / Docker / CI environment
    execSync(`compact compile ${targetCompact} ${targetOut}`, {
      stdio: 'inherit',
    });
  }
  
  // Sync to frontend managed and public directories
  console.log(`[VentureGate] Syncing artifacts to frontend...`);
  const frontendManaged = path.resolve('frontend', 'src', 'managed');
  const frontendPublic = path.resolve('frontend', 'public', 'managed');
  
  fs.cpSync(targetOut, frontendManaged, { recursive: true, force: true });
  fs.cpSync(targetOut, frontendPublic, { recursive: true, force: true });
  
  console.log(`[VentureGate] Compilation and sync complete.`);
} catch (err) {
  console.error(`[VentureGate] Compilation failed:`, err.message);
  process.exit(1);
}
