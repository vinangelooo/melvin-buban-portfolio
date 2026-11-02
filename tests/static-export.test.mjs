import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_DIR = path.join(PROJECT_ROOT, "pages-dist");
const BASE_PATH = "/melvin-buban-portfolio";
const LIVE_URL = `https://vinangelooo.github.io${BASE_PATH}`;
const PAGE_FILES = [
  "index.html",
  "work/greenbix/index.html",
  "work/research-narratives/index.html",
  "work/stakeholder-communications/index.html",
  "404.html",
];

async function allFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const filePath = path.join(directory, entry.name);
      return entry.isDirectory() ? allFiles(filePath) : [filePath];
    }),
  );
  return nested.flat();
}

function localFileForUrl(url) {
  const pathOnly = url.split(/[?#]/, 1)[0];
  const relative = pathOnly.slice(BASE_PATH.length).replace(/^\//, "");
  return path.join(OUTPUT_DIR, relative.endsWith("/") || relative === "" ? relative : relative);
}

test("exports every portfolio page with production metadata", async () => {
  for (const pageFile of PAGE_FILES) {
    await access(path.join(OUTPUT_DIR, pageFile));
  }

  const home = await readFile(path.join(OUTPUT_DIR, "index.html"), "utf8");
  assert.match(home, /Clarity for the work behind the work\./);
  assert.match(home, new RegExp(LIVE_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.doesNotMatch(home, /portfolio\.local|localhost/);
  assert.doesNotMatch(home, /modulepreload/);
  assert.equal((home.match(/<script\b/g) ?? []).length, 1);
  assert.match(home, /<script type="application\/ld\+json">/);
});

test("keeps all generated internal links and assets inside the Pages base path", async () => {
  for (const pageFile of PAGE_FILES) {
    const html = await readFile(path.join(OUTPUT_DIR, pageFile), "utf8");
    assert.doesNotMatch(html, /\b(?:href|src)=["']\/(?!\/|melvin-buban-portfolio(?:\/|["']))/);

    const urls = [...html.matchAll(/\b(?:href|src)=["'](\/melvin-buban-portfolio(?:\/[^"']*)?)["']/g)]
      .map((match) => match[1])
      .filter((url) => !url.endsWith("/") && !url.includes("/#"));

    for (const url of urls) {
      await access(localFileForUrl(url));
    }
  }
});

test("rewrites stylesheet asset URLs for the repository subpath", async () => {
  const files = await allFiles(OUTPUT_DIR);
  const cssFiles = files.filter((file) => file.endsWith(".css"));
  assert.ok(cssFiles.length > 0);

  for (const cssFile of cssFiles) {
    const css = await readFile(cssFile, "utf8");
    assert.doesNotMatch(css, /url\((?:["']?)\/(?!\/|melvin-buban-portfolio\/)/);
  }
});

test("publishes discovery files with the live URL", async () => {
  const robots = await readFile(path.join(OUTPUT_DIR, "robots.txt"), "utf8");
  const sitemap = await readFile(path.join(OUTPUT_DIR, "sitemap.xml"), "utf8");
  assert.match(robots, new RegExp(`${LIVE_URL}/sitemap\\.xml`));
  assert.match(sitemap, new RegExp(`${LIVE_URL}/work/greenbix`));
});

test("every CV button serves the supplied updated resume", async () => {
  const filename = "melvin-angelo-buban-cv-2026-11-add8cb7b.pdf";
  for (const page of PAGE_FILES) {
    const html = await readFile(path.join(OUTPUT_DIR, page), "utf8");
    const links = [...html.matchAll(/<a\b[^>]*href="([^"]*cv[^"]*\.pdf[^"]*)"[^>]*>([\s\S]*?)<\/a>/g)];
    assert.equal(links.length, page === "index.html" ? 3 : 1, page);
    for (const link of links) assert.equal(link[1], `${BASE_PATH}/${filename}`, `${page}: ${link[2]}`);
    assert.match(html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0] ?? "", new RegExp(filename.replaceAll(".", "\\.")));
    if (page === "index.html") {
      assert.match(html.match(/<section[^>]*id="experience"[\s\S]*?<\/section>/)?.[0] ?? "", /View the complete CV/);
      for (const text of ["Chief of Staff", "Private Math Tutor", "BizRadar", "Additional exposure", "August 2025", "August 2026"]) assert.ok(html.includes(text), text);
    }
  }
  const { createHash } = await import("node:crypto");
  const pdf = await readFile(path.join(OUTPUT_DIR, filename));
  assert.equal(createHash("sha256").update(pdf).digest("hex"), "add8cb7bc1e8e0b89201f67dc9dfe655c3588e5a6b65146719bb4aacc4d5dd8a");
});
