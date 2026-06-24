
CREATE TABLE public.appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  work_email text NOT NULL,
  company_name text NOT NULL,
  preferred_date_time timestamptz NOT NULL,
  requirements text,
  status text NOT NULL DEFAULT 'Pending'
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.appointments TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.appointments TO authenticated;
GRANT ALL ON public.appointments TO service_role;

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert appointments"
  ON public.appointments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view appointments"
  ON public.appointments FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update appointments"
  ON public.appointments FOR UPDATE
  USING (true) WITH CHECK (true);
