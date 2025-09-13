export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center px-6"
    >
      <div className="text-center max-w-3xl space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
          Projects Section
        </h2>
        <p className="text-muted-foreground text-lg">
          Hover vào các nav items để xem animation
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-surface/50 border border-border/40 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <h3 className="font-semibold text-lg mb-2">Project {i}</h3>
              <p className="text-sm text-muted-foreground">
                Mô tả ngắn gọn về project {i}.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
