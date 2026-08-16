/* Pre-optimized portfolio evidence is served at authored crops. */
/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, SiteFooter, SiteHeader } from "../../components";
import { caseStudies } from "../../site-data";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((item) => ({ slug: item.slug }));
}

async function getOrigin() {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") ?? incoming.get("host") ?? "localhost:3000";
  const protocol = incoming.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  return `${protocol}://${host}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = caseStudies.find((entry) => entry.slug === slug);
  if (!item) return {};

  const origin = await getOrigin();
  const image = new URL(item.images[0].src, origin).toString();
  const title = `${item.shortTitle} | Melvin Angelo Buban`;

  return {
    title,
    description: item.deck,
    alternates: { canonical: `/work/${item.slug}/` },
    openGraph: {
      title,
      description: item.deck,
      type: "article",
      url: `/work/${item.slug}/`,
      images: [{ url: image, alt: item.images[0].alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: item.deck,
      images: [image],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const itemIndex = caseStudies.findIndex((entry) => entry.slug === slug);
  if (itemIndex === -1) notFound();

  const item = caseStudies[itemIndex];
  const next = caseStudies[(itemIndex + 1) % caseStudies.length];
  const origin = await getOrigin();
  const canonical = new URL(`/work/${item.slug}/`, origin).toString();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    description: item.deck,
    url: canonical,
    contributor: {
      "@type": "Person",
      name: "Melvin Angelo Buban",
    },
    image: item.images.map((image) => new URL(image.src, origin).toString()),
  };

  return (
    <>
      <SiteHeader />
      <main className="case-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <section className="case-hero">
          <Link className="back-link" href="/#work">← Selected work</Link>
          <p className="eyebrow">{item.category}</p>
          <h1>{item.title}</h1>
          <p className="case-deck">{item.deck}</p>
          <dl className="case-metadata">
            <div>
              <dt>Organization</dt>
              <dd>{item.organization}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>{item.role}</dd>
            </div>
            <div>
              <dt>Period</dt>
              <dd>{item.period}</dd>
            </div>
          </dl>
        </section>

        <figure className="case-lead-figure">
          <img src={item.images[0].src} alt={item.images[0].alt} />
          <figcaption>{item.images[0].caption}</figcaption>
        </figure>

        <section className="case-story">
          <div>
            <p className="eyebrow">The context</p>
            <h2>What the work needed.</h2>
          </div>
          <p>{item.challenge}</p>
        </section>

        <section className="case-contribution">
          <div>
            <p className="eyebrow eyebrow-light">My contribution</p>
            <h2>Where I added structure.</h2>
          </div>
          <ol>
            {item.contribution.map((contribution, index) => (
              <li key={contribution}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{contribution}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="case-gallery" aria-label={`${item.shortTitle} gallery`}>
          {item.images.slice(1).map((image) => (
            <figure key={image.src}>
              <img src={image.src} alt={image.alt} loading="lazy" />
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </section>

        <section className="case-value">
          <p className="eyebrow">The value created</p>
          <blockquote>{item.value}</blockquote>
        </section>

        <section className="next-case">
          <p>Next case study</p>
          <Link href={`/work/${next.slug}/`}>
            <span>{next.category}</span>
            <strong>{next.title}</strong>
            <Arrow />
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
