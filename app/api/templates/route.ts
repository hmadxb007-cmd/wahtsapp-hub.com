import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const filePath = path.join(process.cwd(), "data", "templates.json");

function ensureFile() {
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf8");
  }
}

function readTemplates() {
  ensureFile();

  const raw = fs.readFileSync(filePath, "utf8");

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeTemplates(templates: any[]) {
  ensureFile();
  fs.writeFileSync(filePath, JSON.stringify(templates, null, 2), "utf8");
}

export async function GET() {
  const templates = readTemplates();

  return NextResponse.json({
    ok: true,
    templates,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const template = {
    id: Date.now().toString(),
    name: body.name || "",
    category: body.category || "Marketing",
    language: body.language || "English",
    body: body.body || "",
    status: body.status || "Pending",
    createdAt: new Date().toISOString(),
  };

  const templates = readTemplates();
  templates.unshift(template);
  writeTemplates(templates);

  return NextResponse.json({
    ok: true,
    template,
  });
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const templates = readTemplates();

  const filtered = templates.filter((template: any) => template.id !== body.id);
  writeTemplates(filtered);

  return NextResponse.json({
    ok: true,
  });
}
