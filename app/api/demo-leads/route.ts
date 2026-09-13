import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const filePath = path.join(process.cwd(), "data", "demo-leads.json");

function ensureFile() {
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf8");
  }
}

function readLeads() {
  ensureFile();

  const raw = fs.readFileSync(filePath, "utf8");

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeLeads(leads: any[]) {
  ensureFile();
  fs.writeFileSync(filePath, JSON.stringify(leads, null, 2), "utf8");
}

export async function GET() {
  const leads = readLeads();

  return NextResponse.json({
    ok: true,
    leads,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const lead = {
    id: Date.now().toString(),
    name: body.name || "",
    company: body.company || "",
    email: body.email || "",
    phone: body.phone || "",
    service: body.service || "",
    message: body.message || "",
    source: "Website Demo Form",
    status: "New Lead",
    createdAt: new Date().toISOString(),
  };

  const leads = readLeads();
  leads.unshift(lead);
  writeLeads(leads);

  return NextResponse.json({
    ok: true,
    lead,
  });
}
