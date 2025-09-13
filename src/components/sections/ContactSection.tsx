export default function ContactSection() {
  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center bg-muted/10 px-6"
    >
      <div className="text-center max-w-xl space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
          Contact Section
        </h2>
        <p className="text-muted-foreground text-lg">
          Mobile menu có slide animation đẹp mắt
        </p>
        <form className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-lg border border-border/50 bg-surface/50 focus:ring-2 focus:ring-accent-green outline-none"
          />
          <input
            type="email"
            placeholder="Your email"
            className="w-full px-4 py-3 rounded-lg border border-border/50 bg-surface/50 focus:ring-2 focus:ring-accent-green outline-none"
          />
          <textarea
            placeholder="Your message"
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-border/50 bg-surface/50 focus:ring-2 focus:ring-accent-green outline-none"
          />
          <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-accent-green to-accent-teal text-white font-medium hover:opacity-90 transition-all">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
