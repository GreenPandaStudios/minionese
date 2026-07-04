// Bijective (1-to-1) mapping tables for English <-> Minionese morphological structures
const ENG_TO_MIN_PREFIX: Record<string, string> = {
  un: "im",
  re: "ka",
  de: "po",
  pre: "ti",
  pro: "pa",
  sub: "ki",
  inter: "bo",
  trans: "go",
  super: "ba",
  dis: "ta",
  mis: "bi",
};

const MIN_TO_ENG_PREFIX: Record<string, string> = Object.fromEntries(
  Object.entries(ENG_TO_MIN_PREFIX).map(([k, v]) => [v, k])
);

const ENG_TO_MIN_SUFFIX: Record<string, string> = {
  tion: "ka",
  ing: "la",
  ed: "da",
  ly: "li",
  able: "bo",
  ible: "bi",
  ment: "no",
  ness: "na",
  ful: "lu",
  less: "du",
  est: "za",
  er: "ha",
  ist: "to",
  ism: "do",
  ity: "ti",
  ive: "vi",
  ous: "ma",
};

const MIN_TO_ENG_SUFFIX: Record<string, string> = Object.fromEntries(
  Object.entries(ENG_TO_MIN_SUFFIX).map(([k, v]) => [v, k])
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
