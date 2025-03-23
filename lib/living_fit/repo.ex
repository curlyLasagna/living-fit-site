defmodule LivingFit.Repo do
  use Ecto.Repo,
    otp_app: :living_fit,
    adapter: Ecto.Adapters.Postgres
end
