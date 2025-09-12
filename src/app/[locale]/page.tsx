import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  // const t = useTranslations('HomePage');

  const paragraph =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. ";

  // Tùy chỉnh số đoạn ở đây để tăng/giảm lượng dữ liệu
  const paragraphs = Array.from(
    { length: 24 },
    (_, i) => `${paragraph} (đoạn ${i + 1})`,
  );

  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero */}
        <article className="prose prose-lg dark:prose-invert mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-extrabold leading-tight">
              Làm thế nào để thiết kế hệ thống front-end có khả năng mở rộng
            </h1>

            <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
              <img
                src="https://picsum.photos/seed/author/48/48"
                alt="author"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-medium">Nguyễn An (Fake Author)</div>
                <div className="text-xs">
                  Đăng vào ngày 12 tháng 9, 2025 · 10 phút đọc
                </div>
              </div>
            </div>

            <figure className="mt-6">
              <img
                src="https://picsum.photos/seed/hero/1200/480"
                alt="hero"
                className="w-full rounded-md object-cover"
              />
              <figcaption className="text-xs text-gray-500 mt-2">
                Hình minh họa: Kiến trúc front-end (ảnh placeholder).
              </figcaption>
            </figure>
          </header>

          {/* Metadata / tags */}
          <div className="flex gap-2 mb-6">
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
              #frontend
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
              #architecture
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
              #scalability
            </span>
          </div>

          {/* Intro */}
          <p className="lead">
            Trong bài viết này tôi sẽ trình bày các nguyên tắc cơ bản để thiết
            kế một hệ thống front-end có khả năng mở rộng, dễ bảo trì và phù hợp
            với team. Nội dung dưới đây là giả lập (lorem ipsum) nhưng cấu trúc
            bài viết mô phỏng bài blog kỹ thuật thực tế.
          </p>

          {/* Multiple paragraphs */}
          {paragraphs.map((p, idx) => (
            <p key={idx} className="text-justify leading-relaxed">
              {p}
            </p>
          ))}

          {/* Sub-sections */}
          <h2>1. Kiến trúc module</h2>
          <p className="leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            sit amet pretium urna. Vivamus venenatis velit nec neque ultricies,
            eget elementum magna tristique.
          </p>

          <h3>Checklist</h3>
          <ul>
            <li>Breaking down UI into reusable components.</li>
            <li>Applying clear folder structure.</li>
            <li>Separating concerns: UI, hooks, services.</li>
          </ul>

          <h2>2. Quản lý trạng thái</h2>
          <p className="leading-relaxed">
            Phương án quản lý trạng thái có thể khác nhau: local state, context,
            redux, recoil, ... Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </p>

          <blockquote>
            <p>
              “Design for change — build small, test fast, iterate often.” — ví
              dụ trích dẫn giả.
            </p>
          </blockquote>

          <h2>3. Ví dụ code</h2>

          <h2>Kết luận</h2>
          <p className="leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
            scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices
            nec congue eget, auctor vitae massa.
          </p>

          <footer className="mt-8">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">Cập nhật: 12/09/2025</div>
              <div>
                <button className="px-4 py-2 rounded-md border text-sm">
                  Chia sẻ
                </button>
              </div>
            </div>
          </footer>
        </article>
      </main>

      {/* Giữ footer và navbar hiện tại */}
      <Footer />
    </>
  );
}
