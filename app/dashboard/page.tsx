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
  createdAt: string;
};

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    async function loadLeads() {
      try {
        const res = await fetch("/api/demo-leads", { cache: "no-store" });
        const data = await res.json();

        if (data.ok) {
          setLeads(data.leads || []);
        }
      } catch (error) {
        console.log("Failed to load demo leads", error);
      }
    }

    loadLeads();
  }, []);

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

            <a className="siteBtn" href="/">Visit Website</a>
          </header>

          <div className="stats">
            <div>
              <span>Demo Requests</span>
              <b>{leads.length}</b>
            </div>
            <div>
              <span>Messages Sent</span>
              <b>12,450</b>
            </div>
            <div>
              <span>Leads Synced</span>
              <b>532</b>
            </div>
            <div>
              <span>Open Chats</span>
              <b>41</b>
            </div>
          </div>

          <div className="grid">
            <div className="card wide">
              <div className="cardTop">
                <h2>Latest Demo Requests</h2>
                <a href="/contacts">View Contacts</a>
              </div>

              {leads.length === 0 ? (
                <div className="empty">
                  No demo requests yet.
                </div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Company</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Service</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {leads.slice(0, 8).map((lead) => (
                      <tr key={lead.id}>
                        <td>
                          <strong>{lead.name}</strong>
                        </td>
                        <td>{lead.company || "-"}</td>
                        <td>{lead.phone}</td>
                        <td>{lead.email || "-"}</td>
                        <td>{lead.service}</td>
                        <td>
                          <em>{lead.status}</em>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="card">
              <div className="cardTop">
                <h2>Agent Inbox</h2>
                <a href="/inbox">Open Inbox</a>
              </div>

              <div className="chat">
                <strong>New WhatsApp Lead</strong>
                <p>Hi, I am interested in your service.</p>
                <small>Assigned to Sales Team</small>
              </div>

              <div className="chat">
                <strong>CRM Client</strong>
                <p>Can you connect Bitrix24 with WhatsApp?</p>
                <small>Lead synced</small>
              </div>

              <div className="chat">
                <strong>Campaign Reply</strong>
                <p>Yes, please send me more details.</p>
                <small>From marketing campaign</small>
              </div>
            </div>

            <div className="card">
              <div className="cardTop">
                <h2>Campaign Builder</h2>
                <a href="/campaigns">New Campaign</a>
              </div>

              <label>Campaign name</label>
              <input value="September Offers Campaign" readOnly />

              <label>Template</label>
              <input value="approved_offer_template" readOnly />

              <div className="miniStats">
                <div>Imported: 2,350</div>
                <div>Ready to send</div>
              </div>

              <button className="greenBtn">Start Campaign</button>
            </div>

            <div className="card wide">
              <div className="cardTop">
                <h2>CRM Sync Workflow</h2>
                <a href="/crm-sync">Configure</a>
              </div>

              <p>Bitrix24 connected. New WhatsApp leads are synced automatically.</p>

              <div className="steps">
                <div>New Lead</div>
                <span>→</span>
                <div>Copy Number</div>
                <span>→</span>
                <div>Assign Agent</div>
                <span>→</span>
                <div>Sync CRM</div>
              </div>
            </div>
          </div>
        </section>

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
            cursor: pointer;
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
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 13px;
            background: rgba(255,255,255,0.06);
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

          .siteBtn,
          .cardTop a {
            background: #075e54;
            color: #fff;
            padding: 13px 18px;
            border-radius: 14px;
            text-decoration: none;
            font-weight: 900;
            font-size: 14px;
          }

          .stats {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 18px;
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
            grid-template-columns: 1.1fr 1fr;
            gap: 18px;
          }

          .wide {
            grid-column: span 2;
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
          }

          th,
          td {
            padding: 16px;
            border-bottom: 1px solid #e4eee8;
            text-align: left;
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

          .chat {
            border: 1px solid #dfece6;
            border-radius: 16px;
            padding: 15px;
            margin-bottom: 12px;
            background: #f8fcfa;
          }

          .chat p {
            color: #58746c;
            margin: 8px 0;
          }

          .chat small {
            color: #075e54;
            font-weight: 900;
          }

          label {
            display: block;
            color: #58746c;
            font-size: 12px;
            font-weight: 900;
            margin: 14px 0 7px;
          }

          input {
            width: 100%;
            height: 48px;
            border: 1px solid #dfece6;
            border-radius: 14px;
            padding: 0 14px;
            font-weight: 800;
            background: #f8fcfa;
          }

          .miniStats {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin: 18px 0;
          }

          .miniStats div,
          .steps div {
            background: #e8f7ef;
            border-radius: 14px;
            padding: 13px;
            font-weight: 850;
            color: #075e54;
          }

          .greenBtn {
            width: 100%;
            height: 50px;
            border: 0;
            border-radius: 15px;
            background: #25d366;
            color: #05251d;
            font-weight: 950;
            cursor: pointer;
          }

          .steps {
            display: grid;
            grid-template-columns: 1fr 30px 1fr 30px 1fr 30px 1fr;
            gap: 10px;
            align-items: center;
            margin-top: 18px;
            text-align: center;
          }

          .steps span {
            color: #075e54;
            font-weight: 950;
            font-size: 22px;
          }

          .card p {
            color: #58746c;
            line-height: 1.6;
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
            .grid {
              grid-template-columns: 1fr;
            }

            .wide {
              grid-column: span 1;
              overflow-x: auto;
            }

            .steps {
              grid-template-columns: 1fr;
            }

            .steps span {
              display: none;
            }
          }
        `}</style>
      </main>
    </AuthGuard>
  );
}
