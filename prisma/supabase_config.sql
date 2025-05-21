-- Función corregida con cast a JSONB
CREATE OR REPLACE FUNCTION notify_pusher()
RETURNS TRIGGER AS $$
DECLARE
  payload JSON;
  webhook_url TEXT := 'https://supraspike.fun/api/webhooks/supabase'; -- Asegúrate que esta URL sea correcta
  secret_key TEXT := 'cavEDFTG024trgpraspik'; -- Asegúrate que este secreto coincida con Vercel
  request_id BIGINT;
BEGIN
  -- Construir el payload JSON (sigue siendo tipo JSON aquí)
  payload := json_build_object(
    'operation', TG_OP,
    'schema', TG_TABLE_SCHEMA,
    'table', TG_TABLE_NAME,
    'timestamp', now(),
    'data', CASE TG_OP
              WHEN 'INSERT' THEN row_to_json(NEW)
              -- Si alguna vez manejas UPDATE/DELETE, añádelos aquí
            END
  );

  -- Enviar la petición POST, haciendo CAST de payload a JSONB
  SELECT net.http_post(
      url := webhook_url,
      body := payload::jsonb, -- <<< ¡LA CORRECCIÓN ESTÁ AQUÍ!
      headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Authorization', 'Bearer ' || secret_key
      )
  ) INTO request_id; -- Guarda el resultado (si lo necesitaras)

  -- Devolver NEW porque es un trigger AFTER INSERT
  RETURN NEW;

END;
$$ LANGUAGE plpgsql;