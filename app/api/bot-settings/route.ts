import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const filePath = path.join(process.cwd(), "data", "bot-settings.json");

const defaultSettings = {
  fixedRepliesEnabled: true,
  aiRepliesEnabled: false,
  assistantEnabled: true,
  interestedReply:
    "Thank you for your interest. Our team will send you the details shortly.",
  notInterestedReply:
    "Thank you for your reply. No problem, we will not send this offer again.",
  dncReply:
    "You have been removed from our WhatsApp marketing list. You will not receive future promotional messages.",
  noReplyNote: "No reply received yet.",
  aiBusinessInstructions:
    "You are a polite WhatsApp business assistant. Reply professionally, keep messages short, do not pressure customers, respect opt-out requests, and only continue marketing if the customer shows interest.",
  updatedAt: "",
};

function ensureFile() {
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultSettings, null, 2), "utf8");
  }
}

function readSettings() {
  ensureFile();

  const raw = fs.readFileSync(filePath, "utf8");

  try {
    return {
      ...defaultSettings,
      ...JSON.parse(raw),
    };
  } catch {
    return defaultSettings;
  }
}

function writeSettings(settings: any) {
  ensureFile();
  fs.writeFileSync(filePath, JSON.stringify(settings, null, 2), "utf8");
}

export async function GET() {
  const settings = readSettings();

  return NextResponse.json({
    ok: true,
    settings,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const current = readSettings();

  const updated = {
    ...current,
    ...body,
    updatedAt: new Date().toISOString(),
  };

  writeSettings(updated);

  return NextResponse.json({
    ok: true,
    settings: updated,
  });
}
