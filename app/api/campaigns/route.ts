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

  const campaignMode = body.campaignMode || "Direct Campaign";

  const campaign = {
    id: Date.now().toString(),

    name: body.name || "",
    campaignMode,

    template: body.template || "",
    iceBreakerTemplate: body.iceBreakerTemplate || "",
    mainTemplate: body.mainTemplate || "",

    date: body.date || "",
    time: body.time || "",
    recipients: Number(body.recipients || 0),

    status:
      body.status ||
      (campaignMode === "Ice-Breaker Campaign"
        ? "Ice-Breaker Ready"
        : "Draft"),

    safetyStatus:
      campaignMode === "Ice-Breaker Campaign"
        ? "Permission-first flow enabled"
        : "Direct approved-template flow",

    sent: 0,
    delivered: 0,
    replies: 0,

    interestedCount: 0,
    notInterestedCount: 0,
    noReplyCount: Number(body.recipients || 0),

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

export async function PATCH(request: Request) {
  const body = await request.json();
  const campaigns = readCampaigns();

  const updatedCampaigns = campaigns.map((campaign: any) => {
    if (campaign.id !== body.id) return campaign;

    let updates: any = {};

    if (body.action === "start_icebreaker") {
      updates = {
        status: "Waiting Replies",
        sent: campaign.recipients || 0,
        delivered: Math.floor((campaign.recipients || 0) * 0.92),
        replies: Math.floor((campaign.recipients || 0) * 0.12),
        interestedCount: Math.floor((campaign.recipients || 0) * 0.08),
        notInterestedCount: Math.floor((campaign.recipients || 0) * 0.04),
        noReplyCount: Math.floor((campaign.recipients || 0) * 0.88),
        safetyStatus: "Ice-breaker sent. Waiting for interested replies.",
      };
    }

    if (body.action === "prepare_main_campaign") {
      updates = {
        status: "Main Campaign Ready",
        safetyStatus: "Main campaign limited to interested contacts only.",
      };
    }

    if (body.action === "complete_campaign") {
      updates = {
        status: "Completed",
        safetyStatus: "Campaign completed.",
      };
    }

    return {
      ...campaign,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
  });

  writeCampaigns(updatedCampaigns);

  return NextResponse.json({
    ok: true,
    campaigns: updatedCampaigns,
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
