---
sidebar_position: 2
---

# Typography

Font families and typography tokens used throughout the library.

## Font Families

| Token | Value | Usage |
|-------|-------|-------|
| `--font-pretendard` | `"Pretendard"` | Primary UI font |
| `--font-inter` | `"Inter"` | Secondary/body font |
| `--font-mono` | `"JetBrains Mono"` | Monospace/code font |
| `--font-sans` | `var(--font-pretendard)` | Default sans-serif alias |

## Installing Fonts

### Next.js (next/font)

```tsx
import localFont from "next/font/local";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
});

const inter = localFont({
  src: "./fonts/InterVariable.woff2",
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  return (
    <html className={`${pretendard.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

### CDN

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css"
/>
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
/>
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap"
/>
```

## Usage in Tailwind CSS

```tsx
<p className="font-sans">Uses Pretendard</p>
<p className="font-inter">Uses Inter</p>
<code className="font-mono">Uses JetBrains Mono</code>
```
