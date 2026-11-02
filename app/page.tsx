/* Portfolio evidence is served at authored crops. */
/* eslint-disable @next/next/no-img-element */
import { headers } from "next/headers";
import Link from "next/link";
import { Arrow, FolderIcon, SectionLabel, SiteFooter, SiteHeader } from "./components";
import { caseStudies, experience, toolGroups, personalProjects } from "./site-data";
import { ResumeLink } from "./resume-link";

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
      jobTitle: "Executive and Personal Assistant | Administrative Virtual Assistant | Admin Lead | Project Manager",
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
            <p className="eyebrow hero-eyebrow">Executive &amp; personal assistance · Project management</p>
            <h1 aria-label="Clarity for the work behind the work.">
              Clarity for the work <em>behind</em> the work.
            </h1>
            <p className="hero-lede">
              I support CEOs and international teams with executive priorities, complex calendars,
              confidential matters, project coordination, and day-to-day business operations.
            </p>
            <div className="hero-actions">
              <a className="button button-light" href="#work">
                View selected work <Arrow />
              </a>
              <ResumeLink className="button liquid-glass">
                Download CV <span aria-hidden="true">↓</span>
              </ResumeLink>
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

          <section className="resume-projects" aria-labelledby="personal-projects-title">
            <p className="eyebrow">Personal projects</p>
            <h2 id="personal-projects-title">Tools I built for practical work.</h2>
            <div className="resume-project-grid">
              {personalProjects.map((project) => (
                <article key={project.title}>
                  <p className="case-kicker">{project.tools}</p>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </article>
              ))}
            </div>
          </section>

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
                <h3>Executive &amp; personal support</h3>
                <p>Priority and calendar management, confidential correspondence, domestic and international travel, executive briefings, meetings, events, and action tracking.</p>
              </div>
            </article>
            <article className="liquid-glass">
              <span>02</span>
              <div>
                <p className="case-kicker">Insight</p>
                <h3>Research &amp; project coordination</h3>
                <p>Market research, lead generation, vendor sourcing, procurement coordination, grant and accelerator applications, stakeholder follow-up, and workflow automation.</p>
              </div>
            </article>
            <article className="liquid-glass">
              <span>03</span>
              <div>
                <p className="case-kicker">Communication</p>
                <h3>Team &amp; business operations</h3>
                <p>Team supervision, recruitment, onboarding and offboarding, financial administration, budget and expense tracking, invoice review, SOPs, handbooks, and website content.</p>
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
          <ResumeLink className="button liquid-glass">
            View the complete CV <Arrow />
          </ResumeLink>
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
              I am an executive and personal assistant based in Laguna, Philippines, with experience
              supporting CEOs and international teams in Singapore and the United States.
            </p>
            <p>
              My background combines business ownership and civil engineering with hands-on support
              across finance, hiring, marketing, and commercial initiatives. At CounterAtlas LLC
              and Daedalians, I supervised up to eight employees and managed financial transactions
              totaling more than $200,000.
            </p>
            <p>
              I hold a Bachelor of Science in Civil Engineering from Laguna State Polytechnic
              University, Santa Cruz Main Campus.
            </p>
            <p>
              My work style centers on discretion, executive judgment, proactive ownership,
              clear communication, accountability, and consistent follow-through.
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
