const CONTRACTIONS: Record<string, string> = {
  "i'm": "i am",
  "you're": "you are",
  "he's": "he is",
  "she's": "she is",
  "it's": "it is",
  "we're": "we are",
  "they're": "they are",
  "i've": "i have",
  "you've": "you have",
  "we've": "we have",
  "they've": "they have",
  "i'd": "i would",
  "you'd": "you would",
  "he'd": "he would",
  "she'd": "she would",
  "we'd": "we would",
  "they'd": "they would",
  "i'll": "i will",
  "you'll": "you will",
  "he'll": "he will",
  "she'll": "she will",
  "we'll": "we will",
  "they'll": "they will",
  "isn't": "is not",
  "aren't": "are not",
  "wasn't": "was not",
  "weren't": "were not",
  "haven't": "have not",
  "hasn't": "has not",
  "hadn't": "had not",
  "won't": "will not",
  "don't": "do not",
  "doesn't": "does not",
  "didn't": "did not",
  "can't": "cannot",
  "couldn't": "could not",
  "shouldn't": "should not",
  "wouldn't": "would not",
  "let's": "let us",
  "what's": "what is",
  "who's": "who is",
  "where's": "where is",
  "why's": "why is",
  "how's": "how is"
};

/**
 * Expands English contractions to their full form, preserving casing.
 * E.g., "I'm" -> "I am", "DON'T" -> "DO NOT".
 */
export function unwrapContractions(text: string): string {
  if (!text) return "";

  return text.replace(/\b\w+'\w+\b/gi, (match) => {
    const lowerMatch = match.toLowerCase();
    const expanded = CONTRACTIONS[lowerMatch];
    if (!expanded) return match;

    if (match === match.toUpperCase()) {
      return expanded.toUpperCase();
    }
    if (match[0] === match[0].toUpperCase()) {
      return expanded.charAt(0).toUpperCase() + expanded.slice(1);
    }
    return expanded;
  });
}
export default unwrapContractions;
