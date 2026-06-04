import { NextResponse } from "next/server";
import { ContactSchema, escapeTelegramHtml } from "@/lib/contact";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      );
    }

    const { name, email, message } = parsed.data;

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error(
        "Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID environment variables",
      );
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    const safeName = escapeTelegramHtml(name);
    const safeEmail = escapeTelegramHtml(email);
    const safeMessage = escapeTelegramHtml(message);

    const text = `
<b>📩 New contact request</b>
<b>👤 Name:</b> ${safeName}
<b>📧 Email:</b> ${safeEmail}
<b>💬 Message:</b> ${safeMessage}
    `;

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
        }),
      },
    );

    const result = await response.json();

    if (!result.ok) {
      console.error("Telegram API error:", result);
      return NextResponse.json(
        { error: "Failed to deliver message" },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
