export interface DictionaryEntry {
  en: string;
  min: string;
}

export const dictionary: DictionaryEntry[] = [
  // Greetings & Basics
  { en: "hello", min: "bello" },
  { en: "goodbye", min: "poopaye" },
  { en: "thank you", min: "bank yu" },
  { en: "thanks", min: "tanki" },
  { en: "sorry", min: "bi-do" },
  { en: "please", min: "por favor" },
  { en: "welcome", min: "bula" },
  { en: "yes", min: "da" },
  { en: "no", min: "nu" },
  { en: "ok", min: "okay" },
  { en: "okay", min: "okay" },

  // Pronouns & People
  { en: "i", min: "me" },
  { en: "me", min: "me" },
  { en: "you", min: "tu" },
  { en: "we", min: "bee" },
  { en: "us", min: "bee" },
  { en: "they", min: "bu" },
  { en: "them", min: "bu" },
  { en: "he", min: "li" },
  { en: "she", min: "la" },
  { en: "him", min: "li" },
  { en: "her", min: "la" },
  { en: "friend", min: "buddha" },
  { en: "friends", min: "buddhas" },
  { en: "man", min: "tlano" },
  { en: "woman", min: "tlana" },
  { en: "baby", min: "baboi" },

  // Verbs & Actions
  { en: "want", min: "pwede" },
  { en: "like", min: "tulali" },
  { en: "love", min: "ti amo" },
  { en: "hate", min: "tatata" },
  { en: "look", min: "luk" },
  { en: "see", min: "luk" },
  { en: "go", min: "bapple" },
  { en: "come", min: "kama" },
  { en: "stop", min: "stoppa" },
  { en: "run", min: "gogogo" },
  { en: "eat", min: "chompa" },
  { en: "drink", min: "gula" },
  { en: "kiss", min: "muak" },
  { en: "dance", min: "choka" },
  { en: "sing", min: "lala" },
  { en: "play", min: "ludo" },
  { en: "help", min: "sos" },
  { en: "know", min: "wata" },
  { en: "understand", min: "wata" },

  // Food & Items
  { en: "banana", min: "banana" },
  { en: "bananas", min: "bananas" },
  { en: "apple", min: "bapple" },
  { en: "apples", min: "bapples" },
  { en: "ice cream", min: "gelato" },
  { en: "toy", min: "baboi" },
  { en: "chair", min: "silya" },
  { en: "butt", min: "butt" },
  { en: "fire", min: "bee do bee do" },
  { en: "water", min: "aqua" },
  { en: "milk", min: "malka" },
  { en: "coffee", min: "kaba" },

  // Common Phrases
  { en: "i love you", min: "tulaliloo ti amo" },
  { en: "i hate you", min: "tatata bala tu" },
  { en: "look at you", min: "luk at tu" },
  { en: "how are you", min: "muakasa" },
  { en: "what is that", min: "po ka ta" },
  { en: "cheers", min: "kampai" },
  { en: "wedding", min: "la boda" },
  { en: "marriage", min: "la boda" },
  { en: "i'm hungry", min: "me chompa chompa" },

  // Connectors & Questions
  { en: "and", min: "na" },
  { en: "maybe", min: "ba" },
  { en: "or", min: "ka" },
  { en: "with", min: "con" },
  { en: "for", min: "para" },
  { en: "to", min: "para" },
  { en: "what", min: "po ka" },
  { en: "who", min: "sa" },
  { en: "where", min: "poka" },
  { en: "why", min: "mazo" },
  { en: "here", min: "hika" },
  { en: "there", min: "taka" },
  { en: "on", min: "ba" },

  // Adjectives / Description
  { en: "ugly", min: "bananonina" },
  { en: "beautiful", min: "bellisima" },
  { en: "good", min: "bula" },
  { en: "bad", min: "loka" },
  { en: "crazy", min: "loko" },
  { en: "happy", min: "tula" },
  { en: "sad", min: "bidu" },
  { en: "big", min: "bango" },
  { en: "small", min: "pika" },

  // Numbers
  { en: "one", min: "hana" },
  { en: "two", min: "dul" },
  { en: "three", min: "sae" },
  { en: "four", min: "para" },
  { en: "five", min: "panka" },
  { en: "six", min: "saxta" },
  { en: "seven", min: "septa" },
  { en: "eight", min: "okto" },
  { en: "nine", min: "nona" },
  { en: "ten", min: "deka" },
];

export const properNamesList = new Set([
  "mary", "beth", "john", "dave", "kevin", "stuart", "bob", "gru", "phil", "jerry", "tim", "mark", 
  "carl", "scarlet", "herb", "agnes", "edith", "margo", "lucy", "vector", "el macho"
]);

/**
 * Checks if a word is a proper name that should not be translated.
 */
export function isProperName(word: string, isFirstWord: boolean): boolean {
  if (!word) return false;
  
  // Verify Title Case (starts with uppercase, followed by lowercase letters or apostrophe)
  const isTitleCase = /^[A-Z][a-z0-9']*$/.test(word);
  if (!isTitleCase) return false;

  const lowerWord = word.toLowerCase();

  // If in the known proper names list, preserve it
  if (properNamesList.has(lowerWord)) return true;

  // If not the first word of the sentence and not in the dictionary, treat as proper noun
  if (!isFirstWord) {
    const inDict = dictionary.some(item => item.en === lowerWord || item.min === lowerWord);
    return !inDict;
  }

  return false;
}
