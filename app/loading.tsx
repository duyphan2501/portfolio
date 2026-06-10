const navigationItems = ["About", "Projects", "Skills", "Contact"];

export default function Loading() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading portfolio"
      className="loading-page"
      role="status"
    >
      <span className="sr-only">Loading portfolio</span>

      <header className="border-b border-border/70">
        <div className="page-shell flex h-18 items-center justify-between">
          <div className="font-mono text-sm font-semibold tracking-tight">
            <span className="text-accent">Duy</span>.dev
          </div>

          <div aria-hidden="true" className="hidden items-center gap-7 md:flex">
            {navigationItems.map((item) => (
              <span className="loading-nav-item" key={item}>
                {item}
              </span>
            ))}
            <span className="h-9 w-32 rounded-full border border-border" />
          </div>

          <span
            aria-hidden="true"
            className="h-10 w-16 rounded-lg border border-border md:hidden"
          />
        </div>
      </header>

      <main className="hero-grid relative min-h-[calc(100dvh-4.5rem)] overflow-hidden">
        <div className="page-shell grid min-h-[calc(100dvh-4.5rem)] items-center gap-10 py-12 lg:grid-cols-[1.08fr_0.92fr] lg:py-8">
          <div aria-hidden="true" className="max-w-3xl">
            <div className="loading-line h-3 w-44 rounded-full" />
            <div className="mt-7 space-y-4">
              <div className="loading-line h-14 w-[min(100%,32rem)] rounded-xl sm:h-20" />
              <div className="loading-line h-14 w-[min(78%,24rem)] rounded-xl sm:h-20" />
            </div>
            <div className="mt-8 space-y-3">
              <div className="loading-line h-4 w-[min(100%,31rem)] rounded-full" />
              <div className="loading-line h-4 w-[min(72%,22rem)] rounded-full" />
            </div>
            <div className="mt-9 flex gap-3">
              <div className="loading-line h-12 w-36 rounded-full" />
              <div className="h-12 w-36 rounded-full border border-border bg-surface/50" />
            </div>
          </div>

          <div
            aria-hidden="true"
            className="loading-visual relative mx-auto aspect-[4/5] w-full max-w-[29rem] overflow-hidden rounded-2xl border border-border bg-surface"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-accent/70" />
            <div className="absolute inset-5 grid grid-cols-6 grid-rows-8 gap-3 opacity-45">
              {Array.from({ length: 48 }, (_, index) => (
                <span
                  className={
                    index % 7 === 0
                      ? "rounded-sm bg-accent/30"
                      : "rounded-sm border border-border/70"
                  }
                  key={index}
                />
              ))}
            </div>
            <div className="absolute inset-x-5 bottom-5 rounded-xl border border-border bg-background/85 p-4">
              <div className="loading-line h-2.5 w-24 rounded-full" />
              <div className="loading-line mt-4 h-3 w-full rounded-full" />
              <div className="loading-line mt-2 h-3 w-3/4 rounded-full" />
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="loading-progress">
          <span />
        </div>
      </main>
    </div>
  );
}
