---
sidebar_position: 3
---

# Spacing & Border Radius

Spacing and border radius tokens used throughout the library.

## Border Radius

The library uses a base radius of `0.625rem` (10px) with scaled variants:

| Token | Value | Tailwind Class |
|-------|-------|----------------|
| `--radius` | `0.625rem` | — (base) |
| `--radius-sm` | `calc(var(--radius) - 4px)` | `rounded-sm` |
| `--radius-md` | `calc(var(--radius) - 2px)` | `rounded-md` |
| `--radius-lg` | `var(--radius)` | `rounded-lg` |
| `--radius-xl` | `calc(var(--radius) + 4px)` | `rounded-xl` |
| `--radius-2xl` | `calc(var(--radius) + 8px)` | `rounded-2xl` |
| `--radius-3xl` | `calc(var(--radius) + 12px)` | `rounded-3xl` |
| `--radius-4xl` | `calc(var(--radius) + 16px)` | `rounded-4xl` |

## Customizing

Override the base `--radius` to scale all border radius values:

```css
:root {
  --radius: 0.5rem; /* smaller corners */
}
```

## Common Spacing Patterns

The library uses Tailwind's default spacing scale. Common patterns in components:

| Pattern | Usage |
|---------|-------|
| `p-4` / `p-6` | Card padding |
| `gap-2` / `gap-4` | Flex/grid gaps |
| `space-y-2` | Stacked form fields |
| `ml-[324px]` | Content offset for sidebar |
| `h-8` / `h-10` / `h-12` | Button/input heights |
