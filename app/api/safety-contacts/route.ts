import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const filePath = path.join(process.cwd(), "data", "safety-contacts.json");

function ensureFile() {
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf8");
  }
}

function readContacts() {
  ensureFile();

  const raw = fs.readFileSync(filePath, "utf8");

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeContacts(contacts: any[]) {
  ensureFile();
  fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2), "utf8");
}

function cleanPhone(value: any) {
  return String(value || "")
    .replace(/\s/g, "")
    .replace(/-/g, "")
    .replace(/\(/g, "")
    .replace(/\)/g, "")
    .trim();
}

export async function GET() {
  const contacts = readContacts();

  return NextResponse.json({
    ok: true,
    contacts,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const contacts = readContacts();

  const phone = cleanPhone(body.phone);

  if (!phone) {
    return NextResponse.json(
      {
        ok: false,
        error: "Phone number is required.",
      },
      { status: 400 }
    );
  }

  const existingIndex = contacts.findIndex((item: any) => item.phone === phone);

  const contact = {
    phone,
    globalStatus: body.globalStatus || body.status || "No Reply",
    lastStatus: body.lastStatus || body.status || "No Reply",
    lastReply: body.lastReply || body.reply || "",
    sourceCampaignId: body.sourceCampaignId || "",
    sourceCampaignName: body.sourceCampaignName || "",
    campaignHistory: body.campaignHistory || [],
    createdAt: body.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    const existing = contacts[existingIndex];

    contacts[existingIndex] = {
      ...existing,
      ...contact,
      createdAt: existing.createdAt || contact.createdAt,
      campaignHistory: [
        ...(existing.campaignHistory || []),
        ...(body.campaignHistory || []),
      ],
      updatedAt: new Date().toISOString(),
    };
  } else {
    contacts.unshift(contact);
  }

  writeContacts(contacts);

  return NextResponse.json({
    ok: true,
    contact: existingIndex >= 0 ? contacts[existingIndex] : contact,
  });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const contacts = readContacts();

  const phone = cleanPhone(body.phone);

  const updatedContacts = contacts.map((contact: any) => {
    if (contact.phone !== phone) return contact;

    return {
      ...contact,
      globalStatus: body.globalStatus || contact.globalStatus,
      lastStatus: body.lastStatus || body.status || contact.lastStatus,
      lastReply: body.lastReply || body.reply || contact.lastReply || "",
      sourceCampaignId: body.sourceCampaignId || contact.sourceCampaignId,
      sourceCampaignName: body.sourceCampaignName || contact.sourceCampaignName,
      updatedAt: new Date().toISOString(),
    };
  });

  writeContacts(updatedContacts);

  return NextResponse.json({
    ok: true,
    contacts: updatedContacts,
  });
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const contacts = readContacts();

  const phone = cleanPhone(body.phone);

  const filtered = contacts.filter((contact: any) => contact.phone !== phone);

  writeContacts(filtered);

  return NextResponse.json({
    ok: true,
  });
}
