import { describe, it, expect } from "vitest";
import {
  translate,
  splitIntoSyllables,
  genericAlgorithmicTranslate,
  matchCase,
} from "./translator";

describe("Minionese Translator - Core Utilities", () => {
  describe("splitIntoSyllables", () => {
    it("should split words into syllables correctly based on vowels", () => {
      expect(splitIntoSyllables("hello")).toEqual(["hel", "lo"]);
      expect(splitIntoSyllables("banana")).toEqual(["ba", "na", "na"]);
      expect(splitIntoSyllables("telecommunication")).toEqual([
        "te",
        "le",
        "com",
        "mu",
        "ni",
        "ca",
        "tion",
      ]);
    });
  });

  describe("matchCase", () => {
    it("should match uppercase, titlecase, and lowercase correctly", () => {
      expect(matchCase("HELLO", "bello")).toBe("BELLO");
      expect(matchCase("Hello", "bello")).toBe("Bello");
      expect(matchCase("hello", "bello")).toBe("bello");
    });
  });

  describe("genericAlgorithmicTranslate (Phonetic Fallback)", () => {
    it("should map English words phonetically and keep them compact", () => {
      const translation = genericAlgorithmicTranslate("telecommunication", "toMinion");
      // "telecommunication" has 7 syllables, which is > 3, so it should be truncated to 3 syllables + suffix
      // "te" -> "to", "le" -> "lo", "com" -> "kum". 17 chars long -> "la" suffix.
      expect(translation).toBe("tolokum-la");
      expect(translation.length).toBeLessThan(15);
    });

    it("should append a cute vowel ending for short words ending in consonants", () => {
      const translation = genericAlgorithmicTranslate("unplanned", "toMinion");
      // "unplanned" -> "un" + "planned" -> "un" + "plad" -> "unplad" + cute vowel
      expect(translation).toBe("unplannodo");
    });

    it("should translate Minionese phonetics back to a sensible English approximation", () => {
      const minWord = genericAlgorithmicTranslate("telecommunication", "toMinion"); // "tolokum-la"
      const engBack = genericAlgorithmicTranslate(minWord, "toEnglish"); // "tolokum-la" -> "tolocum" + "ing" = "terecoming"
      expect(engBack).toBe("terecoming"); // 'l' maps back to 'r', 'k' to 'c'
    });
  });

  describe("translate sentence level", () => {
    it("should translate core dictionary greetings and basics", () => {
      expect(translate("hello", "toMinion")).toBe("bello");
      expect(translate("goodbye", "toMinion")).toBe("poopaye");
      expect(translate("thank you", "toMinion")).toBe("bank yu");
      expect(translate("Bello", "toEnglish")).toBe("Hello");
    });

    it("should handle mixed text with dictionary words and phonetic fallbacks", () => {
      // "hello you" -> "bello tu" (both dictionary words)
      expect(translate("hello you", "toMinion")).toBe("bello tu");

      // "hello superfriend" -> "bello" + phonetic "superfriend"
      const result = translate("hello superfriend", "toMinion");
      expect(result).toContain("bello");
      expect(result.split(" ").length).toBe(2);
    });

    it("should preserve punctuation and whitespace", () => {
      expect(translate("Hello, friend!", "toMinion")).toBe("Bello, buddha!");
      expect(translate("What is that?", "toMinion")).toBe("Po ka ta?");
    });

    it("should perform roundtrips for dictionary words successfully", () => {
      const phrases = [
        "hello",
        "goodbye",
        "thank you",
        "i love you",
        "banana",
        "one two three",
      ];
      for (const phrase of phrases) {
        const min = translate(phrase, "toMinion");
        const back = translate(min, "toEnglish");
        expect(back.toLowerCase()).toBe(phrase.toLowerCase());
      }
    });
  });
});
