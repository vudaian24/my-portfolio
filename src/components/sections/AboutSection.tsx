export default function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center bg-muted/10 px-6"
    >
      <div className="text-center max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
          About Section
        </h2>
        <p className="text-muted-foreground text-lg">
          Scroll để xem navbar animation khi scroll
        </p>
      </div>
    </section>
  );
}
