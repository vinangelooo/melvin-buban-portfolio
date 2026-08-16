import { caseStudies } from "../site-data";

export function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const paths = ["/", ...caseStudies.map((item) => `/work/${item.slug}`)];
  const urls = paths
    .map((path) => `<url><loc>${origin}${path}</loc><changefreq>monthly</changefreq></url>`)
    .join("");
  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(body, {
    headers: { "content-type": "application/xml; charset=utf-8" },
  });
}
