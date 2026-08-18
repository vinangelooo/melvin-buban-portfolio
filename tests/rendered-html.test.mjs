import assert from "node:assert/strict";
import test from "node:test";

async function createWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

async function render(path = "/") {
  const worker = await createWorker();
  return worker.fetch(
    new Request(`https://portfolio.example${path}`, {
      headers: { accept: "text/html" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the complete portfolio home page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Clarity for the work behind the work\./);
  assert.match(html, /Three ways the work creates clarity\./);
  assert.match(html, /What needs to move\?/);
  assert.match(html, /melvin-angelo-buban-cv\.pdf/);
  assert.match(html, /hero-executive-operations\.png/);
  assert.doesNotMatch(html, /<video\b|d8j0ntlcm91z4\.cloudfront\.net/);
  for (const section of ["work", "capabilities", "experience", "about", "contact"]) {
    assert.match(html, new RegExp(`href="/#${section}"`));
    assert.match(html, new RegExp(`id="${section}"`));
  }
  assert.doesNotMatch(html, /greenbix-data-centers\.webp/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

for (const [slug, title] of [
  ["greenbix", "Building a research-to-content system"],
  ["research-narratives", "Structuring complex topics"],
  ["stakeholder-communications", "Making detailed information usable"],
]) {
  test(`server-renders the ${slug} case study`, async () => {
    const response = await render(`/work/${slug}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(title));
    assert.match(html, /application\/ld\+json/);
    assert.match(html, /Melvin Angelo Buban/);
  });
}
