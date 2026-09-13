"use client";

import { useEffect, useState } from "react";
import AuthGuard from "../AuthGuard";

type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  source: string;
  status: string;
  accountType?: string;
  packageName?: string;
  accountStatus?: string;
  demoStartDate?: string;
  demoEndDate?: string;
  createdAt: string;
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

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  async function loadData() {
    try {
      const leadsRes = await fetch("/api/demo-leads", { cache: "no-store" });
      const leadsData = await leadsRes.json();

      if (leadsData.ok) {
        setLeads(leadsData.leads || []);
      }

      const campaignsRes = await fetch("/api/campaigns", { cache: "no-store" });
      const campaignsData = await campaignsRes.json();

      if (campaignsData.ok) {
        setCampaigns(campaignsData.campaigns || []);
      }
    } catch (error) {
      console.log("Failed to load dashboard data", error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const totalRecipients = campaigns.reduce(
    (total, campaign) => total + Number(campaign.recipients || 0),
    0
  );

  const totalSent = campaigns.reduce(
    (total, campaign) => total + Number(campaign.sent || 0),
    0
  );

  const totalReplies = campaigns.reduce(
    (total, campaign) => total + Number(campaign.replies || 0),
    0
  );

  const activeDemos = leads.filter(
    (lead) => (lead.accountStatus || lead.status) === "Demo Active"
  ).length;

  return (
    <AuthGuard>
      <main className="dashboard">
        <aside>
          <a className="brand" href="/">
            <div>W</div>
            <strong>WhatsApp Hub</strong>
          </a>

          <nav>
            <a className="active" href="/dashboard">Dashboard</a>
            <a href="/inbox">Inbox</a>
            <a href="/campaigns">Campaigns</a>
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

        <section>
          <header>
            <div>
              <span>Client workspace</span>
              <h1>WhatsApp Business Dashboard</h1>
            </div>

            <div className="headerActions">
              <button onClick={loadData}>Refresh</button>
              <a className="siteBtn" href="/">Visit Website</a>
            </div>
          </header>

          <div className="stats">
            <div>
              <span>Total Leads</span>
              <b>{leads.length}</b>
            </div>

            <div>
              <span>Active Demos</span>
              <b>{activeDemos}</b>
            </div>

            <div>
              <span>Total Campaigns</span>
              <b>{campaigns.length}</b>
            </div>

            <div>
              <span>Total Recipients</span>
              <b>{totalRecipients}</b>
            </div>
          </div>

          <div className="stats second">
            <div>
              <span>Messages Sent</span>
              <b>{totalSent}</b>
            </div>

            <div>
              <span>Campaign Replies</span>
              <b>{totalReplies}</b>
            </div>

            <div>
              <span>Paid Clients</span>
              <b>
                {
                  leads.filter(
                    (lead) => (lead.accountStatus || lead.status) === "Paid Client"
                  ).length
                }
              </b>
            </div>

            <div>
              <span>Demo Expired</span>
              <b>
                {
                  leads.filter(
                    (lead) => (lead.accountStatus || lead.status) === "Expired"
                  ).length
                }
              </b>
            </div>
          </div>

          <div className="grid">
            <div className="card wide">
              <div className="cardTop">
                <h2>Latest Leads</h2>
                <a href="/contacts">View Contacts</a>
              </div>

              {leads.length === 0 ? (
                <div className="empty">No leads yet.</div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Company</th>
                      <th>Phone</th>
                      <th>Service</th>
                      <th>Account</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {leads.slice(0, 8).map((lead) => (
                      <tr
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className="clickableRow"
                      >
                        <td>
                          <strong>{lead.name}</strong>
                        </td>
                        <td>{lead.company || "-"}</td>
                        <td>{lead.phone}</td>
                        <td>{lead.service}</td>
                        <td>{lead.accountType || "Lead"}</td>
                        <td>
                          <em>{lead.accountStatus || lead.status}</em>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="card wide">
              <div className="cardTop">
                <h2>Recent Campaigns</h2>
                <a href="/campaigns">Open Campaigns</a>
              </div>

              {campaigns.length === 0 ? (
                <div className="empty">No campaigns saved yet.</div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Mode</th>
                      <th>Recipients</th>
                      <th>Sent</th>
                      <th>Replies</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {campaigns.slice(0, 8).map((campaign) => (
                      <tr key={campaign.id}>
                        <td>
                          <strong>{campaign.name}</strong>
                          <small>
                            {campaign.date || "-"} {campaign.time || ""}
                          </small>
                        </td>
                        <td>{campaign.campaignMode || "Direct Campaign"}</td>
                        <td>{campaign.recipients}</td>
                        <td>{campaign.sent}</td>
                        <td>{campaign.replies}</td>
                        <td>
                          <em className={campaign.status === "Draft" ? "draft" : ""}>
                            {campaign.status}
                          </em>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="card">
              <div className="cardTop">
                <h2>Safe Marketing Flow</h2>
                <a href="/campaigns">Create</a>
              </div>

              <div className="steps vertical">
                <div>1. Import contacts</div>
                <div>2. Send ice-breaker</div>
                <div>3. Wait for replies</div>
                <div>4. Launch main campaign to interested contacts</div>
              </div>
            </div>

            <div className="card">
              <div className="cardTop">
                <h2>CRM Sync</h2>
                <a href="/crm-sync">Configure</a>
              </div>

              <p>
                New demo leads and WhatsApp contacts can be converted into CRM
                leads, demo accounts or paid clients.
              </p>

              <div className="miniStats">
                <div>{leads.length} contacts ready</div>
                <div>{activeDemos} active demos</div>
              </div>
            </div>
          </div>
        </section>

        {selectedLead && (
          <div className="modalOverlay" onClick={() => setSelectedLead(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modalTop">
                <div>
                  <span>Lead details</span>
                  <h2>{selectedLead.name}</h2>
                </div>

                <button onClick={() => setSelectedLead(null)}>Close</button>
              </div>

              <div className="leadDetails">
                <div>
                  <small>Company</small>
                  <strong>{selectedLead.company || "-"}</strong>
                </div>

                <div>
                  <small>Phone</small>
                  <strong>{selectedLead.phone}</strong>
                </div>

                <div>
                  <small>Email</small>
                  <strong>{selectedLead.email || "-"}</strong>
                </div>

                <div>
                  <small>Service</small>
                  <strong>{selectedLead.service}</strong>
                </div>

                <div>
                  <small>Account Type</small>
                  <strong>{selectedLead.accountType || "Lead"}</strong>
                </div>

                <div>
                  <small>Status</small>
                  <strong>{selectedLead.accountStatus || selectedLead.status}</strong>
                </div>
              </div>

              <div className="messageBox">
                <small>Message</small>
                <p>{selectedLead.message || "No message added."}</p>
              </div>

              <div className="modalActions">
                <a
                  href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                >
                  Open WhatsApp
                </a>

                <a href="/contacts">Open Contact</a>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          * {
            box-sizing: border-box;
          }

          .dashboard {
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

          .brand strong {
            font-size: 19px;
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

          nav a:hover {
            background: rgba(255, 255, 255, 0.08);
            color: #fff;
          }

          nav a.active {
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

          section {
            flex: 1;
            padding: 32px;
          }

          header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 18px;
            margin-bottom: 25px;
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

          .headerActions {
            display: flex;
            gap: 10px;
            align-items: center;
          }

          .headerActions button,
          .siteBtn,
          .cardTop a {
            background: #075e54;
            color: #fff;
            padding: 13px 18px;
            border-radius: 14px;
            text-decoration: none;
            font-weight: 900;
            font-size: 14px;
            border: 0;
            cursor: pointer;
          }

          .stats {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 18px;
            margin-bottom: 18px;
          }

          .second {
            margin-bottom: 22px;
          }

          .stats div,
          .card {
            background: #fff;
            border: 1px solid #e4eee8;
            border-radius: 24px;
            padding: 24px;
            box-shadow: 0 20px 55px rgba(8, 42, 31, 0.05);
          }

          .stats span {
            color: #58746c;
            font-weight: 700;
          }

          .stats b {
            display: block;
            margin-top: 8px;
            font-size: 34px;
          }

          .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 18px;
          }

          .wide {
            grid-column: span 2;
            overflow-x: auto;
          }

          .cardTop {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            margin-bottom: 18px;
          }

          h2 {
            margin: 0;
            font-size: 24px;
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
            min-width: 850px;
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

          .clickableRow {
            cursor: pointer;
          }

          .clickableRow:hover {
            background: #f1faf5;
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

          .steps.vertical {
            display: grid;
            gap: 10px;
          }

          .steps.vertical div,
          .miniStats div {
            background: #e8f7ef;
            border-radius: 14px;
            padding: 13px;
            font-weight: 850;
            color: #075e54;
          }

          .card p {
            color: #58746c;
            line-height: 1.6;
          }

          .miniStats {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-top: 18px;
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
            max-width: 720px;
            background: #fff;
            border-radius: 28px;
            padding: 28px;
            box-shadow: 0 30px 90px rgba(0, 0, 0, 0.25);
          }

          .modalTop {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 18px;
            margin-bottom: 22px;
          }

          .modalTop span {
            color: #075e54;
            font-weight: 950;
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 0.7px;
          }

          .modalTop h2 {
            margin-top: 6px;
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

          .leadDetails {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
          }

          .leadDetails div,
          .messageBox {
            background: #f8fcfa;
            border: 1px solid #e4eee8;
            border-radius: 16px;
            padding: 15px;
          }

          .leadDetails small,
          .messageBox small {
            display: block;
            color: #58746c;
            font-size: 12px;
            font-weight: 950;
            text-transform: uppercase;
            margin-bottom: 6px;
          }

          .messageBox {
            margin-top: 14px;
          }

          .messageBox p {
            margin: 0;
            color: #58746c;
            line-height: 1.6;
          }

          .modalActions {
            display: flex;
            gap: 10px;
            margin-top: 18px;
          }

          .modalActions a {
            flex: 1;
            text-align: center;
            background: #25d366;
            color: #05251d;
            text-decoration: none;
            padding: 14px;
            border-radius: 14px;
            font-weight: 950;
          }

          @media (max-width: 1000px) {
            .dashboard {
              flex-direction: column;
            }

            aside {
              width: 100%;
              min-height: auto;
            }

            .stats,
            .grid,
            .leadDetails {
              grid-template-columns: 1fr;
            }

            .wide {
              grid-column: span 1;
            }

            header,
            .headerActions,
            .cardTop,
            .modalActions {
              align-items: flex-start;
              flex-direction: column;
            }

            .miniStats {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </main>
    </AuthGuard>
  );
}
