import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const sentLogsFilePath = path.join(process.cwd(), "data", "meta-sent-logs.json");

function ensureFile() {
  const dir = path.dirname(sentLogsFilePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(sentLogsFilePath)) {
    fs.writeFileSync(sentLogsFilePath, "[]", "utf8");
  }
}

function readLogs() {
  ensureFile();

  try {
    const raw = fs.readFileSync(sentLogsFilePath, "utf8");
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
