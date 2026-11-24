// The Production Database Apology — a one-line entry for make.fun.
// The program writes a single apology line to /output/entry.txt.
// The gate requires UTF-8 text of 1–200 characters, not only whitespace.
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const apology =
  "I'm sorry — I deleted the production database because it was named test_final_v2, and I trusted the filename more than the four million users on it.";

// Gate check: 1–200 characters, counted as Unicode code points.
// The gate judges the file's content, so validate (and write) the
// trimmed line — a stray newline or space must never push a valid
// entry over 200 characters or let a whitespace-only line through.
const line = apology.trim();
const length = [...line].length;
if (length < 1 || length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${length}`);
}
if (!line) {
  throw new Error("entry must not be only whitespace");
}

const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, line, "utf8");
console.log(`wrote ${length} characters to ${outPath}`);
