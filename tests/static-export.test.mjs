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
