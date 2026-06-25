ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS place text;

DROP POLICY IF EXISTS "Public can submit appointment requests" ON public.appointments;

CREATE POLICY "Public can submit appointment requests"
ON public.appointments
FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'Pending'
  AND length(btrim(full_name)) BETWEEN 1 AND 200
  AND length(btrim(company_name)) BETWEEN 1 AND 200
  AND length(work_email) BETWEEN 3 AND 320
  AND work_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (requirements IS NULL OR length(requirements) <= 5000)
  AND (place IS NULL OR length(place) <= 300)
);