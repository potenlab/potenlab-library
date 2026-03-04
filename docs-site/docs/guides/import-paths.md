---
sidebar_position: 1
---

# Import Paths

`@potenlab/ui` provides multiple entry points for optimal tree-shaking and bundle size.

## Available Entry Points

### Main Entry (All Components)

```tsx
import { Button, Input, Badge, DataTable, DashboardLayout } from "@potenlab/ui";
```

Imports all components from a single entry point. Convenient but may include unused code.

### UI Primitives

```tsx
import { Button, Input, Badge, Card } from "@potenlab/ui/components/ui";
```

Only UI primitive components (21 components).

### Common Components

```tsx
import { DataTable, SearchBar, PageHeader } from "@potenlab/ui/components/common";
```

Higher-level composed components (7 components).

### Layout Components

```tsx
import { DashboardLayout, ContentLayout } from "@potenlab/ui/components/layouts";
```

Page-level layout components (2 components).

### Hooks

```tsx
import { useIsMobile } from "@potenlab/ui/hooks";
```

### Utilities

```tsx
import { cn } from "@potenlab/ui/lib";
```

The `cn` utility merges Tailwind CSS classes using `clsx` and `tailwind-merge`.

### Styles

```css
@import "@potenlab/ui/styles/globals.css";
```

## Recommendation

For the smallest bundle size, use the category-specific imports:

```tsx
// Good — only loads UI primitives
import { Button } from "@potenlab/ui/components/ui";

// Also good — loads everything (fine if you use many components)
import { Button } from "@potenlab/ui";
```
