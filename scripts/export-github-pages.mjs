import { copyFile, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CLIENT_DIR = path.join(PROJECT_ROOT, "dist", "client");
const SERVER_ENTRY = path.join(PROJECT_ROOT, "dist", "server", "index.js");
const OUTPUT_DIR = path.join(PROJECT_ROOT, "pages-dist");
const INTERNAL_ORIGIN = "https://portfolio.local";
const VINEXT_DEFAULT_ORIGIN = "http://localhost:3000";
const BASE_PATH = "/melvin-buban-portfolio";
const LIVE_URL = `https://vinangelooo.github.io${BASE_PATH}`;

const workerUrl = pathToFileURL(SERVER_ENTRY);
workerUrl.searchParams.set("export", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

async function fetchRoute(route, expectedStatuses = [200]) {
  const response = await worker.fetch(
    new Request(`${INTERNAL_ORIGIN}${route}`, {
      headers: { accept: route.endsWith(".xml") ? "application/xml" : "text/html" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  if (!expectedStatuses.includes(response.status)) {
    throw new Error(`Could not export ${route}: HTTP ${response.status}`);
  }

  return response.text();
}

function prepareHtml(html) {
  return html
    .replaceAll(INTERNAL_ORIGIN, LIVE_URL)
    .replaceAll(VINEXT_DEFAULT_ORIGIN, LIVE_URL)
    .replace(/<link\b(?=[^>]*\brel=["']modulepreload["'])[^>]*>/gi, "")
    .replace(/<script\b(?![^>]*\btype=["']application\/ld\+json["'])[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/\sdata-rsc-css-href=["'][^"']*["']/gi, "")
    .replace(/(\b(?:href|src|srcset|action)=["'])\/(?!\/)/gi, `$1${BASE_PATH}/`);
}

async function writeRoute(route, html) {
  const relative = route === "/" ? "index.html" : path.join(route.slice(1), "index.html");
  const destination = path.join(OUTPUT_DIR, relative);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, prepareHtml(html), "utf8");
}

async function rewriteCssAssets(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      const filePath = path.join(directory, entry.name);
      if (entry.isDirectory()) return rewriteCssAssets(filePath);
      if (!entry.name.endsWith(".css")) return;

      const css = await readFile(filePath, "utf8");
      const rewritten = css.replace(/url\((['"]?)\/(?!\/)/g, `url($1${BASE_PATH}/`);
      await writeFile(filePath, rewritten, "utf8");
    }),
  );
}

async function copyDirectory(source, destination) {
  await mkdir(destination, { recursive: true });
  const entries = await readdir(source, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const destinationPath = path.join(destination, entry.name);
    if (entry.isDirectory()) {
      await copyDirectory(sourcePath, destinationPath);
    } else if (entry.isFile()) {
      await copyFile(sourcePath, destinationPath);
    }
  }
}

await rm(OUTPUT_DIR, { recursive: true, force: true });
await copyDirectory(CLIENT_DIR, OUTPUT_DIR);

const homeHtml = await fetchRoute("/");
await writeRoute("/", homeHtml);

const caseStudyRoutes = [
  ...new Set(
    [...homeHtml.matchAll(/href=["'](\/work\/[a-z0-9-]+)\/?["']/g)].map((match) => match[1]),
  ),
];

if (caseStudyRoutes.length === 0) {
  throw new Error("No case-study routes were discovered in the rendered home page.");
}

for (const route of caseStudyRoutes) {
  const normalizedRoute = route.endsWith("/") ? route : `${route}/`;
  await writeRoute(normalizedRoute, await fetchRoute(route.replace(/\/$/, "")));
}

const notFoundHtml = await fetchRoute("/not-found-for-static-export", [404]);
await writeFile(path.join(OUTPUT_DIR, "404.html"), prepareHtml(notFoundHtml), "utf8");

for (const route of ["/robots.txt", "/sitemap.xml"]) {
  const body = (await fetchRoute(route))
    .replaceAll(INTERNAL_ORIGIN, LIVE_URL)
    .replaceAll(VINEXT_DEFAULT_ORIGIN, LIVE_URL);
  await writeFile(path.join(OUTPUT_DIR, route.slice(1)), body, "utf8");
}

await rewriteCssAssets(OUTPUT_DIR);
await writeFile(path.join(OUTPUT_DIR, ".nojekyll"), "", "utf8");

console.log(`Exported ${caseStudyRoutes.length + 1} pages to ${OUTPUT_DIR}`);
