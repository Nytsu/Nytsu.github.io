import { Container } from "@/components/container";
import { email, github, linkedin } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-4 py-12 text-small text-muted sm:flex-row sm:items-center sm:justify-between">
        <a href={`mailto:${email}`} className="hover:text-accent">
          {email}
        </a>
        <div className="flex gap-6">
          <a href={github} className="hover:text-accent">
            GitHub
          </a>
          <a href={linkedin} className="hover:text-accent">
            LinkedIn
          </a>
        </div>
      </Container>
    </footer>
  );
}
