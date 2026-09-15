import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const settingsFilePath = path.join(process.cwd(), "data", "settings.json");
const sentLogsFilePath = path.join(process.cwd(), "data", "meta-sent-logs.json");

function ensureFile(filePath: string, defaultValue: string = "[]") {
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, defaultValue, "utf8");
  }
}

function readJson(filePath: string, fallback: any = []) {
  ensureFile(filePath);

  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJson(filePath: string, data: any) {
  ensureFile(filePath);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

function cleanPhone(value: any) {
  return String(value || "")
    .replace(/\s/g, "")
    .replace(/-/g, "")
    .replace(/\(/g, "")
    .replace(/\)/g, "")
    .replace(/^\+/, "")
    .replace(/^00/, "")
    .trim();
}

function saveSentLog(log: any) {
  const logs = readJson(sentLogsFilePath, []);
  logs.unshift({
    id: Date.now().toString(),
    ...log,
    createdAt: new Date().toISOString(),
  });

  writeJson(sentLogsFilePath, logs.slice(0, 100));
}

export async function POST(request: Request) {
  const body = await request.json();

  const to = cleanPhone(body.to);
  const message = String(body.message || "").trim();

  if (!to || !message) {
    return NextResponse.json(
      {
        ok: false,
        error: "Phone number and message are required.",
      },
      { status: 400 }
    );
  }

  const settings = readJson(settingsFilePath, {});

  const phoneNumberId = settings.phoneNumberId || "";
  const accessToken = settings.accessToken || "";

  if (!phoneNumberId || !accessToken) {
    saveSentLog({
      to,
      message,
      status: "Not Sent",
      error: "Meta Phone Number ID or Access Token is missing in Settings.",
    });

    return NextResponse.json(
      {
        ok: false,
        error: "Meta Phone Number ID or Access Token is missing in Settings.",
      },
      { status: 400 }
    );
  }

  try {
    const metaRes = await fetch(
      `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to,
          type: "text",
          text: {
            preview_url: false,
            body: message,
          },
        }),
      }
    );

    const metaData = await metaRes.json();

    saveSentLog({
      to,
      message,
      status: metaRes.ok ? "Sent" : "Failed",
      metaResponse: metaData,
    });

    if (!metaRes.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: "Meta API send failed.",
          metaResponse: metaData,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      ok: true,
      sent: true,
      metaResponse: metaData,
    });
  } catch (error: any) {
    saveSentLog({
      to,
      message,
      status: "Failed",
      error: error?.message || "Unknown error",
    });

    return NextResponse.json(
      {
        ok: false,
        error: "Could not connect to Meta API.",
      },
      { status: 500 }
    );
  }
}
