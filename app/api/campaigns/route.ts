import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const campaignsFilePath = path.join(process.cwd(), "data", "campaigns.json");
const safetyFilePath = path.join(process.cwd(), "data", "safety-contacts.json");

function ensureFile(filePath: string, defaultValue: string = "[]") {
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, defaultValue, "utf8");
  }
}

function readJson(filePath: string) {
  ensureFile(filePath);

  const raw = fs.readFileSync(filePath, "utf8");

  try {
    return JSON.parse(raw);
  } catch {
    return [];
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
    .trim();
}

function normalizeRecipientsList(list: any[]) {
  if (!Array.isArray(list)) return [];

  return list
    .map((item) => {
      if (typeof item === "string") {
        return {
          phone: cleanPhone(item),
          status: "No Reply",
          reply: "",
          updatedAt: "",
        };
      }

      return {
        phone: cleanPhone(item.phone),
        status: item.status || "No Reply",
        reply: item.reply || "",
        updatedAt: item.updatedAt || "",
      };
    })
    .filter((item) => item.phone);
}

function countStatus(list: any[], status: string) {
  return list.filter((item) => item.status === status).length;
}

function getGlobalStatus(status: string) {
  if (status === "Interested") return "Interested";
  if (status === "Not Interested") return "Not Interested";
  if (status === "Do Not Contact") return "Do Not Contact";
  return "No Reply";
}

function syncSafetyContact({
  phone,
  status,
  reply,
  campaignId,
  campaignName,
}: {
  phone: string;
  status: string;
  reply: string;
  campaignId: string;
  campaignName: string;
}) {
  const contacts = readJson(safetyFilePath);
  const cleanedPhone = cleanPhone(phone);

  if (!cleanedPhone) return;

  const existingIndex = contacts.findIndex(
    (contact: any) => contact.phone === cleanedPhone
  );

  const historyItem = {
    campaignId,
    campaignName,
    status,
    reply,
    updatedAt: new Date().toISOString(),
  };

  const newContact = {
    phone: cleanedPhone,
    globalStatus: getGlobalStatus(status),
    lastStatus: status,
    lastReply: reply || "",
    sourceCampaignId: campaignId,
    sourceCampaignName: campaignName,
    campaignHistory: [historyItem],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    const existing = contacts[existingIndex];

    contacts[existingIndex] = {
      ...existing,
      globalStatus: getGlobalStatus(status),
      lastStatus: status,
      lastReply: reply || existing.lastReply || "",
      sourceCampaignId: campaignId,
      sourceCampaignName: campaignName,
      campaignHistory: [...(existing.campaignHistory || []), historyItem],
      updatedAt: new Date().toISOString(),
    };
  } else {
    contacts.unshift(newContact);
  }

  writeJson(safetyFilePath, contacts);
}

export async function GET() {
  const campaigns = readJson(campaignsFilePath);

  return NextResponse.json({
    ok: true,
    campaigns,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const campaignMode = body.campaignMode || "Direct Campaign";
  const recipientsList = normalizeRecipientsList(body.recipientsList || []);

  const recipientsCount =
    recipientsList.length > 0
      ? recipientsList.length
      : Number(body.recipients || 0);

  const campaign = {
    id: Date.now().toString(),

    name: body.name || "",
    campaignMode,

    template: body.template || "",
    iceBreakerTemplate: body.iceBreakerTemplate || "",
    mainTemplate: body.mainTemplate || "",

    date: body.date || "",
    time: body.time || "",
    recipients: recipientsCount,
    recipientsList,

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

    interestedCount: countStatus(recipientsList, "Interested"),
    notInterestedCount: countStatus(recipientsList, "Not Interested"),
    doNotContactCount: countStatus(recipientsList, "Do Not Contact"),
    noReplyCount:
      recipientsList.length > 0
        ? countStatus(recipientsList, "No Reply")
        : recipientsCount,

    createdAt: new Date().toISOString(),
  };

  const campaigns = readJson(campaignsFilePath);
  campaigns.unshift(campaign);
  writeJson(campaignsFilePath, campaigns);

  return NextResponse.json({
    ok: true,
    campaign,
  });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const campaigns = readJson(campaignsFilePath);

  const updatedCampaigns = campaigns.map((campaign: any) => {
    if (campaign.id !== body.id) return campaign;

    const currentList = normalizeRecipientsList(campaign.recipientsList || []);

    if (body.action === "update_recipient_status") {
      const updatedList = currentList.map((recipient) => {
        if (recipient.phone !== cleanPhone(body.phone)) return recipient;

        const updatedRecipient = {
          ...recipient,
          status: body.status || recipient.status,
          reply: body.reply || recipient.reply || "",
          updatedAt: new Date().toISOString(),
        };

        syncSafetyContact({
          phone: updatedRecipient.phone,
          status: updatedRecipient.status,
          reply: updatedRecipient.reply,
          campaignId: campaign.id,
          campaignName: campaign.name,
        });

        return updatedRecipient;
      });

      return {
        ...campaign,
        recipientsList: updatedList,
        recipients: updatedList.length || campaign.recipients || 0,
        interestedCount: countStatus(updatedList, "Interested"),
        notInterestedCount: countStatus(updatedList, "Not Interested"),
        doNotContactCount: countStatus(updatedList, "Do Not Contact"),
        noReplyCount: countStatus(updatedList, "No Reply"),
        replies:
          countStatus(updatedList, "Interested") +
          countStatus(updatedList, "Not Interested") +
          countStatus(updatedList, "Do Not Contact"),
        updatedAt: new Date().toISOString(),
      };
    }

    let updates: any = {};

    if (body.action === "start_icebreaker") {
      updates = {
        status: "Waiting Replies",
        sent: campaign.recipients || currentList.length || 0,
        delivered: Math.floor(
          (campaign.recipients || currentList.length || 0) * 0.92
        ),
        safetyStatus: "Ice-breaker sent. Waiting for interested replies.",
      };
    }

    if (body.action === "prepare_main_campaign") {
      const interestedCount = countStatus(currentList, "Interested");

      updates = {
        status: "Main Campaign Ready",
        safetyStatus:
          interestedCount > 0
            ? `Main campaign limited to ${interestedCount} interested contacts only.`
            : "No interested contacts found yet.",
      };
    }

    if (body.action === "complete_campaign") {
      updates = {
        status: "Completed",
        safetyStatus: "Campaign completed.",
      };
    }

    const merged = {
      ...campaign,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    const finalList = normalizeRecipientsList(merged.recipientsList || []);

    return {
      ...merged,
      interestedCount: countStatus(finalList, "Interested"),
      notInterestedCount: countStatus(finalList, "Not Interested"),
      doNotContactCount: countStatus(finalList, "Do Not Contact"),
      noReplyCount:
        finalList.length > 0
          ? countStatus(finalList, "No Reply")
          : merged.noReplyCount ?? merged.recipients,
    };
  });

  writeJson(campaignsFilePath, updatedCampaigns);

  return NextResponse.json({
    ok: true,
    campaigns: updatedCampaigns,
  });
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const campaigns = readJson(campaignsFilePath);

  const filtered = campaigns.filter((campaign: any) => campaign.id !== body.id);
  writeJson(campaignsFilePath, filtered);

  return NextResponse.json({
    ok: true,
  });
}
