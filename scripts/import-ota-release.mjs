import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile } from 'node:fs/promises';
import { basename, join, resolve } from 'node:path';

const sourceDirectory = process.argv[2] ? resolve(process.argv[2]) : null;
if (!sourceDirectory) {
  throw new Error('Usage: node scripts/import-ota-release.mjs <ota-release/updates-directory>');
}

const manifestPath = join(sourceDirectory, 'version.json');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));

if (
  manifest.schemaVersion !== 1 ||
  manifest.enabled !== true ||
  !/^\d+\.\d+\.\d+$/.test(manifest.version) ||
  !/^\d+\.\d+\.\d+$/.test(manifest.minNativeVersion) ||
  typeof manifest.checksum !== 'string' ||
  !/^[a-f\d]{64}$/i.test(manifest.checksum)
) {
  throw new Error('The OTA manifest is invalid or not enabled.');
}

const expectedBundleName = `${manifest.version}.zip`;
const bundleName = basename(new URL(manifest.bundleUrl).pathname);
if (bundleName !== expectedBundleName || new URL(manifest.bundleUrl).origin !== 'https://cramio.site') {
  throw new Error('The OTA bundle URL does not match the expected Cramio versioned ZIP.');
}

const sourceBundle = join(sourceDirectory, expectedBundleName);
const actualChecksum = createHash('sha256').update(await readFile(sourceBundle)).digest('hex');
if (actualChecksum !== manifest.checksum.toLowerCase()) {
  throw new Error('OTA ZIP SHA-256 does not match version.json. Nothing was copied.');
}

const destinationDirectory = resolve('public', 'updates');
const destinationBundle = join(destinationDirectory, expectedBundleName);
await mkdir(destinationDirectory, { recursive: true });

try {
  await readFile(destinationBundle);
  throw new Error(`Refusing to overwrite immutable OTA bundle ${expectedBundleName}.`);
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

await copyFile(sourceBundle, destinationBundle);
await copyFile(manifestPath, join(destinationDirectory, 'version.json'));

console.log('OTA release imported and verified.');
console.log(`Version: ${manifest.version}`);
console.log(`Minimum native version: ${manifest.minNativeVersion}`);
console.log(`Bundle: ${destinationBundle}`);
console.log(`SHA-256: ${actualChecksum}`);
