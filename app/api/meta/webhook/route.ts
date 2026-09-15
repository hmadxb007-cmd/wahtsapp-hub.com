import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const VERIFY_TOKEN = "whatsapp_hub_verify_token";

const campaignsFilePath = path.join(process.cwd(), "data", "campaigns.json");
const safetyFilePath = path.join(process.cwd(), "data", "safety-contacts.json");
const botSettingsFilePath = path.join(process.cwd(), "data", "bot-settings.json");
const settingsFilePath = path.join(process.cwd(), "data", "settings.json");
const logFilePath = path.join(process.cwd(), "data", "meta-webhook-logs.json");
const sentLogsFilePath = path.join(process.cwd(), "data", "meta-sent-logs.json");

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
    .replace(/^\+/, "")
    .replace(/^00/, "")
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

  const dncWords = [
    "stop",
    "unsubscribe",
    "remove",
    "block",
    "dont message",
    "don't message",
    "dnc",
  ];

  const noWords = [
    "no",
    "not interested",
    "no thanks",
    "later",
    "not now",
    "not required",
  ];

  const yesWords = [
    "yes",
    "interested",
    "send",
    "details",
    "ok",
    "okay",
    "sure",
    "please share",
    "more info",
  ];

  if (dncWords.some((word) => text.includes(word))) return "Do Not Contact";
  if (noWords.some((word) => text === word || text.includes(word))) {
    return "Not Interested";
  }
  if (yesWords.some((word) => text === word || text.includes(word))) {
    return "Interested";
  }

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
      botReplyStatus: "Ready To Send",
      botReplyAt: new Date().toISOString(),
    };
  }

  if (status === "Not Interested") {
    return {
      botReply:
        botSettings.notInterestedReply || defaultBotSettings.notInterestedReply,
      botReplyStatus: "Ready To Send",
      botReplyAt: new Date().toISOString(),
    };
  }

  if (status === "Do Not Contact") {
    return {
      botReply: botSettings.dncReply || defaultBotSettings.dncReply,
      botReplyStatus: "Ready To Send",
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

function saveWebhookLog(body: any, extracted: any) {
  const logs = readJson(logFilePath, []);

  logs.unshift({
    id: Date.now().toString(),
    source: "Meta WhatsApp Webhook",
    body,
    extracted,
    createdAt: new Date().toISOString(),
  });

  writeJson(logFilePath, logs.slice(0, 100));
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

function extractMetaMessage(body: any) {
  const value = body?.entry?.[0]?.changes?.[0]?.value;
  const message = value?.messages?.[0];

  const phone = cleanPhone(message?.from || "");
  const text =
    message?.text?.body ||
    message?.button?.text ||
    message?.interactive?.button_reply?.title ||
    message?.interactive?.list_reply?.title ||
    "";

  return {
    phone,
    text,
    messageId: message?.id || "",
    timestamp: message?.timestamp || "",
    messageType: message?.type || "",
  };
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
    (contact: any) => cleanPhone(contact.phone) === cleanedPhone
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

function updateCampaignByReply(phone: string, text: string) {
  const campaigns = readJson(campaignsFilePath, []);
  const status = detectStatus(text);
  const botReplyData = getFixedBotReply(status);

  let matchedCampaign: any = null;
  let matchedRecipient: any = null;

  const updatedCampaigns = campaigns.map((campaign: any) => {
    const recipientsList = normalizeRecipientsList(campaign.recipientsList || []);

    const hasPhone = recipientsList.some(
      (recipient) => cleanPhone(recipient.phone) === phone
    );

    if (!hasPhone || matchedRecipient) {
      return campaign;
    }

    matchedCampaign = campaign;

    const updatedList = recipientsList.map((recipient) => {
      if (cleanPhone(recipient.phone) !== phone) return recipient;

      matchedRecipient = {
        ...recipient,
        status,
        reply: text,
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

  if (matchedCampaign && matchedRecipient) {
    writeJson(campaignsFilePath, updatedCampaigns);

    syncSafetyContact({
      phone,
      status,
      reply: text,
      campaignId: matchedCampaign.id,
      campaignName: matchedCampaign.name,
    });
  }

  return {
    matched: Boolean(matchedCampaign && matchedRecipient),
    status,
    botReply: botReplyData.botReply,
    botReplyStatus: botReplyData.botReplyStatus,
    campaignId: matchedCampaign?.id || "",
    campaignName: matchedCampaign?.name || "",
  };
}

async function sendMetaTextMessage(to: string, message: string) {
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

    return {
      ok: false,
      error: "Meta Phone Number ID or Access Token is missing in Settings.",
    };
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
          to: cleanPhone(to),
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
      return {
        ok: false,
        error: "Meta API send failed.",
        metaResponse: metaData,
      };
    }

    return {
      ok: true,
      sent: true,
      metaResponse: metaData,
    };
  } catch (error: any) {
    saveSentLog({
      to,
      message,
      status: "Failed",
      error: error?.message || "Unknown error",
    });

    return {
      ok: false,
      error: "Could not connect to Meta API.",
    };
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN && challenge) {
    return new Response(challenge, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  return NextResponse.json(
    {
      ok: false,
      error: "Meta webhook verification failed.",
    },
    { status: 403 }
  );
}

export async function POST(request: Request) {
  const body = await request.json();

  const extracted = extractMetaMessage(body);

  let updateResult = {
    matched: false,
    status: "No Reply",
    botReply: "",
    botReplyStatus: "Not Needed",
    campaignId: "",
    campaignName: "",
  };

  let sendResult: any = {
    ok: false,
    skipped: true,
    reason: "No bot reply needed.",
  };

  if (extracted.phone && extracted.text) {
    updateResult = updateCampaignByReply(extracted.phone, extracted.text);

    if (updateResult.botReply) {
      sendResult = await sendMetaTextMessage(
        extracted.phone,
        updateResult.botReply
      );
    }
  }

  saveWebhookLog(body, {
    ...extracted,
    ...updateResult,
    sendResult,
  });

  return NextResponse.json({
    ok: true,
    received: true,
    extracted,
    updateResult,
    sendResult,
  });
}
