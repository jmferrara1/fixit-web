import type { NextApiRequest, NextApiResponse } from "next";
import { readDB, writeDB } from "../../../lib/db";

export const config = { api: { bodyParser: { sizeLimit: "5mb" } } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { description } = JSON.parse(req.body || "{}");

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `User reports: ${description}. Diagnose the issue and suggest follow-up questions.`,
        },
      ],
    }),
  });
  const openaiJson = await openaiRes.json();
  const reply = openaiJson.choices?.[0]?.message?.content || "";

  const db = await readDB();
  db.chatMessages.push({
    id: Date.now().toString(),
    userId: "anon",
    role: "assistant",
    content: reply,
    createdAt: new Date().toISOString(),
  });
  await writeDB(db);

  res.status(200).json({ reply });
}
