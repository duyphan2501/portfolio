const contacts = [
  {
    label: "Email",
    icon: (
      <>
        <rect height="16" rx="2" width="20" x="2" y="4" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </>
    ),
    href: "mailto:duyphan2501@gmail.com",
    external: false,
  },
  {
    label: "Phone",
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
    href: "tel:+84859186979",
    external: false,
  },
  {
    label: "GitHub",
    icon: (
      <path
        d="M12 .7a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3 1.23A11.5 11.5 0 0 1 12 6.52c1.02 0 2.04.14 2.99.4 2.28-1.55 3.29-1.23 3.29-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.28c0 .32.22.7.82.58A12 12 0 0 0 12 .7z"
        fill="currentColor"
        stroke="none"
      />
    ),
    href: "https://github.com/duyphan2501",
    external: true,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="page-shell flex flex-col gap-5 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-center text-muted sm:text-left">
          Phan Nhut Duy, Software Engineer.
        </p>

        <nav aria-label="Contact links">
          <ul className="flex items-center justify-center gap-2">
            {contacts.map((contact) => (
              <li key={contact.label}>
                <a
                  aria-label={contact.label}
                  className="flex size-10 items-center justify-center rounded-full border border-border font-mono text-xs font-semibold text-muted transition-colors hover:border-accent/60 hover:bg-surface hover:text-accent"
                  href={contact.href}
                  rel={contact.external ? "noreferrer" : undefined}
                  target={contact.external ? "_blank" : undefined}
                  title={contact.label}
                >
                  <svg
                    aria-hidden="true"
                    className="size-[18px]"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    {contact.icon}
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
