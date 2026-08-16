/* Pre-optimized portfolio evidence is served at authored crops. */
/* eslint-disable @next/next/no-img-element */
import { Arrow, SectionLabel, SiteFooter, SiteHeader } from "./components";
import { caseStudies, experience, toolGroups } from "./site-data";
import { headers } from "next/headers";
import Link from "next/link";

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
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main>
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow">Executive Operations · Research · Project Coordination</p>
            <h1>Clarity for the work behind the work.</h1>
            <p className="hero-lede">
              I help leaders organize complex work, coordinate stakeholders, and turn
              research, decisions, and follow-through into clear action.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                View selected work <Arrow />
              </a>
              <a
                className="button button-secondary"
                href="/melvin-angelo-buban-cv.pdf"
                target="_blank"
              >
                Download CV <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <figure className="hero-proof">
            <div className="hero-image-frame">
              <img
                src="/work/greenbix-journey.webp"
                alt="Greenbix innovation and impact overview combining event photography, sustainable-building imagery, and cooling-technology milestones."
              />
            </div>
            <figcaption>
              <span>Selected evidence</span>
              Research-to-content systems for climate technology
            </figcaption>
          </figure>
        </section>

        <section className="proof-strip" aria-label="Areas of experience">
          <p>Executive operations</p>
          <p>International stakeholder coordination</p>
          <p>Research &amp; decision support</p>
          <p>Stakeholder-ready communications</p>
        </section>

        <section className="positioning-section">
          <SectionLabel number="01">The positioning</SectionLabel>
          <div className="positioning-copy">
            <p className="statement">
              The person behind the leader should do more than keep a calendar.
            </p>
            <div className="positioning-columns">
              <p>
                I work at the intersection of executive support and execution—bringing
                structure to priorities, keeping stakeholders aligned, and making sure
                important work does not disappear between a conversation and the next
                deadline.
              </p>
              <p>
                My background spans climate technology, professional services, small-business
                operations, customer support, and engineering cost work. The common thread is
                dependable follow-through in environments with many moving parts.
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

          <div className="work-list">
            {caseStudies.map((item, index) => (
              <article className="work-row" key={item.slug}>
                <Link className="work-image-link" href={`/work/${item.slug}/`}>
                  <img
                    src={item.images[0].src}
                    alt={item.images[0].alt}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </Link>
                <div className="work-copy">
                  <p className="case-kicker">{item.category}</p>
                  <h3>
                    <Link href={`/work/${item.slug}/`}>{item.title}</Link>
                  </h3>
                  <p>{item.deck}</p>
                  <ul className="tag-list" aria-label="Contributions">
                    {item.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                  <Link className="text-link" href={`/work/${item.slug}/`}>
                    Read case study <Arrow />
                  </Link>
                </div>
                <span className="work-number" aria-hidden="true">{item.number}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="capabilities-section" id="capabilities">
          <div className="section-heading">
            <SectionLabel number="03">Capabilities</SectionLabel>
            <div>
              <p className="eyebrow">A focused range</p>
              <h2>Support that connects thinking to action.</h2>
            </div>
          </div>
          <div className="capability-grid">
            <article>
              <span>01</span>
              <h3>Executive operations &amp; coordination</h3>
              <p>
                Calendar and meeting support, action tracking, records, travel, finance
                administration, HR documentation, project workflows, and dependable follow-up.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Research &amp; decision support</h3>
              <p>
                Opportunity research, market scanning, partner and vendor shortlisting,
                application support, summaries, presentations, and briefing materials.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Stakeholder-ready communications</h3>
              <p>
                Pitch decks, one-pagers, professional email, LinkedIn content, web updates,
                event collateral, reports, and materials people can act on.
              </p>
            </article>
          </div>
        </section>

        <section className="principles-section">
          <div className="principles-intro">
            <p className="eyebrow eyebrow-light">How I work</p>
            <h2>Calm, visible, and built for follow-through.</h2>
          </div>
          <ol className="principles-list">
            <li>
              <span>01</span>
              <div>
                <h3>Clarify what matters.</h3>
                <p>Separate the urgent from the important and make the real outcome visible.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Anticipate the next dependency.</h3>
                <p>Surface missing inputs, decisions, and follow-ups before they create delay.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Communicate early.</h3>
                <p>Keep owners and stakeholders informed with concise, useful updates.</p>
              </div>
            </li>
            <li>
              <span>04</span>
              <div>
                <h3>Leave the work usable.</h3>
                <p>Finish with organized files, clear notes, and documentation others can use.</p>
              </div>
            </li>
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
          <a className="button button-secondary" href="/melvin-angelo-buban-cv.pdf" target="_blank">
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
          <div className="about-accent" aria-hidden="true">
            <span>M</span>
            <span>A</span>
            <span>B</span>
          </div>
          <div className="about-copy">
            <p className="eyebrow eyebrow-light">About Melvin</p>
            <h2>A practical operator with an engineer’s instinct for structure.</h2>
            <p className="about-lede">
              I am a Civil Engineering graduate based in Laguna, Philippines, with experience
              supporting leaders and teams connected to Singapore and the United States.
            </p>
            <p>
              My career has moved through cost planning, customer operations, executive
              assistance, financial and administrative support, small-business ownership,
              project coordination, and climate-tech commercialization. That range helps me
              understand both the detail inside a task and the larger outcome it supports.
            </p>
            <p>
              I do my best work where judgment, discretion, adaptability, and clear
              communication matter—especially when a leader needs someone who can understand
              the context, organize the moving parts, and carry work through.
            </p>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-heading">
            <p className="eyebrow">Start a conversation</p>
            <h2>What needs to move?</h2>
            <p>
              Share the role, project, or operational challenge. I’ll respond with a clear
              view of whether I can help.
            </p>
          </div>
          <div className="contact-paths">
            <a href="mailto:melvinbuban14@gmail.com?subject=Role%20opportunity%20for%20Melvin">
              <span>Role opportunity</span>
              <strong>Looking for a dependable cross-functional partner?</strong>
              <Arrow />
            </a>
            <a href="mailto:melvinbuban14@gmail.com?subject=Project%20support%20inquiry">
              <span>Project support</span>
              <strong>Need focused help to research, coordinate, or communicate?</strong>
              <Arrow />
            </a>
          </div>
          <a className="direct-email" href="mailto:melvinbuban14@gmail.com">
            melvinbuban14@gmail.com
          </a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
