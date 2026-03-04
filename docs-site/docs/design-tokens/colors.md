---
sidebar_position: 1
---

# Colors

Design tokens for the Potenlab color system, defined as CSS custom properties in `globals.css`.

## Brand Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#509594` | Primary brand color |
| `--color-primary-hover` | `#3F7A79` | Primary hover state |
| `--color-primary-active` | `#357070` | Primary active/pressed state |
| `--color-primary-light` | `#B9D5D4` | Light primary accent |

## Surface & Background

| Token | Value | Usage |
|-------|-------|-------|
| `--color-surface` | `#FFFFFF` | Card/panel backgrounds |
| `--color-background` | `hsl(var(--background))` | Page background |
| `--color-table-header` | `#F9FAFC` | Table header row |
| `--color-sidebar-selected` | `#EEF2F6` | Active sidebar item |
| `--color-inactive-tab` | `#EFF1F4` | Inactive tab background |

## Border & Divider

| Token | Value | Usage |
|-------|-------|-------|
| `--color-border` | `#E2E8F0` | Default borders |
| `--color-divider` | `#EFF1F4` | Section dividers |

## Text

| Token | Value | Usage |
|-------|-------|-------|
| `--color-foreground` | `hsl(var(--foreground))` | Primary text |
| `--color-placeholder` | `#A0AEC0` | Input placeholders |
| `--color-subtitle` | `#9DA0A8` | Subtitle/secondary text |
| `--color-muted-fg` | `#5A5E6A` | Muted foreground |
| `--color-table-cell` | `#3B3F4A` | Table cell text |

## Badge Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-badge-green-bg` | `#C6F6D5` | Green badge background |
| `--color-badge-green-text` | `#22543D` | Green badge text |

## Toggle

| Token | Value | Usage |
|-------|-------|-------|
| `--color-toggle-on` | `#3B82F6` | Switch on state |
| `--color-toggle-off` | `#CBD5E0` | Switch off state |

## Usage in Tailwind CSS

All tokens are registered as Tailwind utility classes:

```tsx
<div className="bg-primary text-primary-light">
  Styled with design tokens
</div>

<span className="text-subtitle">Secondary text</span>
<div className="bg-surface border-border">Card container</div>
```

## Dark Mode

Dark mode values are defined under the `.dark` class selector. See the [Dark Mode guide](/docs/guides/dark-mode) for details.
