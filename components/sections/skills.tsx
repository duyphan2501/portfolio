"use client";

import { motion } from "framer-motion";

const skillGroups = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Zustand"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "REST APIs", "JWT", "OAuth 2.0"],
  },
  {
    title: "Data",
    skills: ["MongoDB", "Mongoose", "MySQL", "Redis", "Lua scripts"],
  },
  {
    title: "Messaging and realtime",
    skills: ["RabbitMQ", "Socket.IO", "WebRTC", "WebSocket", "Redis Pub/Sub"],
  },
  {
    title: "Infrastructure",
    skills: ["Docker", "Docker Compose", "Nginx", "Git", "Postman"],
  },
  {
    title: "Core engineering",
    skills: ["System design", "Concurrency", "Data structures", "OOP", "Algorithms"],
  },
];

export function Skills() {
  return (
    <section className="section-rule py-24 sm:py-32">
      <div className="page-shell">
        <p className="section-kicker">Technical range</p>
        <h2 className="section-title mt-6 text-balance">
          Full-stack tools, backed by systems thinking.
        </h2>

        <motion.div
          className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          viewport={{ once: true, margin: "-60px" }}
          whileInView="show"
        >
          {skillGroups.map((group) => (
            <motion.article
              className="bg-background p-7 sm:p-8"
              key={group.title}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <h3 className="font-mono text-sm text-accent">{group.title}</h3>
              <ul className="mt-6 space-y-3">
                {group.skills.map((skill) => (
                  <li
                    className="flex items-center justify-between gap-3 border-b border-border/60 pb-3 text-sm text-muted last:border-0"
                    key={skill}
                  >
                    {skill}
                    <span aria-hidden="true" className="text-accent">
                      /
                    </span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-16 grid gap-8 border-t border-border pt-8 md:grid-cols-[0.75fr_1.25fr]">
          <h3 className="text-2xl font-semibold tracking-tight">Education</h3>
          <div>
            <p className="text-xl text-foreground">Ton Duc Thang University</p>
            <p className="mt-2 text-muted">
              Software Engineering, Aug 2023 - Present
            </p>
            <p className="mt-4 max-w-[48rem] leading-7 text-muted">
              GPA 8.66/10. TOEIC Listening and Reading 755, Speaking and Writing
              290.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
