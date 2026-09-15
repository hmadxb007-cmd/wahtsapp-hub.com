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

export default function InboxPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const [reply, setReply] = useState("");

  async function loadLeads() {
    try {
      const res = await fetch("/api/demo-leads", { cache: "no-store" });
      const data = await res.json();

      if (data.ok) {
        setLeads(data.leads || []);
        setActiveLead((data.leads && data.leads[0]) || null);
      }
    } catch (error) {
      console.log("Failed to load inbox leads", error);
    }
  }

  useEffect(() => {
    loadLeads();
  }, []);

  function openWhatsApp() {
    if (!activeLead) return;

    const phone = activeLead.phone.replace(/[^0-9]/g, "");
    const text = reply || `Hi ${activeLead.name}, thank you for contacting WhatsApp Hub.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");
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
  <a className="active" href="/inbox">Inbox</a>
  <a href="/campaigns">Campaigns</a>
  <a href="/templates">Templates</a>
  <a href="/contacts">Contacts</a>
  <a href="/safety-contacts">Safety Contacts</a>
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
              <span>Agent workspace</span>
              <h1>WhatsApp Inbox</h1>
            </div>

            <button onClick={loadLeads}>Refresh Inbox</button>
          </header>

          <div className="inboxShell">
            <div className="chatList">
              <input placeholder="Search chats, names or numbers" />

              <div className="filters">
                <button className="active">All</button>
                <button>Demo</button>
                <button>Paid</button>
              </div>

              {leads.length === 0 ? (
                <div className="empty">No leads or contacts yet.</div>
              ) : (
                leads.map((lead) => (
                  <div
                    className={`chat ${activeLead?.id === lead.id ? "active" : ""}`}
                    key={lead.id}
                    onClick={() => setActiveLead(lead)}
                  >
                    <div className="avatar">
                      {lead.name ? lead.name.charAt(0).toUpperCase() : "L"}
                    </div>

                    <div>
                      <strong>{lead.name || "Unknown Lead"}</strong>
                      <small>{lead.phone}</small>
                      <p>{lead.message || lead.service || "New WhatsApp Hub lead"}</p>
                      <em>{lead.accountStatus || lead.status || "New Lead"}</em>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="conversation">
              {activeLead ? (
                <>
                  <div className="convHeader">
                    <div>
                      <h2>{activeLead.name}</h2>
                      <span>
                        {activeLead.phone} • {activeLead.source} •{" "}
                        {activeLead.accountStatus || activeLead.status}
                      </span>
                    </div>

                    <div className="headerActions">
                      <a
                        href={`https://wa.me/${activeLead.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                      >
                        Open WhatsApp
                      </a>

                      <a href="/contacts">View Contact</a>
                    </div>
                  </div>

                  <div className="messages">
                    <div className="dateLine">Lead details</div>

                    <div className="crmCard">
                      <strong>Contact Information</strong>
                      <p>
                        Company: {activeLead.company || "-"}
                        <br />
                        Email: {activeLead.email || "-"}
                        <br />
                        Service: {activeLead.service || "-"}
                      </p>
                    </div>

                    <div className="bubble incoming">
                      {activeLead.message || "No message added."}
                      <small>{activeLead.createdAt ? new Date(activeLead.createdAt).toLocaleString() : ""}</small>
                    </div>

                    <div className="bubble outgoing">
                      Hi {activeLead.name}, thank you for contacting WhatsApp Hub.
                      We can help you with WhatsApp CRM integration, campaigns and automation.
                      <small>Suggested reply</small>
                    </div>

                    <div className="crmCard">
                      <strong>Account Status</strong>
                      <p>
                        Account Type: {activeLead.accountType || "Lead"}
                        <br />
                        Package: {activeLead.packageName || "None"}
                        <br />
                        Demo Timeline:{" "}
                        {activeLead.demoStartDate && activeLead.demoEndDate
                          ? `${activeLead.demoStartDate} to ${activeLead.demoEndDate}`
                          : "No demo active"}
                      </p>
                    </div>
                  </div>

                  <div className="composer">
                    <input
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      placeholder={`Reply to ${activeLead.name} on WhatsApp...`}
                    />
                    <button onClick={openWhatsApp}>Send</button>
                  </div>
                </>
              ) : (
                <div className="noChat">
                  <h2>No conversation selected</h2>
                  <p>When leads are saved, they will appear here as inbox conversations.</p>
                </div>
              )}
            </div>

            <div className="profile">
              {activeLead ? (
                <>
                  <h3>Contact Details</h3>

                  <div className="profileCard">
                    <div className="bigAvatar">
                      {activeLead.name ? activeLead.name.charAt(0).toUpperCase() : "L"}
                    </div>

                    <h2>{activeLead.name}</h2>
                    <p>{activeLead.phone}</p>
                  </div>

                  <div className="info">
                    <label>Status</label>
                    <input value={activeLead.status || "New Lead"} readOnly />

                    <label>Account Type</label>
                    <input value={activeLead.accountType || "Lead"} readOnly />

                    <label>Package</label>
                    <input value={activeLead.packageName || "None"} readOnly />

                    <label>Demo End Date</label>
                    <input value={activeLead.demoEndDate || "No demo active"} readOnly />

                    <label>Email</label>
                    <input value={activeLead.email || "-"} readOnly />

                    <label>Company</label>
                    <input value={activeLead.company || "-"} readOnly />
                  </div>

                  <div className="quickActions">
                    <a
                      href={`https://wa.me/${activeLead.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                    >
                      WhatsApp
                    </a>

                    <a href={`tel:${activeLead.phone}`}>Call</a>

                    <a href={`mailto:${activeLead.email}`}>Email</a>
                  </div>
                </>
              ) : (
                <div className="empty">No contact selected.</div>
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
            padding: 28px;
            overflow: hidden;
          }

          header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 22px;
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
            font-size: 34px;
            letter-spacing: -1px;
          }

          header button,
          .composer button {
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

          .inboxShell {
            height: calc(100vh - 120px);
            display: grid;
            grid-template-columns: 330px 1fr 310px;
            gap: 18px;
          }

          .chatList,
          .conversation,
          .profile {
            background: #fff;
            border: 1px solid #e4eee8;
            border-radius: 26px;
            box-shadow: 0 18px 50px rgba(8, 42, 31, 0.05);
            overflow: hidden;
          }

          .chatList {
            padding: 16px;
            overflow-y: auto;
          }

          .chatList input,
          .composer input,
          .info input {
            width: 100%;
            border: 1px solid #dcebe5;
            border-radius: 14px;
            outline: none;
            font-weight: 800;
            background: #fff;
          }

          .chatList input {
            height: 46px;
            padding: 0 14px;
            margin-bottom: 12px;
          }

          .filters {
            display: flex;
            gap: 8px;
            margin-bottom: 14px;
          }

          .filters button {
            border: 1px solid #dcebe5;
            background: #fff;
            border-radius: 999px;
            padding: 8px 12px;
            font-weight: 850;
            cursor: pointer;
          }

          .filters button.active {
            background: #e8f7ef;
            color: #075e54;
          }

          .chat {
            display: flex;
            gap: 12px;
            padding: 14px;
            border-radius: 18px;
            margin-bottom: 10px;
            cursor: pointer;
            border: 1px solid transparent;
          }

          .chat.active {
            background: #e8f7ef;
            border-color: #bde9cf;
          }

          .avatar,
          .bigAvatar {
            border-radius: 50%;
            background: #075e54;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 950;
          }

          .avatar {
            width: 42px;
            height: 42px;
            flex: 0 0 42px;
          }

          .chat strong,
          .chat small,
          .chat em {
            display: block;
          }

          .chat small {
            color: #668078;
            margin-top: 3px;
          }

          .chat p {
            color: #58746c;
            line-height: 1.4;
            margin: 8px 0;
            font-size: 13px;
          }

          .chat em {
            color: #075e54;
            font-size: 12px;
            font-style: normal;
            font-weight: 900;
          }

          .conversation {
            display: flex;
            flex-direction: column;
          }

          .convHeader {
            padding: 18px 20px;
            border-bottom: 1px solid #e4eee8;
            display: flex;
            justify-content: space-between;
            gap: 16px;
            align-items: center;
          }

          .convHeader h2 {
            margin: 0 0 5px;
          }

          .convHeader span {
            color: #668078;
            font-size: 13px;
          }

          .headerActions {
            display: flex;
            gap: 8px;
          }

          .headerActions a {
            background: #075e54;
            color: #fff;
            text-decoration: none;
            border-radius: 14px;
            padding: 11px 13px;
            font-weight: 900;
            font-size: 13px;
            white-space: nowrap;
          }

          .messages {
            flex: 1;
            padding: 24px;
            background: #f6fbf8;
            overflow-y: auto;
          }

          .dateLine {
            text-align: center;
            color: #58746c;
            font-weight: 900;
            font-size: 12px;
            text-transform: uppercase;
            margin-bottom: 16px;
          }

          .bubble {
            max-width: 74%;
            padding: 14px 16px;
            border-radius: 18px;
            margin-bottom: 14px;
            line-height: 1.55;
          }

          .bubble small {
            display: block;
            margin-top: 7px;
            color: #6e827b;
            font-size: 11px;
          }

          .incoming {
            background: #fff;
            border: 1px solid #e0ebe6;
          }

          .outgoing {
            background: #dcf8c6;
            margin-left: auto;
          }

          .crmCard {
            max-width: 430px;
            background: #fff;
            border: 1px solid #bde9cf;
            border-left: 5px solid #25d366;
            border-radius: 18px;
            padding: 16px;
            margin: 12px auto 18px;
          }

          .crmCard p {
            color: #58746c;
            margin: 8px 0 0;
            line-height: 1.7;
          }

          .composer {
            padding: 16px;
            border-top: 1px solid #e4eee8;
            display: grid;
            grid-template-columns: 1fr 90px;
            gap: 10px;
          }

          .composer input {
            height: 48px;
            padding: 0 14px;
          }

          .profile {
            padding: 20px;
            overflow-y: auto;
          }

          .profile h3 {
            margin: 0 0 18px;
          }

          .profileCard {
            text-align: center;
            background: #f8fcfa;
            border: 1px solid #e4eee8;
            border-radius: 22px;
            padding: 22px;
            margin-bottom: 18px;
          }

          .bigAvatar {
            width: 70px;
            height: 70px;
            margin: 0 auto 12px;
            font-size: 28px;
          }

          .profileCard h2 {
            margin: 0;
          }

          .profileCard p {
            color: #58746c;
          }

          label {
            display: block;
            margin: 14px 0 7px;
            color: #58746c;
            font-size: 12px;
            font-weight: 950;
            text-transform: uppercase;
          }

          .info input {
            height: 46px;
            padding: 0 12px;
          }

          .quickActions {
            display: grid;
            grid-template-columns: 1fr;
            gap: 10px;
            margin-top: 18px;
          }

          .quickActions a {
            text-align: center;
            background: #25d366;
            color: #05251d;
            text-decoration: none;
            padding: 13px;
            border-radius: 14px;
            font-weight: 950;
          }

          .empty,
          .noChat {
            background: #f8fcfa;
            border: 1px dashed #dcebe5;
            border-radius: 18px;
            padding: 24px;
            color: #58746c;
            font-weight: 800;
          }

          .noChat {
            margin: 24px;
          }

          @media (max-width: 1200px) {
            .inboxShell {
              grid-template-columns: 300px 1fr;
            }

            .profile {
              display: none;
            }
          }

          @media (max-width: 900px) {
            .app {
              flex-direction: column;
            }

            aside {
              width: 100%;
              min-height: auto;
            }

            .content {
              overflow: visible;
            }

            .inboxShell {
              height: auto;
              grid-template-columns: 1fr;
            }

            .conversation {
              min-height: 650px;
            }

            .convHeader,
            header {
              align-items: flex-start;
              flex-direction: column;
            }

            .headerActions {
              flex-wrap: wrap;
            }

            .bubble {
              max-width: 100%;
            }
          }
        `}</style>
      </main>
    </AuthGuard>
  );
}
