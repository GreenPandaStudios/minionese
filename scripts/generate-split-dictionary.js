import fs from "fs";
import path from "path";

const dictDir = path.resolve("src/utils/dictionary");

// Ensure directory exists
if (!fs.existsSync(dictDir)) {
  fs.mkdirSync(dictDir, { recursive: true });
}

// 50 word categories (themes) designed with strict 1-to-1 bijective mappings
const CATEGORIES = {
  basics: [
    { en: "hello", min: "bello" },
    { en: "goodbye", min: "poopaye" },
    { en: "thank you", min: "bank yu" },
    { en: "thanks", min: "tanki" },
    { en: "sorry", min: "bi-do" },
    { en: "please", min: "por-favor" },
    { en: "welcome", min: "bula" },
    { en: "yes", min: "da" },
    { en: "no", min: "nu" },
    { en: "ok", min: "okay" },
  ],
  pronouns: [
    { en: "i", min: "me" },
    { en: "me", min: "ku" }, // Resolved Collision (i / me)
    { en: "you", min: "tu" },
    { en: "we", min: "bee" },
    { en: "us", min: "beedu" }, // Resolved Collision (we / us)
    { en: "they", min: "bu" },
    { en: "them", min: "buta" }, // Resolved Collision (they / them)
    { en: "he", min: "li" },
    { en: "she", min: "la" },
    { en: "him", min: "lipo" }, // Resolved Collision (he / him)
    { en: "her", min: "lapi" }, // Resolved Collision (she / her)
  ],
  verbs_action: [
    { en: "run", min: "gogogo" },
    { en: "jump", min: "hoba" },
    { en: "walk", min: "pata" },
    { en: "dance", min: "choka" },
    { en: "sing", min: "lala" },
    { en: "play", min: "ludo" },
  ],
  verbs_mental: [
    { en: "know", min: "wata" },
    { en: "understand", min: "watala" }, // Resolved Collision (know / understand)
    { en: "think", min: "pensa" },
    { en: "want", min: "pwede" },
    { en: "like", min: "tulali" },
  ],
  verbs_communication: [
    { en: "speak", min: "boka" },
    { en: "say", min: "toka" },
    { en: "tell", min: "dorry" },
    { en: "ask", min: "poka" },
    { en: "call", min: "krilla" },
  ],
  verbs_sensory: [
    { en: "look", min: "luk" },
    { en: "see", min: "luka" }, // Resolved Collision (look / see)
    { en: "hear", min: "skucha" },
    { en: "feel", min: "tokafeel" },
    { en: "smell", min: "naza" },
  ],
  verbs_creation: [
    { en: "make", min: "crea" },
    { en: "build", min: "strui" },
    { en: "write", min: "tinta" },
    { en: "draw", min: "pinta" },
  ],
  food_fruit: [
    { en: "banana", min: "banana" },
    { en: "bananas", min: "bananas" },
    { en: "apple", min: "bapple" },
    { en: "apples", min: "bapples" },
    { en: "orange", min: "naranja" },
  ],
  food_veg: [
    { en: "potato", min: "patata" },
    { en: "tomato", min: "tomate" },
    { en: "carrot", min: "zanahoria" },
    { en: "onion", min: "cebolla" },
  ],
  food_drink: [
    { en: "water", min: "aqua" },
    { en: "milk", min: "malka" },
    { en: "coffee", min: "kaba" },
    { en: "juice", min: "zumo" },
  ],
  food_sweet: [
    { en: "ice cream", min: "gelato" },
    { en: "cake", min: "torta" },
    { en: "candy", min: "dulcepo" },
  ],
  food_meal: [
    { en: "breakfast", min: "desayu" },
    { en: "lunch", min: "almu" },
    { en: "dinner", min: "cena" },
    { en: "food", min: "manga" },
  ],
  animals_pets: [
    { en: "dog", min: "perro" },
    { en: "cat", min: "gato" },
    { en: "bird", min: "pajaro" },
    { en: "rabbit", min: "conejo" },
  ],
  animals_wild: [
    { en: "lion", min: "leo" },
    { en: "tiger", min: "tigre" },
    { en: "bear", min: "oso" },
    { en: "monkey", min: "mono" },
  ],
  animals_sea: [
    { en: "fish", min: "pesca" },
    { en: "whale", min: "ballena" },
    { en: "shark", min: "tiburo" },
  ],
  animals_bugs: [
    { en: "ant", min: "hormiga" },
    { en: "bee", min: "abeja" },
    { en: "fly", min: "mosca" },
  ],
  colors: [
    { en: "red", min: "rojo" },
    { en: "blue", min: "azul" },
    { en: "yellow", min: "amarillo" },
    { en: "green", min: "verde" },
    { en: "black", min: "negro" },
  ],
  family: [
    { en: "father", min: "papa" },
    { en: "mother", min: "mama" },
    { en: "brother", min: "hermano" },
    { en: "sister", min: "hermana" },
    { en: "baby", min: "baboi" },
    { en: "friend", min: "buddha" },
    { en: "friends", min: "buddhas" },
  ],
  body_head: [
    { en: "eye", min: "ojo" },
    { en: "nose", min: "nariz" },
    { en: "mouth", min: "boca" },
    { en: "ear", min: "oreja" },
  ],
  body_limb: [
    { en: "arm", min: "brazo" },
    { en: "leg", min: "pierna" },
    { en: "hand", min: "mano" },
    { en: "foot", min: "pie" },
  ],
  body_organs: [
    { en: "heart", min: "kokoro" },
    { en: "brain", min: "cerebro" },
    { en: "blood", min: "sangre" },
  ],
  clothing_top: [
    { en: "shirt", min: "camisa" },
    { en: "jacket", min: "saco" },
    { en: "coat", min: "abrigo" },
  ],
  clothing_bottom: [
    { en: "pants", min: "pantalo" },
    { en: "shorts", min: "corto" },
    { en: "skirt", min: "falda" },
  ],
  clothing_foot: [
    { en: "shoes", min: "zapato" },
    { en: "boots", min: "bota" },
    { en: "socks", min: "media" },
  ],
  clothing_access: [
    { en: "hat", min: "sombre" },
    { en: "glasses", min: "goggle" },
    { en: "watch", min: "reloj" },
  ],
  home_rooms: [
    { en: "bedroom", min: "kama-room" },
    { en: "kitchen", min: "cocina" },
    { en: "bathroom", min: "bano" },
  ],
  home_furniture: [
    { en: "chair", min: "silya" },
    { en: "table", min: "mesa" },
    { en: "bed", min: "kama" },
  ],
  home_appliances: [
    { en: "fridge", min: "nevera" },
    { en: "oven", min: "horno" },
    { en: "television", min: "televe" },
  ],
  home_tools: [
    { en: "hammer", min: "palu" },
    { en: "saw", min: "sierra" },
    { en: "key", min: "llave" },
  ],
  nature_earth: [
    { en: "mountain", min: "monte" },
    { en: "river", min: "rio" },
    { en: "valley", min: "valle" },
    { en: "forest", min: "bosque" },
  ],
  nature_weather: [
    { en: "rain", min: "lluvia" },
    { en: "snow", min: "nieve" },
    { en: "wind", min: "viento" },
    { en: "sunshine", min: "solana" },
  ],
  nature_sky: [
    { en: "sun", min: "sol" },
    { en: "moon", min: "luna" },
    { en: "star", min: "estrella" },
    { en: "cloud", min: "nube" },
  ],
  nature_plants: [
    { en: "tree", min: "arbol" },
    { en: "flower", min: "flor" },
    { en: "grass", min: "pasto" },
  ],
  time_days: [
    { en: "monday", min: "luni" },
    { en: "tuesday", min: "marti" },
    { en: "wednesday", min: "mierco" },
    { en: "thursday", min: "juevi" },
    { en: "friday", min: "vierni" },
  ],
  time_months: [
    { en: "january", min: "enero" },
    { en: "february", min: "febre" },
    { en: "march", min: "marzo" },
    { en: "year", min: "ano" },
  ],
  time_relative: [
    { en: "today", min: "detay" },
    { en: "tomorrow", min: "manana" },
    { en: "yesterday", min: "ayer" },
    { en: "night", min: "noche" },
  ],
  numbers_units: [
    { en: "one", min: "uno" },
    { en: "two", min: "dos" },
    { en: "three", min: "tres" },
    { en: "four", min: "cuatro" },
  ],
  numbers_tens: [
    { en: "ten", min: "diez" },
    { en: "twenty", min: "veinte" },
    { en: "hundred", min: "cien" },
  ],
  places_town: [
    { en: "school", min: "escuela" },
    { en: "hospital", min: "hospi" },
    { en: "store", min: "tienda" },
  ],
  places_geo: [
    { en: "country", min: "pais" },
    { en: "city", min: "ciudad" },
    { en: "world", min: "mundo" },
  ],
  places_rooms: [
    { en: "park", min: "parque" },
    { en: "library", min: "biblio" },
    { en: "museum", min: "museo" },
  ],
  adjectives_size: [
    { en: "big", min: "bango" },
    { en: "small", min: "pika" },
    { en: "tall", min: "alto" },
    { en: "short", min: "bajo" },
  ],
  adjectives_shape: [
    { en: "round", min: "rondo" },
    { en: "square", min: "cuadra" },
    { en: "flat", min: "plano" },
  ],
  adjectives_temp: [
    { en: "hot", min: "caliente" },
    { en: "cold", min: "frio" },
    { en: "warm", min: "tibio" },
  ],
  adjectives_feeling: [
    { en: "happy", min: "alegre" },
    { en: "sad", min: "triste" },
    { en: "angry", min: "enojo" },
  ],
  adjectives_speed: [
    { en: "fast", min: "rapido" },
    { en: "slow", min: "lento" },
    { en: "quick", min: "veloz" },
  ],
  adjectives_quality: [
    { en: "good", min: "bueno" },
    { en: "bad", min: "malo" },
    { en: "great", min: "superbello" },
  ],
  grammar_con: [
    { en: "and", min: "na" },
    { en: "but", min: "pero" },
    { en: "or", min: "ka" },
  ],
  grammar_prep: [
    { en: "on", min: "ba" },
    { en: "in", min: "con" },
    { en: "under", min: "pajo" },
  ],
  phrases_common: [
    { en: "i love you", min: "tulaliloo ti amo" },
    { en: "i hate you", min: "tatata bala tu" },
    { en: "wedding", min: "la boda" },
    { en: "marriage", min: "la bodana" }, // Resolved Collision (wedding / marriage)
    { en: "beautiful", min: "bellisima" },
    { en: "pretty", min: "chika" }, // Resolved Collision (beautiful / pretty)
    { en: "what is that", min: "po ka ta" },
    { en: "how are you", min: "muakasa" },
    { en: "look at you", min: "luk at tu" },
  ]
};

// Check for collisions across all entries
const enKeys = new Set();
const minKeys = new Set();

for (const [catName, list] of Object.entries(CATEGORIES)) {
  for (const entry of list) {
    if (enKeys.has(entry.en)) {
      throw new Error(`Duplicate English key: "${entry.en}" in category "${catName}"`);
    }
    if (minKeys.has(entry.min)) {
      throw new Error(`Duplicate Minionese translation: "${entry.min}" in category "${catName}"`);
    }
    enKeys.add(entry.en);
    minKeys.add(entry.min);
  }
}

// Write the 50 themed dictionary files
for (const [name, list] of Object.entries(CATEGORIES)) {
  const content = `import type { DictionaryEntry } from "./index";

export const ${name}: DictionaryEntry[] = ${JSON.stringify(list, null, 2)};
`;
  fs.writeFileSync(path.join(dictDir, `${name}.ts`), content);
}

// Write names.ts
const namesContent = `export const properNamesList = [
  "mary",
  "beth",
  "john",
  "gru",
  "lucy",
  "margo",
  "edith",
  "agnes",
  "bob",
  "kevin",
  "stuart",
  "dave",
  "jerry",
  "phil",
  "tim",
  "mark",
  "mel",
];
`;
fs.writeFileSync(path.join(dictDir, "names.ts"), namesContent);

// Write index.ts combining all 50 categories
const imports = Object.keys(CATEGORIES).map(name => `import { ${name} } from "./${name}";`).join("\n");
const combination = `export const dictionary: DictionaryEntry[] = [
${Object.keys(CATEGORIES).map(name => `  ...${name},`).join("\n")}
];`;

const indexContent = `import { properNamesList } from "./names";
${imports}

export interface DictionaryEntry {
  en: string;
  min: string;
}

${combination}

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
`;

fs.writeFileSync(path.join(dictDir, "index.ts"), indexContent);
console.log("50+ Bijective dictionary files generated successfully!");
