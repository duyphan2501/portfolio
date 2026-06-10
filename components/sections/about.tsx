const facts = [
  ["3", "Substantial projects"],
  ["8.66", "GPA out of 10"],
  ["755", "TOEIC L&R"],
  ["2023", "TDTU start year"],
];

const principles = [
  {
    title: "Understand the mechanism",
    body:
      "I want to know why Redis Lua is atomic, why pub/sub needs dedicated clients, and where a system fails under pressure.",
  },
  {
    title: "Design for failure",
    body:
      "Race conditions, duplicate webhooks, dropped ICE candidates, and reconnecting clients are product behavior, not optional cleanup.",
  },
  {
    title: "Explain the trade-off",
    body:
      "I can discuss cursor versus offset pagination, Pub/Sub versus Streams, and normalization versus denormalization in context.",
  },
];

export function About() {
  return (
    <section className="section-rule py-24 sm:py-32">
      <div className="page-shell">
        <p className="section-kicker">Engineering profile</p>
        <div className="mt-6 grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div>
            <h2 className="section-title text-balance">
              I work past the happy path.
            </h2>
            <p className="mt-8 max-w-[35rem] text-lg leading-8 text-muted">
              I am a final-year Software Engineering student at Ton Duc Thang
              University. My work centers on full-stack systems where timing,
              state, and network boundaries create the hardest problems.
            </p>
            <p className="mt-5 max-w-[35rem] leading-7 text-muted">
              I am looking for a full-time Fullstack Engineer Intern role where
              I can contribute to production systems and keep sharpening my
              system design judgment.
            </p>
          </div>

          <div>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
              {facts.map(([value, label]) => (
                <div className="bg-surface p-6 sm:p-8" key={label}>
                  <dt className="text-sm text-muted">{label}</dt>
                  <dd className="mt-2 font-mono text-3xl font-semibold text-accent">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 space-y-6">
              {principles.map((principle) => (
                <div className="grid gap-2 sm:grid-cols-[12rem_1fr]" key={principle.title}>
                  <h3 className="font-mono text-sm text-foreground">
                    {principle.title}
                  </h3>
                  <p className="leading-7 text-muted">{principle.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
