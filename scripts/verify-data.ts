
import { PrismaClient as MainPrismaClient } from '../prisma/generated/main_db';
import { PrismaClient as OhlcPrismaClient } from '../prisma/generated/ohlc_db';

const mainDB = new MainPrismaClient();
const ohlcDB = new OhlcPrismaClient();

async function verifyData() {
  console.log('--- Verificando Datos en la Base de Datos Principal (main_db) ---');

  try {
    // 1. Obtener los 3 pares de supra-mainnet que tienen reservas
    const ammPairs = await mainDB.ammpair.findMany({
      where: {
        network: 'supra-mainnet',
        reserve0: { not: null },
        reserve1: { not: null },
      },
      take: 3,
    });

    console.log('\n--- Pares AMM (supra-mainnet) ---');
    console.log(ammPairs);

    if (ammPairs.length > 0) {
      const tokenAddresses = new Set<string>();
      ammPairs.forEach(pair => {
        tokenAddresses.add(pair.token0Address);
        tokenAddresses.add(pair.token1Address);
      });

      const tokens = await mainDB.tokens.findMany({
        where: {
          network: 'supra-mainnet',
          id: { in: Array.from(tokenAddresses) },
        },
      });

      const tokenPrices = await mainDB.token_prices.findMany({
        where: {
          network: 'supra-mainnet',
          tokenAddress: { in: Array.from(tokenAddresses) },
        },
      });

      console.log('\n--- Tokens Involucrados en los Pares ---');
      console.log(tokens);

      console.log('\n--- Precios de los Tokens Involucrados ---');
      console.log(tokenPrices);

      // Verificación cruzada
      console.log('\n--- Verificación de Datos Faltantes ---');
      for (const pair of ammPairs) {
        const token0 = tokens.find(t => t.id === pair.token0Address);
        const token1 = tokens.find(t => t.id === pair.token1Address);
        const price0 = tokenPrices.find(p => p.tokenAddress === pair.token0Address);
        const price1 = tokenPrices.find(p => p.tokenAddress === pair.token1Address);

        if (!token0 || token0.decimals === null) {
          console.log(`ALERTA: El token ${pair.token0Address} del par ${pair.pair} no tiene decimales (decimals) definidos.`);
        }
        if (!token1 || token1.decimals === null) {
          console.log(`ALERTA: El token ${pair.token1Address} del par ${pair.pair} no tiene decimales (decimals) definidos.`);
        }
        if (!price0 || price0.priceUsd === null) {
          console.log(`ALERTA: El token ${pair.token0Address} del par ${pair.pair} no tiene precio (priceUsd) definido.`);
        }
        if (!price1 || price1.priceUsd === null) {
          console.log(`ALERTA: El token ${pair.token1Address} del par ${pair.pair} no tiene precio (priceUsd) definido.`);
        }
      }
    }

  } catch (error) {
    console.error('\nError al consultar la base de datos principal:', error);
  } finally {
    await mainDB.$disconnect();
  }

  console.log('\n--- Verificando Datos en la Base de Datos de OHLC (ohlc_db) ---');
  try {
    const ohlcData = await ohlcDB.ohlcData.findMany({
        where: {
            network: 'supra-mainnet',
        },
        take: 5,
        orderBy: {
            timestamp: 'desc',
        }
    });

    console.log('\n--- Muestra de Datos OHLC (supra-mainnet) ---');
    console.log(ohlcData);

  } catch (error) {
    console.error('\nError al consultar la base de datos de OHLC:', error);
  } finally {
    await ohlcDB.$disconnect();
  }
}

verifyData();
