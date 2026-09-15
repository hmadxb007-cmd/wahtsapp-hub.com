import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const logFilePath = path.join(process.cwd(), "data", "meta-webhook-logs.json");
const VERIFY_TOKEN = "whatsapp_hub_verify_token";

function ensureFile() {
  const dir = path.dirname(logFilePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(logFilePath)) {
    fs.writeFileSync(logFilePath, "[]", "utf8");
  }
}

function readLogs() {
  ensureFile();

  try {
    const raw = fs.readFileSync(logFilePath, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeLogs(logs: any[]) {
  ensureFile();
  fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2), "utf8");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN && challenge) {
    return new Response(challenge, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  return NextResponse.json(
    {
      ok: false,
      error: "Meta webhook verification failed.",
    },
    { status: 403 }
  );
}

export async function POST(request: Request) {
  const body = await request.json();

  const logs = readLogs();

  logs.unshift({
    id: Date.now().toString(),
    source: "Meta WhatsApp Webhook",
    body,
    createdAt: new Date().toISOString(),
  });

  writeLogs(logs.slice(0, 100));

  return NextResponse.json({
    ok: true,
    received: true,
  });
}
