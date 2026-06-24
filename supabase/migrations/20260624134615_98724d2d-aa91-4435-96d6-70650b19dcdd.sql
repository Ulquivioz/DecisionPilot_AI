-- Move has_role out of the API-exposed public schema and lock down EXECUTE
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;

-- Recreate appointments policies referencing the relocated function
DROP POLICY IF EXISTS "Admins can update appointments" ON public.appointments;
DROP POLICY IF EXISTS "Admins can view appointments" ON public.appointments;
DROP POLICY IF EXISTS "Anyone can insert appointments" ON public.appointments;

CREATE POLICY "Admins can view appointments"
ON public.appointments FOR SELECT TO authenticated
USING (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update appointments"
ON public.appointments FOR UPDATE TO authenticated
USING (private.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

-- Replace the always-true insert policy with validated public insert
CREATE POLICY "Public can submit appointment requests"
ON public.appointments FOR INSERT TO anon, authenticated
WITH CHECK (
  status = 'Pending'
  AND length(btrim(full_name)) BETWEEN 1 AND 200
  AND length(btrim(company_name)) BETWEEN 1 AND 200
  AND length(work_email) BETWEEN 3 AND 320
  AND work_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (requirements IS NULL OR length(requirements) <= 5000)
);

-- Drop the now-unused public.has_role to clear the linter findings
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);