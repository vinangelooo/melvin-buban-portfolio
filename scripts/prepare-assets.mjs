import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const workspace = "C:/Melvin Github";
const output = path.join(process.cwd(), "public", "work");

const assets = [
  {
    source: path.join(workspace, "LinkedIn Postings", "Greenbix A Journey of Innovation and Impact.png"),
    output: "greenbix-journey.webp",
    width: 1100,
  },
  {
    source: path.join(workspace, "LinkedIn Postings", "Green Mark remains the operating language for performance in Singapore.png"),
    output: "greenbix-green-mark.webp",
    width: 1100,
  },
  {
    source: path.join(workspace, "LinkedIn Postings", "Data centers are redefining “efficient cooling” in 2026.png"),
    output: "greenbix-data-centers.webp",
    width: 1100,
  },
  {
    source: path.join(workspace, "LinkedIn Postings", "Singapore is formalising “Alternative Cooling” as the next step.png"),
    output: "greenbix-alternative-cooling.webp",
    width: 1100,
  },
  {
    source: path.join(workspace, "tmp", "pdfs", "Artificial Intelligence-page-01.png"),
    output: "research-ai.webp",
    width: 1280,
  },
  {
    source: path.join(workspace, "tmp", "pdfs", "The First 48hrs of a Disaster-page-01.png"),
    output: "research-crisis.webp",
    width: 1280,
  },
  {
    source: path.join(workspace, "tmp", "pdfs", "Open Source Intelligence-page-09.png"),
    output: "research-osint.webp",
    width: 1280,
  },
  {
    source: path.join(workspace, "tmp", "pdfs", "Deep Web-page-01.png"),
    output: "communications-deep-web.webp",
    width: 900,
  },
  {
    source: path.join(workspace, "tmp", "pdfs", "Past Performance-page-01.png"),
    output: "communications-past-performance.webp",
    width: 900,
  },
  {
    source: path.join(workspace, "tmp", "pdfs", "Wreath Laying Flyer-page-01.png"),
    output: "communications-event.webp",
    width: 900,
  },
];

await fs.mkdir(output, { recursive: true });

for (const asset of assets) {
  await sharp(asset.source)
    .rotate()
    .resize({ width: asset.width, withoutEnlargement: true })
    .webp({ quality: 78, effort: 5 })
    .toFile(path.join(output, asset.output));
}

const results = await Promise.all(
  assets.map(async (asset) => {
    const file = path.join(output, asset.output);
    const stat = await fs.stat(file);
    return { file: asset.output, bytes: stat.size };
  }),
);

console.table(results);
