import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden pt-18">
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <div className="page-shell relative grid min-h-[calc(100dvh-4.5rem)] items-center gap-10 py-12 lg:grid-cols-[1.08fr_0.92fr] lg:py-8">
        <div className="relative z-10 max-w-3xl">
          <p className="section-kicker mb-5">Fullstack Engineer Intern</p>
          <h1 className="text-balance max-w-[12ch] text-[clamp(3.6rem,8vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.075em]">
            Phan Nhut <span className="text-accent">Duy</span>
          </h1>
          <p className="mt-7 max-w-[34rem] text-balance text-lg leading-8 text-muted sm:text-xl">
            I build reliable web systems for concurrency, distributed state, and
            real-time communication.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              className="rounded-full bg-accent px-6 py-3.5 text-center font-semibold text-[#041412] transition-transform hover:-translate-y-0.5 active:translate-y-px"
              href="#projects"
            >
              View projects
            </a>
            <a
              className="rounded-full border border-border bg-surface/60 px-6 py-3.5 text-center font-semibold transition-colors hover:border-accent/60 hover:text-accent"
              href="https://github.com/duyphan2501"
              rel="noreferrer"
              target="_blank"
            >
              GitHub profile
            </a>
          </div>
        </div>

        <div className="hero-art relative mx-auto aspect-[4/5] w-full max-w-[29rem] overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_30px_100px_rgb(0_0_0/0.4)]">
          <Image
            alt="Abstract visualization of distributed data paths and message queues"
            className="object-cover"
            fill
            priority
            sizes="(max-width: 1024px) 80vw, 38vw"
            src="/images/distributed-systems-hero.png"
          />
          <div className="absolute inset-x-5 bottom-5 z-10 rounded-xl border border-white/10 bg-background/75 p-4 backdrop-blur">
            <p className="font-mono text-xs text-accent">SYSTEM FOCUS</p>
            <p className="mt-2 text-sm leading-6 text-foreground/85">
              Race conditions, network failures, reconnection flows, and the
              edge cases after the happy path.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
