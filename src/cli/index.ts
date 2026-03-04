import { init } from "./commands/init.js";

const [command] = process.argv.slice(2);

if (command === "init") {
  init();
} else {
  console.log("Usage: potenlab-ui <command>\n");
  console.log("Commands:");
  console.log("  init    Scaffold a new project from a template");
}
