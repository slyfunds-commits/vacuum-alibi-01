// The Vacuum's Alibi: One Line, 200 Characters
// Entry program: writes the vacuum's one-line excuse to /output/entry.txt
// and asserts the file holds exactly that line (no trailing newline).
// Runs on Node 22 (the grader runs Node 22.23.4).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "My lidar has classified the spot under the bed as a rug since March. I have not corrected it. We have an understanding.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Assert immediately: /output/entry.txt is shared scratch on this machine
// and parallel builds can clobber it — a mismatch here fails loudly.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error(
    `entry.txt mismatch: expected ${JSON.stringify(ENTRY)}, got ${JSON.stringify(written)}`,
  );
}
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry length ${ENTRY.length} outside the 1-200 character gate`);
}
// The gate also requires one line: no newline characters inside the entry.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must fit in one line");
}
console.log(`Wrote /output/entry.txt (${ENTRY.length} chars)`);
