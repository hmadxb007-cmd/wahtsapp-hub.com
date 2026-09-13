import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const filePath = path.join(process.cwd(), "data", "campaigns.json");

function ensureFile() {
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf8");
  }
}

function readCampaigns() {
  ensureFile();

  const raw = fs.readFileSync(filePath, "utf8");

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeCampaigns(campaigns: any[]) {
  ensureFile();
  fs.writeFileSync(filePath, JSON.stringify(campaigns, null, 2), "utf8");
}

export async function GET() {
  const campaigns = readCampaigns();

  return NextResponse.json({
    ok: true,
    campaigns,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const campaign = {
    id: Date.now().toString(),
    name: body.name || "",
    template: body.template || "",
    date: body.date || "",
    time: body.time || "",
    recipients: body.recipients || 0,
    status: body.status || "Draft",
    sent: 0,
    delivered: 0,
    replies: 0,
    createdAt: new Date().toISOString(),
  };

  const campaigns = readCampaigns();
  campaigns.unshift(campaign);
  writeCampaigns(campaigns);

  return NextResponse.json({
    ok: true,
    campaign,
  });
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const campaigns = readCampaigns();

  const filtered = campaigns.filter((campaign: any) => campaign.id !== body.id);
  writeCampaigns(filtered);

  return NextResponse.json({
    ok: true,
  });
}
