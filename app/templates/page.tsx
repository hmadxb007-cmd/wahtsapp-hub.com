"use client";
import AuthGuard from "../AuthGuard";
export default function TemplatesPage() {
  const templates = [
    {
      name: "property_offer_template",
      category: "Marketing",
      status: "Approved",
      language: "English",
      body: "Discover exclusive Dubai property offers. Reply YES for details.",
    },
    {
      name: "crm_demo_invite",
      category: "Utility",
      status: "Approved",
      language: "English",
      body: "Hi {{1}}, your WhatsApp CRM demo is confirmed for {{2}}.",
    },
    {
      name: "appointment_reminder_template",
      category: "Utility",
      status: "Approved",
      language: "English",
      body: "Reminder: your appointment is scheduled for {{1}} at {{2}}.",
    },
    {
      name: "new_launch_invitation",
      category: "Marketing",
      status: "Pending",
      language: "English",
      body: "You are invited to our new launch event. Reply INFO for details.",
    },
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
          <a className="active" href="/templates">Templates</a>
          <a href="/contacts">Contacts</a>
          <a href="/crm-sync">CRM Sync</a>
          <a href="/settings">Settings</a>
        </nav>
      </aside>

      <section className="content">
        <header>
          <div>
            <span>Meta WhatsApp templates</span>
            <h1>Message Templates</h1>
          </div>

          <button>Create Template</button>
        </header>

        <div className="topGrid">
          <div className="stat">
            <span>Approved</span>
            <b>12</b>
          </div>
          <div className="stat">
            <span>Pending Review</span>
            <b>3</b>
          </div>
          <div className="stat">
            <span>Rejected</span>
            <b>1</b>
          </div>
          <div className="stat">
            <span>Languages</span>
            <b>2</b>
          </div>
        </div>

        <div className="grid">
          <div className="card builder">
            <h2>Create Template</h2>

            <label>Template Name</label>
            <input placeholder="example_offer_template" />

            <label>Category</label>
            <select>
              <option>Marketing</option>
              <option>Utility</option>
              <option>Authentication</option>
            </select>

            <label>Language</label>
            <select>
              <option>English</option>
              <option>Arabic</option>
            </select>

            <label>Message Body</label>
            <textarea placeholder="Hi {{1}}, we have a special offer for you. Reply YES for details." />

            <div className="hint">
              <strong>Template Variables</strong>
              <p>Use variables like {"{{1}}"}, {"{{2}}"} for customer name, date, price or appointment time.</p>
            </div>

            <button className="primary">Submit for Approval</button>
          </div>

          <div className="card preview">
            <h2>WhatsApp Preview</h2>

            <div className="phone">
              <div className="phoneTop">
                <strong>Your Business</strong>
                <span>Template message</span>
              </div>

              <div className="message">
                Hi Ahmed, we have a special Dubai property offer for you. Reply YES for details.
              </div>

              <button className="quickReply">YES</button>
            </div>
          </div>

          <div className="card wide">
            <h2>Template Library</h2>

            <div className="templateList">
              {templates.map((template) => (
                <div className="template" key={template.name}>
                  <div>
                    <strong>{template.name}</strong>
                    <p>{template.body}</p>
                    <small>{template.category} • {template.language}</small>
                  </div>

                  <em className={template.status === "Pending" ? "pending" : ""}>
                    {template.status}
                  </em>
                </div>
              ))}
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

        .topGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin-bottom: 18px;
        }

        .stat,
        .card {
          background: #fff;
          border: 1px solid #e4eee8;
          border-radius: 26px;
          padding: 24px;
          box-shadow: 0 18px 50px rgba(8, 42, 31, 0.05);
        }

        .stat span {
          color: #58746c;
          font-weight: 800;
        }

        .stat b {
          display: block;
          font-size: 34px;
          margin-top: 8px;
        }

        .grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
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
        select,
        textarea {
          width: 100%;
          border: 1px solid #dcebe5;
          border-radius: 14px;
          padding: 0 14px;
          font-weight: 800;
          outline: none;
          background: #fff;
        }

        input,
        select {
          height: 50px;
        }

        textarea {
          min-height: 130px;
          padding-top: 14px;
          resize: vertical;
          line-height: 1.5;
        }

        input:focus,
        select:focus,
        textarea:focus {
          border-color: #25d366;
        }

        .hint {
          background: #f1faf5;
          border: 1px solid #dcebe5;
          border-radius: 18px;
          padding: 16px;
          margin: 18px 0;
        }

        .hint p {
          margin: 8px 0 0;
          color: #58746c;
          line-height: 1.5;
        }

        .primary {
          width: 100%;
          height: 52px;
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

        .quickReply {
          width: 100%;
          margin-top: 12px;
          height: 44px;
          border: 0;
          border-radius: 14px;
          background: #dcf8c6;
          color: #075e54;
          font-weight: 950;
        }

        .templateList {
          display: grid;
          gap: 14px;
        }

        .template {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          align-items: center;
          border: 1px solid #e4eee8;
          border-radius: 18px;
          padding: 18px;
          background: #f8fcfa;
        }

        .template p {
          margin: 8px 0;
          color: #58746c;
          line-height: 1.5;
        }

        .template small {
          color: #075e54;
          font-weight: 900;
        }

        em {
          background: #e8f7ef;
          color: #075e54;
          padding: 8px 12px;
          border-radius: 999px;
          font-style: normal;
          font-weight: 950;
          font-size: 12px;
          white-space: nowrap;
        }

        em.pending {
          background: #fff4db;
          color: #9a6500;
        }

        @media (max-width: 1000px) {
          .app {
            flex-direction: column;
          }

          aside {
            width: 100%;
            min-height: auto;
          }

          .topGrid,
          .grid {
            grid-template-columns: 1fr;
          }

          .wide {
            grid-column: span 1;
          }
        }
      `}</style>
    </main>
      </AuthGuard>
  );
}
