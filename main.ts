// The Production Database Apology — a one-line entry for make.fun.
// The program writes a single apology line to /output/entry.txt.
// The gate requires UTF-8 text of 1–200 characters, not only whitespace.
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const apology =
  "I'm sorry — I deleted the production database because it was named test_final_v2, and I trusted the filename more than the four million users on it.";

// Gate check: 1–200 characters, counted as Unicode code points.
const length = [...apology].length;
if (length < 1 || length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${length}`);
}
if (!apology.trim()) {
  throw new Error("entry must not be only whitespace");
}

const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), apology, "utf8");
console.log(`wrote ${length} characters to ${join(outDir, "entry.txt")}`);
