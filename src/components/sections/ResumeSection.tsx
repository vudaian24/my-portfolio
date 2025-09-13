export default function ResumeSection() {
  return (
    <section
      id="resume"
      className="min-h-screen flex items-center justify-center px-6"
    >
      <div className="text-center max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
          Resume Section
        </h2>
        <p className="text-muted-foreground text-lg">
          Navbar sử dụng Tailwind CSS 4 thuần túy
        </p>
        <a
          href="/resume.pdf"
          target="_blank"
          className="inline-block mt-6 px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium hover:opacity-90 transition-all"
        >
          Download Resume
        </a>
      </div>
    </section>
  );
}
