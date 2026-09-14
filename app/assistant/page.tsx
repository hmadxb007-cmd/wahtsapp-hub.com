"use client";

import { useState } from "react";
import AuthGuard from "../AuthGuard";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

export default function AssistantPage() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Hello, I am your WhatsApp Hub assistant. Ask me about campaigns, DNC contacts, interested leads, templates, safe campaign plans, CRM, or Meta settings.",
    },
  ]);

  async function askAssistant(customQuestion?: string) {
    const finalQuestion = customQuestion || question;

    if (!finalQuestion.trim()) {
      alert("Please type a question.");
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: finalQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: finalQuestion,
        }),
      });

      const data = await res.json();

      if (data.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: data.answer,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: "I could not process this question.",
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Assistant API is not responding. Please check deployment.",
        },
      ]);
    }

    setLoading(false);
  }

  const quickQuestions = [
    "Show me interested contacts",
    "Show me DNC numbers",
    "Explain campaign performance",
    "Create safe campaign plan",
    "How many templates are approved?",
    "Check Meta and CRM settings",
    "What should I reply to interested customer?",
  ];

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
            <a href="/crm-sync">CRM Sync</a>
            <a className="active" href="/assistant">AI Assistant</a>
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
              <span>Smart system helper</span>
              <h1>AI Assistant</h1>
            </div>

            <button onClick={() => askAssistant("Create safe campaign plan")}>
              Safe Campaign Plan
            </button>
          </header>

          <div className="grid">
            <div className="card chatCard">
              <h2>Ask Anything About Your System</h2>

              <div className="chatBox">
                {messages.map((message, index) => (
                  <div
                    className={
                      message.role === "assistant"
                        ? "message assistant"
                        : "message user"
                    }
                    key={`${message.role}-${index}`}
                  >
                    <strong>
                      {message.role === "assistant" ? "Assistant" : "You"}
                    </strong>
                    <p>{message.text}</p>
                  </div>
                ))}

                {loading && (
                  <div className="message assistant">
                    <strong>Assistant</strong>
                    <p>Checking your system data...</p>
                  </div>
                )}
              </div>

              <div className="askBox">
                <input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") askAssistant();
                  }}
                  placeholder="Example: show me interested contacts"
                />

                <button onClick={() => askAssistant()}>
                  {loading ? "Thinking..." : "Ask"}
                </button>
              </div>
            </div>

            <div className="card sideCard">
              <h2>Quick Questions</h2>

              <div className="quickList">
                {quickQuestions.map((item) => (
                  <button key={item} onClick={() => askAssistant(item)}>
                    {item}
                  </button>
                ))}
              </div>

              <div className="info">
                <strong>Current Mode</strong>
                <p>
                  This assistant is now using your saved JSON data. Later we will
                  connect OpenAI API for advanced natural replies and deeper
                  analysis.
                </p>
              </div>
            </div>

            <div className="card wide">
              <h2>What This Assistant Can Do</h2>

              <div className="features">
                <div>
                  <b>Campaign Checks</b>
                  <p>Ask campaign performance, latest campaign, sent count, replies and safe next action.</p>
                </div>

                <div>
                  <b>Safety Contacts</b>
                  <p>Ask about DNC, Not Interested, No Reply and Interested contact lists.</p>
                </div>

                <div>
                  <b>Reply Suggestions</b>
                  <p>Ask what to reply to customers based on your saved bot reply settings.</p>
                </div>

                <div>
                  <b>Setup Status</b>
                  <p>Check whether Meta settings, CRM webhook and templates are ready.</p>
                </div>
              </div>
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
            gap: 18px;
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
          .askBox button,
          .quickList button {
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
            grid-template-columns: 1.3fr 0.7fr;
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

          .chatBox {
            height: 520px;
            overflow: auto;
            background: #f8fcfa;
            border: 1px solid #e4eee8;
            border-radius: 22px;
            padding: 18px;
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .message {
            max-width: 85%;
            border-radius: 18px;
            padding: 14px 16px;
          }

          .message strong {
            display: block;
            font-size: 12px;
            text-transform: uppercase;
            margin-bottom: 6px;
          }

          .message p {
            margin: 0;
            line-height: 1.6;
          }

          .assistant {
            background: #fff;
            border: 1px solid #e4eee8;
            align-self: flex-start;
          }

          .user {
            background: #dcf8c6;
            align-self: flex-end;
          }

          .askBox {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 10px;
            margin-top: 16px;
          }

          .askBox input {
            height: 52px;
            border: 1px solid #dcebe5;
            border-radius: 14px;
            padding: 0 16px;
            font-weight: 800;
            outline: none;
          }

          .askBox input:focus {
            border-color: #25d366;
          }

          .askBox button {
            padding: 0 24px;
          }

          .quickList {
            display: grid;
            gap: 10px;
          }

          .quickList button {
            padding: 14px;
            text-align: left;
          }

          .info {
            margin-top: 20px;
            background: #f1faf5;
            border: 1px solid #dcebe5;
            border-radius: 18px;
            padding: 16px;
          }

          .info p {
            margin: 8px 0 0;
            color: #58746c;
            line-height: 1.6;
          }

          .features {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 14px;
          }

          .features div {
            background: #f8fcfa;
            border: 1px solid #e4eee8;
            border-radius: 18px;
            padding: 16px;
          }

          .features p {
            color: #58746c;
            line-height: 1.5;
            margin-bottom: 0;
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
            .features {
              grid-template-columns: 1fr;
            }

            .wide {
              grid-column: span 1;
            }

            header {
              align-items: flex-start;
              flex-direction: column;
            }

            .askBox {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </main>
    </AuthGuard>
  );
}
