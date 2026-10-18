import { Panel, Section } from "@/components/ui/section";
import { leadership } from "@/lib/content";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.5h4.56V24H.22zM8.34 8.5h4.37v2.12h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7v8.76h-4.56v-7.77c0-1.85-.03-4.23-2.58-4.23-2.58 0-2.98 2.01-2.98 4.09V24H8.34z" />
    </svg>
  );
}

export function Leadership() {
  return (
    <Section
      id="team"
      label="Leadership"
      title={
        <>
          The team
          <span className="block text-muted">behind the protocol.</span>
        </>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {leadership.map((person) => (
          <Panel key={person.name} className="flex min-h-[280px] flex-col">
            {"href" in person && person.href ? (
              <a
                href={person.href}
                target="_blank"
                rel="noreferrer"
                className="mb-8 inline-flex h-10 w-10 items-center justify-center border border-line text-cream hover:border-gold hover:text-gold"
                aria-label={`${person.name} on LinkedIn`}
              >
                <LinkedInIcon />
              </a>
            ) : (
              <div className="mb-8 h-10 w-10 border border-line" />
            )}
            <p className="text-[11px] tracking-[0.2em] text-gold uppercase">
              {person.role}
            </p>
            <h3 className="mt-3 font-display text-3xl tracking-tight text-cream">
              {person.name}
            </h3>
            <p className="mt-5 text-sm leading-6 text-muted">{person.body}</p>
          </Panel>
        ))}
      </div>
    </Section>
  );
}
