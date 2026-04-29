/**
 * itwillsync - Main entry point
 * A synchronization utility library
 */

export * from './sync';
export * from './config';
export * from './types';

import { SyncManager } from './sync';
import { loadConfig } from './config';

/**
 * Initialize and run the sync process with the provided configuration path
 * @param configPath - Optional path to the configuration file
 */
export async function run(configPath?: string): Promise<void> {
  try {
    const config = await loadConfig(configPath);
    const manager = new SyncManager(config);

    await manager.initialize();
    await manager.sync();

    console.log('[itwillsync] Sync completed successfully.');
  } catch (error) {
    console.error('[itwillsync] Sync failed:', error);
    process.exit(1);
  }
}

// Allow running directly via CLI
if (require.main === module) {
  const configPath = process.argv[2];
  run(configPath);
}
