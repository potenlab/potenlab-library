import { defineConfig } from "tsup";

export default defineConfig({
  entry: { cli: "src/cli/index.ts" },
  format: ["esm"],
  dts: false,
  sourcemap: false,
  clean: false,
  splitting: false,
  treeshake: true,
  noExternal: ["@clack/prompts"],
  banner: {
    js: "#!/usr/bin/env node",
  },
});
