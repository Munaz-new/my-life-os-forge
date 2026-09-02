ALTER TABLE public.missions
  ADD COLUMN IF NOT EXISTS objective text,
  ADD COLUMN IF NOT EXISTS priority integer NOT NULL DEFAULT 3,
  ADD COLUMN IF NOT EXISTS reason text,
  ADD COLUMN IF NOT EXISTS expected_impact text,
  ADD COLUMN IF NOT EXISTS related_goal_id uuid REFERENCES public.user_goals(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS related_goal text,
  ADD COLUMN IF NOT EXISTS related_skills text[] NOT NULL DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS preparation text,
  ADD COLUMN IF NOT EXISTS success_criteria text[] NOT NULL DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS confidence numeric NOT NULL DEFAULT 0.5,
  ADD COLUMN IF NOT EXISTS source text NOT NULL DEFAULT 'manual',
  ADD COLUMN IF NOT EXISTS accepted_at timestamp with time zone,
  ADD COLUMN IF NOT EXISTS abandoned_at timestamp with time zone;

ALTER TABLE public.mission_results
  ADD COLUMN IF NOT EXISTS completion_status text NOT NULL DEFAULT 'yes',
  ADD COLUMN IF NOT EXISTS difficulty_feedback text;

CREATE INDEX IF NOT EXISTS missions_user_status_idx ON public.missions (user_id, status, created_at DESC);