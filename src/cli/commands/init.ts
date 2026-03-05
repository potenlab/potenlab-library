import * as p from "@clack/prompts";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const TEMPLATES = ["admin", "client-with-auth"] as const;

export async function init() {
  p.intro("potenlab-ui init");

  const cwd = process.cwd();
  const entries = fs.readdirSync(cwd);
  if (entries.length > 0) {
    p.log.warn(
      "Current directory is not empty. Files may be overwritten."
    );
  }

  const template = await p.select({
    message: "Which template would you like to use?",
    options: TEMPLATES.map((t) => ({ value: t, label: t })),
  });

  if (p.isCancel(template)) {
    p.cancel("Operation cancelled.");
    process.exit(0);
  }

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const templateDir = path.resolve(__dirname, "..", "template", template);

  if (!fs.existsSync(templateDir)) {
    p.log.error(`Template "${template}" not found at ${templateDir}`);
    process.exit(1);
  }

  const spinner = p.spinner();
  spinner.start(`Copying ${template} template...`);

  fs.cpSync(templateDir, cwd, {
    recursive: true,
    filter: (src) => {
      const basename = path.basename(src);
      return basename !== "node_modules" && basename !== ".next";
    },
  });

  // Rename _gitignore to .gitignore (npm excludes .gitignore from packages)
  const gitignoreSrc = path.join(cwd, "_gitignore");
  const gitignoreDest = path.join(cwd, ".gitignore");
  if (fs.existsSync(gitignoreSrc)) {
    fs.renameSync(gitignoreSrc, gitignoreDest);
  }

  spinner.stop(`Template "${template}" copied successfully!`);

  p.note(
    [
      "Next steps:",
      "",
      "  1. npm install",
      "  2. npm run dev",
    ].join("\n"),
    "Get started"
  );

  p.outro("Happy coding!");
}
