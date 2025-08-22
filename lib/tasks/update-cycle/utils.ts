import Decimal from 'decimal.js';

export function toDisplayAmount(rawAmount: string | bigint | null | undefined, decimals: number | null | undefined): Decimal {
    if (rawAmount === null || rawAmount === undefined || decimals === null || decimals === undefined || decimals < 0) {
      return new Decimal(0);
    }
    try {
      const amountStr = typeof rawAmount === 'bigint' ? rawAmount.toString() : String(rawAmount);
      return new Decimal(amountStr).div(new Decimal(10).pow(decimals));
    } catch (error) {
      // En un sistema de producción real, se pasaría un logger aquí.
      console.error(`Error converting rawAmount: ${rawAmount} with decimals: ${decimals}`, { error });
      return new Decimal(0);
    }
}
