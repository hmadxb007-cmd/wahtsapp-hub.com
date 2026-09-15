"use client";

import { useEffect, useState } from "react";
import AuthGuard from "../AuthGuard";

type SafetyContact = {
  phone: string;
  globalStatus: string;
  lastStatus: string;
  lastReply: string;
  sourceCampaignId?: string;
  sourceCampaignName?: string;
  campaignHistory?: {
    campaignId: string;
    campaignName: string;
    status: string;
    reply: string;
    updatedAt: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
};

export default function SafetyContactsPage() {
  const [contacts, setContacts] = useState<SafetyContact[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedContact, setSelectedContact] = useState<SafetyContact | null>(
    null
  );

  async function loadContacts() {
    try {
      const res = await fetch("/api/safety-contacts", { cache: "no-store" });
      const data = await res.json();

      if (data.ok) {
        setContacts(data.contacts || []);
      }
    } catch (error) {
      console.log("Failed to load safety contacts", error);
    }
  }

  useEffect(() => {
    loadContacts();
  }, []);

  async function deleteContact(phone: string) {
    const ok = confirm("Remove this number from global safety list?");
    if (!ok) return;

    try {
      const res = await fetch("/api/safety-contacts", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      if (data.ok) {
        setSelectedContact(null);
        await loadContacts();
      }
    } catch (error) {
      alert("Could not delete contact.");
    }
  }

  function exportContacts(status: string) {
    const exportList =
      status === "All"
        ? contacts
        : contacts.filter((contact) => contact.globalStatus === status);

    if (exportList.length === 0) {
      alert(`No ${status} contacts found.`);
      return;
    }

    const rows = [
      [
        "phone",
        "globalStatus",
        "lastStatus",
        "lastReply",
        "sourceCampaignName",
        "updatedAt",
      ],
      ...exportList.map((contact) => [
        contact.phone,
        contact.globalStatus,
        contact.lastStatus,
        contact.lastReply || "",
        contact.sourceCampaignName || "",
        contact.updatedAt || "",
      ]),
    ];

    const csv = rows
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `whatsapp-hub-${status
      .toLowerCase()
      .replace(/\s/g, "-")}-contacts.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.phone.toLowerCase().includes(search.toLowerCase()) ||
      (contact.sourceCampaignName || "")
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ? true : contact.globalStatus === filter;

    return matchesSearch && matchesFilter;
  });

  const interested = contacts.filter(
    (contact) => contact.globalStatus === "Interested"
  ).length;

  const notInterested = contacts.filter(
    (contact) => contact.globalStatus === "Not Interested"
  ).length;

  const dnc = contacts.filter(
    (contact) => contact.globalStatus === "Do Not Contact"
  ).length;

  const noReply = contacts.filter(
    (contact) => contact.globalStatus === "No Reply"
  ).length;

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
            <a className="active" href="/safety-contacts">Safety Contacts</a>
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
              <span>Global campaign protection</span>
              <h1>Safety Contacts</h1>
            </div>

            <button onClick={loadContacts}>Refresh</button>
          </header>

          <div className="safetyBanner">
            <div>
              <strong>Global DNC & Reply Memory</strong>
              <p>
                This page stores global contact status from all campaigns. DNC
                and Not Interested numbers are automatically excluded from future
                campaign imports.
              </p>
            </div>
            <a href="/campaigns">Create Campaign</a>
          </div>

          <div className="stats">
            <div>
              <span>Total Safety Contacts</span>
              <b>{contacts.length}</b>
            </div>
            <div>
              <span>Interested</span>
              <b>{interested}</b>
            </div>
            <div>
              <span>Not Interested</span>
              <b>{notInterested}</b>
            </div>
            <div>
              <span>DNC</span>
              <b>{dnc}</b>
            </div>
            <div>
              <span>No Reply</span>
              <b>{noReply}</b>
            </div>
          </div>

          <div className="exportPanel">
            <div>
              <strong>Export Contact Lists</strong>
              <p>
                Download filtered CSV lists for warm leads, blocked DNC numbers,
                or full safety records.
              </p>
            </div>

            <div className="exportActions">
              <button onClick={() => exportContacts("Interested")}>
                Export Interested
              </button>
              <button onClick={() => exportContacts("Not Interested")}>
                Export Not Interested
              </button>
              <button onClick={() => exportContacts("Do Not Contact")}>
                Export DNC
              </button>
              <button onClick={() => exportContacts("All")}>Export All</button>
            </div>
          </div>

          <div className="card">
            <div className="toolbar">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search phone or campaign..."
              />

              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option>All</option>
                <option>Interested</option>
                <option>Not Interested</option>
                <option>Do Not Contact</option>
                <option>No Reply</option>
              </select>

              <button onClick={() => exportContacts(filter)}>
                Export Current Filter
              </button>
            </div>

            {filteredContacts.length === 0 ? (
              <div className="empty">No safety contacts found.</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Phone</th>
                    <th>Global Status</th>
                    <th>Last Reply</th>
                    <th>Source Campaign</th>
                    <th>Updated</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredContacts.map((contact) => (
                    <tr key={contact.phone}>
                      <td>
                        <strong>{contact.phone}</strong>
                      </td>
                      <td>
                        <em
                          className={
                            contact.globalStatus === "Do Not Contact"
                              ? "danger"
                              : contact.globalStatus === "Not Interested"
                              ? "warning"
                              : ""
                          }
                        >
                          {contact.globalStatus}
                        </em>
                      </td>
                      <td>{contact.lastReply || "-"}</td>
                      <td>{contact.sourceCampaignName || "-"}</td>
                      <td>
                        {contact.updatedAt
                          ? new Date(contact.updatedAt).toLocaleString()
                          : "-"}
                      </td>
                      <td>
                        <div className="tableActions">
                          <button onClick={() => setSelectedContact(contact)}>
                            Details
                          </button>
                          <button
                            className="deleteBtn"
                            onClick={() => deleteContact(contact.phone)}
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {selectedContact && (
          <div className="modalOverlay" onClick={() => setSelectedContact(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modalTop">
                <div>
                  <span>Safety contact details</span>
                  <h2>{selectedContact.phone}</h2>
                </div>

                <button onClick={() => setSelectedContact(null)}>Close</button>
              </div>

              <div className="detailGrid">
                <div>
                  <small>Global Status</small>
                  <strong>{selectedContact.globalStatus}</strong>
                </div>
                <div>
                  <small>Last Status</small>
                  <strong>{selectedContact.lastStatus}</strong>
                </div>
                <div>
                  <small>Last Reply</small>
                  <strong>{selectedContact.lastReply || "-"}</strong>
                </div>
                <div>
                  <small>Source Campaign</small>
                  <strong>{selectedContact.sourceCampaignName || "-"}</strong>
                </div>
              </div>

              <h3>Campaign History</h3>

              {!selectedContact.campaignHistory ||
              selectedContact.campaignHistory.length === 0 ? (
                <div className="empty">No campaign history saved.</div>
              ) : (
                <div className="historyList">
                  {selectedContact.campaignHistory.map((item, index) => (
                    <div
                      className="historyItem"
                      key={`${item.campaignId}-${index}`}
                    >
                      <strong>{item.campaignName || "Campaign"}</strong>
                      <p>
                        Status: {item.status}{" "}
                        {item.reply ? `• Reply: ${item.reply}` : ""}
                      </p>
                      <small>
                        {item.updatedAt
                          ? new Date(item.updatedAt).toLocaleString()
                          : "-"}
                      </small>
                    </div>
                  ))}
                </div>
              )}

              <button
                className="deleteFull"
                onClick={() => deleteContact(selectedContact.phone)}
              >
                Remove From Safety List
              </button>
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
          .tableActions button,
          .toolbar button,
          .exportActions button {
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

          .stats {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 18px;
            margin-bottom: 18px;
          }

          .stats div,
          .card,
          .exportPanel {
            background: #fff;
            border: 1px solid #e4eee8;
            border-radius: 24px;
            padding: 24px;
            box-shadow: 0 20px 55px rgba(8, 42, 31, 0.05);
          }

          .stats span {
            color: #58746c;
            font-weight: 800;
            font-size: 13px;
          }

          .stats b {
            display: block;
            font-size: 30px;
            margin-top: 8px;
          }

          .exportPanel {
            display: flex;
            justify-content: space-between;
            gap: 18px;
            align-items: center;
            margin-bottom: 18px;
          }

          .exportPanel strong {
            font-size: 20px;
          }

          .exportPanel p {
            margin: 7px 0 0;
            color: #58746c;
            line-height: 1.5;
          }

          .exportActions {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: flex-end;
          }

          .exportActions button {
            padding: 12px 14px;
            white-space: nowrap;
          }

          .toolbar {
            display: grid;
            grid-template-columns: 1fr 240px 190px;
            gap: 12px;
            margin-bottom: 18px;
          }

          .toolbar button {
            height: 50px;
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

          table {
            width: 100%;
            border-collapse: collapse;
            min-width: 950px;
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

          em.warning {
            background: #fff4db;
            color: #9a6500;
          }

          em.danger {
            background: #ffe8e8;
            color: #b42318;
          }

          .tableActions {
            display: flex;
            gap: 8px;
          }

          .tableActions button {
            padding: 9px 12px;
            font-size: 12px;
          }

          .deleteBtn,
          .deleteFull {
            background: #ffe8e8 !important;
            color: #b42318 !important;
          }

          .empty {
            background: #f8fcfa;
            border: 1px dashed #dcebe5;
            border-radius: 18px;
            padding: 24px;
            color: #58746c;
            font-weight: 800;
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
            max-width: 760px;
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

          .detailGrid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
            margin-bottom: 20px;
          }

          .detailGrid div,
          .historyItem {
            background: #f8fcfa;
            border: 1px solid #e4eee8;
            border-radius: 16px;
            padding: 15px;
          }

          .detailGrid small,
          .historyItem small {
            display: block;
            color: #58746c;
            font-size: 12px;
            font-weight: 950;
            text-transform: uppercase;
            margin-bottom: 6px;
          }

          h3 {
            margin: 20px 0 12px;
          }

          .historyList {
            display: grid;
            gap: 10px;
          }

          .historyItem p {
            color: #58746c;
            margin: 8px 0;
          }

          .deleteFull {
            width: 100%;
            margin-top: 18px;
            border: 0;
            border-radius: 14px;
            padding: 14px;
            font-weight: 950;
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

            header,
            .safetyBanner,
            .modalTop,
            .exportPanel {
              align-items: flex-start;
              flex-direction: column;
            }

            .stats,
            .toolbar,
            .detailGrid {
              grid-template-columns: 1fr;
            }

            .exportActions {
              width: 100%;
              justify-content: flex-start;
            }

            .exportActions button {
              width: 100%;
            }

            .card {
              overflow-x: auto;
            }
          }
        `}</style>
      </main>
    </AuthGuard>
  );
}
