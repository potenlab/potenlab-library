---
sidebar_position: 3
---

# Quick Start

Start using `@potenlab/ui` components in your project.

## Using the CLI

The fastest way to get started is with the CLI:

```bash
npx potenlab-ui init
```

This scaffolds a complete Next.js project with `@potenlab/ui` pre-configured. Currently the **admin** template is available, which sets up a full admin dashboard with sidebar navigation, data tables, and form pages.

See the [Admin Panel Template](./admin-panel) guide for full details.

## Your First Component

```tsx
import { Button } from "@potenlab/ui";

export default function App() {
  return (
    <Button variant="primary" onClick={() => alert("Hello!")}>
      Click me
    </Button>
  );
}
```

## Import Styles

Import multiple components from the main entry point:

```tsx
import { Button, Input, Card, Badge } from "@potenlab/ui";
```

Or use deep imports for smaller bundles:

```tsx
import { Button } from "@potenlab/ui/components/ui";
import { DataTable } from "@potenlab/ui/components/common";
import { DashboardLayout } from "@potenlab/ui/components/layouts";
```

## Example: Simple Form

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@potenlab/ui";
import { Input } from "@potenlab/ui";
import { Button } from "@potenlab/ui";
import { Label } from "@potenlab/ui";

export default function LoginForm() {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
        <Button className="w-full">Sign In</Button>
      </CardContent>
    </Card>
  );
}
```

## Next Steps

- Scaffold a full project with the [Admin Panel Template](./admin-panel)
- Browse the [UI Primitives](/docs/components/ui/button) to see all available components
- Learn about [Import Paths](/docs/guides/import-paths) for tree-shaking
- Explore [Theming](/docs/guides/theming) to customize the design tokens
