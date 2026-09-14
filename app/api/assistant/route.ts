import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const dataDir = path.join(process.cwd(), "data");

function readJson(fileName: string, fallback: any) {
  const filePath = path.join(dataDir, fileName);

  if (!fs.existsSync(filePath)) {
    return fallback;
  }

  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function safeText(value: any) {
  return String(value || "").toLowerCase();
}

function numberFormat(value: number) {
  return new Intl.NumberFormat("en-US").format(value || 0);
}

export async function POST(request: Request) {
  const body = await request.json();
  const question = safeText(body.question);

  const campaigns = readJson("campaigns.json", []);
  const leads = readJson("demo-leads.json", []);
  const safetyContacts = readJson("safety-contacts.json", []);
  const templates = readJson("templates.json", []);
  const settings = readJson("settings.json", {});
  const botSettings = readJson("bot-settings.json", {});

  const interestedContacts = safetyContacts.filter(
    (contact: any) => contact.globalStatus === "Interested"
  );

  const notInterestedContacts = safetyContacts.filter(
    (contact: any) => contact.globalStatus === "Not Interested"
  );

  const dncContacts = safetyContacts.filter(
    (contact: any) => contact.globalStatus === "Do Not Contact"
  );

  const noReplyContacts = safetyContacts.filter(
    (contact: any) => contact.globalStatus === "No Reply"
  );

  const totalRecipients = campaigns.reduce(
    (total: number, campaign: any) => total + Number(campaign.recipients || 0),
    0
  );

  const totalSent = campaigns.reduce(
    (total: number, campaign: any) => total + Number(campaign.sent || 0),
    0
  );

  const totalReplies = campaigns.reduce(
    (total: number, campaign: any) => total + Number(campaign.replies || 0),
    0
  );

  const approvedTemplates = templates.filter(
    (template: any) => template.status === "Approved"
  );

  const latestCampaign = campaigns[0];

  let answer = "";

  if (!question) {
    answer = "Please type a question about your WhatsApp Hub system.";
  } else if (
    question.includes("dnc") ||
    question.includes("do not contact") ||
    question.includes("blocked")
  ) {
    answer = `You currently have ${numberFormat(
      dncContacts.length
    )} Do Not Contact numbers. These contacts should be excluded from every future campaign.`;
  } else if (
    question.includes("interested") ||
    question.includes("warm lead") ||
    question.includes("yes reply")
  ) {
    answer = `You currently have ${numberFormat(
      interestedContacts.length
    )} interested contacts. These are your safest contacts for follow-up and main campaigns.`;
  } else if (
    question.includes("not interested") ||
    question.includes("no interest")
  ) {
    answer = `You currently have ${numberFormat(
      notInterestedContacts.length
    )} Not Interested contacts. Recommended action: exclude them from future marketing unless they contact you again.`;
  } else if (question.includes("no reply")) {
    answer = `You currently have ${numberFormat(
      noReplyContacts.length
    )} No Reply contacts in the global safety list. For cold marketing, avoid sending too many repeated messages to this group.`;
  } else if (
    question.includes("campaign performance") ||
    question.includes("performance") ||
    question.includes("stats")
  ) {
    answer = `Campaign summary: ${numberFormat(
      campaigns.length
    )} campaigns, ${numberFormat(totalRecipients)} total recipients, ${numberFormat(
      totalSent
    )} messages sent, and ${numberFormat(totalReplies)} replies recorded.`;
  } else if (
    question.includes("latest campaign") ||
    question.includes("last campaign")
  ) {
    if (!latestCampaign) {
      answer = "No campaign has been created yet.";
    } else {
      answer = `Latest campaign: "${latestCampaign.name}". Mode: ${
        latestCampaign.campaignMode || "Direct Campaign"
      }. Recipients: ${numberFormat(
        latestCampaign.recipients
      )}. Interested: ${numberFormat(
        latestCampaign.interestedCount || 0
      )}. DNC: ${numberFormat(
        latestCampaign.doNotContactCount || 0
      )}. Status: ${latestCampaign.status}.`;
    }
  } else if (
    question.includes("template") ||
    question.includes("approved template")
  ) {
    answer = `You have ${numberFormat(
      templates.length
    )} templates saved. ${numberFormat(
      approvedTemplates.length
    )} are approved. Campaigns should use approved templates only when connected to Meta.`;
  } else if (
    question.includes("safe campaign") ||
    question.includes("campaign plan") ||
    question.includes("not lose meta") ||
    question.includes("protect meta")
  ) {
    answer =
      "Recommended safe campaign plan: first remove DNC and Not Interested numbers, then send an ice-breaker template to the remaining contacts, wait for YES/interested replies, and launch the main campaign only to interested contacts. Keep daily limits low at the start and increase slowly only if reply quality is good.";
  } else if (
    question.includes("reply") ||
    question.includes("what should i reply")
  ) {
    answer = `Use a short polite reply. Current Interested auto reply is: "${botSettings.interestedReply || "Thank you for your interest. Our team will send you the details shortly."}"`;
  } else if (
    question.includes("lead") ||
    question.includes("demo") ||
    question.includes("client")
  ) {
    const activeDemos = leads.filter(
      (lead: any) => (lead.accountStatus || lead.status) === "Demo Active"
    ).length;

    const paidClients = leads.filter(
      (lead: any) => (lead.accountStatus || lead.status) === "Paid Client"
    ).length;

    answer = `Lead summary: ${numberFormat(leads.length)} total leads, ${numberFormat(
      activeDemos
    )} active demos, and ${numberFormat(paidClients)} paid clients.`;
  } else if (
    question.includes("settings") ||
    question.includes("meta") ||
    question.includes("crm")
  ) {
    answer = `System status: Meta Phone Number ID is ${
      settings.phoneNumberId ? "configured" : "missing"
    }, Access Token is ${
      settings.accessToken ? "configured" : "missing"
    }, and CRM webhook is ${
      settings.crmWebhookUrl ? "configured" : "missing"
    }.`;
  } else {
    answer =
      "I can help with campaigns, interested contacts, DNC numbers, templates, leads, safe campaign planning, reply suggestions, Meta settings and CRM status. Try asking: show me interested contacts, show DNC numbers, explain campaign performance, or create safe campaign plan.";
  }

  return NextResponse.json({
    ok: true,
    answer,
    summary: {
      campaigns: campaigns.length,
      leads: leads.length,
      templates: templates.length,
      safetyContacts: safetyContacts.length,
      interestedContacts: interestedContacts.length,
      dncContacts: dncContacts.length,
      notInterestedContacts: notInterestedContacts.length,
      noReplyContacts: noReplyContacts.length,
    },
  });
}
