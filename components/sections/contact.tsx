const contacts = [
  {
    label: "Email",
    value: "duyphan2501@gmail.com",
    href: "mailto:duyphan2501@gmail.com",
  },
  {
    label: "GitHub",
    value: "github.com/duyphan2501",
    href: "https://github.com/duyphan2501",
  },
  {
    label: "Phone",
    value: "+84 85 918 6979",
    href: "tel:+84859186979",
  },
];

export function Contact() {
  return (
    <section className="section-rule py-24 sm:py-32">
      <div className="page-shell">
        <div className="rounded-2xl bg-accent p-7 text-[#041412] sm:p-12 lg:p-16">
          <p className="font-mono text-xs font-semibold tracking-[0.14em]">
            OPEN TO OPPORTUNITIES
          </p>
          <h2 className="mt-6 max-w-[13ch] text-balance text-4xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl">
            Let&apos;s build systems that hold up under pressure.
          </h2>
          <p className="mt-7 max-w-[40rem] text-lg leading-8 text-[#0a3b36]">
            I am seeking a full-time Fullstack Engineer Intern role and would
            be glad to walk through any project line by line.
          </p>

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-[#0a3b36]/30 md:grid-cols-3">
            {contacts.map((contact) => (
              <a
                className="group bg-accent p-5 transition-colors hover:bg-[#5bd2c2] sm:p-6"
                href={contact.href}
                key={contact.label}
                rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
              >
                <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                  {contact.label}
                </span>
                <span className="mt-3 block break-words text-sm font-medium">
                  {contact.value}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
