-- Create a simple health check table to trigger types generation
CREATE TABLE IF NOT EXISTS public.system_health (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.system_health ENABLE ROW LEVEL SECURITY;

-- Create a simple policy (read-only for everyone)
CREATE POLICY "System health is viewable by everyone"
  ON public.system_health
  FOR SELECT
  USING (true);