/* Portfolio evidence is served at authored crops. */
/* eslint-disable @next/next/no-img-element */
import { headers } from "next/headers";
import Link from "next/link";
import { Arrow, FolderIcon, SectionLabel, SiteFooter, SiteHeader } from "./components";
import { caseStudies, experience, toolGroups } from "./site-data";

const SAMPLE_WORKS =
  "https://drive.google.com/drive/folders/11pOsPeklyZgniiFqxYIwAiUBp_yHizKG?usp=drive_link";

export default async function Home() {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") ?? incoming.get("host") ?? "localhost:3000";
  const protocol = incoming.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: origin,
    mainEntity: {
      "@type": "Person",
      name: "Melvin Angelo Buban",
      email: "mailto:melvinbuban14@gmail.com",
      jobTitle: "Executive Operations, Research & Project Coordination Partner",
      url: origin,
      knowsAbout: [
        "Executive operations",
        "Project coordination",
        "Research",
        "Stakeholder communications",
      ],
    },
    hasPart: caseStudies.map((item) => ({
      "@type": "CreativeWork",
      name: item.shortTitle,
      url: `${origin}/work/${item.slug}`,
    })),
  };

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-visual" aria-hidden="true">
            <img src="/hero-executive-operations.png" alt="" />
            <span className="hero-light-sweep" />
          </div>
          <div className="hero-scrim" aria-hidden="true" />

          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">Executive operations · Research · Coordination</p>
            <h1 aria-label="Clarity for the work behind the work.">
              Clarity for the work <em>behind</em> the work.
            </h1>
            <p className="hero-lede">
              I help leaders organize complex work, align stakeholders, and turn research,
              decisions, and follow-through into clear action.
            </p>
            <div className="hero-actions">
              <a className="button button-light" href="#work">
                View selected work <Arrow />
              </a>
              <a className="button liquid-glass" href="/melvin-angelo-buban-cv.pdf" target="_blank">
                Download CV <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <a
            className="sample-orb liquid-glass"
            href={SAMPLE_WORKS}
            target="_blank"
            rel="noreferrer"
            aria-label="Open Melvin's sample works in Google Drive"
          >
            <span className="sample-orb-icon"><FolderIcon /></span>
            <span className="sample-orb-copy">
              <small>Open the collection</small>
              <strong>Sample works</strong>
            </span>
            <Arrow />
          </a>

          <div className="hero-meta" aria-label="Portfolio details">
            <span>Based in Laguna, Philippines</span>
            <span className="availability"><i /> Available for select opportunities</span>
            <a href="#positioning">Scroll to explore <span aria-hidden="true">↓</span></a>
          </div>
        </section>

        <section className="statement-section" id="positioning">
          <SectionLabel number="01">The positioning</SectionLabel>
          <div className="statement-copy">
            <p>
              Pioneering <em>ideas</em> for leaders who need the moving parts to become
              <em> momentum.</em>
            </p>
            <div className="statement-notes">
              <p>
                I work at the intersection of executive support and execution—bringing
                structure to priorities and making sure important work does not disappear
                between a conversation and the next deadline.
              </p>
              <p>
                My background spans climate technology, professional services, small-business
                operations, customer support, and engineering cost work.
              </p>
            </div>
          </div>
        </section>

        <section className="work-section" id="work">
          <div className="section-heading">
            <SectionLabel number="02">Selected work</SectionLabel>
            <div>
              <p className="eyebrow">Evidence, not a gallery</p>
              <h2>Three ways the work creates clarity.</h2>
            </div>
          </div>

          <div className="work-grid">
            {caseStudies.map((item, index) => (
              <article className="work-card liquid-glass" key={item.slug}>
                <Link className="work-visual" href={`/work/${item.slug}/`}>
                  <img
                    src={item.images[0].src}
                    alt={item.images[0].alt}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <span className="work-index">{item.number}</span>
                </Link>
                <div className="work-card-copy">
                  <p className="case-kicker">{item.category}</p>
                  <h3><Link href={`/work/${item.slug}/`}>{item.title}</Link></h3>
                  <p>{item.deck}</p>
                  <ul className="tag-list" aria-label="Contributions">
                    {item.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                  <Link className="text-link" href={`/work/${item.slug}/`}>
                    Explore case study <Arrow />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <a
            className="drive-banner liquid-glass"
            href={SAMPLE_WORKS}
            target="_blank"
            rel="noreferrer"
          >
            <span className="drive-banner-icon"><FolderIcon /></span>
            <span>
              <small>More decks, visuals, and project samples</small>
              <strong>Browse the complete sample-work folder</strong>
            </span>
            <Arrow />
          </a>
        </section>

        <section className="capabilities-section" id="capabilities">
          <div className="section-heading">
            <SectionLabel number="03">What I do</SectionLabel>
            <div>
              <p className="eyebrow">A focused range</p>
              <h2>Thinking <em>×</em> action.</h2>
            </div>
          </div>

          <div className="capability-grid">
            <article className="liquid-glass">
              <span>01</span>
              <div>
                <p className="case-kicker">Operations</p>
                <h3>Executive operations &amp; coordination</h3>
                <p>Action tracking, records, travel, project workflows, administration, and dependable follow-up.</p>
              </div>
            </article>
            <article className="liquid-glass">
              <span>02</span>
              <div>
                <p className="case-kicker">Insight</p>
                <h3>Research &amp; decision support</h3>
                <p>Market scans, opportunity research, shortlists, applications, summaries, and briefing materials.</p>
              </div>
            </article>
            <article className="liquid-glass">
              <span>03</span>
              <div>
                <p className="case-kicker">Communication</p>
                <h3>Stakeholder-ready communications</h3>
                <p>Pitch decks, one-pagers, reports, professional email, event collateral, and web content.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="principles-section">
          <div className="principles-heading">
            <p className="eyebrow">How I work</p>
            <h2>Calm, visible, and built for follow-through.</h2>
          </div>
          <ol className="principles-list">
            {[
              ["Clarify what matters", "Separate the urgent from the important and make the real outcome visible."],
              ["Anticipate dependencies", "Surface missing inputs and decisions before they create delay."],
              ["Communicate early", "Keep owners and stakeholders informed with concise, useful updates."],
              ["Leave the work usable", "Finish with organized files, clear notes, and documentation others can use."],
            ].map(([title, body], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{title}</h3><p>{body}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className="experience-section" id="experience">
          <div className="section-heading">
            <SectionLabel number="04">Experience</SectionLabel>
            <div>
              <p className="eyebrow">A cross-functional career</p>
              <h2>Built across operations, support, and coordination.</h2>
            </div>
          </div>
          <div className="experience-list">
            {experience.map((item) => (
              <article key={`${item.organization}-${item.period}`}>
                <p className="experience-period">{item.period}</p>
                <div className="experience-title">
                  <h3>{item.role}</h3>
                  <p>{item.organization} · {item.location}</p>
                </div>
                <p className="experience-summary">{item.summary}</p>
              </article>
            ))}
          </div>
          <a className="button liquid-glass" href="/melvin-angelo-buban-cv.pdf" target="_blank">
            View the complete CV <Arrow />
          </a>
        </section>

        <section className="tools-section">
          <SectionLabel number="05">Working toolkit</SectionLabel>
          <div className="tool-grid">
            {toolGroups.map((group) => (
              <article key={group.title}>
                <h3>{group.title}</h3>
                <p>{group.tools}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-monogram" aria-hidden="true">MAB</div>
          <div className="about-copy">
            <p className="eyebrow">About Melvin</p>
            <h2>A practical operator with an engineer’s instinct for structure.</h2>
            <p className="about-lede">
              I am a Civil Engineering graduate based in Laguna, Philippines, with experience
              supporting leaders and teams connected to Singapore and the United States.
            </p>
            <p>
              My career has moved through cost planning, customer operations, executive
              assistance, small-business ownership, project coordination, and climate-tech
              commercialization. That range helps me see both the detail inside a task and the
              larger outcome it supports.
            </p>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div>
            <p className="eyebrow">Start a conversation</p>
            <h2 aria-label="What needs to move?">What needs to <em>move?</em></h2>
          </div>
          <div className="contact-copy">
            <p>
              Share the role, project, or operational challenge. I’ll respond with a clear
              view of whether I can help.
            </p>
            <a className="button button-light" href="mailto:melvinbuban14@gmail.com?subject=Let%27s%20work%20together">
              Email Melvin <Arrow />
            </a>
            <a className="direct-email" href="mailto:melvinbuban14@gmail.com">
              melvinbuban14@gmail.com
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
