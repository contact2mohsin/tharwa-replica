import { Panel, Section } from "@/components/ui/section";
import { securityItems } from "@/lib/content";

export function Security() {
  return (
    <Section
      id="security"
      tone="surface"
      label="Security & Trust"
      title="Clear controls. Honest limits."
      subtitle="Audits, collateralisation, and on-chain verification as described for the protocol."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {securityItems.map((item) => (
          <Panel key={item.index}>
            <p className="font-display text-3xl text-gold">{item.index}</p>
            <h3 className="mt-4 font-display text-2xl tracking-tight text-cream">
              {item.title}
            </h3>
            <p className="mt-4 text-[15px] leading-7 text-muted">{item.body}</p>
          </Panel>
        ))}
      </div>
    </Section>
  );
}
