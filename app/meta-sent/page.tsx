"use client";

import { useEffect, useState } from "react";
import AuthGuard from "../AuthGuard";

type SentLog = {
  id: string;
  to: string;
  message: string;
  status: string;
  error?: string;
  metaResponse?: any;
  createdAt: string;
};

export default function MetaSentPage() {
  const [logs, setLogs] = useState<SentLog[]>([]);
  const [selectedLog, setSelectedLog] = useState<SentLog | null>(null);

  async function loadLogs() {
    try {
      const res = await fetch("/api/meta/sent-logs", { cache: "no-store" });
      const data = await res.json();

      if (data.ok) {
        setLogs(data.logs || []);
      }
    } catch (error) {
      console.log("Failed to load sent logs", error);
    }
  }

  useEffect(() => {
    loadLogs();
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
            <a href="/contacts">Contacts</a>
            <a href="/safety-contacts">Safety Contacts</a>
            <a href="/crm-sync">CRM Sync</a>
            <a href="/assistant">AI Assistant</a>
            <a href="/meta-logs">Meta Logs</a>
            <a className="active" href="/meta-sent">Sent Logs</a>
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
              <span>Meta WhatsApp outgoing replies</span>
              <h1>Sent Logs</h1>
            </div>

            <button onClick={loadLogs}>Refresh Logs</button>
          </header>

          <div className="banner">
            <div>
              <strong>Bot Reply Sending History</strong>
              <p>
                This page shows WhatsApp bot replies sent through Meta Cloud API,
                including failed sends caused by missing token, wrong phone number
                ID, expired token or Meta API errors.
              </p>
            </div>
            <a href="/meta-logs">Webhook Logs</a>
          </div>

          <div className="card">
            {logs.length === 0 ? (
              <div className="empty">
                No sent logs yet. When the webhook tries to send a bot reply, it
                will appear here.
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>To</th>
                    <th>Status</th>
                    <th>Message</th>
                    <th>Error</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id}>
                      <td>
                        {log.createdAt
                          ? new Date(log.createdAt).toLocaleString()
                          : "-"}
                      </td>
                      <td>
                        <strong>{log.to}</strong>
                      </td>
                      <td>
                        <em
                          className={
                            log.status === "Sent"
                              ? "sent"
                              : log.status === "Failed"
                              ? "failed"
                              : "pending"
                          }
                        >
                          {log.status}
                        </em>
                      </td>
                      <td>{log.message}</td>
                      <td>{log.error || "-"}</td>
                      <td>
                        <button onClick={() => setSelectedLog(log)}>
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {selectedLog && (
          <div className="modalOverlay" onClick={() => setSelectedLog(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modalTop">
                <div>
                  <span>Sent log details</span>
                  <h2>{selectedLog.to}</h2>
                </div>

                <button onClick={() => setSelectedLog(null)}>Close</button>
              </div>

              <div className="details">
                <div>
                  <small>Status</small>
                  <strong>{selectedLog.status}</strong>
                </div>
                <div>
                  <small>Message</small>
                  <p>{selectedLog.message}</p>
                </div>
                <div>
                  <small>Error</small>
                  <p>{selectedLog.error || "-"}</p>
                </div>
              </div>

              <h3>Meta Response</h3>
              <pre>{JSON.stringify(selectedLog.metaResponse || {}, null, 2)}</pre>
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

          header span,
          .modalTop span {
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
          td button,
          .modalTop button {
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

          .banner {
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

          .banner p {
            margin: 6px 0 0;
            color: #58746c;
            line-height: 1.5;
          }

          .banner a {
            background: #075e54;
            color: #fff;
            border-radius: 999px;
            padding: 11px 15px;
            white-space: nowrap;
            text-decoration: none;
            font-weight: 900;
          }

          .card {
            background: #fff;
            border: 1px solid #e4eee8;
            border-radius: 26px;
            padding: 24px;
            box-shadow: 0 18px 50px rgba(8, 42, 31, 0.05);
            overflow-x: auto;
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

          td button {
            padding: 10px 13px;
          }

          em {
            padding: 7px 10px;
            border-radius: 999px;
            font-style: normal;
            font-size: 12px;
            font-weight: 950;
            white-space: nowrap;
          }

          em.sent {
            background: #e8f7ef;
            color: #075e54;
          }

          em.failed {
            background: #ffe8e8;
            color: #b42318;
          }

          em.pending {
            background: #fff4db;
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
            max-width: 900px;
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

          .modalTop h2 {
            margin: 6px 0 0;
          }

          .modalTop button {
            background: #075e54;
            color: #fff;
            padding: 12px 16px;
          }

          .details {
            display: grid;
            gap: 14px;
            margin-bottom: 18px;
          }

          .details div {
            background: #f8fcfa;
            border: 1px solid #e4eee8;
            border-radius: 16px;
            padding: 15px;
          }

          .details small {
            display: block;
            color: #58746c;
            font-size: 12px;
            font-weight: 950;
            text-transform: uppercase;
            margin-bottom: 6px;
          }

          .details p {
            margin: 0;
            line-height: 1.5;
          }

          pre {
            background: #061812;
            color: #e8f7ef;
            border-radius: 18px;
            padding: 18px;
            overflow: auto;
            white-space: pre-wrap;
            line-height: 1.5;
            font-size: 13px;
          }

          @media (max-width: 900px) {
            .app {
              flex-direction: column;
            }

            aside {
              width: 100%;
              min-height: auto;
            }

            header,
            .banner,
            .modalTop {
              align-items: flex-start;
              flex-direction: column;
            }
          }
        `}</style>
      </main>
    </AuthGuard>
  );
}
