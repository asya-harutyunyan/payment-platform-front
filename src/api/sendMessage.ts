// api/sendMessage.ts
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  const BOT_TOKEN = process.env.VITE_BOT_TOKEN;
  console.log("BOT_TOKEN", BOT_TOKEN);
  const { chatId, text } = req.body || {};
  if (!chatId || !text) {
    return res.status(400).json({ error: "chatId and text required" });
  }

  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      }
    );
    const data = await tgRes.json();
    if (!data.ok) {
      return res
        .status(500)
        .json({ error: data.description || "Telegram error" });
    }
    res.json(data.result);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}
