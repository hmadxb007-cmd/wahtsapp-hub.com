"use client";

import { useState } from "react";
import AuthGuard from "../AuthGuard";

export default function MetaTestPage() {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState(
    "Hello from WhatsApp Hub. This is a Meta Cloud API test message."
  );
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function sendTestMessage() {
    if (!to || !message) {
      alert("Please enter phone number and message.");
      return;
    }

    setSending(true);
    setResult(null);

    try {
      const res = await fetch("/api/meta/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to,
          message,
        }),
      });

      const data = await res.json();
      setResult(data);

      if (data.ok) {
        alert("Test message sent successfully.");
      } else {
        alert(data.error || "Message failed.");
      }
    } catch (error) {
      alert("Send API is not responding.");
    }

    setSending(false);
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
            <a href="/safety-contacts">Safety Contacts</a>
            <a href="/crm-sync">CRM Sync</a>
            <a href="/assistant">AI Assistant</a>
            <a href="/meta-logs">Meta Logs</a>
            <a href="/meta-sent">Sent Logs</a>
            <a className="active" href="/meta-test">Meta Test</a>
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
              <span>Meta Cloud API testing</span>
              <h1>Meta Test Sender</h1>
            </div>

            <button onClick={sendTestMessage}>
              {sending ? "Sending..." : "Send Test"}
            </button>
          </header>

          <div className="banner">
            <div>
              <strong>Send One WhatsApp Test Message</strong>
              <p>
                Use this page to test your Meta Phone Number ID and Access Token
                from Settings before activating real campaign sending or auto
                replies.
              </p>
            </div>
            <a href="/settings">Open Settings</a>
          </div>

          <div className="grid">
            <div className="card">
              <h2>Test Message</h2>

              <label>Recipient Phone Number</label>
              <input
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Example: 971553602141"
              />

              <label>Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type test message..."
              />

              <button className="primary" onClick={sendTestMessage}>
                {sending ? "Sending Test Message..." : "Send Test Message"}
              </button>

              <div className="note">
                <strong>Important</strong>
                <p>
                  If you are using a real Meta WhatsApp number, customer care
                  window and template rules still apply. For testing, use your
                  Meta test recipient number first.
                </p>
              </div>
            </div>

            <div className="card">
              <h2>API Result</h2>

              {!result ? (
                <div className="empty">
                  No result yet. Send a test message and the Meta API response
                  will appear here.
                </div>
              ) : (
                <>
                  <div className={result.ok ? "successBox" : "errorBox"}>
                    <strong>{result.ok ? "Success" : "Failed"}</strong>
                    <p>
                      {result.ok
                        ? "Meta accepted the message request."
                        : result.error || "Meta rejected the message request."}
                    </p>
                  </div>

                  <pre>{JSON.stringify(result, null, 2)}</pre>
                </>
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

          .grid {
            display: grid;
            grid-template-columns: 0.85fr 1.15fr;
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
          textarea {
            width: 100%;
            border: 1px solid #dcebe5;
            border-radius: 14px;
            padding: 0 14px;
            font-weight: 800;
            outline: none;
            background: #fff;
          }

          input {
            height: 50px;
          }

          textarea {
            min-height: 150px;
            padding-top: 14px;
            resize: vertical;
            line-height: 1.5;
          }

          input:focus,
          textarea:focus {
            border-color: #25d366;
          }

          .primary {
            width: 100%;
            height: 52px;
            margin-top: 18px;
            font-size: 15px;
          }

          .note,
          .empty,
          .successBox,
          .errorBox {
            border-radius: 18px;
            padding: 18px;
            margin-top: 18px;
          }

          .note {
            background: #f8fcfa;
            border: 1px solid #e4eee8;
          }

          .note p,
          .successBox p,
          .errorBox p {
            color: #58746c;
            line-height: 1.5;
            margin: 7px 0 0;
          }

          .empty {
            background: #f8fcfa;
            border: 1px dashed #dcebe5;
            color: #58746c;
            font-weight: 800;
          }

          .successBox {
            background: #e8f7ef;
            border: 1px solid #bde9cf;
          }

          .errorBox {
            background: #ffe8e8;
            border: 1px solid #ffc4c4;
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
            .banner {
              align-items: flex-start;
              flex-direction: column;
            }

            .grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </main>
    </AuthGuard>
  );
}
