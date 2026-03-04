---
sidebar_position: 2
---

# Theming

Customize the visual appearance of `@potenlab/ui` by overriding CSS custom properties.

## Overriding Design Tokens

All design tokens are CSS custom properties. Override them in your global stylesheet:

```css
:root {
  /* Change the primary brand color */
  --color-primary: #6366f1;
  --color-primary-hover: #4f46e5;
  --color-primary-active: #4338ca;
  --color-primary-light: #c7d2fe;

  /* Change the border radius */
  --radius: 0.75rem;

  /* Change the toggle color */
  --color-toggle-on: #6366f1;
}
```

## shadcn/ui Tokens

The library also uses HSL-based CSS variables following the shadcn/ui convention:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --accent: 240 4.8% 95.9%;
  --accent-foreground: 240 5.9% 10%;
  --destructive: 0 84.2% 60.2%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 240 5.9% 10%;
}
```

## Font Customization

Override font families:

```css
:root {
  --font-pretendard: "Your Custom Font", sans-serif;
  --font-inter: "Another Font", sans-serif;
  --font-mono: "Fira Code", monospace;
}
```

## Per-Component Styling

All components accept a `className` prop for one-off customizations:

```tsx
<Button className="rounded-full px-8">Custom Style</Button>
<Card className="shadow-xl border-2">Emphasized Card</Card>
```

Use the `cn()` utility to conditionally merge classes:

```tsx
import { cn } from "@potenlab/ui/lib";

<Button className={cn("w-full", isLoading && "opacity-50")}>
  Submit
</Button>
```
