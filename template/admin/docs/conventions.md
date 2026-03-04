# Conventions

## File Organization

### Adding a new feature

Create a new feature module under `src/features/<feature-name>/`:

```
src/features/<feature-name>/
├── components/        # Smart components (data + behavior)
├── types/
│   └── index.ts       # TypeScript interfaces and constants
└── utils/
    └── index.ts       # Feature-specific utilities
```

Then create a thin page wrapper in `app/`:

```tsx
// src/app/<route>/page.tsx
import { MyFeature } from "@/features/<feature-name>/components/my-feature";

export default function Page() {
  return <MyFeature />;
}
```

### Adding presentational components

Place reusable, feature-agnostic UI components in `src/components/`. Feature-specific presentational components go in `src/components/<feature-name>/`.

## Component Patterns

### Smart vs Presentational

- **Smart components** (`features/*/components/`) — Own state, handle events, compose presentational components. Named after what they represent (`UserList`, `UserDetail`).
- **Presentational components** (`components/`) — Receive props, render UI, call callbacks. Named after what they display (`ProfileImages`, `UserDetailForm`).

### Forms

Use `react-hook-form` for all forms:

```tsx
// Smart component creates the form
const form = useForm<FormValues>({ defaultValues: { ... } });

// Pass form instance to presentational component
<MyForm form={form} />
```

The presentational form component uses `Controller` from react-hook-form to bind fields.

### Table Columns

Define column factories as exported functions:

```tsx
export function getMyColumns(options: { onAction: (id: string) => void }): ColumnDef<MyType>[] {
  return [ ... ];
}
```

### Image Upload

Parent component owns image state and passes `onImageUpload` callback:

```tsx
const [images, setImages] = useState<string[]>([]);
const handleUpload = (file: File) => {
  setImages(prev => [...prev, URL.createObjectURL(file)]);
};
```

## Imports

### Use `@potenlab/ui` for all base components

```tsx
// CORRECT
import { Button, Card, Input } from "@potenlab/ui";
import { DataTable, PageHeader } from "@potenlab/ui";

// WRONG — do not create local copies of library components
// src/components/ui/button.tsx  ← DON'T
```

### Path aliases

| Alias | Maps to |
|---|---|
| `@/*` | `./src/*` |

```tsx
import { UserList } from "@/features/user-management/components/user-list";
import { AppSidebar } from "@/components/layouts/app-sidebar";
import { mockUsers } from "@/lib/mock-data";
```

## Styling

- Use Tailwind utility classes. Prefer design token classes (`bg-primary`, `text-muted-fg`) over raw hex values.
- Use `cn()` from `@potenlab/ui` for conditional classes.
- All custom tokens are available as Tailwind classes (see [design-tokens.md](./design-tokens.md)).

## Naming

- **Files:** kebab-case (`user-detail-form.tsx`, `mock-data.ts`)
- **Components:** PascalCase (`UserDetailForm`, `AppSidebar`)
- **Functions/variables:** camelCase (`getUserColumns`, `handleImageUpload`)
- **Types/interfaces:** PascalCase (`User`, `UserDetailFormValues`)
- **Constants:** UPPER_SNAKE_CASE (`BASIC_INFO_ROW_1`, `DEFAULT_PAGINATION`)

## Adding shadcn/ui Components

If you need a new shadcn primitive that's not yet in `@potenlab/ui`:

1. Add it to the `@potenlab/ui` package first (in the library source).
2. Re-export it from the library.
3. Import it in the template from `@potenlab/ui`.

Do NOT run `shadcn add` directly in the template — all primitives should flow through the library.
