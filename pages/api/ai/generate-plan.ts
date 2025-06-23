import type { NextApiRequest, NextApiResponse } from "next";
import { readDB, writeDB } from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { planId, skillLevel, zip } = JSON.parse(req.body || "{}");
  const db = await readDB();
  const transcript = db.chatMessages
    .filter(m => m.planId === planId)
    .map(m => `${m.role}: ${m.content}`)
    .join("\n");
  const prompt = `Transcript:\n${transcript}\n\nGenerate JSON: { steps:[{stepNumber,title,detail,imageHintUrl?,safetyNote?}], parts:[{sku,name,quantity,partner,affiliateUrl}] }`;
  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({ model: "gpt-4", messages: [{ role: "user", content: prompt }] }),
  });
  const { choices } = await openaiRes.json();
  const data = JSON.parse(choices?.[0]?.message?.content || '{}');
  data.steps?.forEach((s: any) => db.steps.push({ id: Date.now()+""+Math.random(), planId, ...s }));
  data.parts?.forEach((p: any) => db.parts.push({ id: Date.now()+""+Math.random(), planId, ...p }));
  await writeDB(db);
  res.status(200).json(data);
}
