# Design Tokens

All tokens are defined in `src/styles/globals.css` using Tailwind CSS v4 `@theme inline`.

## Brand Colors

| Token | Value | Usage |
|---|---|---|
| `primary` | `#509594` (teal) | Buttons, links, active states, ring |
| `primary-hover` | `#3F7A79` | Button hover state |
| `primary-active` | `#357070` | Button active/pressed state |
| `primary-light` | `#B9D5D4` | Light teal backgrounds |

Use as: `bg-primary`, `text-primary`, `hover:bg-primary-hover`, `active:bg-primary-active`

## Surfaces & Borders

| Token | Value | Usage |
|---|---|---|
| `background` | `#FCFCFC` | Page background |
| `surface` | `#FFFFFF` | Card/panel surfaces |
| `border` | `#E2E8F0` | Default borders |
| `divider` | `#EFF1F4` | Section dividers |
| `table-header` | `#F9FAFC` | Table header background |
| `sidebar-selected` | `#EEF2F6` | Active sidebar item |

## Text Colors

| Token | Value | Usage |
|---|---|---|
| `foreground` | `#000000` | Primary text |
| `table-cell` | `#3B3F4A` | Table cell text |
| `muted-fg` | `#5A5E6A` | Secondary/muted text |
| `subtitle` | `#9DA0A8` | Subtitle text |
| `placeholder` | `#A0AEC0` | Input placeholders |

## Component-Specific

| Token | Value | Usage |
|---|---|---|
| `inactive-tab` | `#EFF1F4` | Inactive tab background |
| `inactive-tab-text` | `#1A202C` | Inactive tab text |
| `badge-green-bg` | `#C6F6D5` | Success badge background |
| `badge-green-text` | `#22543D` | Success badge text |
| `toggle-on` | `#3B82F6` | Toggle switch on state |
| `toggle-off` | `#CBD5E0` | Toggle switch off state |
| `delete-text` | `#3F7A79` | Delete button text |
| `destructive` | `#EF4444` | Error/destructive actions |

## Typography

| Token | Font Stack |
|---|---|
| `font-sans` / `font-pretendard` | Pretendard Variable, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif |
| `font-inter` | Inter, Noto Sans KR, -apple-system, BlinkMacSystemFont, sans-serif |
| `font-mono` | JetBrains Mono, Fira Code, SF Mono, Consolas, monospace |

**Default body font:** Pretendard Variable (Korean-optimized)

## Border Radius

Base `--radius: 0.625rem` (10px). Derived tokens:

| Token | Calculation |
|---|---|
| `radius-sm` | radius - 4px (6px) |
| `radius-md` | radius - 2px (8px) |
| `radius-lg` | radius (10px) |
| `radius-xl` | radius + 4px (14px) |
| `radius-2xl` | radius + 8px (18px) |

## Dark Mode

Dark mode is supported via `.dark` class (managed by `next-themes`). All shadcn CSS variables have dark mode overrides defined in `globals.css`.

## Localization

The UI is **Korean-localized**. All labels, placeholders, and navigation items use Korean text. The font stack is optimized for Korean character rendering with Pretendard.
