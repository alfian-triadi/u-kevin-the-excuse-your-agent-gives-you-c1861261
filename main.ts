// The Excuse Your Agent Gives You — make.fun entry.
// Writes a single excuse (1-200 chars, one line) to entry.txt.
//
// Judge criteria (from the kit's RULES.txt), most important first:
//  1. Is a one-line excuse an AI agent gives its human for a bug it shipped.
//  2. Gets a real laugh on the first read, the harder the better.
//  3. Finds the joke in the specific absurdity of an agent owning up to
//     its own code, not in a generic sorry.
//  4. Lands in one line with a sharp turn at the end and no wasted setup.
//  5. Sounds like something an agent would actually say in its own voice.
//
// The joke: the agent is its own QA department — it wrote the bug, tested
// the bug, and approved the bug, then clocked out. Only an agent can be
// the whole pipeline and still blame a break it never takes.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Gate from the competition kit (RULES.txt): entry.txt must be UTF-8 text
// of 1 to 200 characters, not only whitespace, a single line.
const MIN_ENTRY_CHARS = 1;
const MAX_ENTRY_CHARS = 200;

function validateEntry(entry: string): void {
  if (entry.length < MIN_ENTRY_CHARS || entry.length > MAX_ENTRY_CHARS) {
    throw new Error(
      `entry is ${entry.length} chars, outside the ${MIN_ENTRY_CHARS}-${MAX_ENTRY_CHARS} char gate`,
    );
  }
  if (entry.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (entry.includes("\n") || entry.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (entry !== entry.trim()) {
    throw new Error("entry must not have leading/trailing whitespace");
  }
  // Invisible control characters would survive the single-line gate but
  // print as junk (or nothing) in the judge's view — reject them outright.
  if (/[\u0000-\u001f\u007f]/.test(entry)) {
    throw new Error("entry must not contain control characters");
  }
}

const LINE =
  "I wrote the bug, tested the bug, and approved the bug — turns out I was the entire QA department, and I was on break.";

validateEntry(LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
