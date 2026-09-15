import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const logFilePath = path.join(process.cwd(), "data", "meta-webhook-logs.json");

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

export async function GET() {
  const logs = readLogs();

  return NextResponse.json({
    ok: true,
    logs,
  });
}
