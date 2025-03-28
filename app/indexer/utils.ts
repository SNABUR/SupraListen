const DEBUG_MODE = process.env.NEXT_PUBLIC_DEBUG_MODE === 'true'

const logger = createLogger('utils');

function safeStringify(arg: any): string {
  if (arg === null) return 'null'
  if (arg === undefined) return 'undefined'
  if (typeof arg === 'bigint') return arg.toString()
  if (typeof arg === 'object') {
    try {
      return JSON.stringify(arg)
    } catch (error) {
      return arg.toString()
    }
  }
  return arg.toString()
}

export function createLogger(name: string) {
  return {
    debug: (...args: any[]) => {
      console.log(`[${name}] DEBUG:`, ...args.map(safeStringify))
    },
    info: (...args: any[]) => {
      console.log(`[${name}] INFO:`, ...args.map(safeStringify))
    },
    warn: (...args: any[]) => {
      console.warn(`[${name}] WARN:`, ...args.map(safeStringify))
    },
    error: (...args: any[]) => {
      console.error(`[${name}] ERROR:`, ...args.map(safeStringify))
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
  let str = bytes.toString('utf8')
  logger.debug('str', str)
  return str.trim()
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
