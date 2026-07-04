import { basics } from "./basics";
import { people } from "./people";
import { verbs } from "./verbs";
import { foodAndItems } from "./food";
import { properNamesList } from "./names";

export interface DictionaryEntry {
  en: string;
  min: string;
}

export const dictionary: DictionaryEntry[] = [
  ...basics,
  ...people,
  ...verbs,
  ...foodAndItems,
];

export { properNamesList };

/**
 * Checks if a word is classified as a proper name and should not be translated.
 */
export function isProperName(word: string, isFirstWordOfSentence: boolean): boolean {
  if (!word) return false;
  const lower = word.toLowerCase();
  
  if (properNamesList.includes(lower)) {
    return true;
  }

  const isCapitalized = word[0] === word[0].toUpperCase();
  if (isCapitalized) {
    if (!isFirstWordOfSentence) {
      const inDictionary = dictionary.some((entry) => entry.en === lower || entry.min === lower);
      if (!inDictionary) {
        return true;
      }
    }
  }

  return false;
}
