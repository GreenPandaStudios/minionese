import { translateReversible } from "./phonetics.ts";

const PREFIX_KEYS = [
  "un", "re", "de", "pre", "pro", "sub", "inter", "trans", "super", "dis",
  "mis", "anti", "non", "counter", "multi", "semi", "under", "over", "auto",
  "post", "micro", "macro", "tele"
];

const SUFFIX_KEYS = [
  "tion", "ing", "ed", "ly", "able", "ible", "ment", "ness", "ful", "less",
  "est", "er", "ist", "ism", "ity", "ive", "ous", "logy", "graphy", "phobia",
  "meter", "scope", "ship", "hood", "ward", "wise", "th", "al", "ar", "ary",
  "ic", "ish", "y", "es", "s"
];

const ENG_TO_MIN_PREFIX: Record<string, string> = Object.fromEntries(
  PREFIX_KEYS.map(p => [p, translateReversible(p)])
);

const MIN_TO_ENG_PREFIX: Record<string, string> = Object.fromEntries(
  PREFIX_KEYS.map(p => [translateReversible(p), p])
);

const ENG_TO_MIN_SUFFIX: Record<string, string> = Object.fromEntries(
  SUFFIX_KEYS.map(s => [s, translateReversible(s)])
);

const MIN_TO_ENG_SUFFIX: Record<string, string> = Object.fromEntries(
  SUFFIX_KEYS.map(s => [translateReversible(s), s])
);

/**
 * Encapsulates root translation using morphological rules for prefixes/suffixes.
 */
export function translateMorphology(
  word: string,
  translateRoot: (w: string) => string,
  mode: "toMinion" | "toEnglish"
): string {
  const lower = word.toLowerCase();
  
  const prefixMap = mode === "toMinion" ? ENG_TO_MIN_PREFIX : MIN_TO_ENG_PREFIX;
  const suffixMap = mode === "toMinion" ? ENG_TO_MIN_SUFFIX : MIN_TO_ENG_SUFFIX;

  // Find longest matching prefix
  let matchedPrefix = "";
  let minionPrefix = "";
  for (const [engPrefix, minPrefix] of Object.entries(prefixMap)) {
    if (lower.startsWith(engPrefix) && lower.length > engPrefix.length + 2) {
      if (engPrefix.length > matchedPrefix.length) {
        matchedPrefix = engPrefix;
        minionPrefix = minPrefix;
      }
    }
  }

  // Find longest matching suffix from the remaining part
  let matchedSuffix = "";
  let minionSuffix = "";
  const remainingText = matchedPrefix ? lower.slice(matchedPrefix.length) : lower;

  for (const [engSuffix, minSuffix] of Object.entries(suffixMap)) {
    if (remainingText.endsWith(engSuffix) && remainingText.length > engSuffix.length + 1) {
      if (engSuffix.length > matchedSuffix.length) {
        matchedSuffix = engSuffix;
        minionSuffix = minSuffix;
      }
    }
  }

  const root = matchedSuffix 
    ? remainingText.slice(0, -matchedSuffix.length) 
    : remainingText;

  const minionRoot = translateRoot(root);

  // Re-assemble with casing of the original prefix/suffix if capitalized
  let result = minionPrefix + minionRoot + minionSuffix;
  if (word === word.toUpperCase()) {
    result = result.toUpperCase();
  } else if (word[0] === word[0].toUpperCase()) {
    result = result.charAt(0).toUpperCase() + result.slice(1);
  }
  return result;
}
export { ENG_TO_MIN_PREFIX, ENG_TO_MIN_SUFFIX };
