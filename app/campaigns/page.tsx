"use client";

import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import AuthGuard from "../AuthGuard";

type Recipient = {
  phone: string;
  status: string;
  reply: string;
  botReply?: string;
  botReplyStatus?: string;
  botReplyAt?: string;
  updatedAt: string;
};

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
  recipientsList?: Recipient[];
  status: string;
  safetyStatus?: string;
  sent: number;
  delivered: number;
  replies: number;
  interestedCount?: number;
  notInterestedCount?: number;
  doNotContactCount?: number;
  noReplyCount?: number;
  createdAt: string;
};

type Template = {
  id: string;
  name: string;
  category: string;
  language: string;
  body: string;
  status: string;
  createdAt: string;
};

type SafetyContact = {
  phone: string;
  globalStatus: string;
  lastStatus: string;
  lastReply: string;
  sourceCampaignId?: string;
  sourceCampaignName?: string;
  updatedAt?: string;
};

type ImportReport = {
  totalFound: number;
  duplicateInFile: number;
  duplicateOldCampaign: number;
  dncBlocked: number;
  notInterestedBlocked: number;
  alreadyInterested: number;
  readyToImport: number;
};

export default function CampaignsPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [safetyContacts, setSafetyContacts] = useState<SafetyContact[]>([]);
  const [saving, setSaving] = useState(false);
  const [importedNumbers, setImportedNumbers] = useState<string[]>([]);
  const [blockedNumbers, setBlockedNumbers] = useState<
    { phone: string; reason: string }[]
  >([]);
  const [importFileName, setImportFileName] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );

  const [importReport, setImportReport] = useState<ImportReport>({
    totalFound: 0,
    duplicateInFile: 0,
    duplicateOldCampaign: 0,
    dncBlocked: 0,
    notInterestedBlocked: 0,
    alreadyInterested: 0,
    readyToImport: 0,
  });

  const [form, setForm] = useState({
    name: "",
    campaignMode: "Ice-Breaker Campaign",
    template: "",
    iceBreakerTemplate: "",
    mainTemplate: "",
    date: "",
    time: "",
    recipients: "0",
    status: "Ice-Breaker Ready",
  });

  async function loadData() {
    try {
      const campaignsRes = await fetch("/api/campaigns", { cache: "no-store" });
      const campaignsData = await campaignsRes.json();

      if (campaignsData.ok) {
        setCampaigns(campaignsData.campaigns || []);

        if (selectedCampaign) {
          const refreshed = (campaignsData.campaigns || []).find(
            (campaign: Campaign) => campaign.id === selectedCampaign.id
          );
          if (refreshed) setSelectedCampaign(refreshed);
        }
      }

      const templatesRes = await fetch("/api/templates", { cache: "no-store" });
      const templatesData = await templatesRes.json();

      if (templatesData.ok) {
        const savedTemplates = templatesData.templates || [];
        setTemplates(savedTemplates);

        if (savedTemplates.length > 0) {
          const firstApproved =
            savedTemplates.find((t: Template) => t.status === "Approved") ||
            savedTemplates[0];

          setForm((prev) => ({
            ...prev,
            template: prev.template || firstApproved.name,
            iceBreakerTemplate: prev.iceBreakerTemplate || firstApproved.name,
            mainTemplate: prev.mainTemplate || firstApproved.name,
          }));
        }
      }

      const safetyRes = await fetch("/api/safety-contacts", {
        cache: "no-store",
      });
      const safetyData = await safetyRes.json();

      if (safetyData.ok) {
        setSafetyContacts(safetyData.contacts || []);
      }
    } catch (error) {
      console.log("Failed to load campaigns/templates/safety contacts", error);
    }
  }

  useEffect(() => {
    loadData();
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

  function getTemplateBody(templateName: string) {
    const found = templates.find((template) => template.name === templateName);
    return (
      found?.body || "Create and approve a template first from Templates page."
    );
  }

  function getOldCampaignPhones() {
    const phones: string[] = [];

    campaigns.forEach((campaign) => {
      (campaign.recipientsList || []).forEach((recipient) => {
        if (recipient.phone) phones.push(cleanPhone(recipient.phone));
      });
    });

    return new Set(phones);
  }

  function getSafetyContact(phone: string) {
    const cleaned = cleanPhone(phone);
    return safetyContacts.find((contact) => cleanPhone(contact.phone) === cleaned);
  }

  async function importExcel(file: File) {
    await loadData();

    setImportFileName(file.name);

    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const firstSheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[firstSheetName];

    const rows: any[][] = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
      defval: "",
    });

    const allNumbers: string[] = [];

    rows.forEach((row) => {
      row.forEach((cell) => {
        const phone = cleanPhone(cell);

        if (phone && phone.length >= 8 && /^[+0-9]+$/.test(phone)) {
          allNumbers.push(phone);
        }
      });
    });

    const seenInFile = new Set<string>();
    const oldCampaignPhones = getOldCampaignPhones();

    const ready: string[] = [];
    const blocked: { phone: string; reason: string }[] = [];

    let duplicateInFile = 0;
    let duplicateOldCampaign = 0;
    let dncBlocked = 0;
    let notInterestedBlocked = 0;
    let alreadyInterested = 0;

    allNumbers.forEach((phone) => {
      const cleaned = cleanPhone(phone);
      const safety = getSafetyContact(cleaned);

      if (seenInFile.has(cleaned)) {
        duplicateInFile += 1;
        blocked.push({ phone: cleaned, reason: "Duplicate in same Excel file" });
        return;
      }

      seenInFile.add(cleaned);

      if (safety?.globalStatus === "Do Not Contact") {
        dncBlocked += 1;
        blocked.push({ phone: cleaned, reason: "Do Not Contact blocked" });
        return;
      }

      if (safety?.globalStatus === "Not Interested") {
        notInterestedBlocked += 1;
        blocked.push({ phone: cleaned, reason: "Not Interested blocked" });
        return;
      }

      if (safety?.globalStatus === "Interested") {
        alreadyInterested += 1;
        blocked.push({ phone: cleaned, reason: "Already Interested / warm lead" });
        return;
      }

      if (oldCampaignPhones.has(cleaned)) {
        duplicateOldCampaign += 1;
        blocked.push({ phone: cleaned, reason: "Already exists in old campaign" });
        return;
      }

      ready.push(cleaned);
    });

    setImportedNumbers(ready);
    setBlockedNumbers(blocked);
    updateField("recipients", String(ready.length));

    setImportReport({
      totalFound: allNumbers.length,
      duplicateInFile,
      duplicateOldCampaign,
      dncBlocked,
      notInterestedBlocked,
      alreadyInterested,
      readyToImport: ready.length,
    });

    alert(
      `Import checked successfully.\nReady to import: ${ready.length}\nBlocked/skipped: ${blocked.length}`
    );
  }

  async function saveCampaign() {
    if (!form.name) {
      alert("Please enter campaign name.");
      return;
    }

    if (Number(form.recipients || 0) <= 0) {
      alert("No safe numbers ready to import. Please upload a valid Excel list.");
      return;
    }

    if (templates.length === 0) {
      alert("Please create at least one template first.");
      return;
    }

    const recipientsList = importedNumbers.map((phone) => ({
      phone,
      status: "No Reply",
      reply: "",
      botReply: "",
      botReplyStatus: "Not Needed",
      botReplyAt: "",
      updatedAt: "",
    }));

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
          recipientsList,
          status: form.status,
        }),
      });

      const data = await res.json();

      if (data.ok) {
        setForm({
          name: "",
          campaignMode: "Ice-Breaker Campaign",
          template: templates[0]?.name || "",
          iceBreakerTemplate: templates[0]?.name || "",
          mainTemplate: templates[0]?.name || "",
          date: "",
          time: "",
          recipients: "0",
          status: "Ice-Breaker Ready",
        });

        setImportedNumbers([]);
        setBlockedNumbers([]);
        setImportFileName("");
        setImportReport({
          totalFound: 0,
          duplicateInFile: 0,
          duplicateOldCampaign: 0,
          dncBlocked: 0,
          notInterestedBlocked: 0,
          alreadyInterested: 0,
          readyToImport: 0,
        });

        await loadData();
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
        await loadData();
      }
    } catch (error) {
      alert("Could not update campaign.");
    }
  }

  async function updateRecipientStatus(
    campaignId: string,
    phone: string,
    status: string
  ) {
    let reply = "";

    if (status === "Interested") reply = "YES";
    if (status === "Not Interested") reply = "NO";
    if (status === "Do Not Contact") reply = "STOP";

    try {
      const res = await fetch("/api/campaigns", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: campaignId,
          action: "update_recipient_status",
          phone,
          status,
          reply,
        }),
      });

      const data = await res.json();

      if (data.ok) {
        await loadData();
      }
    } catch (error) {
      alert("Could not update recipient.");
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
        setSelectedCampaign(null);
        await loadData();
      }
    } catch (error) {
      alert("Could not delete campaign.");
    }
  }

  const approvedTemplates = templates.filter(
    (template) => template.status === "Approved"
  );
  const usableTemplates = approvedTemplates.length > 0 ? approvedTemplates : templates;

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
            <a href="/assistant">AI Assistant</a>
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
              <strong>Global Safety Import Filter</strong>
              <p>
                Excel import now blocks duplicate numbers, DNC contacts, Not
                Interested contacts and already warm contacts before saving a campaign.
              </p>
            </div>
            <a href="/assistant">Ask Assistant</a>
          </div>

          <div className="grid">
            <div className="card builder">
              <h2>Create Campaign</h2>

              {templates.length === 0 && (
                <div className="warning">
                  No templates found. Create templates first from the Templates page.
                </div>
              )}

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
                    {usableTemplates.map((template) => (
                      <option key={template.id} value={template.name}>
                        {template.name} ({template.status})
                      </option>
                    ))}
                  </select>

                  <label>Main Campaign Template</label>
                  <select
                    value={form.mainTemplate}
                    onChange={(e) => updateField("mainTemplate", e.target.value)}
                  >
                    {usableTemplates.map((template) => (
                      <option key={template.id} value={template.name}>
                        {template.name} ({template.status})
                      </option>
                    ))}
                  </select>
                </>
              ) : (
                <>
                  <label>Approved Template</label>
                  <select
                    value={form.template}
                    onChange={(e) => updateField("template", e.target.value)}
                  >
                    {usableTemplates.map((template) => (
                      <option key={template.id} value={template.name}>
                        {template.name} ({template.status})
                      </option>
                    ))}
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

              <label>Safe Recipients Count</label>
              <input
                type="number"
                value={form.recipients}
                onChange={(e) => updateField("recipients", e.target.value)}
                placeholder="Auto counted after Excel import"
              />

              <label>Status</label>
              <input value={form.status} readOnly />

              <div className="upload">
                <strong>Import Excel Numbers</strong>
                <p>
                  Upload Excel file. System will remove duplicates, DNC, Not
                  Interested and previously used numbers.
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
                  Import & Safety Check
                </button>

                {importFileName && (
                  <div className="importInfo">
                    <b>{importFileName}</b>
                    <span>{importedNumbers.length} safe numbers ready</span>
                  </div>
                )}
              </div>

              <button className="primary" type="button" onClick={saveCampaign}>
                {saving ? "Saving Campaign..." : "Save Safe Campaign"}
              </button>
            </div>

            <div className="card preview">
              <h2>Safety Import Report</h2>

              <div className="reportGrid">
                <div>
                  <span>Total Found</span>
                  <b>{importReport.totalFound}</b>
                </div>
                <div>
                  <span>Ready</span>
                  <b>{importReport.readyToImport}</b>
                </div>
                <div>
                  <span>File Duplicates</span>
                  <b>{importReport.duplicateInFile}</b>
                </div>
                <div>
                  <span>Old Campaign</span>
                  <b>{importReport.duplicateOldCampaign}</b>
                </div>
                <div>
                  <span>DNC Blocked</span>
                  <b>{importReport.dncBlocked}</b>
                </div>
                <div>
                  <span>Not Interested</span>
                  <b>{importReport.notInterestedBlocked}</b>
                </div>
                <div>
                  <span>Already Interested</span>
                  <b>{importReport.alreadyInterested}</b>
                </div>
                <div>
                  <span>Blocked Total</span>
                  <b>{blockedNumbers.length}</b>
                </div>
              </div>

              <div className="phone">
                <div className="phoneTop">
                  <strong>Your Business</strong>
                  <span>{form.campaignMode}</span>
                </div>

                <div className="message">
                  {form.campaignMode === "Ice-Breaker Campaign"
                    ? getTemplateBody(form.iceBreakerTemplate)
                    : getTemplateBody(form.template)}
                </div>

                {form.campaignMode === "Ice-Breaker Campaign" && (
                  <>
                    <div className="message reply">YES</div>

                    <div className="message main">
                      <strong>Main campaign after YES:</strong>
                      <br />
                      {getTemplateBody(form.mainTemplate)}
                    </div>
                  </>
                )}
              </div>

              {blockedNumbers.length > 0 && (
                <div className="blockedPreview">
                  <strong>Blocked / Skipped Preview</strong>
                  {blockedNumbers.slice(0, 6).map((item) => (
                    <span key={`${item.phone}-${item.reason}`}>
                      {item.phone} — {item.reason}
                    </span>
                  ))}
                  {blockedNumbers.length > 6 && (
                    <small>+{blockedNumbers.length - 6} more blocked</small>
                  )}
                </div>
              )}

              {importedNumbers.length > 0 && (
                <div className="numberPreview">
                  <strong>Ready Numbers Preview</strong>
                  {importedNumbers.slice(0, 5).map((number) => (
                    <span key={number}>{number}</span>
                  ))}
                  {importedNumbers.length > 5 && (
                    <small>+{importedNumbers.length - 5} more safe numbers</small>
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
                      <th>Template</th>
                      <th>Recipients</th>
                      <th>Interested</th>
                      <th>No Reply</th>
                      <th>DNC</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {campaigns.map((campaign) => (
                      <tr key={campaign.id}>
                        <td>
                          <strong>{campaign.name}</strong>
                          <small>
                            {campaign.date || "-"} {campaign.time || ""}
                          </small>
                        </td>
                        <td>{campaign.campaignMode || "Direct Campaign"}</td>
                        <td>
                          {(campaign.campaignMode || "Direct Campaign") ===
                          "Ice-Breaker Campaign"
                            ? campaign.iceBreakerTemplate || campaign.template
                            : campaign.template}
                        </td>
                        <td>{campaign.recipients}</td>
                        <td>{campaign.interestedCount || 0}</td>
                        <td>{campaign.noReplyCount ?? campaign.recipients}</td>
                        <td>{campaign.doNotContactCount || 0}</td>
                        <td>
                          <em>{campaign.status}</em>
                        </td>
                        <td>
                          <div className="tableActions">
                            <button onClick={() => setSelectedCampaign(campaign)}>
                              Contacts
                            </button>

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

        {selectedCampaign && (
          <div className="modalOverlay" onClick={() => setSelectedCampaign(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modalTop">
                <div>
                  <span>Campaign contacts</span>
                  <h2>{selectedCampaign.name}</h2>
                </div>

                <button onClick={() => setSelectedCampaign(null)}>Close</button>
              </div>

              <div className="contactStats">
                <div>
                  <span>Total</span>
                  <b>
                    {selectedCampaign.recipientsList?.length ||
                      selectedCampaign.recipients}
                  </b>
                </div>
                <div>
                  <span>Interested</span>
                  <b>{selectedCampaign.interestedCount || 0}</b>
                </div>
                <div>
                  <span>No Reply</span>
                  <b>
                    {selectedCampaign.noReplyCount ?? selectedCampaign.recipients}
                  </b>
                </div>
                <div>
                  <span>DNC</span>
                  <b>{selectedCampaign.doNotContactCount || 0}</b>
                </div>
              </div>

              {!selectedCampaign.recipientsList ||
              selectedCampaign.recipientsList.length === 0 ? (
                <div className="empty">
                  This campaign has no saved contact list. Create a new campaign
                  after importing Excel numbers.
                </div>
              ) : (
                <div className="recipientList">
                  {selectedCampaign.recipientsList.map((recipient) => (
                    <div className="recipient" key={recipient.phone}>
                      <div>
                        <strong>{recipient.phone}</strong>

                        <small>
                          Status: {recipient.status}
                          {recipient.reply ? ` • Reply: ${recipient.reply}` : ""}
                        </small>

                        {recipient.botReply && (
                          <div className="botReplyBox">
                            <b>Bot Auto Reply:</b>
                            <p>{recipient.botReply}</p>
                            <em>{recipient.botReplyStatus || "Simulated"}</em>
                          </div>
                        )}
                      </div>

                      <div className="recipientActions">
                        <button
                          onClick={() =>
                            updateRecipientStatus(
                              selectedCampaign.id,
                              recipient.phone,
                              "Interested"
                            )
                          }
                        >
                          Interested
                        </button>

                        <button
                          onClick={() =>
                            updateRecipientStatus(
                              selectedCampaign.id,
                              recipient.phone,
                              "Not Interested"
                            )
                          }
                        >
                          Not Interested
                        </button>

                        <button
                          onClick={() =>
                            updateRecipientStatus(
                              selectedCampaign.id,
                              recipient.phone,
                              "No Reply"
                            )
                          }
                        >
                          No Reply
                        </button>

                        <button
                          className="deleteBtn"
                          onClick={() =>
                            updateRecipientStatus(
                              selectedCampaign.id,
                              recipient.phone,
                              "Do Not Contact"
                            )
                          }
                        >
                          DNC
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

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
          .tableActions button,
          .recipientActions button {
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

          .safetyBanner a {
            background: #075e54;
            color: #fff;
            border-radius: 999px;
            padding: 11px 15px;
            white-space: nowrap;
            text-decoration: none;
            font-weight: 900;
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

          .warning {
            background: #fff4db;
            color: #9a6500;
            border: 1px solid #f6d88a;
            border-radius: 16px;
            padding: 14px;
            font-weight: 900;
            margin-bottom: 16px;
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

          .reportGrid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-bottom: 20px;
          }

          .reportGrid div {
            background: #f8fcfa;
            border: 1px solid #e4eee8;
            border-radius: 16px;
            padding: 15px;
          }

          .reportGrid span {
            display: block;
            color: #58746c;
            font-size: 12px;
            font-weight: 900;
            margin-bottom: 6px;
          }

          .reportGrid b {
            font-size: 26px;
          }

          .phone {
            background: #061812;
            border-radius: 32px;
            padding: 14px;
            max-width: 330px;
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
            white-space: pre-wrap;
          }

          .reply {
            background: #dcf8c6;
            margin-left: 80px;
            text-align: center;
            font-weight: 900;
          }

          .main {
            background: #e8f7ef;
            border: 1px solid #bde9cf;
          }

          .numberPreview,
          .blockedPreview {
            margin-top: 18px;
            background: #f8fcfa;
            border: 1px solid #e4eee8;
            border-radius: 18px;
            padding: 16px;
          }

          .blockedPreview {
            background: #fff4db;
            border-color: #f6d88a;
          }

          .numberPreview strong,
          .numberPreview span,
          .numberPreview small,
          .blockedPreview strong,
          .blockedPreview span,
          .blockedPreview small {
            display: block;
          }

          .numberPreview span,
          .blockedPreview span {
            padding: 8px 0;
            border-bottom: 1px solid #e4eee8;
            color: #075e54;
            font-weight: 850;
          }

          .blockedPreview span {
            color: #9a6500;
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
            min-width: 1100px;
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

          .tableActions {
            display: grid;
            gap: 8px;
            min-width: 150px;
          }

          .tableActions button {
            padding: 9px 12px;
            font-size: 12px;
          }

          .deleteBtn {
            background: #ffe8e8 !important;
            color: #b42318 !important;
          }

          .modalOverlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.45);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            z-index: 999;
          }

          .modal {
            width: 100%;
            max-width: 980px;
            max-height: 86vh;
            overflow: auto;
            background: #fff;
            border-radius: 28px;
            padding: 28px;
            box-shadow: 0 30px 90px rgba(0, 0, 0, 0.25);
          }

          .modalTop {
            display: flex;
            justify-content: space-between;
            gap: 18px;
            align-items: center;
            margin-bottom: 18px;
          }

          .modalTop span {
            color: #075e54;
            font-weight: 950;
            text-transform: uppercase;
            font-size: 12px;
          }

          .modalTop h2 {
            margin: 6px 0 0;
          }

          .modalTop button {
            border: 0;
            border-radius: 14px;
            background: #075e54;
            color: #fff;
            padding: 12px 16px;
            font-weight: 900;
            cursor: pointer;
          }

          .contactStats {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            margin-bottom: 18px;
          }

          .contactStats div {
            background: #f6fbf8;
            border: 1px solid #e4eee8;
            border-radius: 18px;
            padding: 16px;
          }

          .contactStats span {
            color: #58746c;
            font-size: 12px;
            font-weight: 900;
          }

          .contactStats b {
            display: block;
            font-size: 26px;
            margin-top: 6px;
          }

          .recipientList {
            display: grid;
            gap: 12px;
          }

          .recipient {
            display: flex;
            justify-content: space-between;
            gap: 16px;
            align-items: center;
            background: #f8fcfa;
            border: 1px solid #e4eee8;
            border-radius: 18px;
            padding: 16px;
          }

          .recipient small {
            display: block;
            color: #58746c;
            margin-top: 6px;
          }

          .recipientActions {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            justify-content: flex-end;
          }

          .recipientActions button {
            padding: 9px 11px;
            font-size: 12px;
          }

          .botReplyBox {
            margin-top: 10px;
            background: #e8f7ef;
            border: 1px solid #bde9cf;
            border-radius: 14px;
            padding: 12px;
            max-width: 520px;
          }

          .botReplyBox b {
            display: block;
            color: #075e54;
            font-size: 12px;
            text-transform: uppercase;
            margin-bottom: 5px;
          }

          .botReplyBox p {
            margin: 0 0 8px;
            color: #071b15;
            line-height: 1.5;
            font-weight: 700;
          }

          .botReplyBox em {
            background: #075e54;
            color: #fff;
            padding: 5px 9px;
            border-radius: 999px;
            font-style: normal;
            font-size: 11px;
            font-weight: 900;
          }

          @media (max-width: 1000px) {
            .app {
              flex-direction: column;
            }

            aside {
              width: 100%;
              min-height: auto;
            }

            .grid,
            .contactStats,
            .reportGrid {
              grid-template-columns: 1fr;
            }

            .wide {
              grid-column: span 1;
            }

            header,
            .safetyBanner,
            .modalTop,
            .recipient {
              align-items: flex-start;
              flex-direction: column;
            }

            .recipientActions {
              justify-content: flex-start;
            }
          }
        `}</style>
      </main>
    </AuthGuard>
  );
}
