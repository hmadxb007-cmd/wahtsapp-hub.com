import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const filePath = path.join(process.cwd(), "data", "settings.json");

const defaultSettings = {
  companyName: "",
  supportEmail: "",
  businessPhone: "",
  wabaId: "",
  phoneNumberId: "",
  accessToken: "",
  webhookUrl: "https://whatsapp-hub.com/api/meta/webhook",
  verifyToken: "whatsapp_hub_verify_token",
  crmType: "Bitrix24",
  crmWebhookUrl: "",
  timezone: "Asia/Dubai",
  dailyLimit: "1000",
  messageDelay: "2 seconds",
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
