export function ContentView() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Content</h1>
      <div className="min-h-[50vh] flex-1 rounded-xl border bg-card p-6">
        <p className="text-muted-foreground">Content management goes here.</p>
      </div>
    </div>
  );
}
