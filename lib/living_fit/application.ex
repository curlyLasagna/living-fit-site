defmodule LivingFit.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      LivingFitWeb.Telemetry,
      LivingFit.Repo,
      {DNSCluster, query: Application.get_env(:living_fit, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: LivingFit.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: LivingFit.Finch},
      # Start a worker by calling: LivingFit.Worker.start_link(arg)
      # {LivingFit.Worker, arg},
      # Start to serve requests, typically the last entry
      LivingFitWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: LivingFit.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    LivingFitWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
