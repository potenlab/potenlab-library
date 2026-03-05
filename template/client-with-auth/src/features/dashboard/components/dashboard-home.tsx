export function DashboardHome() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="flex aspect-video flex-col items-center justify-center rounded-xl border bg-card p-6 text-card-foreground">
          <p className="text-3xl font-bold">128</p>
          <p className="text-sm text-muted-foreground">Total Users</p>
        </div>
        <div className="flex aspect-video flex-col items-center justify-center rounded-xl border bg-card p-6 text-card-foreground">
          <p className="text-3xl font-bold">64</p>
          <p className="text-sm text-muted-foreground">Active Today</p>
        </div>
        <div className="flex aspect-video flex-col items-center justify-center rounded-xl border bg-card p-6 text-card-foreground">
          <p className="text-3xl font-bold">98%</p>
          <p className="text-sm text-muted-foreground">Uptime</p>
        </div>
      </div>
      <div className="min-h-[50vh] flex-1 rounded-xl border bg-card p-6">
        <p className="text-muted-foreground">
          Your main content goes here.
        </p>
      </div>
    </div>
  );
}
