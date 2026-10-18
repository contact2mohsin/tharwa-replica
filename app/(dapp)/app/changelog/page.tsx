export default function ChangelogPage() {
  return (
    <section className="dapp-panel max-w-2xl p-6 sm:p-8">
      <p className="text-[10px] tracking-[0.28em] text-gold uppercase">
        Updates
      </p>
      <h1 className="mt-3 font-display text-4xl tracking-tight text-cream">
        Changelog
      </h1>
      <p className="mt-3 text-sm leading-6 text-muted">
        Protocol notes and product updates for the dashboard, swap, staking, and
        card desks.
      </p>
      <ol className="mt-8 space-y-5 border-t border-white/8 pt-6">
        <li>
          <p className="text-[11px] tracking-[0.18em] text-gold uppercase">
            Latest
          </p>
          <p className="mt-1 font-display text-2xl text-cream">
            Dashboard shell
          </p>
          <p className="mt-1 text-sm text-muted">
            Overview, swap, staking, and card routes are available in the app.
          </p>
        </li>
      </ol>
    </section>
  );
}
