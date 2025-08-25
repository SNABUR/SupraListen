
import { createLogger } from '../app/indexer/utils';
import { NetworkConfig } from '../lib/TaskProcessor';
import { executeUpdateAmmData } from '../lib/tasks/executeUpdateAmmData';
import prismadb from '../lib/prismadb';

const logger = createLogger('emulate-update-cycle');

const mainnetConfig: NetworkConfig = {
    networkName: 'supra-mainnet',
    rpc: process.env.NEXT_PUBLIC_SUPRA_RPC_URL_MAINNET || '',
    chain_id: process.env.CHAIN_ID_SUPRA_MAINNET || '',
    protocol_fee_recipient: 'mock-fee-recipient',
    staking_address: 'mock-staking-address',
    factory_address: 'mock-factory-address',
    router_address: 'mock-router-address',
    weth_address: 'mock-weth-address',
    start_block: 0,
    step: 1000,
    max_retries: 3,
    retry_delay: 1000,
};

async function emulateUpdate() {
    logger.info('--- Emulating Update Cycle for Mainnet ---');
    try {
        await executeUpdateAmmData(prismadb, mainnetConfig);
        logger.info('--- Emulation Complete ---');
    } catch (error) {
        logger.error('An error occurred during emulation:', error);
    }
}

emulateUpdate();
