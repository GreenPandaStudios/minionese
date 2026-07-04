import sharp from "sharp";
import fs from "fs";
import path from "path";

const svgPath = path.resolve("public/minion-logo.svg");
const publicDir = path.resolve("public");

async function generate() {
  const svgBuffer = fs.readFileSync(svgPath);

  // Generate pwa-192x192.png
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, "pwa-192x192.png"));

  // Generate pwa-512x512.png
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, "pwa-512x512.png"));

  // Generate apple-touch-icon.png (180x180)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, "apple-touch-icon.png"));

  console.log("PWA Logos generated successfully!");
}

generate().catch(console.error);
