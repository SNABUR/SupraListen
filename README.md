This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

///////////////////////ESTO ES PARA CREAR LA VISTA DE LAS TABLAS EN SUPBASE SQL //////////////////////////////////////
CREATE OR REPLACE VIEW tokens_with_participating_ammpairs AS
SELECT
    t.id,
    t.network,
    t.name,
    t.symbol,
    t.decimals,
    t."iconUri",         -- Citado porque es camelCase en tu schema Prisma
    t."projectUri",      -- Citado
    t.verified AS token_verified,
    t."displayOrder" AS token_display_order, -- Citado
    t."metadataFetched", -- Citado
    t."metadataStandard",-- Citado
    t."lastMetadataAttempt", -- Citado
    (
        SELECT jsonb_agg(
                   jsonb_build_object(
                           'id', ap.id, -- ID del Ammpair
                           'pair_address', ap.pair, -- Dirección del par AMM
                           'creator_address', ap.creator,
                           'verified', ap.verified, -- verified del Ammpair
                           'display_order', ap."displayOrder", -- displayOrder del Ammpair (citado)
                           'network', ap.network, -- network del Ammpair
                           'token0_address', ap."token0Address", -- Citado
                           'token0_network', ap."token0Network", -- Citado
                           'token1_address', ap."token1Address", -- Citado
                           'token1_network', ap."token1Network"  -- Citado
                       )
                   ORDER BY ap."displayOrder" ASC NULLS LAST, ap."createdAt" DESC
               )
        FROM "Ammpair" ap -- <<--- Usando el nombre del modelo Prisma (PascalCase, citado)
        WHERE
            (ap."token0Address" = t.id AND ap."token0Network" = t.network) OR
            (ap."token1Address" = t.id AND ap."token1Network" = t.network)
    ) AS participating_pairs
FROM
    tokens t; -- Nombre de la tabla de tokens (mapeada a "tokens")


/////////////////////////////////AMM Pairs details for backend sql////////////////////////////////////

DROP VIEW IF EXISTS ammpairs_with_token_details;

CREATE VIEW ammpairs_with_token_details AS
SELECT
    amm.id AS ammpair_id, 
    amm.network, -- Probablemente la vista existente lo llama 'network'
    amm.pair,    -- Probablemente la vista existente lo llama 'pair'
    amm.creator, -- Probablemente la vista existente lo llama 'creator'
    amm.verified, -- Probablemente la vista existente lo llama 'verified'
    amm."displayOrder" AS ammpair_display_order,
    amm."createdAt" AS ammpair_created_at,
    amm."updatedAt" AS ammpair_updated_at,

    amm.reserve0,
    amm.reserve1,
    amm."tvlUsd",
    amm."volumeToken0_24h",
    amm."volumeToken1_24h",
    amm."volumeUsd24h",
    amm."lpFeePercent",
    amm."apr24h",
    amm."apyCalculated",
    amm."lastStatsUpdate",
    
    t0.id AS token0_id,
    t0.network AS token0_network,
    t0.name AS token0_name,
    t0.symbol AS token0_symbol,
    t0.decimals AS token0_decimals,
    t0."iconUri" AS token0_icon_uri,       
    t0."projectUri" AS token0_project_uri,
    t0."originalCoinType" AS token0_original_coin_type,
    t0."metadataStandard" AS token0_metadata_standard,
    t0."metadataFetched" AS token0_metadata_fetched,
    t0."lastMetadataAttempt" AS token0_last_metadata_attempt,
    t0.verified AS token0_verified,
    t0."displayOrder" AS token0_display_order,
    
    t1.id AS token1_id,
    t1.network AS token1_network,
    t1.name AS token1_name,
    t1.symbol AS token1_symbol,
    t1.decimals AS token1_decimals,
    t1."iconUri" AS token1_icon_uri,
    t1."projectUri" AS token1_project_uri,
    t1."originalCoinType" AS token1_original_coin_type,
    t1."metadataStandard" AS token1_metadata_standard,
    t1."metadataFetched" AS token1_metadata_fetched,
    t1."lastMetadataAttempt" AS token1_last_metadata_attempt,
    t1.verified AS token1_verified,
    t1."displayOrder" AS token1_display_order
FROM
    "Ammpair" amm 
LEFT JOIN
    tokens t0 ON amm."token0Address" = t0.id AND amm."token0Network" = t0.network 
LEFT JOIN
    tokens t1 ON amm."token1Address" = t1.id AND amm."token1Network" = t1.network;

/////////////////////////////////PERMISOS PARA PODER LEER LAS VISTAS////////////////////////////////////////



-- Conceder permiso SELECT al rol anónimo
GRANT SELECT ON TABLE ammpairs_with_token_details TO anon;

-- Conceder permiso SELECT al rol de usuarios autenticados
GRANT SELECT ON TABLE ammpairs_with_token_details TO authenticated;




/////////////////////////////////ESTO DA PERMISOS A SUPABASE ROL ANON LEER ! /////////////////////////////////////////
GRANT USAGE ON SCHEMA public TO anon;

-- Habilitar RLS y permitir lectura para el rol ANON
-- (Asegúrate de que los nombres de tabla sean los correctos en tu BD)

-- Tabla: BlockProgress
ALTER TABLE public."BlockProgress" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to BlockProgress" ON public."BlockProgress" FOR SELECT TO anon USING (true);
GRANT SELECT ON TABLE public."BlockProgress" TO anon;

-- Tabla: EventTracking
ALTER TABLE public."EventTracking" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to EventTracking" ON public."EventTracking" FOR SELECT TO anon USING (true);
GRANT SELECT ON TABLE public."EventTracking" TO anon;

-- Tabla: VRFCallback
ALTER TABLE public."VRFCallback" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to VRFCallback" ON public."VRFCallback" FOR SELECT TO anon USING (true);
GRANT SELECT ON TABLE public."VRFCallback" TO anon;

-- Tabla: TradeEvent
ALTER TABLE public."TradeEvent" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to TradeEvent" ON public."TradeEvent" FOR SELECT TO anon USING (true);
GRANT SELECT ON TABLE public."TradeEvent" TO anon;

-- Tabla: PoolsDB
ALTER TABLE public."PoolsDB" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to PoolsDB" ON public."PoolsDB" FOR SELECT TO anon USING (true);
GRANT SELECT ON TABLE public."PoolsDB" TO anon;

-- Tabla: tokens (mapeada desde Token)
ALTER TABLE public.tokens ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to tokens" ON public.tokens FOR SELECT TO anon USING (true);
GRANT SELECT ON TABLE public.tokens TO anon;

-- Tabla: Ammpair
ALTER TABLE public."Ammpair" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to Ammpair" ON public."Ammpair" FOR SELECT TO anon USING (true);
GRANT SELECT ON TABLE public."Ammpair" TO anon;

-- Tabla: GameResult
ALTER TABLE public."GameResult" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to GameResult" ON public."GameResult" FOR SELECT TO anon USING (true);
GRANT SELECT ON TABLE public."GameResult" TO anon;

-- Tabla: users (mapeada desde User)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to users" ON public.users FOR SELECT TO anon USING (true);
GRANT SELECT ON TABLE public.users TO anon;

-- Tabla: comments (mapeada desde Comment)
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to comments" ON public.comments FOR SELECT TO anon USING (true);
GRANT SELECT ON TABLE public.comments TO anon;

-- Tabla: likes (mapeada desde Like)
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to likes" ON public.likes FOR SELECT TO anon USING (true);
GRANT SELECT ON TABLE public.likes TO anon;

-- Tabla: images (mapeada desde Image)
ALTER TABLE public.images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to images" ON public.images FOR SELECT TO anon USING (true);
GRANT SELECT ON TABLE public.images TO anon;

-- Tabla: staking_pools (mapeada desde StakingPool)
ALTER TABLE public.staking_pools ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to staking_pools" ON public.staking_pools FOR SELECT TO anon USING (true);
GRANT SELECT ON TABLE public.staking_pools TO anon;

-- SI AÑADES MÁS TABLAS EN EL FUTURO, AÑADE SUS COMANDOS AQUÍ --
-- Ejemplo para futuras tablas de eventos de staking que aún no tienes:
/*
-- Tabla: staking_user_stakes
ALTER TABLE public.staking_user_stakes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to staking_user_stakes" ON public.staking_user_stakes FOR SELECT TO anon USING (true);
GRANT SELECT ON TABLE public.staking_user_stakes TO anon;

-- Tabla: staking_pool_registered_events
ALTER TABLE public.staking_pool_registered_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to staking_pool_registered_events" ON public.staking_pool_registered_events FOR SELECT TO anon USING (true);
GRANT SELECT ON TABLE public.staking_pool_registered_events TO anon;
*/

-- NOTA: Si una tabla ya tiene RLS habilitado, el comando ALTER TABLE no hará daño.
-- Si una política con el mismo nombre ya existe para la misma tabla y evento, el CREATE POLICY fallará.
-- Podrías usar DROP POLICY IF EXISTS ... y luego CREATE POLICY, o darles nombres únicos si necesitas múltiples políticas SELECT para anon (raro).
-- Los GRANT son idempotentes en el sentido de que otorgar un permiso que ya existe no causa error.