import Link from "next/link";

export const Arrow = () => <span aria-hidden="true">↗</span>;

export function FolderIcon() {
  return <span className="folder-icon" aria-hidden="true" />;
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/#top" aria-label="Melvin Angelo Buban, home">
        Melvin<span>.</span>
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        <Link href="/#work">Selected work</Link>
        <Link href="/#capabilities">Capabilities</Link>
        <Link href="/#experience">Experience</Link>
        <Link href="/#about">About</Link>
        <a
          className="sample-work-link"
          href="https://drive.google.com/drive/folders/11pOsPeklyZgniiFqxYIwAiUBp_yHizKG?usp=drive_link"
          target="_blank"
          rel="noreferrer"
        >
          <FolderIcon /> Sample works
        </a>
        <Link className="nav-cta" href="/#contact">Contact Melvin</Link>
      </nav>

      <details className="mobile-nav">
        <summary>Menu</summary>
        <nav aria-label="Mobile navigation">
          <Link href="/#work">Selected work</Link>
          <Link href="/#capabilities">Capabilities</Link>
          <Link href="/#experience">Experience</Link>
          <Link href="/#about">About</Link>
          <a
            href="https://drive.google.com/drive/folders/11pOsPeklyZgniiFqxYIwAiUBp_yHizKG?usp=drive_link"
            target="_blank"
            rel="noreferrer"
          >
            Sample works
          </a>
          <Link href="/#contact">Contact Melvin</Link>
        </nav>
      </details>
    </header>
  );
}

export function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <p>{children}</p>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="wordmark footer-wordmark" href="/#top" aria-label="Back to home">
          Melvin<span>.</span>
        </Link>
        <p>Executive operations, research, and project coordination.</p>
      </div>
      <div className="footer-links">
        <a href="mailto:melvinbuban14@gmail.com">melvinbuban14@gmail.com</a>
        <Link href="/melvin-angelo-buban-cv.pdf?v=20261102" target="_blank">Download CV</Link>
        <a
          href="https://drive.google.com/drive/folders/11pOsPeklyZgniiFqxYIwAiUBp_yHizKG?usp=drive_link"
          target="_blank"
          rel="noreferrer"
        >
          Sample works
        </a>
        <Link href="/#work">Selected work</Link>
      </div>
      <p className="copyright">© {new Date().getFullYear()} Melvin Angelo Buban</p>
    </footer>
  );
}
