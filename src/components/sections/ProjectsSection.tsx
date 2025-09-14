"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

export default function ProjectsSection() {
  const projects = [
    {
      title: "Portfolio Website",
      description:
        "Một website cá nhân để showcase các dự án và kỹ năng lập trình.",
      link: "#",
    },
    {
      title: "Task Management App",
      description:
        "Ứng dụng quản lý công việc với realtime updates và notifications.",
      link: "#",
    },
  ];

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center px-6 bg-background"
    >
      <div className="text-center max-w-4xl space-y-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-accent-green to-accent-teal bg-clip-text text-transparent"
        >
          Projects
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-lg"
        >
          Dưới đây là một số dự án nổi bật, di chuột vào để xem hiệu ứng
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {projects.map((project, index) => (
            <motion.a
              key={index}
              href={project.link}
              className="group relative block p-6 rounded-xl border border-border/40 bg-surface shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-green/20 to-accent-teal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              <h3 className="relative text-2xl font-semibold mb-2 text-foreground group-hover:text-accent-green transition-colors duration-300">
                {project.title}
              </h3>
              <p className="relative text-sm text-muted-foreground">
                {project.description}
              </p>
              <span className="absolute bottom-4 right-4 text-accent-teal text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Xem chi tiết →
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
