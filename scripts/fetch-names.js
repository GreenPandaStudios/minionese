import fs from "fs";
import path from "path";

const namesPath = path.resolve("src/utils/dictionary/names.ts");

const MINION_NAMES = [
  "mary", "beth", "john", "gru", "lucy", "margo", "edith", "agnes",
  "bob", "kevin", "stuart", "dave", "jerry", "phil", "tim", "mark", "mel"
];

// Top global companies, brands, websites and platforms
const BRANDS = [
  "google", "apple", "microsoft", "amazon", "facebook", "meta", "instagram", "twitter",
  "tiktok", "netflix", "youtube", "tesla", "disney", "sony", "samsung", "toyota",
  "honda", "ford", "bmw", "nike", "adidas", "coca-cola", "pepsi", "starbucks", "mcdonalds",
  "intel", "nvidia", "amd", "adobe", "spotify", "spacex", "boeing", "nintendo", "playstation",
  "xbox", "michelin", "lego", "gucci", "chanel", "hermes", "rolex", "ikea", "ebay", "walmart",
  "costco", "target", "uber", "airbnb", "zoom", "slack", "discord", "github", "linkedin"
];

// Major global languages
const LANGUAGES = [
  "english", "spanish", "french", "german", "italian", "portuguese", "chinese", "mandarin",
  "japanese", "korean", "russian", "arabic", "hindi", "bengali", "punjabi", "vietnamese",
  "javanese", "telugu", "marathi", "tamil", "turkish", "polish", "ukranian", "greek",
  "dutch", "swedish", "norwegian", "danish", "finnish", "thai", "malay", "tagalog", "hebrew"
];

// Major geographical landmarks, continents and regions
const LANDMARKS = [
  "everest", "kilimanjaro", "fuji", "sahara", "gobi", "amazon", "nile", "mississippi",
  "danube", "thames", "pacific", "atlantic", "indian", "arctic", "antarctic", "asia",
  "africa", "europe", "america", "oceania", "antarctica", "siberia", "himalayas", "alps",
  "andes", "rockies", "caribbean", "mediterranean"
];

async function fetchAllProperNouns() {
  console.log("Fetching first names, countries and capitals...");
  
  // 1. Fetch First Names
  const firstNamesRes = await fetch("https://raw.githubusercontent.com/dominictarr/random-name/master/first-names.txt");
  const firstNamesText = firstNamesRes.ok ? await firstNamesRes.text() : "";
  const firstNames = firstNamesText.split("\n")
    .map(n => n.trim().toLowerCase())
    .filter(n => n.length > 0 && /^[a-z]+$/.test(n));

  // 2. Fetch Country Names
  const countriesRes = await fetch("https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-name.json");
  const countriesJson = countriesRes.ok ? await countriesRes.json() : [];
  const countries = countriesJson.map((c) => c.country.trim().toLowerCase())
    .filter((n) => n.length > 0 && /^[a-z\s]+$/.test(n));

  // 3. Fetch Capital Cities
  const capitalsRes = await fetch("https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-capital-city.json");
  const capitalsJson = capitalsRes.ok ? await capitalsRes.json() : [];
  const capitals = capitalsJson.map((c) => c.city ? c.city.trim().toLowerCase() : "")
    .filter((n) => n.length > 0 && /^[a-z\s]+$/.test(n));

  // Combine all categories
  const allNouns = [
    ...MINION_NAMES,
    ...BRANDS,
    ...LANGUAGES,
    ...LANDMARKS,
    ...firstNames,
    ...countries,
    ...capitals
  ];

  // Remove duplicates and split multi-word proper nouns into single-word tokens
  const wordTokens = new Set();
  for (const noun of allNouns) {
    const parts = noun.split(/\s+/);
    for (const part of parts) {
      const clean = part.replace(/[^\w]/g, "").trim().toLowerCase();
      if (clean && /^[a-z]+$/.test(clean)) {
        wordTokens.add(clean);
      }
    }
  }

  const finalNounsList = Array.from(wordTokens);

  // Compact layout (15 names per line)
  let listStr = "[\n";
  for (let i = 0; i < finalNounsList.length; i += 15) {
    const slice = finalNounsList.slice(i, i + 15);
    const line = slice.map(name => `"${name}"`).join(", ");
    listStr += `  ${line},\n`;
  }
  listStr += "]";

  const fileContent = `export const properNamesList = ${listStr};
`;

  fs.writeFileSync(namesPath, fileContent);
  console.log(`Successfully wrote ${finalNounsList.length} proper nouns to names.ts in compact format!`);
}

fetchAllProperNouns().catch(console.error);
