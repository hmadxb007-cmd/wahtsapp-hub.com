"use client";

import { useEffect, useState } from "react";
import AuthGuard from "../AuthGuard";

type Settings = {
  companyName: string;
  supportEmail: string;
  businessPhone: string;
  wabaId: string;
  phoneNumberId: string;
  accessToken: string;
  webhookUrl: string;
  verifyToken: string;
  crmType: string;
  crmWebhookUrl: string;
  timezone: string;
  dailyLimit: string;
  messageDelay: string;
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    companyName: "",
    supportEmail: "",
    businessPhone: "",
    wabaId: "",
    phoneNumberId: "",
    accessToken: "",
    webhookUrl: "https://whatsapp-hub.com/api/meta/webhook",
    verifyToken: "whatsapp_hub_verify_token",
    crmType: "Bitrix24",
    crmWebhookUrl: "",
    timezone: "Asia/Dubai",
    dailyLimit: "1000",
    messageDelay: "2 seconds",
  });

  const [saving, setSaving] = useState(false);

  async function loadSettings() {
    try {
      const res = await fetch("/api/settings", { cache: "no-store" });
      const data = await res.json();

      if (data.ok) {
        setSettings(data.settings);
      }
    } catch (error) {
      console.log("Failed to load settings", error);
    }
  }

  useEffect(() => {
    loadSettings();
  }, []);

  function updateField(field: keyof Settings, value: string) {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function saveSettings() {
    setSaving(true);

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      const data = await res.json();

      if (data.ok) {
        setSettings(data.settings);
        alert("Settings saved successfully.");
      }
    } catch (error) {
      alert("Could not save settings.");
    }

    setSaving(false);
  }

  return (
    <AuthGuard>
      <main className="app">
        <aside>
          <a className="brand" href="/">
            <div>W</div>
            <strong>WhatsApp Hub</strong>
          </a>

          <nav>
            <a href="/dashboard">Dashboard</a>
            <a href="/inbox">Inbox</a>
            <a href="/campaigns">Campaigns</a>
            <a href="/templates">Templates</a>
            <a href="/contacts">Contacts</a>
            <a href="/crm-sync">CRM Sync</a>
            <a className="active" href="/settings">Settings</a>
          </nav>

          <button
            className="logout"
            onClick={() => {
              document.cookie = "wh_hub_session=; path=/; max-age=0";
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </aside>

        <section className="content">
          <header>
            <div>
              <span>System configuration</span>
              <h1>Settings</h1>
            </div>

            <button onClick={saveSettings}>
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </header>

          <div className="grid">
            <div className="card">
              <h2>Business Profile</h2>

              <label>Company Name</label>
              <input
                value={settings.companyName}
                onChange={(e) => updateField("companyName", e.target.value)}
                placeholder="Your company name"
              />

              <label>Support Email</label>
              <input
                value={settings.supportEmail}
                onChange={(e) => updateField("supportEmail", e.target.value)}
                placeholder="support@company.com"
              />

              <label>Business Phone</label>
              <input
                value={settings.businessPhone}
                onChange={(e) => updateField("businessPhone", e.target.value)}
                placeholder="+971..."
              />
            </div>

            <div className="card">
              <h2>Meta WhatsApp Cloud API</h2>

              <label>WABA ID</label>
              <input
                value={settings.wabaId}
                onChange={(e) => updateField("wabaId", e.target.value)}
                placeholder="WhatsApp Business Account ID"
              />

              <label>Phone Number ID</label>
              <input
                value={settings.phoneNumberId}
                onChange={(e) => updateField("phoneNumberId", e.target.value)}
                placeholder="Meta Phone Number ID"
              />

              <label>Access Token</label>
              <input
                type="password"
                value={settings.accessToken}
                onChange={(e) => updateField("accessToken", e.target.value)}
                placeholder="Meta permanent access token"
              />
            </div>

            <div className="card">
              <h2>Webhook</h2>

              <label>Webhook URL</label>
              <input value={settings.webhookUrl} readOnly />

              <label>Verify Token</label>
              <input
                value={settings.verifyToken}
                onChange={(e) => updateField("verifyToken", e.target.value)}
              />

              <div className="hint">
                Use these values when setting up the Meta WhatsApp webhook.
              </div>
            </div>

            <div className="card">
              <h2>CRM Integration</h2>

              <label>CRM Type</label>
              <select
                value={settings.crmType}
                onChange={(e) => updateField("crmType", e.target.value)}
              >
                <option>Bitrix24</option>
                <option>HubSpot</option>
                <option>Zoho CRM</option>
                <option>Custom API</option>
              </select>

              <label>CRM Webhook URL</label>
              <input
                value={settings.crmWebhookUrl}
                onChange={(e) => updateField("crmWebhookUrl", e.target.value)}
                placeholder="Paste CRM webhook URL"
              />
            </div>

            <div className="card">
              <h2>Safety Rules</h2>

              <label>Timezone</label>
              <select
                value={settings.timezone}
                onChange={(e) => updateField("timezone", e.target.value)}
              >
                <option>Asia/Dubai</option>
                <option>Asia/Karachi</option>
                <option>Asia/Kolkata</option>
                <option>Europe/London</option>
              </select>

              <label>Daily Sending Limit</label>
              <input
                value={settings.dailyLimit}
                onChange={(e) => updateField("dailyLimit", e.target.value)}
                placeholder="1000"
              />

              <label>Message Delay</label>
              <select
                value={settings.messageDelay}
                onChange={(e) => updateField("messageDelay", e.target.value)}
              >
                <option>2 seconds</option>
                <option>5 seconds</option>
                <option>10 seconds</option>
                <option>30 seconds</option>
                <option>1 minute</option>
              </select>
            </div>

            <div className="card statusCard">
              <h2>Connection Status</h2>

              <div className={settings.phoneNumberId ? "status ok" : "status"}>
                <b>Meta Phone Number</b>
                <span>{settings.phoneNumberId ? "Configured" : "Missing"}</span>
              </div>

              <div className={settings.accessToken ? "status ok" : "status"}>
                <b>Access Token</b>
                <span>{settings.accessToken ? "Configured" : "Missing"}</span>
              </div>

              <div className={settings.crmWebhookUrl ? "status ok" : "status"}>
                <b>CRM Webhook</b>
                <span>{settings.crmWebhookUrl ? "Configured" : "Missing"}</span>
              </div>

              <button className="primary" onClick={saveSettings}>
                {saving ? "Saving..." : "Save All Settings"}
              </button>
            </div>
          </div>
        </section>

        <style jsx>{`
          * {
            box-sizing: border-box;
          }

          .app {
            min-height: 100vh;
            display: flex;
            background: #f6fbf8;
            color: #071b15;
            font-family: Inter, Arial, sans-serif;
          }

          aside {
            width: 270px;
            background: #061812;
            color: #fff;
            padding: 24px;
            min-height: 100vh;
          }

          .brand {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 35px;
            color: #fff;
            text-decoration: none;
          }

          .brand div {
            width: 42px;
            height: 42px;
            border-radius: 14px;
            background: #25d366;
            color: #061812;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 950;
          }

          nav {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          nav a {
            padding: 13px 14px;
            border-radius: 13px;
            color: #c8dcd4;
            font-weight: 800;
            text-decoration: none;
          }

          nav a.active,
          nav a:hover {
            background: #25d366;
            color: #061812;
          }

          .logout {
            width: 100%;
            margin-top: 25px;
            padding: 13px 14px;
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 13px;
            background: rgba(255,255,255,0.06);
            color: #fff;
            font-weight: 900;
            cursor: pointer;
          }

          .content {
            flex: 1;
            padding: 32px;
          }

          header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
          }

          header span {
            color: #075e54;
            font-weight: 900;
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 0.7px;
          }

          h1 {
            margin: 7px 0 0;
            font-size: 36px;
            letter-spacing: -1px;
          }

          header button,
          .primary {
            border: 0;
            border-radius: 14px;
            background: #25d366;
            color: #05251d;
            font-weight: 950;
            cursor: pointer;
          }

          header button {
            padding: 14px 18px;
          }

          .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 18px;
          }

          .card {
            background: #fff;
            border: 1px solid #e4eee8;
            border-radius: 26px;
            padding: 24px;
            box-shadow: 0 18px 50px rgba(8, 42, 31, 0.05);
          }

          h2 {
            margin: 0 0 20px;
            font-size: 24px;
          }

          label {
            display: block;
            margin: 14px 0 7px;
            color: #58746c;
            font-size: 12px;
            font-weight: 950;
            text-transform: uppercase;
          }

          input,
          select {
            width: 100%;
            height: 50px;
            border: 1px solid #dcebe5;
            border-radius: 14px;
            padding: 0 14px;
            font-weight: 800;
            outline: none;
            background: #fff;
          }

          input:focus,
          select:focus {
            border-color: #25d366;
          }

          .hint {
            margin-top: 16px;
            background: #f1faf5;
            border: 1px solid #dcebe5;
            border-radius: 16px;
            padding: 14px;
            color: #58746c;
            font-weight: 800;
            line-height: 1.5;
          }

          .statusCard {
            display: flex;
            flex-direction: column;
          }

          .status {
            display: flex;
            justify-content: space-between;
            gap: 16px;
            align-items: center;
            background: #fff4db;
            color: #9a6500;
            border-radius: 16px;
            padding: 15px;
            margin-bottom: 12px;
          }

          .status.ok {
            background: #e8f7ef;
            color: #075e54;
          }

          .status b,
          .status span {
            display: block;
          }

          .primary {
            width: 100%;
            height: 52px;
            margin-top: auto;
          }

          @media (max-width: 1000px) {
            .app {
              flex-direction: column;
            }

            aside {
              width: 100%;
              min-height: auto;
            }

            .grid {
              grid-template-columns: 1fr;
            }

            header {
              align-items: flex-start;
              flex-direction: column;
            }
          }
        `}</style>
      </main>
    </AuthGuard>
  );
}
