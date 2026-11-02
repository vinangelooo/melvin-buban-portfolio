import type { ReactNode } from "react";

// The dated, content-specific filename keeps new downloads separate from cached CVs.
export const RESUME_URL = "/melvin-angelo-buban-cv-2026-11-add8cb7b.pdf";

export function ResumeLink({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <a href={RESUME_URL} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
