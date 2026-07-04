const REVERSIBLE_MAP: Record<string, string> = {
  b: "p", p: "b",
  c: "k", k: "c",
  d: "t", t: "d",
  e: "o", o: "e",
  f: "v", v: "f",
  i: "u", u: "i",
  j: "q", q: "j",
  l: "r", r: "l",
  m: "n", n: "m",
  s: "z", z: "s",
  a: "a", g: "g", h: "h", w: "w", x: "x", y: "y"
};

/**
 * Reversible phonetic substitution translation.
 * Translating twice yields the exact original word back.
 */
export function translateReversible(word: string): string {
  let result = "";
  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    const lowerChar = char.toLowerCase();
    const mapped = REVERSIBLE_MAP[lowerChar];
    if (mapped) {
      // Preserve original casing style
      result += char === char.toUpperCase() ? mapped.toUpperCase() : mapped;
    } else {
      result += char;
    }
  }
  return result;
}
