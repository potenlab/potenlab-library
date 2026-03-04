import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "components/ui/index": "src/components/ui/index.ts",
    "components/common/index": "src/components/common/index.ts",
    "components/layouts/index": "src/components/layouts/index.ts",
    "lib/index": "src/lib/index.ts",
    "hooks/index": "src/hooks/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: true,
  treeshake: true,
  external: [
    "react",
    "react-dom",
    "tailwindcss",
    "next-themes",
    "@tanstack/react-table",
  ],
  banner: {
    js: '"use client";',
  },
});
