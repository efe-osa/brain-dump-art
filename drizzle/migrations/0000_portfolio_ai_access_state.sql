CREATE TABLE public.portfolio_ai_access_state (
  id text PRIMARY KEY,
  status integer NOT NULL,
  message text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.portfolio_ai_access_state TO service_role;
ALTER TABLE public.portfolio_ai_access_state ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role manages AI access state" ON public.portfolio_ai_access_state FOR ALL TO service_role USING (true) WITH CHECK (true);