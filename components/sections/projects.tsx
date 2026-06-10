import Link from "next/link";

import { projects, type Project } from "@/data/projects";

function ProjectDetails({ project }: { project: Project }) {
  return (
    <details className="project-details mt-8 border-t border-border pt-5">
      <summary className="flex items-center justify-between gap-5 text-sm font-semibold text-accent">
        Engineering details
        <span
          aria-hidden="true"
          className="details-mark font-mono text-xl font-normal"
        >
          +
        </span>
      </summary>
      <div className="mt-6 space-y-6">
        {project.highlights.map((highlight) => (
          <div key={highlight.title}>
            <h4 className="font-mono text-sm text-foreground">
              {highlight.title}
            </h4>
            <p className="mt-2 max-w-[65ch] text-sm leading-6 text-muted">
              {highlight.body}
            </p>
          </div>
        ))}
      </div>
    </details>
  );
}

function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Technologies">
      {tags.map((tag) => (
        <li
          className="rounded-full border border-border bg-background/55 px-3 py-1.5 font-mono text-[0.7rem] text-muted"
          key={tag}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function ProjectActions({ project }: { project: Project }) {
  return (
    <div className="mt-7 flex flex-wrap gap-3">
      {project.caseStudy ? (
        <Link
          className="inline-flex rounded-full bg-accent px-5 py-3 text-sm font-semibold text-[#041412] transition-transform active:scale-[0.98]"
          href={`/projects/${project.id}`}
        >
          Read full case study
        </Link>
      ) : null}
      <a
        className="inline-flex rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
        href={project.github}
        rel="noreferrer"
        target="_blank"
      >
        GitHub
      </a>
      {project.liveDemo ? (
        <a
          className="inline-flex rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
          href={project.liveDemo}
          rel="noreferrer"
          target="_blank"
        >
          Live demo
        </a>
      ) : (
        <span
          aria-disabled="true"
          className="inline-flex cursor-not-allowed rounded-full border border-border px-5 py-3 text-sm font-semibold text-muted/55"
          title="Live demo URL is not configured"
        >
          Live demo
        </span>
      )}
    </div>
  );
}

export function Projects() {
  const [featured, ...supporting] = projects;

  return (
    <section className="section-rule py-24 sm:py-32">
      <div className="page-shell">
        <p className="section-kicker">Selected work</p>
        <h2 className="section-title mt-6 text-balance">
          Systems built around difficult constraints.
        </h2>

        <article className="mt-14 grid overflow-hidden rounded-2xl border border-border bg-surface lg:grid-cols-[0.78fr_1.22fr]">
          <div className="flex min-h-72 flex-col justify-between bg-accent p-7 text-[#041412] sm:p-10">
            <div>
              <p className="font-mono text-xs font-semibold tracking-[0.14em]">
                FEATURED PROJECT
              </p>
              <h3 className="mt-5 max-w-[12ch] text-4xl font-semibold leading-none tracking-[-0.05em] sm:text-5xl">
                {featured.title}
              </h3>
            </div>
            <div className="mt-12 flex items-end justify-between gap-5 text-sm">
              <p>{featured.context}</p>
              <p className="font-mono">{featured.period}</p>
            </div>
          </div>
          <div className="p-7 sm:p-10">
            <p className="text-xl leading-8 text-foreground">
              {featured.summary}
            </p>
            <p className="mt-5 leading-7 text-muted">{featured.outcome}</p>
            <div className="mt-7">
              <TagList tags={featured.tags} />
            </div>
            <ProjectDetails project={featured} />
            <ProjectActions project={featured} />
          </div>
        </article>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {supporting.map((project) => (
            <article
              className="rounded-2xl border border-border bg-surface p-7 sm:p-8"
              key={project.id}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-accent">
                    {project.context}
                  </p>
                  <h3 className="mt-3 max-w-[14ch] text-3xl font-semibold leading-none tracking-[-0.045em]">
                    {project.title}
                  </h3>
                </div>
                <p className="font-mono text-xs text-muted">{project.period}</p>
              </div>
              <p className="mt-7 leading-7 text-muted">{project.summary}</p>
              <p className="mt-4 leading-7 text-foreground/90">
                {project.outcome}
              </p>
              <div className="mt-7">
                <TagList tags={project.tags} />
              </div>
              <ProjectDetails project={project} />
              <ProjectActions project={project} />
            </article>
          ))}
        </div>

        <a
          className="mt-8 inline-flex rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
          href="https://github.com/duyphan2501"
          rel="noreferrer"
          target="_blank"
        >
          Explore GitHub repositories
        </a>
      </div>
    </section>
  );
}
