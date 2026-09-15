import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const campaignsFilePath = path.join(process.cwd(), "data", "campaigns.json");
const safetyFilePath = path.join(process.cwd(), "data", "safety-contacts.json");
const botSettingsFilePath = path.join(process.cwd(), "data", "bot-settings.json");

const defaultBotSettings = {
  fixedRepliesEnabled: true,
  aiRepliesEnabled: false,
  assistantEnabled: true,
  interestedReply:
    "Thank you for your interest. Our team will send you the details shortly.",
  notInterestedReply:
    "Thank you for your reply. No problem, we will not send this offer again.",
  dncReply:
    "You have been removed from our WhatsApp marketing list. You will not receive future promotional messages.",
  noReplyNote: "No reply received yet.",
  aiBusinessInstructions:
    "You are a polite WhatsApp business assistant. Reply professionally, keep messages short, do not pressure customers, respect opt-out requests, and only continue marketing if the customer shows interest.",
  updatedAt: "",
};

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

function readBotSettings() {
  ensureFile(botSettingsFilePath, JSON.stringify(defaultBotSettings, null, 2));

  try {
    const raw = fs.readFileSync(botSettingsFilePath, "utf8");
    return {
      ...defaultBotSettings,
      ...JSON.parse(raw),
    };
  } catch {
    return defaultBotSettings;
  }
}

function cleanPhone(value: any) {
  return String(value || "")
    .replace(/\s/g, "")
    .replace(/-/g, "")
    .replace(/\(/g, "")
    .replace(/\)/g, "")
    .trim();
}

function normalizeText(value: any) {
  return String(value || "").trim().toLowerCase();
}

function normalizeRecipientsList(list: any[]) {
  if (!Array.isArray(list)) return [];

  return list
    .map((item) => ({
      phone: cleanPhone(item.phone || item),
      status: item.status || "No Reply",
      reply: item.reply || "",
      botReply: item.botReply || "",
      botReplyStatus: item.botReplyStatus || "Not Needed",
      botReplyAt: item.botReplyAt || "",
      updatedAt: item.updatedAt || "",
    }))
    .filter((item) => item.phone);
}

function detectStatus(message: string) {
  const text = normalizeText(message);

  const dncWords = ["stop", "unsubscribe", "remove", "block", "dont message", "don't message", "dnc"];
  const noWords = ["no", "not interested", "no thanks", "later", "not now"];
  const yesWords = ["yes", "interested", "send", "details", "ok", "okay", "sure"];

  if (dncWords.some((word) => text.includes(word))) return "Do Not Contact";
  if (noWords.some((word) => text === word || text.includes(word))) return "Not Interested";
  if (yesWords.some((word) => text === word || text.includes(word))) return "Interested";

  return "No Reply";
}

function getFixedBotReply(status: string) {
  const botSettings = readBotSettings();

  if (!botSettings.fixedRepliesEnabled) {
    return {
      botReply: "",
      botReplyStatus: "Disabled",
      botReplyAt: "",
    };
  }

  if (status === "Interested") {
    return {
      botReply: botSettings.interestedReply || defaultBotSettings.interestedReply,
      botReplyStatus: "Simulated",
      botReplyAt: new Date().toISOString(),
    };
  }

  if (status === "Not Interested") {
    return {
      botReply:
        botSettings.notInterestedReply || defaultBotSettings.notInterestedReply,
      botReplyStatus: "Simulated",
      botReplyAt: new Date().toISOString(),
    };
  }

  if (status === "Do Not Contact") {
    return {
      botReply: botSettings.dncReply || defaultBotSettings.dncReply,
      botReplyStatus: "Simulated",
      botReplyAt: new Date().toISOString(),
    };
  }

  return {
    botReply: "",
    botReplyStatus: "Not Needed",
    botReplyAt: "",
  };
}

function countStatus(list: any[], status: string) {
  return list.filter((item) => item.status === status).length;
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
  const contacts = readJson(safetyFilePath, []);
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

  const contactData = {
    phone: cleanedPhone,
    globalStatus: status,
    lastStatus: status,
    lastReply: reply || "",
    sourceCampaignId: campaignId,
    sourceCampaignName: campaignName,
    updatedAt: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    const existing = contacts[existingIndex];

    contacts[existingIndex] = {
      ...existing,
      ...contactData,
      createdAt: existing.createdAt || new Date().toISOString(),
      campaignHistory: [...(existing.campaignHistory || []), historyItem],
    };
  } else {
    contacts.unshift({
      ...contactData,
      campaignHistory: [historyItem],
      createdAt: new Date().toISOString(),
    });
  }

  writeJson(safetyFilePath, contacts);
}

export async function POST(request: Request) {
  const body = await request.json();

  const campaignId = String(body.campaignId || "");
  const phone = cleanPhone(body.phone);
  const message = String(body.message || "");

  if (!campaignId || !phone || !message) {
    return NextResponse.json(
      {
        ok: false,
        error: "campaignId, phone and message are required.",
      },
      { status: 400 }
    );
  }

  const campaigns = readJson(campaignsFilePath, []);
  let matchedCampaign: any = null;
  let matchedRecipient: any = null;

  const updatedCampaigns = campaigns.map((campaign: any) => {
    if (campaign.id !== campaignId) return campaign;

    matchedCampaign = campaign;

    const recipientsList = normalizeRecipientsList(campaign.recipientsList || []);
    const detectedStatus = detectStatus(message);
    const botReplyData = getFixedBotReply(detectedStatus);

    const updatedList = recipientsList.map((recipient) => {
      if (recipient.phone !== phone) return recipient;

      matchedRecipient = {
        ...recipient,
        status: detectedStatus,
        reply: message,
        botReply: botReplyData.botReply,
        botReplyStatus: botReplyData.botReplyStatus,
        botReplyAt: botReplyData.botReplyAt,
        updatedAt: new Date().toISOString(),
      };

      return matchedRecipient;
    });

    return {
      ...campaign,
      recipientsList: updatedList,
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
  });

  if (!matchedCampaign) {
    return NextResponse.json(
      {
        ok: false,
        error: "Campaign not found.",
      },
      { status: 404 }
    );
  }

  if (!matchedRecipient) {
    return NextResponse.json(
      {
        ok: false,
        error: "Phone number not found in this campaign.",
      },
      { status: 404 }
    );
  }

  writeJson(campaignsFilePath, updatedCampaigns);

  syncSafetyContact({
    phone,
    status: matchedRecipient.status,
    reply: message,
    campaignId,
    campaignName: matchedCampaign.name,
  });

  return NextResponse.json({
    ok: true,
    status: matchedRecipient.status,
    reply: message,
    botReply: matchedRecipient.botReply,
    botReplyStatus: matchedRecipient.botReplyStatus,
    campaignId,
    phone,
  });
}
