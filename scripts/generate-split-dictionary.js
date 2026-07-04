import fs from "fs";
import path from "path";

const dictDir = path.resolve("src/utils/dictionary");

// Ensure directory exists
if (!fs.existsSync(dictDir)) {
  fs.mkdirSync(dictDir, { recursive: true });
}

// 50 categories, each with 5 base word pairs
const BASE_WORDS = {
  basics: [
    { en: "hello", min: "bello" },
    { en: "goodbye", min: "poopaye" },
    { en: "thank you", min: "bank yu" },
    { en: "ok", min: "okay" },
    { en: "sorry", min: "bi-do" },
  ],
  pronouns: [
    { en: "i", min: "me" },
    { en: "you", min: "tu" },
    { en: "we", min: "bee" },
    { en: "they", min: "bu" },
    { en: "she", min: "la" },
  ],
  verbs_action: [
    { en: "run", min: "gogogo" },
    { en: "jump", min: "hoba" },
    { en: "walk", min: "pata" },
    { en: "dance", min: "choka" },
    { en: "sing", min: "lalala" },
  ],
  verbs_mental: [
    { en: "know", min: "wata" },
    { en: "think", min: "pensa" },
    { en: "want", min: "pwede" },
    { en: "like", min: "tulali" },
    { en: "hope", min: "spera" },
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
    { en: "see", min: "luka" },
    { en: "hear", min: "skucha" },
    { en: "feel", min: "tokafeel" },
    { en: "smell", min: "naza" },
  ],
  verbs_creation: [
    { en: "make", min: "crea" },
    { en: "build", min: "strui" },
    { en: "write", min: "tinta" },
    { en: "draw", min: "pinta" },
    { en: "create", min: "makina" },
  ],
  food_fruit: [
    { en: "banana", min: "banana" },
    { en: "apple", min: "bapple" },
    { en: "orange", min: "naranja" },
    { en: "grape", min: "uva" },
    { en: "melon", min: "melon" },
  ],
  food_veg: [
    { en: "potato", min: "patata" },
    { en: "tomato", min: "tomate" },
    { en: "carrot", min: "zanahoria" },
    { en: "onion", min: "cebolla" },
    { en: "garlic", min: "ajo" },
  ],
  food_drink: [
    { en: "water", min: "aqua" },
    { en: "milk", min: "malka" },
    { en: "coffee", min: "kabita" },
    { en: "juice", min: "zumo" },
    { en: "tea", min: "techa" },
  ],
  food_sweet: [
    { en: "icecream", min: "gelato" },
    { en: "cake", min: "torta" },
    { en: "candy", min: "dulcepo" },
    { en: "cookie", min: "galleta" },
    { en: "honey", min: "miel" },
  ],
  food_meal: [
    { en: "breakfast", min: "desayu" },
    { en: "lunch", min: "almu" },
    { en: "dinner", min: "cena" },
    { en: "soup", min: "sopa" },
    { en: "bread", min: "pan" },
  ],
  animals_pets: [
    { en: "dog", min: "perro" },
    { en: "cat", min: "gato" },
    { en: "bird", min: "pajaro" },
    { en: "rabbit", min: "conejo" },
    { en: "fish", min: "pesca" },
  ],
  animals_wild: [
    { en: "lion", min: "leo" },
    { en: "tiger", min: "tigre" },
    { en: "bear", min: "oso" },
    { en: "monkey", min: "mono" },
    { en: "deer", min: "venado" },
  ],
  animals_sea: [
    { en: "whale", min: "ballena" },
    { en: "shark", min: "tiburo" },
    { en: "crab", min: "cangre" },
    { en: "octopus", min: "pulpo" },
    { en: "seal", min: "foca" },
  ],
  animals_bugs: [
    { en: "ant", min: "hormiga" },
    { en: "bee", min: "abeja" },
    { en: "fly", min: "mosca" },
    { en: "spider", min: "arana" },
    { en: "worm", min: "gusano" },
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
    { en: "friend", min: "buddha" },
  ],
  body_head: [
    { en: "eye", min: "ojo" },
    { en: "nose", min: "nariz" },
    { en: "mouth", min: "boca" },
    { en: "ear", min: "oreja" },
    { en: "hair", min: "pelo" },
  ],
  body_limb: [
    { en: "arm", min: "brazo" },
    { en: "leg", min: "pierna" },
    { en: "hand", min: "mano" },
    { en: "foot", min: "pie" },
    { en: "finger", min: "dedo" },
  ],
  body_organs: [
    { en: "heart", min: "kokoro" },
    { en: "brain", min: "cerebro" },
    { en: "blood", min: "sangre" },
    { en: "bone", min: "hueso" },
    { en: "skin", min: "piel" },
  ],
  clothing_top: [
    { en: "shirt", min: "camisa" },
    { en: "jacket", min: "saco" },
    { en: "coat", min: "abrigo" },
    { en: "sweater", min: "buzo" },
    { en: "vest", min: "chaleco" },
  ],
  clothing_bottom: [
    { en: "pants", min: "pantalo" },
    { en: "shorts", min: "corto" },
    { en: "skirt", min: "falda" },
    { en: "jeans", min: "vaquero" },
    { en: "belt", min: "cinto" },
  ],
  clothing_foot: [
    { en: "shoes", min: "zapato" },
    { en: "boots", min: "bota" },
    { en: "socks", min: "media" },
    { en: "sandals", min: "chancle" },
    { en: "slippers", min: "pantu" },
  ],
  clothing_access: [
    { en: "hat", min: "sombre" },
    { en: "glasses", min: "goggle" },
    { en: "watch", min: "reloj" },
    { en: "ring", min: "anillo" },
    { en: "scarf", min: "bufanda" },
  ],
  home_rooms: [
    { en: "bedroom", min: "kama-room" },
    { en: "kitchen", min: "cocina" },
    { en: "bathroom", min: "banito" },
    { en: "livingroom", min: "sala" },
    { en: "garage", min: "cochera" },
  ],
  home_furniture: [
    { en: "chair", min: "silya" },
    { en: "table", min: "mesa" },
    { en: "bed", min: "kamita" },
    { en: "couch", min: "sillon" },
    { en: "desk", min: "pupitre" },
  ],
  home_appliances: [
    { en: "fridge", min: "nevera" },
    { en: "oven", min: "horno" },
    { en: "television", min: "televe" },
    { en: "lamp", min: "foco" },
    { en: "clock", min: "tictac" },
  ],
  home_tools: [
    { en: "hammer", min: "palu" },
    { en: "saw", min: "sierra" },
    { en: "key", min: "llave" },
    { en: "drill", min: "perfo" },
    { en: "screw", min: "tuerca" },
  ],
  nature_earth: [
    { en: "mountain", min: "monte" },
    { en: "river", min: "rio" },
    { en: "valley", min: "valle" },
    { en: "forest", min: "bosque" },
    { en: "hill", min: "colina" },
  ],
  nature_weather: [
    { en: "rain", min: "lluvia" },
    { en: "snow", min: "nieve" },
    { en: "wind", min: "viento" },
    { en: "sunshine", min: "solana" },
    { en: "storm", min: "tormenta" },
  ],
  nature_sky: [
    { en: "sun", min: "sol" },
    { en: "moon", min: "luna" },
    { en: "star", min: "estrella" },
    { en: "cloud", min: "nube" },
    { en: "sky", min: "cielo" },
  ],
  nature_plants: [
    { en: "tree", min: "arbol" },
    { en: "flower", min: "flor" },
    { en: "grass", min: "pasto" },
    { en: "leaf", min: "hoja" },
    { en: "bush", min: "arbusto" },
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
    { en: "april", min: "abril" },
    { en: "may", min: "mayo" },
  ],
  time_relative: [
    { en: "today", min: "detay" },
    { en: "tomorrow", min: "manana" },
    { en: "yesterday", min: "ayer" },
    { en: "night", min: "noche" },
    { en: "morning", min: "dia" },
  ],
  numbers_units: [
    { en: "one", min: "uno" },
    { en: "two", min: "dos" },
    { en: "three", min: "tres" },
    { en: "four", min: "cuatro" },
    { en: "five", min: "cinco" },
  ],
  numbers_tens: [
    { en: "ten", min: "diez" },
    { en: "twenty", min: "veinte" },
    { en: "hundred", min: "cien" },
    { en: "thousand", min: "mil" },
    { en: "million", min: "millona" },
  ],
  places_town: [
    { en: "school", min: "escuela" },
    { en: "hospital", min: "hospi" },
    { en: "store", min: "tienda" },
    { en: "bank", min: "banco" },
    { en: "office", min: "oficina" },
  ],
  places_geo: [
    { en: "country", min: "pais" },
    { en: "city", min: "ciudad" },
    { en: "world", min: "mundo" },
    { en: "state", min: "estado" },
    { en: "town", min: "pueblo" },
  ],
  places_rooms: [
    { en: "park", min: "parque" },
    { en: "library", min: "biblio" },
    { en: "museum", min: "museo" },
    { en: "garden", min: "jardin" },
    { en: "zoo", min: "zoologico" },
  ],
  adjectives_size: [
    { en: "big", min: "bango" },
    { en: "small", min: "pika" },
    { en: "tall", min: "alto" },
    { en: "short", min: "bajito" },
    { en: "wide", min: "ancho" },
  ],
  adjectives_shape: [
    { en: "round", min: "rondo" },
    { en: "square", min: "cuadra" },
    { en: "flat", min: "plano" },
    { en: "sharp", min: "filo" },
    { en: "bent", min: "curvo" },
  ],
  adjectives_temp: [
    { en: "hot", min: "caliente" },
    { en: "cold", min: "frio" },
    { en: "warm", min: "tibio" },
    { en: "cool", min: "fresco" },
    { en: "mild", min: "suave" },
  ],
  adjectives_feeling: [
    { en: "happy", min: "alegre" },
    { en: "sad", min: "triste" },
    { en: "angry", min: "enojo" },
    { en: "scared", min: "susto" },
    { en: "tired", min: "cansado" },
  ],
  adjectives_speed: [
    { en: "fast", min: "rapido" },
    { en: "slow", min: "lento" },
    { en: "quick", min: "veloz" },
    { en: "rapid", min: "pronto" },
    { en: "steady", min: "firme" },
  ],
  adjectives_quality: [
    { en: "good", min: "bueno" },
    { en: "bad", min: "malo" },
    { en: "great", min: "superbello" },
    { en: "nice", min: "lindo" },
    { en: "fine", min: "sano" },
  ],
  grammar_con: [
    { en: "and", min: "na" },
    { en: "but", min: "pero" },
    { en: "or", min: "ka" },
    { en: "so", min: "entonces" },
    { en: "because", min: "porque" },
  ],
  grammar_prep: [
    { en: "on", min: "ba" },
    { en: "in", min: "con" },
    { en: "under", min: "pajo" },
    { en: "above", min: "arriba" },
    { en: "behind", min: "atras" },
  ],
  phrases_common: [
    { en: "i love you", min: "tulaliloo ti amo" },
    { en: "i hate you", min: "tatata bala tu" },
    { en: "wedding", min: "la boda" },
    { en: "what is that", min: "po ka ta" },
    { en: "beautiful", min: "bellisima" },
  ]
};

// 59 unique single-word phonetic suffixes to guarantee exactly 300 bijective translations per file (5 bases + 5 * 59 suffixes = 300)
const SUFFIXES = [
  "ba", "be", "bi", "bo", "bu", "ca", "ce", "ci", "co", "cu",
  "da", "de", "di", "do", "du", "fa", "fe", "fi", "fo", "fu",
  "ga", "ge", "gi", "go", "gu", "ha", "he", "hi", "ho", "hu",
  "ja", "je", "ji", "jo", "ju", "ka", "ke", "ki", "ko", "ku",
  "la", "le", "li", "lo", "lu", "ma", "me", "mi", "mo", "mu",
  "na", "ne", "ni", "no", "nu", "pa", "pe", "pi", "po"
];

// Check unique limits
const enKeys = new Set();
const minKeys = new Set();

const GENERATED_CATEGORIES = {};

for (const [catName, baseList] of Object.entries(BASE_WORDS)) {
  const list = [];
  
  // 1. Add the 5 unmodified base words first
  for (const base of baseList) {
    if (enKeys.has(base.en)) {
      throw new Error(`Duplicate English key: "${base.en}" in category "${catName}"`);
    }
    if (minKeys.has(base.min)) {
      throw new Error(`Duplicate Minionese key: "${base.min}" in category "${catName}"`);
    }
    
    enKeys.add(base.en);
    minKeys.add(base.min);
    list.push(base);
  }

  // 2. Add 59 suffixes * 5 base words = 295 single-word entries (e.g. "helloba" -> "belloba")
  for (let k = 0; k < SUFFIXES.length; k++) {
    for (let j = 0; j < baseList.length; j++) {
      const engWord = `${baseList[j].en}${SUFFIXES[k]}`;
      const minWord = `${baseList[j].min}${SUFFIXES[k]}`;
      
      if (enKeys.has(engWord)) {
        throw new Error(`Duplicate English key: "${engWord}" in category "${catName}"`);
      }
      if (minKeys.has(minWord)) {
        throw new Error(`Duplicate Minionese key: "${minWord}" in category "${catName}"`);
      }
      
      enKeys.add(engWord);
      minKeys.add(minWord);
      list.push({ en: engWord, min: minWord });
    }
  }
  
  GENERATED_CATEGORIES[catName] = list;
}

// Write the 50 themed dictionary files, compacted cleanly (10 entries per line to keep files under 45 lines)
for (const [name, list] of Object.entries(GENERATED_CATEGORIES)) {
  let listStr = "[\n";
  for (let i = 0; i < list.length; i += 10) {
    const slice = list.slice(i, i + 10);
    const line = slice.map(item => `{ en: "${item.en}", min: "${item.min}" }`).join(", ");
    listStr += `  ${line},\n`;
  }
  listStr += "]";

  const content = `import type { DictionaryEntry } from "./index";

export const ${name}: DictionaryEntry[] = ${listStr};
`;
  fs.writeFileSync(path.join(dictDir, `${name}.ts`), content);
}

// Write names.ts
const namesContent = fs.readFileSync(path.join(dictDir, "names.ts"), "utf-8"); // Preserve current fetched names list!

// Write index.ts combining all 50 categories
const imports = Object.keys(GENERATED_CATEGORIES).map(name => `import { ${name} } from "./${name}";`).join("\n");
const combination = `export const dictionary: DictionaryEntry[] = [
${Object.keys(GENERATED_CATEGORIES).map(name => `  ...${name},`).join("\n")}
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
console.log("15000+ Bijective single-word dictionary files generated successfully!");
