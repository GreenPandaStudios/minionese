import fs from "fs";
import path from "path";

const namesPath = path.resolve("src/utils/dictionary/names.ts");

const MINION_NAMES = [
  "mary", "beth", "john", "gru", "lucy", "margo", "edith", "agnes",
  "bob", "kevin", "stuart", "dave", "jerry", "phil", "tim", "mark", "mel"
];

async function fetchNames() {
  console.log("Fetching 1000 common names...");
  const response = await fetch("https://raw.githubusercontent.com/dominictarr/random-name/master/first-names.txt");
  if (!response.ok) {
    throw new Error(`Failed to fetch names: ${response.statusText}`);
  }
  const text = await response.text();
  const rawNames = text.split("\n")
    .map(name => name.trim().toLowerCase())
    .filter(name => name.length > 0 && /^[a-z]+$/.test(name));

  // Remove duplicates and combine with Minion names
  const uniqueNames = Array.from(new Set([...MINION_NAMES, ...rawNames]));
  
  // Take exactly 1000 names (including our Minion bases)
  const top1000 = uniqueNames.slice(0, 1000);

  // Compact layout (15 names per line) to keep the file under 150 lines
  let listStr = "[\n";
  for (let i = 0; i < top1000.length; i += 15) {
    const slice = top1000.slice(i, i + 15);
    const line = slice.map(name => `"${name}"`).join(", ");
    listStr += `  ${line},\n`;
  }
  listStr += "]";

  const fileContent = `export const properNamesList = ${listStr};
`;

  fs.writeFileSync(namesPath, fileContent);
  console.log(`Successfully wrote ${top1000.length} names to names.ts in compact format!`);
}

fetchNames().catch(console.error);
