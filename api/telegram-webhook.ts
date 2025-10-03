export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN as string;
  const WEB_APP_URL = process.env.WEB_APP_URL as string;

  if (!BOT_TOKEN || !WEB_APP_URL) {
    return res
      .status(500)
      .json({ error: "Missing TELEGRAM_BOT_TOKEN or WEB_APP_URL" });
  }

  try {
    const update = req.body || {};
    const msg = update.message || update.edited_message;
    const text: string | undefined = msg?.text;
    const chatId = msg?.chat?.id;

    if (!chatId || !text || !text.startsWith("/start")) {
      return res.status(200).json({ ok: true, ignored: true });
    }

    const arg = text.split(" ")[1];

    const messageText =
      "Добро пожаловать в PayHub 🎉\n\n Здесь Деньги Работают на Вас" +
      (arg ? `\n\nStart parameter: \`${arg}\`` : "");

    const tgRes = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
          parse_mode: "Markdown",
          disable_web_page_preview: true,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Open Web App",
                  web_app: { url: WEB_APP_URL },
                },
              ],
            ],
          },
        }),
      }
    );

    const data = await tgRes.json();
    if (!data.ok) {
      return res
        .status(500)
        .json({ error: data.description || "Telegram error" });
    }

    return res.status(200).json({ ok: true });
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
}
