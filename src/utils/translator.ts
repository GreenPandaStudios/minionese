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

// Sort maps by length descending to match longest phrase matches first
export const englishToMinionMap = [...dictionary].sort(
  (a, b) => b.en.length - a.en.length
);
export const minionToEnglishMap = [...dictionary].sort(
  (a, b) => b.min.length - a.min.length
);

/**
 * Splits a word into orthographic syllables using vowel clusters.
 */
export function splitIntoSyllables(word: string): string[] {
  if (!word) return [];
  // Syllables are defined by vowel centers and surrounding consonants
  const regex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy](?![aeiouy]))*/gi;
  const matches = word.match(regex);
  return matches || [word];
}

/**
 * Maps a single syllable from English to Minionese using cute phonetic rules.
 */
export function mapSyllableToMinion(syllable: string): string {
  const match = syllable.match(/^([^aeiouy]*)([aeiouy]+)([^aeiouy]*)$/i);
  if (!match) return syllable;

  let [, onset, nucleus, coda] = match;
  onset = onset.toLowerCase();
  nucleus = nucleus.toLowerCase();
  coda = coda.toLowerCase();

  // 1. Map Onset (initial consonants)
  let newOnset = onset;
  if (onset.startsWith("th")) {
    newOnset = "d" + onset.slice(2);
  } else if (onset.startsWith("ph")) {
    newOnset = "p" + onset.slice(2);
  } else if (onset.startsWith("ch") || onset.startsWith("sh")) {
    newOnset = "ts";
  } else {
    newOnset = onset
      .replace(/f/g, "b")
      .replace(/v/g, "b")
      .replace(/s/g, "sh")
      .replace(/z/g, "sh")
      .replace(/c/g, "k")
      .replace(/q/g, "k")
      .replace(/r/g, "l");
  }

  // 2. Map Nucleus (vowels) - keep them short and cute
  let newNucleus = nucleus;
  if (nucleus.length > 1) {
    const firstVowel = nucleus[0];
    if (firstVowel === "a") newNucleus = "a";
    else if (firstVowel === "e") newNucleus = "o";
    else if (firstVowel === "i") newNucleus = "i";
    else if (firstVowel === "o") newNucleus = "u";
    else if (firstVowel === "u") newNucleus = "oo";
    else newNucleus = "i";
  } else {
    const v = nucleus;
    if (v === "a") newNucleus = "a";
    else if (v === "e") newNucleus = "o"; // e.g. hello -> bello
    else if (v === "i") newNucleus = "i";
    else if (v === "o") newNucleus = "u";
    else if (v === "u") newNucleus = "u";
    else if (v === "y") newNucleus = "i";
  }

  // Deduplicate and shorten to prevent bloat
  newNucleus = newNucleus.replace("ee", "i").replace("oo", "u");

  // 3. Map Coda (final consonants)
  let newCoda = coda;
  if (coda) {
    if (coda.endsWith("r")) {
      newCoda = ""; // Non-rhotic cute drop
    } else if (coda.endsWith("st") || coda.endsWith("nd") || coda.endsWith("nt")) {
      newCoda = coda.slice(-1); // Keep last char (t, d)
    } else {
      newCoda = coda
        .replace(/f/g, "b")
        .replace(/v/g, "b")
        .replace(/s/g, "")
        .replace(/z/g, "")
        .replace(/c/g, "k")
        .replace(/q/g, "k");
    }
  }

  return newOnset + newNucleus + newCoda;
}

/**
 * Maps a single syllable from Minionese back to English using reverse phonetic rules.
 */
export function mapSyllableToEnglish(syllable: string): string {
  const match = syllable.match(/^([^aeiouy]*)([aeiouy]+)([^aeiouy]*)$/i);
  if (!match) return syllable;

  let [, onset, nucleus, coda] = match;
  onset = onset.toLowerCase();
  nucleus = nucleus.toLowerCase();
  coda = coda.toLowerCase();

  // 1. Map Onset
  let newOnset = onset;
  if (onset === "d") newOnset = "th";
  else if (onset === "ts") newOnset = "ch";
  else if (onset === "sh") newOnset = "s";
  else {
    newOnset = onset
      .replace(/b/g, "v")
      .replace(/k/g, "c")
      .replace(/l/g, "r");
  }

  // 2. Map Nucleus
  let newNucleus = nucleus;
  if (nucleus === "o") newNucleus = "e";
  else if (nucleus === "u") newNucleus = "o";
  else if (nucleus === "i") newNucleus = "i";
  else if (nucleus === "a") newNucleus = "a";

  // 3. Map Coda
  let newCoda = coda;
  if (coda) {
    newCoda = coda
      .replace(/b/g, "v")
      .replace(/k/g, "c");
  }

  return newOnset + newNucleus + newCoda;
}

/**
 * Algorithmic phonetic translation.
 */
export function genericAlgorithmicTranslate(word: string, mode: "toMinion" | "toEnglish"): string {
  if (!word) return "";
  const lower = word.toLowerCase();

  if (mode === "toMinion") {
    const syllables = splitIntoSyllables(lower);
    
    // Cap at max 3 syllables to prevent long words, and add cute minion ending if truncated
    let mappedSyllables = syllables.slice(0, 3).map(mapSyllableToMinion);
    
    let result = mappedSyllables.join("");

    if (syllables.length > 3) {
      // Add a cute minion suffix when we truncate to represent the long word
      const suffixes = ["ka", "da", "la"];
      // Use the word's length or characters to pick a deterministic suffix
      const suffix = suffixes[word.length % suffixes.length];
      result += "-" + suffix;
    } else if (
      result.length > 3 &&
      !result.endsWith("o") &&
      !result.endsWith("a") &&
      !result.endsWith("i") &&
      !result.endsWith("u")
    ) {
      // Add cute vowel ending for short words ending in consonants
      result += result.length % 2 === 0 ? "a" : "o";
    }

    return matchCase(word, result);
  } else {
    // Minion to English reverse algorithmic translate
    // Clean suffix if present
    let cleanWord = lower;
    let suffixRestored = false;
    const suffixRegex = /-(ka|da|la)$/;
    if (suffixRegex.test(cleanWord)) {
      cleanWord = cleanWord.replace(suffixRegex, "");
      suffixRestored = true;
    }

    const syllables = splitIntoSyllables(cleanWord);
    let mappedSyllables = syllables.map(mapSyllableToEnglish);
    let result = mappedSyllables.join("");

    // If it had a suffix, it was a truncated long word. Add a placeholder suffix or ending to sound like a longer English word
    if (suffixRestored) {
      result += "ing";
    } else if ((result.endsWith("a") || result.endsWith("o")) && result.length > 4) {
      result = result.slice(0, -1);
    }

    return matchCase(word, result);
  }
}

/**
 * Matches the casing style of target string to the source string (Uppercase, Titlecase, or Lowercase).
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
 * Translates a full sentence/text from English to Minionese or vice versa.
 */
export function translate(text: string, direction: "toMinion" | "toEnglish"): string {
  if (!text || !text.trim()) return "";

  // Tokenize the input text into words, punctuation, spaces
  const tokens = text.match(/\w+(?:'\w+)?|[^\w\s]|\s+/g) || [];
  const translatedTokens: string[] = [];
  let i = 0;

  const mapToUse = direction === "toMinion" ? englishToMinionMap : minionToEnglishMap;
  const keySrc = direction === "toMinion" ? "en" : "min";
  const keyTar = direction === "toMinion" ? "min" : "en";

  while (i < tokens.length) {
    let matched = false;

    // Check multi-word phrase matches from length 6 down to 1
    for (let length = 6; length >= 1; length--) {
      if (i + length <= tokens.length) {
        const phraseSlice = tokens.slice(i, i + length);
        if (phraseSlice.length === 0) continue;

        // Ensure the slice starts and ends with a word token to avoid stealing spaces/punctuation
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

          // Append trailing punctuation if it was part of the tokens slice
          const lastToken = phraseSlice[phraseSlice.length - 1];
          if (/[^\w\s]/.test(lastToken)) {
            translatedTokens.push(lastToken);
          }

          i += length;
          matched = true;
          break;
        }
      }
    }

    if (!matched) {
      const currentToken = tokens[i];
      if (/\w+/.test(currentToken)) {
        translatedTokens.push(genericAlgorithmicTranslate(currentToken, direction));
      } else {
        translatedTokens.push(currentToken);
      }
      i++;
    }
  }

  return translatedTokens.join("");
}
