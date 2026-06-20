import { AnimatedCounter } from "@/components/effects/animated-counter";

const facts = [
  [4, 0, "Substantial projects"],
  [8.66, 2, "GPA out of 10"],
  [755, 0, "TOEIC L&R"],
  [290, 0, "TOEIC S&W"],
];

const principles = [
  {
    title: "Deep-dive mechanics",
    body: "I don't just use tools. I dissect why Redis Lua scripts guarantee atomicity, how the pub/sub topography impacts client memory, and where bottlenecks form under high-concurrency pressure.",
  },
  {
    title: "Fault-tolerant design",
    body: "Network boundaries are chaotic. Handling race conditions, idempotent webhooks, dropped WebRTC/ICE connections, and exponential backoff retries is core product behavior, not an afterthought.",
  },
  {
    title: "Data & Architectural Trade-offs",
    body: "There is no 'best' solution. I evaluate system design through trade-offs: cursor vs offset pagination, Pub/Sub vs Log Streams, and strict normalization vs strategic denormalization.",
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
              Engineering beyond the happy path.
            </h2>
            <p className="mt-8 max-w-[35rem] text-lg leading-8 text-muted">
              I am a final-year Software Engineering student at Ton Duc Thang
              University. My engineering focus centers on high-throughput
              backend services and distributed full-stack systems where state
              stability and network boundaries present critical challenges.
            </p>
            <p className="mt-5 max-w-[35rem] leading-7 text-slate-300">
              Seeking a **Full-time Fullstack / Software Engineer Intern** role.
              Ready to own features in production, debug complex distributed
              flows, and continuously refine my system architecture judgment.
            </p>
          </div>

          <div>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
              {facts.map(([value, decimals, label]) => (
                <div className="bg-surface p-6 sm:p-8" key={label}>
                  <dt className="text-sm text-muted">{label}</dt>
                  <dd className="mt-2 font-mono text-3xl font-semibold text-accent">
                    <AnimatedCounter
                      decimals={decimals as number}
                      value={value as number}
                    />
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 space-y-6">
              {principles.map((principle) => (
                <div
                  className="grid gap-2 sm:grid-cols-[12rem_1fr]"
                  key={principle.title}
                >
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
