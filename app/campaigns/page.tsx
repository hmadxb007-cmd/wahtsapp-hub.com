"use client";

import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import AuthGuard from "../AuthGuard";

type Campaign = {
  id: string;
  name: string;
  template: string;
  date: string;
  time: string;
  recipients: number;
  status: string;
  sent: number;
  delivered: number;
  replies: number;
  createdAt: string;
};

export default function CampaignsPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [saving, setSaving] = useState(false);
  const [importedNumbers, setImportedNumbers] = useState<string[]>([]);
  const [importFileName, setImportFileName] = useState("");

  const [form, setForm] = useState({
    name: "",
    template: "property_offer_template",
    date: "",
    time: "",
    recipients: "0",
    status: "Draft",
  });

  async function loadCampaigns() {
    try {
      const res = await fetch("/api/campaigns", { cache: "no-store" });
      const data = await res.json();

      if (data.ok) {
        setCampaigns(data.campaigns || []);
      }
    } catch (error) {
      console.log("Failed to load campaigns", error);
    }
  }

  useEffect(() => {
    loadCampaigns();
  }, []);

  function updateField(field: string, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function cleanPhone(value: any) {
    return String(value || "")
      .replace(/\s/g, "")
      .replace(/-/g, "")
      .replace(/\(/g, "")
      .replace(/\)/g, "")
      .trim();
  }

  async function importExcel(file: File) {
    setImportFileName(file.name);

    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const firstSheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[firstSheetName];

    const rows: any[][] = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
      defval: "",
    });

    const numbers: string[] = [];

    rows.forEach((row) => {
      row.forEach((cell) => {
        const phone = cleanPhone(cell);

        if (
          phone &&
          phone.length >= 8 &&
          /^[+0-9]+$/.test(phone)
        ) {
          numbers.push(phone);
        }
      });
    });

    const uniqueNumbers = Array.from(new Set(numbers));

    setImportedNumbers(uniqueNumbers);
    updateField("recipients", String(uniqueNumbers.length));

    alert(`${uniqueNumbers.length} WhatsApp numbers imported successfully.`);
  }

  async function saveCampaign() {
    if (!form.name) {
      alert("Please enter campaign name.");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          template: form.template,
          date: form.date,
          time: form.time,
          recipients: Number(form.recipients || 0),
          status: form.status,
        }),
      });

      const data = await res.json();

      if (data.ok) {
        setForm({
          name: "",
          template: "property_offer_template",
          date: "",
          time: "",
          recipients: "0",
          status: "Draft",
        });

        setImportedNumbers([]);
        setImportFileName("");

        await loadCampaigns();
      }
    } catch (error) {
      alert("Could not save campaign.");
    }

    setSaving(false);
  }

  async function deleteCampaign(id: string) {
    const confirmDelete = confirm("Delete this campaign?");
    if (!confirmDelete) return;

    try {
      const res = await fetch("/api/campaigns", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (data.ok) {
        await loadCampaigns();
      }
    } catch (error) {
      alert("Could not delete campaign.");
    }
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
            <a className="active" href="/campaigns">Campaigns</a>
            <a href="/templates">Templates</a>
            <a href="/contacts">Contacts</a>
            <a href="/crm-sync">CRM Sync</a>
            <a href="/settings">Settings</a>
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
              <span>Marketing workspace</span>
              <h1>WhatsApp Campaigns</h1>
            </div>

            <button onClick={saveCampaign}>
              {saving ? "Saving..." : "Save Campaign"}
            </button>
          </header>

          <div className="grid">
            <div className="card builder">
              <h2>Create New Campaign</h2>

              <label>Campaign Name</label>
              <input
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Example: Dubai Property Launch Campaign"
              />

              <label>Choose Approved Template</label>
              <select
                value={form.template}
                onChange={(e) => updateField("template", e.target.value)}
              >
                <option>property_offer_template</option>
                <option>appointment_reminder_template</option>
                <option>new_launch_invitation</option>
                <option>crm_demo_invite</option>
              </select>

              <div className="row">
                <div>
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => updateField("date", e.target.value)}
                  />
                </div>

                <div>
                  <label>Start Time</label>
                  <input
                    type="time"
                    value={form.time}
                    onChange={(e) => updateField("time", e.target.value)}
                  />
                </div>
              </div>

              <label>Recipients Count</label>
              <input
                type="number"
                value={form.recipients}
                onChange={(e) => updateField("recipients", e.target.value)}
                placeholder="Example: 2350"
              />

              <label>Status</label>
              <select
                value={form.status}
                onChange={(e) => updateField("status", e.target.value)}
              >
                <option>Draft</option>
                <option>Scheduled</option>
              </select>

              <div className="upload">
                <strong>Import Excel Numbers</strong>
                <p>
                  Upload Excel file with WhatsApp numbers. System will count
                  unique numbers automatically.
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) importExcel(file);
                  }}
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Import File
                </button>

                {importFileName && (
                  <div className="importInfo">
                    <b>{importFileName}</b>
                    <span>{importedNumbers.length} numbers imported</span>
                  </div>
                )}
              </div>

              <button className="primary" type="button" onClick={saveCampaign}>
                {saving ? "Saving Campaign..." : "Save Campaign"}
              </button>
            </div>

            <div className="card preview">
              <h2>Message Preview</h2>

              <div className="phone">
                <div className="phoneTop">
                  <strong>Your Business</strong>
                  <span>WhatsApp Business</span>
                </div>

                <div className="message">
                  🏙️ Discover exclusive Dubai property offers. Reply YES for
                  details.
                </div>

                <div className="message reply">YES</div>
              </div>

              <div className="statusBox">
                <div>
                  <span>Total Campaigns</span>
                  <b>{campaigns.length}</b>
                </div>

                <div>
                  <span>Total Recipients</span>
                  <b>
                    {campaigns.reduce(
                      (total, campaign) =>
                        total + Number(campaign.recipients || 0),
                      0
                    )}
                  </b>
                </div>
              </div>

              {importedNumbers.length > 0 && (
                <div className="numberPreview">
                  <strong>Imported Numbers Preview</strong>
                  {importedNumbers.slice(0, 5).map((number) => (
                    <span key={number}>{number}</span>
                  ))}
                  {importedNumbers.length > 5 && (
                    <small>+{importedNumbers.length - 5} more numbers</small>
                  )}
                </div>
              )}
            </div>

            <div className="card wide">
              <h2>Saved Campaigns</h2>

              {campaigns.length === 0 ? (
                <div className="empty">No campaigns saved yet.</div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Template</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Recipients</th>
                      <th>Sent</th>
                      <th>Delivered</th>
                      <th>Replies</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {campaigns.map((campaign) => (
                      <tr key={campaign.id}>
                        <td>
                          <strong>{campaign.name}</strong>
                        </td>
                        <td>{campaign.template}</td>
                        <td>{campaign.date || "-"}</td>
                        <td>{campaign.time || "-"}</td>
                        <td>{campaign.recipients}</td>
                        <td>{campaign.sent}</td>
                        <td>{campaign.delivered}</td>
                        <td>{campaign.replies}</td>
                        <td>
                          <em
                            className={
                              campaign.status === "Draft" ? "draft" : ""
                            }
                          >
                            {campaign.status}
                          </em>
                        </td>
                        <td>
                          <button
                            className="deleteBtn"
                            onClick={() => deleteCampaign(campaign.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
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
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 13px;
            background: rgba(255, 255, 255, 0.06);
            color: #fff;
            font-weight: 900;
            cursor: pointer;
          }

          .logout:hover {
            background: #25d366;
            color: #061812;
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
          .primary,
          .upload button {
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
            grid-template-columns: 1.2fr 0.8fr;
            gap: 18px;
          }

          .card {
            background: #fff;
            border: 1px solid #e4eee8;
            border-radius: 26px;
            padding: 24px;
            box-shadow: 0 18px 50px rgba(8, 42, 31, 0.05);
          }

          .wide {
            grid-column: span 2;
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

          .row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
          }

          .upload {
            background: #f1faf5;
            border: 1px dashed #25d366;
            border-radius: 18px;
            padding: 18px;
            margin: 20px 0;
          }

          .upload p {
            color: #58746c;
            margin: 8px 0 14px;
          }

          .upload button {
            padding: 12px 16px;
          }

          .importInfo {
            margin-top: 14px;
            background: #fff;
            border: 1px solid #dcebe5;
            border-radius: 14px;
            padding: 13px;
          }

          .importInfo b,
          .importInfo span {
            display: block;
          }

          .importInfo span {
            color: #075e54;
            font-weight: 900;
            margin-top: 5px;
          }

          .primary {
            width: 100%;
            height: 52px;
            font-size: 15px;
          }

          .phone {
            background: #061812;
            border-radius: 32px;
            padding: 14px;
            max-width: 310px;
            margin: 0 auto;
          }

          .phoneTop {
            background: #fff;
            border-radius: 22px 22px 8px 8px;
            padding: 18px;
          }

          .phoneTop strong,
          .phoneTop span {
            display: block;
          }

          .phoneTop span {
            color: #075e54;
            margin-top: 4px;
            font-size: 13px;
          }

          .message {
            background: #fff;
            margin-top: 12px;
            border-radius: 16px;
            padding: 14px;
            line-height: 1.5;
          }

          .reply {
            background: #dcf8c6;
            margin-left: 80px;
            text-align: center;
            font-weight: 900;
          }

          .statusBox {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-top: 20px;
          }

          .statusBox div {
            background: #f6fbf8;
            border-radius: 16px;
            padding: 16px;
            text-align: center;
          }

          .statusBox span,
          .statusBox b {
            display: block;
          }

          .statusBox span {
            color: #58746c;
            font-size: 12px;
            margin-bottom: 6px;
          }

          .statusBox b {
            font-size: 24px;
          }

          .numberPreview {
            margin-top: 18px;
            background: #f8fcfa;
            border: 1px solid #e4eee8;
            border-radius: 18px;
            padding: 16px;
          }

          .numberPreview strong,
          .numberPreview span,
          .numberPreview small {
            display: block;
          }

          .numberPreview span {
            padding: 8px 0;
            border-bottom: 1px solid #e4eee8;
            color: #075e54;
            font-weight: 850;
          }

          .numberPreview small {
            color: #58746c;
            margin-top: 10px;
            font-weight: 800;
          }

          .empty {
            background: #f8fcfa;
            border: 1px dashed #dcebe5;
            border-radius: 18px;
            padding: 24px;
            color: #58746c;
            font-weight: 800;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          th,
          td {
            padding: 16px;
            border-bottom: 1px solid #e4eee8;
            text-align: left;
            vertical-align: middle;
          }

          th {
            color: #58746c;
            font-size: 12px;
            text-transform: uppercase;
          }

          em {
            background: #e8f7ef;
            color: #075e54;
            padding: 7px 10px;
            border-radius: 999px;
            font-style: normal;
            font-weight: 900;
            font-size: 12px;
            white-space: nowrap;
          }

          em.draft {
            background: #fff4db;
            color: #9a6500;
          }

          .deleteBtn {
            border: 0;
            border-radius: 12px;
            background: #ffe8e8;
            color: #b42318;
            padding: 9px 12px;
            font-weight: 900;
            cursor: pointer;
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

            .wide {
              grid-column: span 1;
              overflow-x: auto;
            }

            header {
              align-items: flex-start;
              flex-direction: column;
              gap: 14px;
            }
          }
        `}</style>
      </main>
    </AuthGuard>
  );
}
