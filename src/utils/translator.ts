import { dictionary, isProperName } from "./dictionary/index.ts";
import { translateReversible } from "./phonetics.ts";
import { unwrapContractions } from "./contractions.ts";
import { translateMorphology } from "./morphology.ts";

export { dictionary };

export const englishToMinionMap = [...dictionary].sort(
  (a, b) => b.en.length - a.en.length
);
export const minionToEnglishMap = [...dictionary].sort(
  (a, b) => b.min.length - a.min.length
);

/**
 * Matches casing style of target string to the source string.
 */
export function matchCase(source: string, target: string): string {
  if (!source || !target) return target;
  if (source === source.toUpperCase()) return target.toUpperCase();
  if (source[0] === source[0].toUpperCase()) {
    return target.charAt(0).toUpperCase() + target.slice(1).toLowerCase();
  }
  return target.toLowerCase();
}

/**
 * Translates a text string between English and Minionese.
 */
export function translate(text: string, direction: "toMinion" | "toEnglish"): string {
  if (!text || !text.trim()) return "";

  const preparedText = direction === "toMinion" ? unwrapContractions(text) : text;
  const tokens = preparedText.match(/\w+(?:'\w+)?|[^\w\s]|\s+/g) || [];
  const translatedTokens: string[] = [];
  let i = 0;

  const mapToUse = direction === "toMinion" ? englishToMinionMap : minionToEnglishMap;
  const keySrc = direction === "toMinion" ? "en" : "min";
  const keyTar = direction === "toMinion" ? "min" : "en";

  let isFirstWordOfSentence = true;

  while (i < tokens.length) {
    let matched = false;

    // Check dictionary phrases from length 6 down to 1
    for (let length = 6; length >= 1; length--) {
      if (i + length <= tokens.length) {
        const phraseSlice = tokens.slice(i, i + length);
        if (phraseSlice.length === 0) continue;

        // Verify bounds starts and ends with a word character
        const firstToken = phraseSlice[0];
        const lastToken = phraseSlice[phraseSlice.length - 1];
        if (!/\w/.test(firstToken) || !/\w/.test(lastToken)) {
          continue;
        }

        const rawPhrase = phraseSlice.join("").toLowerCase();
        const cleanPhrase = rawPhrase.replace(/[^\w\s']/g, "").replace(/\s+/g, " ");

        const match = mapToUse.find((item) => item[keySrc] === cleanPhrase);
        if (match) {
          let translation = match[keyTar];
          translation = matchCase(phraseSlice[0], translation);
          translatedTokens.push(translation);

          // Restore trailing punctuation if sliced
          const endingToken = phraseSlice[phraseSlice.length - 1];
          if (/[^\w\s]/.test(endingToken)) {
            translatedTokens.push(endingToken);
          }

          i += length;
          matched = true;
          isFirstWordOfSentence = false;
          break;
        }
      }
    }

    if (!matched) {
      const currentToken = tokens[i];
      if (/\w+/.test(currentToken)) {
        if (isProperName(currentToken, isFirstWordOfSentence)) {
          translatedTokens.push(currentToken);
        } else {
          translatedTokens.push(translateMorphology(currentToken, translateReversible, direction));
        }
        isFirstWordOfSentence = false;
      } else {
        translatedTokens.push(currentToken);
        // Reset sentence marker upon terminal punctuation
        if (/[.!?]/.test(currentToken)) {
          isFirstWordOfSentence = true;
        }
      }
      i++;
    }
  }

  return translatedTokens.join("");
}
