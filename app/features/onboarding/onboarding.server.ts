import { data, redirect } from "react-router";

import { createClient } from "~/utils/supabase.server";

export async function finishOnboarding(request: Request) {
  const { supabase, headers } = createClient(request);
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw redirect("/login", { headers });
  }

  const { data: progress, error } = await supabase
    .schema("public")
    .from("progress")
    .upsert(
      { id: user.id, onboarding: false },
      { onConflict: "id" },
    )
    .select("id")
    .maybeSingle();

  if (error) {
    throw data(
      {
        message: "Onboarding tidak dapat diselesaikan.",
        detail: error.message,
      },
      { status: 500, headers },
    );
  }

  if (!progress) {
    throw data(
      { message: "Status onboarding pengguna tidak dapat diperbarui." },
      { status: 500, headers },
    );
  }

  return { headers };
}
