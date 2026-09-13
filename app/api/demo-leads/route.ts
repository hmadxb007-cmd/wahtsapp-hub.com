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

function addDays(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
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
    service: body.service || "Manual Contact",
    message: body.message || "",
    source: body.source || "Manual Contact",
    status: body.status || "New Lead",

    accountType: body.accountType || "Lead",
    packageName: body.packageName || "None",
    accountStatus: body.accountStatus || "Lead",
    demoStartDate: body.demoStartDate || "",
    demoEndDate: body.demoEndDate || "",

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

export async function PATCH(request: Request) {
  const body = await request.json();
  const leads = readLeads();

  const updatedLeads = leads.map((lead: any) => {
    if (lead.id !== body.id) return lead;

    let updates: any = {};

    if (body.action === "activate_demo") {
      updates = {
        accountType: "Demo",
        packageName: body.packageName || "Basic",
        accountStatus: "Demo Active",
        status: "Demo Active",
        demoStartDate: new Date().toISOString().slice(0, 10),
        demoEndDate: addDays(Number(body.demoDays || 7)),
      };
    }

    if (body.action === "mark_paid") {
      updates = {
        accountType: "Paid",
        packageName: body.packageName || "Pro",
        accountStatus: "Paid Client",
        status: "Paid Client",
        demoEndDate: "",
      };
    }

    if (body.action === "expire_account") {
      updates = {
        accountStatus: "Expired",
        status: "Demo Expired",
      };
    }

    if (body.action === "mark_lost") {
      updates = {
        accountType: "Lead",
        accountStatus: "Lost",
        status: "Lost",
      };
    }

    return {
      ...lead,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
  });

  writeLeads(updatedLeads);

  return NextResponse.json({
    ok: true,
    leads: updatedLeads,
  });
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const leads = readLeads();

  const filtered = leads.filter((lead: any) => lead.id !== body.id);
  writeLeads(filtered);

  return NextResponse.json({
    ok: true,
  });
}
