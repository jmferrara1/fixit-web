import { promises as fs } from "fs";
import path from "path";

const DB_PATH = path.resolve(process.cwd(), "data", "db.json");

export type DB = {
  users: { id: string; email: string }[];
  chatMessages: { id: string; userId: string; role: string; content: string; planId?: string; createdAt: string }[];
  plans: { id: string; userId: string; title?: string; createdAt: string }[];
  steps: { id: string; planId: string; stepNumber: number; title: string; detail: string; imageHintUrl?: string; safetyNote?: string }[];
  parts: { id: string; planId: string; sku: string; name: string; quantity: number; partner: string; affiliateUrl: string }[];
};

export async function readDB(): Promise<DB> {
  try {
    const data = await fs.readFile(DB_PATH, "utf8");
    return JSON.parse(data);
  } catch {
    return { users: [], chatMessages: [], plans: [], steps: [], parts: [] };
  }
}

export async function writeDB(db: DB) {
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
}
