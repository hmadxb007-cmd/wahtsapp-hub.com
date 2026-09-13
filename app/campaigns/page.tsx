"use client";

import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import AuthGuard from "../AuthGuard";

type Campaign = {
  id: string;
  name: string;
  campaignMode?: string;
  template: string;
  iceBreakerTemplate?: string;
  mainTemplate?: string;
  date: string;
  time: string;
  recipients: number;
  status: string;
  safetyStatus?: string;
  sent: number;
  delivered: number;
  replies: number;
  interestedCount?: number;
  notInterestedCount?: number;
  noReplyCount?: number;
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
    campaignMode: "Ice-Breaker Campaign",
    template: "property_offer_template",
    iceBreakerTemplate: "soft_permission_intro",
    mainTemplate: "property_offer_template",
    date: "",
    time: "",
    recipients: "0",
    status: "Ice-Breaker Ready",
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
    setForm((prev) => {
      const updated = {
        ...prev,
        [field]: value,
      };

      if (field === "campaignMode") {
        updated.status =
          value === "Ice-Breaker Campaign" ? "Ice-Breaker Ready" : "Draft";
      }

      return updated;
    });
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

        if (phone && phone.length >= 8 && /^[+0-9]+$/.test(phone)) {
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

    if (Number(form.recipients || 0) <= 0) {
      alert("Please import numbers or enter recipients count.");
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
          campaignMode: form.campaignMode,
          template:
            form.campaignMode === "Ice-Breaker Campaign"
              ? form.iceBreakerTemplate
              : form.template,
          iceBreakerTemplate: form.iceBreakerTemplate,
          mainTemplate: form.mainTemplate,
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
          campaignMode: "Ice-Breaker Campaign",
          template: "property_offer_template",
          iceBreakerTemplate: "soft_permission_intro",
          mainTemplate: "property_offer_template",
          date: "",
          time: "",
          recipients: "0",
          status: "Ice-Breaker Ready",
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

  async function campaignAction(id: string, action: string) {
    try {
      const res = await fetch("/api/campaigns", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, action }),
      });

      const data = await res.json();

      if (data.ok) {
        await loadCampaigns();
      }
    } catch (error) {
      alert("Could not update campaign.");
    }
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
              <span>Safe WhatsApp marketing</span>
              <h1>Campaigns</h1>
            </div>

            <button onClick={saveCampaign}>
              {saving ? "Saving..." : "Save Campaign"}
            </button>
          </header>

          <div className="safetyBanner">
            <div>
              <strong>Ice-Breaker Mode</strong>
              <p>
                Start with a soft permission message, collect interested replies,
                then launch the main campaign only to warm contacts.
              </p>
            </div>
            <b>Safer Flow</b>
          </div>

          <div className="grid">
            <div className="card builder">
              <h2>Create Campaign</h2>

              <label>Campaign Mode</label>
              <select
                value={form.campaignMode}
                onChange={(e) => updateField("campaignMode", e.target.value)}
              >
                <option>Ice-Breaker Campaign</option>
                <option>Direct Campaign</option>
              </select>

              <label>Campaign Name</label>
              <input
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Example: Dubai Investor Ice-Breaker"
              />

              {form.campaignMode === "Ice-Breaker Campaign" ? (
                <>
                  <label>Ice-Breaker Template</label>
                  <select
                    value={form.iceBreakerTemplate}
                    onChange={(e) =>
                      updateField("iceBreakerTemplate", e.target.value)
                    }
                  >
                    <option>soft_permission_intro</option>
                    <option>business_intro_yes_reply</option>
                    <option>crm_solution_interest_check</option>
                    <option>real_estate_interest_check</option>
                  </select>

                  <label>Main Campaign Template</label>
                  <select
                    value={form.mainTemplate}
                    onChange={(e) => updateField("mainTemplate", e.target.value)}
                  >
                    <option>property_offer_template</option>
                    <option>crm_demo_invite</option>
                    <option>new_launch_invitation</option>
                    <option>appointment_reminder_template</option>
                  </select>
                </>
              ) : (
                <>
                  <label>Approved Template</label>
                  <select
                    value={form.template}
                    onChange={(e) => updateField("template", e.target.value)}
                  >
                    <option>property_offer_template</option>
                    <option>appointment_reminder_template</option>
                    <option>new_launch_invitation</option>
                    <option>crm_demo_invite</option>
                  </select>
                </>
              )}

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
              <input value={form.status} readOnly />

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
              <h2>Campaign Flow</h2>

              {form.campaignMode === "Ice-Breaker Campaign" ? (
                <div className="flow">
                  <div className="flowStep active">
                    <b>1</b>
                    <strong>Ice-Breaker</strong>
                    <p>Send soft permission message first.</p>
                  </div>

                  <div className="flowStep">
                    <b>2</b>
                    <strong>Wait Replies</strong>
                    <p>Separate interested and not interested contacts.</p>
                  </div>

                  <div className="flowStep">
                    <b>3</b>
                    <strong>Main Campaign</strong>
                    <p>Send offer only to interested contacts.</p>
                  </div>
                </div>
              ) : (
                <div className="flow">
                  <div className="flowStep active">
                    <b>1</b>
                    <strong>Direct Template</strong>
                    <p>Send one approved template to imported recipients.</p>
                  </div>
                </div>
              )}

              <div className="phone">
                <div className="phoneTop">
                  <strong>Your Business</strong>
                  <span>WhatsApp Business</span>
                </div>

                <div className="message">
                  Hi, can we send you details about our WhatsApp CRM and
                  automation solution? Reply YES for details.
                </div>

                <div className="message reply">YES</div>
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
                      <th>Mode</th>
                      <th>Recipients</th>
                      <th>Interested</th>
                      <th>No Reply</th>
                      <th>Status</th>
                      <th>Safety</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {campaigns.map((campaign) => (
                      <tr key={campaign.id}>
                        <td>
                          <strong>{campaign.name}</strong>
                          <small>{campaign.date || "-"} {campaign.time || ""}</small>
                        </td>
                        <td>{campaign.campaignMode || "Direct Campaign"}</td>
                        <td>{campaign.recipients}</td>
                        <td>{campaign.interestedCount || 0}</td>
                        <td>{campaign.noReplyCount ?? campaign.recipients}</td>
                        <td>
                          <em
                            className={
                              campaign.status === "Draft" ? "draft" : ""
                            }
                          >
                            {campaign.status}
                          </em>
                        </td>
                        <td>{campaign.safetyStatus || "-"}</td>
                        <td>
                          <div className="tableActions">
                            {(campaign.campaignMode || "Direct Campaign") ===
                              "Ice-Breaker Campaign" &&
                              campaign.status === "Ice-Breaker Ready" && (
                                <button
                                  onClick={() =>
                                    campaignAction(campaign.id, "start_icebreaker")
                                  }
                                >
                                  Start Ice-Breaker
                                </button>
                              )}

                            {campaign.status === "Waiting Replies" && (
                              <button
                                onClick={() =>
                                  campaignAction(
                                    campaign.id,
                                    "prepare_main_campaign"
                                  )
                                }
                              >
                                Prepare Main
                              </button>
                            )}

                            {campaign.status === "Main Campaign Ready" && (
                              <button
                                onClick={() =>
                                  campaignAction(campaign.id, "complete_campaign")
                                }
                              >
                                Complete
                              </button>
                            )}

                            <button
                              className="deleteBtn"
                              onClick={() => deleteCampaign(campaign.id)}
                            >
                              Delete
                            </button>
                          </div>
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
          * { box-sizing: border-box; }

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
            margin-bottom: 18px;
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
          .upload button,
          .tableActions button {
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

          .safetyBanner {
            background: #e8f7ef;
            border: 1px solid #bde9cf;
            border-radius: 22px;
            padding: 18px 22px;
            display: flex;
            justify-content: space-between;
            gap: 20px;
            align-items: center;
            margin-bottom: 18px;
          }

          .safetyBanner p {
            margin: 6px 0 0;
            color: #58746c;
            line-height: 1.5;
          }

          .safetyBanner b {
            background: #075e54;
            color: #fff;
            border-radius: 999px;
            padding: 10px 14px;
            white-space: nowrap;
          }

          .grid {
            display: grid;
            grid-template-columns: 1.1fr 0.9fr;
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
            overflow-x: auto;
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

          .flow {
            display: grid;
            gap: 12px;
            margin-bottom: 20px;
          }

          .flowStep {
            border: 1px solid #e4eee8;
            background: #f8fcfa;
            border-radius: 18px;
            padding: 16px;
          }

          .flowStep.active {
            background: #e8f7ef;
            border-color: #bde9cf;
          }

          .flowStep b {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: #25d366;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-right: 8px;
          }

          .flowStep p {
            margin: 8px 0 0;
            color: #58746c;
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
            min-width: 1000px;
          }

          th,
          td {
            padding: 16px;
            border-bottom: 1px solid #e4eee8;
            text-align: left;
            vertical-align: top;
          }

          th {
            color: #58746c;
            font-size: 12px;
            text-transform: uppercase;
          }

          td small {
            display: block;
            color: #58746c;
            margin-top: 5px;
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

          .tableActions {
            display: grid;
            gap: 8px;
            min-width: 150px;
          }

          .tableActions button {
            padding: 9px 12px;
            font-size: 12px;
          }

          .tableActions .deleteBtn,
          .deleteBtn {
            background: #ffe8e8;
            color: #b42318;
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
            }

            header,
            .safetyBanner {
              align-items: flex-start;
              flex-direction: column;
            }
          }
        `}</style>
      </main>
    </AuthGuard>
  );
}
