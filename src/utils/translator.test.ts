import { describe, it, expect } from "vitest";
import { translate, matchCase } from "./translator";
import { isProperName } from "./dictionary";
import { translateReversible } from "./phonetics";

describe("Minionese Translator - Reversible & Proper Name Tests", () => {
  describe("translateReversible", () => {
    it("should translate non-dictionary words to cute Minionese ciphers", () => {
      expect(translateReversible("everything")).toBe("ofolydhumg");
      expect(translateReversible("testing")).toBe("dozdumg");
    });

    it("should translate back and forth deterministically to original values", () => {
      const original = "supercalifragilisticexpialidocious";
      const cipher = translateReversible(original);
      const back = translateReversible(cipher);
      expect(back).toBe(original);
    });

    it("should preserve original casing style during cipher translations", () => {
      expect(translateReversible("Testing")).toBe("Dozdumg");
      expect(translateReversible("TESTING")).toBe("DOZDUMG");
    });
  });

  describe("isProperName", () => {
    it("should recognize known names regardless of sentence position", () => {
      expect(isProperName("Mary", true)).toBe(true);
      expect(isProperName("Beth", true)).toBe(true);
      expect(isProperName("John", false)).toBe(true);
      expect(isProperName("Bob", false)).toBe(true);
    });

    it("should classify capitalized non-dictionary words in middle of sentences as proper nouns", () => {
      expect(isProperName("Paris", false)).toBe(true);
      expect(isProperName("banana", false)).toBe(false);
    });

    it("should not classify capitalized dictionary words as proper names", () => {
      expect(isProperName("Hello", false)).toBe(false);
      expect(isProperName("Banana", false)).toBe(false);
    });
  });

  describe("matchCase", () => {
    it("should match casing styles correctly", () => {
      expect(matchCase("HELLO", "bello")).toBe("BELLO");
      expect(matchCase("Hello", "bello")).toBe("Bello");
      expect(matchCase("hello", "bello")).toBe("bello");
    });
  });

  describe("translate sentence level", () => {
    it("should translate core dictionary greetings and basics", () => {
      expect(translate("hello", "toMinion")).toBe("bello");
      expect(translate("goodbye", "toMinion")).toBe("poopaye");
      expect(translate("thank you", "toMinion")).toBe("bank yu");
      expect(translate("Bello", "toEnglish")).toBe("Hello");
    });

    it("should preserve proper names completely", () => {
      expect(translate("Hello Mary", "toMinion")).toBe("Bello Mary");
      expect(translate("John is a friend.", "toMinion")).toBe("John uz a buddha.");
      expect(translate("Mary, hello!", "toMinion")).toBe("Mary, bello!");
    });

    it("should preserve punctuation and whitespace", () => {
      expect(translate("Hello, friend!", "toMinion")).toBe("Bello, buddha!");
      expect(translate("What is that?", "toMinion")).toBe("Po ka ta?");
    });

    it("should unwrap contractions to full words when translating to Minionese", () => {
      expect(translate("I'm friend", "toMinion")).toBe("ME an buddha");
      expect(translate("don't you", "toMinion")).toBe("te med tu");
    });

    it("should translate prefixes and suffixes deterministically", () => {
      expect(translate("unplanned", "toMinion")).toBe("imbrammot");
      expect(translate("reconstruction", "toMinion")).toBe("lokemzdlikduem");
      expect(translate("dogs", "toMinion")).toBe("tegz");
      expect(translate("boxes", "toMinion")).toBe("pexoz");
    });

    it("should perform perfect back-and-forth roundtrips for complex morphological sentences", () => {
      const sentence = "Hello Mary, you look unplanned and interesting today.";
      const min = translate(sentence, "toMinion");
      const back = translate(min, "toEnglish");
      expect(back).toBe(sentence);
    });
  });
});
