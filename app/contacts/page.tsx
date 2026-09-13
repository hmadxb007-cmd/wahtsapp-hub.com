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

export default function ContactsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    async function loadLeads() {
      try {
        const res = await fetch("/api/demo-leads", { cache: "no-store" });
        const data = await res.json();

        if (data.ok) {
          setLeads(data.leads || []);
        }
      } catch (error) {
        console.log("Failed to load contacts", error);
      }
    }

    loadLeads();
  }, []);

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
            <a className="active" href="/contacts">Contacts</a>
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
              <span>Customer database</span>
              <h1>Contacts</h1>
            </div>

            <div className="actions">
              <button className="secondary">Import Excel</button>
              <button>Add Contact</button>
            </div>
          </header>

          <div className="stats">
            <div>
              <span>Total Contacts</span>
              <b>{leads.length}</b>
            </div>
            <div>
              <span>WhatsApp Leads</span>
              <b>{leads.length}</b>
            </div>
            <div>
              <span>Synced to CRM</span>
              <b>0</b>
            </div>
            <div>
              <span>Unassigned</span>
              <b>{leads.length}</b>
            </div>
          </div>

          <div className="grid">
            <div className="card formCard">
              <h2>Add New Contact</h2>

              <label>Full Name</label>
              <input placeholder="Customer name" />

              <label>WhatsApp Number</label>
              <input placeholder="+971 50 000 0000" />

              <label>Email</label>
              <input placeholder="customer@example.com" />

              <label>Lead Source</label>
              <select>
                <option>Website Demo</option>
                <option>WhatsApp Inbox</option>
                <option>Marketing Campaign</option>
                <option>Excel Import</option>
                <option>CRM Sync</option>
              </select>

              <button className="primary">Save Contact</button>
            </div>

            <div className="card segmentCard">
              <h2>Segments</h2>

              <div className="segment active">
                <div>
                  <strong>All Contacts</strong>
                  <p>Complete customer database</p>
                </div>
                <b>{leads.length}</b>
              </div>

              <div className="segment">
                <div>
                  <strong>Demo Requests</strong>
                  <p>Leads from website demo form</p>
                </div>
                <b>{leads.length}</b>
              </div>

              <div className="segment">
                <div>
                  <strong>Campaign Replies</strong>
                  <p>Contacts who replied to marketing</p>
                </div>
                <b>0</b>
              </div>

              <div className="segment">
                <div>
                  <strong>CRM Synced</strong>
                  <p>Contacts already pushed to CRM</p>
                </div>
                <b>0</b>
              </div>
            </div>

            <div className="card wide">
              <div className="tableTop">
                <h2>Contact List</h2>
                <input placeholder="Search contacts..." />
              </div>

              {leads.length === 0 ? (
                <div className="empty">No contacts found.</div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Company</th>
                      <th>Source</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {leads.map((lead) => (
                      <tr
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className="clickableRow"
                      >
                        <td>
                          <strong>{lead.name}</strong>
                        </td>
                        <td>{lead.phone}</td>
                        <td>{lead.email || "-"}</td>
                        <td>{lead.company || "-"}</td>
                        <td>{lead.source}</td>
                        <td>
                          <em>{lead.status}</em>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {selectedLead && (
            <div className="modalOverlay" onClick={() => setSelectedLead(null)}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modalTop">
                  <div>
                    <span>Contact details</span>
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
                    <small>Status</small>
                    <strong>{selectedLead.status}</strong>
                  </div>

                  <div>
                    <small>Source</small>
                    <strong>{selectedLead.source}</strong>
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

                  <a href={`tel:${selectedLead.phone}`}>Call</a>

                  <a href={`mailto:${selectedLead.email}`}>Email</a>
                </div>
              </div>
            </div>
          )}
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

          .actions {
            display: flex;
            gap: 10px;
          }

          button,
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

          .secondary {
            background: #075e54;
            color: #fff;
          }

          .stats {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 18px;
            margin-bottom: 18px;
          }

          .stats div,
          .card {
            background: #fff;
            border: 1px solid #e4eee8;
            border-radius: 26px;
            padding: 24px;
            box-shadow: 0 18px 50px rgba(8, 42, 31, 0.05);
          }

          .stats span {
            color: #58746c;
            font-weight: 800;
          }

          .stats b {
            display: block;
            font-size: 34px;
            margin-top: 8px;
          }

          .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 18px;
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

          .primary {
            width: 100%;
            height: 52px;
            margin-top: 20px;
          }

          .segment {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 14px;
            border: 1px solid #e4eee8;
            border-radius: 18px;
            padding: 16px;
            margin-bottom: 12px;
            background: #f8fcfa;
          }

          .segment.active {
            background: #e8f7ef;
            border-color: #bde9cf;
          }

          .segment p {
            margin: 6px 0 0;
            color: #58746c;
          }

          .segment b {
            color: #075e54;
            font-size: 22px;
          }

          .tableTop {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
            margin-bottom: 15px;
          }

          .tableTop h2 {
            margin: 0;
          }

          .tableTop input {
            max-width: 320px;
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

          .empty {
            background: #f8fcfa;
            border: 1px dashed #dcebe5;
            border-radius: 18px;
            padding: 24px;
            color: #58746c;
            font-weight: 800;
          }

          .clickableRow {
            cursor: pointer;
          }

          .clickableRow:hover {
            background: #f1faf5;
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
            .app {
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
              overflow-x: auto;
            }

            header,
            .tableTop {
              align-items: flex-start;
              flex-direction: column;
            }

            .tableTop input {
              max-width: 100%;
            }

            .modalActions {
              flex-direction: column;
            }
          }
        `}</style>
      </main>
    </AuthGuard>
  );
}
