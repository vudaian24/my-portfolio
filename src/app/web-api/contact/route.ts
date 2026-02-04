import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error(
        "❌ Lỗi: Không đọc được TELEGRAM_BOT_TOKEN hoặc TELEGRAM_CHAT_ID",
      );
      return NextResponse.json(
        { error: "Thiếu cấu hình ENV trên Server" },
        { status: 500 },
      );
    }

    const text = `
<b>📩 Yêu cầu liên hệ mới</b>
<b>👤 Tên:</b> ${name}
<b>📧 Email:</b> ${email}
<b>💬 Nội dung:</b> ${message}
    `;

    // 2. Gọi API Telegram
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: "HTML",
        }),
      },
    );

    const result = await response.json();

    if (!result.ok) {
      console.error("❌ Telegram báo lỗi:", result); // In lỗi từ Telegram ra Terminal
      return NextResponse.json({ error: result.description }, { status: 401 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    // 3. In lỗi hệ thống ra Terminal để debug
    console.error("❌ Lỗi Server:", error);
    return NextResponse.json({ error: "Lỗi server nội bộ" }, { status: 500 });
  }
}
