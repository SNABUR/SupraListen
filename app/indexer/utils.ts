const DEBUG_MODE = process.env.NEXT_PUBLIC_DEBUG_MODE === 'true'

const logger = createLogger('utils');

export function createLogger(name: string) {
  return {
    debug: (...args: any[]) => {
      console.log(`[${name}] DEBUG:`, ...args.map(arg => 
        typeof arg === 'bigint' ? arg.toString() : arg
      ))
    },
    info: (...args: any[]) => {
      console.log(`[${name}] INFO:`, ...args.map(arg => 
        typeof arg === 'bigint' ? arg.toString() : arg
      ))
    },
    warn: (...args: any[]) => {
      console.log(`[${name}] WARN:`, ...args.map(arg => 
        typeof arg === 'bigint' ? arg.toString() : arg
      ))
    },
    error: (...args: any[]) => {
      console.log(`[${name}] ERROR:`, ...args.map(arg => 
        arg === null ? 'null' : (typeof arg === 'bigint' ? arg.toString() : arg)
      ))
    }
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Deserialize a hex-encoded vector<u8> to string
 * @param hex Hex string starting with "0x"
 * @returns Decoded UTF-8 string
 */
export function deserializeVectorU8(hex: string): string {
  if (!hex.startsWith('0x')) {
    throw new Error('Invalid hex string: must start with 0x')
  }
  
  // Remove 0x prefix and convert hex to bytes
  const bytes = Buffer.from(hex.slice(2), 'hex')
  // Convert bytes to UTF-8 string
  let str = bytes.toString('utf8');
  logger.debug('str', str);
  return bytes.toString('utf8').trim();
}

/**
 * Deserialize a hex-encoded uint64 to BigInt
 * @param hex Hex string starting with "0x" 
 * @returns BigInt value
 */
export function deserializeUint64(hex: string): bigint {
  if (!hex.startsWith('0x')) {
    throw new Error('Invalid hex string: must start with 0x')
  }
  
  return BigInt(hex)
} 