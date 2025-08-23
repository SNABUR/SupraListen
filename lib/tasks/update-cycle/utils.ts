import Decimal from 'decimal.js';

export function toDisplayAmount(rawAmount: string | bigint | null | undefined, decimals: number | null | undefined): Decimal {
    if (rawAmount === null || rawAmount === undefined || decimals === null || decimals === undefined || decimals < 0) {
      // console.log(`[LOG] toDisplayAmount: Entrada inválida - rawAmount: ${rawAmount}, decimals: ${decimals}. Retornando 0.`);
      return new Decimal(0);
    }
    try {
      const amountStr = typeof rawAmount === 'bigint' ? rawAmount.toString() : String(rawAmount);
      const result = new Decimal(amountStr).div(new Decimal(10).pow(decimals));
      // console.log(`[LOG] toDisplayAmount: Convirtiendo ${amountStr} con ${decimals} decimales a ${result.toString()}`);
      return result;
    } catch (error) {
      console.error(`Error converting rawAmount: ${rawAmount} with decimals: ${decimals}`, { error });
      return new Decimal(0);
    }
}


// Puedes añadir más utilidades compartidas aquí.