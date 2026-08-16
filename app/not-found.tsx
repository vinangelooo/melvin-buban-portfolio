import { Arrow, SiteFooter, SiteHeader } from "./components";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="not-found">
        <p className="eyebrow">404 · Page not found</p>
        <h1>This page has moved out of view.</h1>
        <p>
          The portfolio is still here. Return to the selected work, or start a
          conversation with Melvin.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/#work">
            View selected work <Arrow />
          </Link>
          <a className="button button-secondary" href="mailto:melvinbuban14@gmail.com">
            Email Melvin
          </a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
