import { Container } from "@/components/container";
import { email, github, linkedin } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line print:hidden">
      <Container className="flex flex-col gap-1 py-8 text-small text-muted sm:flex-row sm:items-center sm:justify-between">
        <a
          href={`mailto:${email}`}
          className="inline-flex min-h-11 items-center no-underline hover:text-accent"
        >
          {email}
        </a>
        <div className="flex gap-6">
          <a
            href={github}
            className="inline-flex min-h-11 items-center no-underline hover:text-accent"
          >
            GitHub
          </a>
          <a
            href={linkedin}
            className="inline-flex min-h-11 items-center no-underline hover:text-accent"
          >
            LinkedIn
          </a>
        </div>
      </Container>
    </footer>
  );
}
