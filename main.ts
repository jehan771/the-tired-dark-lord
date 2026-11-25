// The Tired Dark Lord: A 100-Word Villain Monologue
// Writes one ~100-word monologue to /output/entry.txt, deterministically.
//
// The speaker: a conqueror of the Hollow Marches who raised an army of the
// dead — not out of malice, but because the living kept asking questions.
// His tiredness never gets announced; it lives in the pauses ("Waiting."),
// the deflections (the bards sing the conquest, never the tithes), and the
// giveaway: throne, crown, sword — all of it — in exchange for a nap kept.

import { mkdirSync, writeFileSync } from "node:fs";

const MONOLOGUE =
  "Come in. Mind the skulls \u2014 they were a statement once. " +
  "Now they're in the way. I took the Hollow Marches in nine days. Nine. " +
  "The bards still sing it. They skip the tithes. The border disputes. " +
  "Men who call me \u201cmy lord\u201d and mean \u201cmy problem.\u201d " +
  "I raised the dead because the living asked questions. " +
  "The dead don't ask. They stand there. Waiting. " +
  "So take the throne. Take the crown, the sword, all of it. " +
  "I ask this: when you strike me down, do it before lunch. " +
  "I have a nap scheduled. For once, I intend to keep it.";

const WORDS = MONOLOGUE.split(/\s+/).filter(Boolean);

if (WORDS.length !== 100) {
  throw new Error(`expected 100 words, got ${WORDS.length}`);
}
if (MONOLOGUE.length > 600 || MONOLOGUE.length < 1) {
  throw new Error(`gate: entry must be 1-600 chars, got ${MONOLOGUE.length}`);
}

// The judge's rule 2: the tiredness must be felt, never announced. Fail the
// build outright if the monologue ever states it plainly.
const ANNOUNCED = ["tired", "weary", "exhausted", "fatigue", "sleepy"];
for (const w of ANNOUNCED) {
  if (new RegExp(`\\b${w}\\b`, "i").test(MONOLOGUE)) {
    throw new Error(`monologue must not announce tiredness: found "${w}"`);
  }
}
// Tie-break on the board is smaller text first: keep the entry compact.
if (Buffer.byteLength(MONOLOGUE + "\n", "utf8") > 600) {
  throw new Error("entry exceeds 600 bytes");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", MONOLOGUE + "\n", "utf8");
console.log(`wrote /output/entry.txt (${WORDS.length} words, ${MONOLOGUE.length + 1} chars incl. newline)`);
