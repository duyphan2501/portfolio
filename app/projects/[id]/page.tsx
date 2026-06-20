import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { projects, type Project } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ id: string }>;
};

type DemoImage = NonNullable<Project["demoImages"]>["desktop"];

export const dynamicParams = false;

export function generateStaticParams() {
  return projects
    .filter((project) => project.caseStudy)
    .map((project) => ({ id: project.id }));
}

function DemoFrame({
  image,
  label,
  variant,
}: {
  image?: DemoImage;
  label: string;
  variant: "desktop" | "mobile";
}) {
  const isDesktop = variant === "desktop";

  return (
    <figure
      className={
        isDesktop
          ? "rounded-2xl border border-border bg-background/80 p-3 shadow-2xl shadow-black/30"
          : "mx-auto w-full max-w-64 rounded-[2rem] border border-border bg-background/80 p-3 shadow-2xl shadow-black/30"
      }
    >
      <div
        className={
          isDesktop
            ? "aspect-[16/10] overflow-hidden rounded-xl bg-surface-raised"
            : "aspect-[9/19] overflow-hidden rounded-[1.45rem] bg-surface-raised"
        }
      >
        {image?.src ? (
          <Image
            alt={image.alt}
            loading="eager"
            className="h-full w-full object-center"
            height={isDesktop ? 900 : 844}
            src={image.src}
            width={isDesktop ? 1440 : 390}
          />
        ) : (
          <div className="flex h-full flex-col justify-between bg-[linear-gradient(135deg,rgb(57_198_179/0.16),rgb(16_23_34/0.15)_38%,rgb(8_12_20/0.95))] p-5">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-foreground/18" />
              <span className="h-2.5 w-2.5 rounded-full bg-foreground/18" />
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
                {label}
              </p>
              <p className="mt-3 max-w-[22ch] text-lg font-semibold leading-tight tracking-[-0.035em] text-foreground">
                Add screenshot in project data
              </p>
            </div>
            <div className="grid gap-2">
              <span className="h-3 rounded-full bg-foreground/12" />
              <span className="h-3 w-3/4 rounded-full bg-foreground/12" />
            </div>
          </div>
        )}
      </div>
      <figcaption className="mt-3 font-mono text-xs text-muted">
        {label}
      </figcaption>
    </figure>
  );
}

function DemoImagesSection({ project }: { project: Project }) {
  return (
    <section
      aria-labelledby="demo-images-title"
      className="deferred-section border-b border-border bg-surface py-20 sm:py-28"
    >
      <div className="page-shell">
        <div className="max-w-3xl">
          <p className="section-kicker">Demo images</p>
          <h2
            className="mt-5  text-4xl font-semibold leading-none tracking-[-0.05em] sm:text-5xl"
            id="demo-images-title"
          >
            Desktop and mobile preview.
          </h2>
          <p className="mt-5 max-w-[62ch] leading-7 text-muted">
            A quick look at the real interface across large screens and
            phone-sized browsing.
          </p>
        </div>

        <div className="mt-14 grid items-end gap-6 lg:grid-cols-[1fr_18rem]">
          <DemoFrame
            image={project.demoImages?.desktop}
            label=""
            variant="desktop"
          />
          <DemoFrame
            image={project.demoImages?.mobile}
            label=""
            variant="mobile"
          />
        </div>
      </div>
    </section>
  );
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((item) => item.id === id && item.caseStudy);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} Case Study`,
    description: project.summary,
    openGraph: {
      title: `${project.title} Case Study`,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projects.find((item) => item.id === id && item.caseStudy);

  if (!project?.caseStudy) {
    notFound();
  }

  const { caseStudy } = project;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    creator: {
      "@type": "Person",
      name: "Phan Nhut Duy",
    },
    dateCreated: project.period,
    keywords: project.tags.join(", "),
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <header className="project-case-hero border-b border-border pt-32 pb-16 sm:pt-36 sm:pb-24">
          <div className="page-shell">
            <Link
              className="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent"
              href="/#projects"
            >
              <span aria-hidden="true">←</span>
              Back to selected work
            </Link>

            <div className="mt-14 grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
              <div>
                <p className="section-kicker">Project case study</p>
                <h1 className="mt-6 max-w-[13ch] text-5xl font-semibold leading-[0.94] tracking-[-0.06em] sm:text-7xl">
                  {project.title}
                </h1>
                <p className="mt-7 max-w-[62ch] text-lg leading-8 text-muted sm:text-xl">
                  {project.summary}
                </p>
              </div>

              <dl className="grid gap-6 border-l border-border pl-6 sm:grid-cols-3 lg:grid-cols-1">
                <div>
                  <dt className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
                    Role
                  </dt>
                  <dd className="mt-2 text-sm font-medium">{caseStudy.role}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
                    Timeframe
                  </dt>
                  <dd className="mt-2 text-sm font-medium">{project.period}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
                    Context
                  </dt>
                  <dd className="mt-2 text-sm font-medium">{project.context}</dd>
                </div>
              </dl>
            </div>

            <ul
              aria-label="Technologies used"
              className="mt-12 flex flex-wrap gap-2"
            >
              {project.tags.map((tag) => (
                <li
                  className="rounded-full border border-border bg-background/55 px-3 py-1.5 font-mono text-xs text-muted"
                  key={tag}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </header>

        <DemoImagesSection project={project} />

        <section
          className="deferred-section py-20 sm:py-28"
          aria-labelledby="goals-title"
        >
          <div className="page-shell grid gap-12 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <p className="section-kicker">Goals &amp; problem</p>
              <h2
                className="mt-5 max-w-[10ch] text-4xl font-semibold leading-none tracking-[-0.05em] sm:text-5xl"
                id="goals-title"
              >
                {caseStudy.goalHeading}
              </h2>
            </div>
            <div className="grid gap-10 sm:grid-cols-2">
              <article>
                <h3 className="font-mono text-sm text-accent">Background</h3>
                <p className="mt-4 leading-7 text-muted">
                  {caseStudy.background}
                </p>
              </article>
              <article>
                <h3 className="font-mono text-sm text-accent">
                  Initial purpose
                </h3>
                <p className="mt-4 leading-7 text-muted">
                  {caseStudy.purpose}
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          className="deferred-section border-y border-border bg-surface py-20 sm:py-28"
          aria-labelledby="process-title"
        >
          <div className="page-shell">
            <p className="section-kicker">Process &amp; solution</p>
            <h2
              className="mt-5 max-w-[50vw] text-4xl font-semibold leading-none tracking-[-0.05em] sm:text-5xl"
              id="process-title"
            >
              {caseStudy.processHeading}
            </h2>

            <ol className="mt-14 grid gap-x-10 lg:grid-cols-2">
              {caseStudy.process.map((step, index) => (
                <li
                  className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-border py-8"
                  key={step.title}
                >
                  <span className="font-mono text-sm text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.025em]">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-[62ch] leading-7 text-muted">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="deferred-section py-20 sm:py-28"
          aria-labelledby="results-title"
        >
          <div className="page-shell">
            <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
              <div>
                <p className="section-kicker">Results</p>
                <h2
                  className="mt-5 max-w-[10ch] text-4xl font-semibold leading-none tracking-[-0.05em] sm:text-5xl"
                  id="results-title"
                >
                  {caseStudy.resultsHeading}
                </h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {caseStudy.results.map((result) => (
                  <article
                    className="rounded-2xl border border-border bg-surface p-6"
                    key={result.title}
                  >
                    <h3 className="text-lg font-semibold tracking-[-0.025em]">
                      {result.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted">
                      {result.body}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-border pt-8 sm:flex-row sm:items-center">
              <p className="max-w-[48ch] text-lg leading-7">
                Interested in the implementation details?{" "}
                {caseStudy.repositorySummary}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  className="inline-flex shrink-0 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-[#041412] transition-transform active:scale-[0.98]"
                  href={project.github}
                  rel="noreferrer"
                  target="_blank"
                >
                  View GitHub repository
                </a>
                {project.liveDemo ? (
                  <a
                    className="inline-flex shrink-0 rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
                    href={project.liveDemo}
                    rel="noreferrer"
                    target="_blank"
                  >
                    View live demo
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
