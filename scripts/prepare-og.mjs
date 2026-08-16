import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const optimized = await sharp("public/og.png")
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .png({ compressionLevel: 9, palette: true, quality: 90 })
  .toBuffer();

await writeFile("public/og.png", optimized);

const metadata = await sharp(optimized).metadata();
console.log({ width: metadata.width, height: metadata.height, bytes: optimized.length });
