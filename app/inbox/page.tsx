"use client";
import AuthGuard from "../AuthGuard";
export default function InboxPage() {
  const chats = [
    {
      name: "Ayesha Khan",
      phone: "+971 50 426 5343",
      message: "Hi, I want to connect WhatsApp with my CRM.",
      status: "New lead",
      active: true,
    },
    {
      name: "Dubai Properties",
      phone: "+971 55 360 2141",
      message: "Can you send campaign pricing?",
      status: "Unassigned",
    },
    {
      name: "Real Estate Team",
      phone: "+971 56 889 4404",
      message: "Need Bitrix24 integration demo.",
      status: "In progress",
    },
    {
      name: "Marketing Client",
      phone: "+971 52 222 9988",
      message: "Yes, send me the package details.",
      status: "Campaign reply",
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
          <a className="active" href="/app/inbox">Inbox</a>
          <a href="/campaigns">Campaigns</a>
          <a href="/templates">Templates</a>
          <a href="/contacts">Contacts</a>
          <a href="/crm-sync">CRM Sync</a>
          <a href="/settings">Settings</a>
        </nav>
      </aside>

      <section className="content">
        <header>
          <div>
            <span>Agent workspace</span>
            <h1>WhatsApp Inbox</h1>
          </div>

          <button>New Conversation</button>
        </header>

        <div className="inboxShell">
          <div className="chatList">
            <input placeholder="Search chats, names or numbers" />

            <div className="filters">
              <button className="active">All</button>
              <button>Unassigned</button>
              <button>Mine</button>
            </div>

            {chats.map((chat) => (
              <div className={`chat ${chat.active ? "active" : ""}`} key={chat.phone}>
                <div className="avatar">{chat.name.charAt(0)}</div>
                <div>
                  <strong>{chat.name}</strong>
                  <small>{chat.phone}</small>
                  <p>{chat.message}</p>
                  <em>{chat.status}</em>
                </div>
              </div>
            ))}
          </div>

          <div className="conversation">
            <div className="convHeader">
              <div>
                <h2>Ayesha Khan</h2>
                <span>+971 50 426 5343 • New lead • Assigned to Sales Team</span>
              </div>

              <div className="headerActions">
                <button>Sync CRM</button>
                <button>Assign</button>
              </div>
            </div>

            <div className="messages">
              <div className="bubble incoming">
                Hi, I want to connect WhatsApp with my CRM.
                <small>10:42 AM</small>
              </div>

              <div className="bubble outgoing">
                Sure. We can connect Meta WhatsApp Cloud API with Bitrix24, create leads automatically and keep chat history inside your CRM.
                <small>10:43 AM</small>
              </div>

              <div className="crmCard">
                <strong>CRM Lead Created</strong>
                <p>Lead source: WhatsApp Inbox</p>
                <span>Pipeline: New Lead</span>
              </div>

              <div className="bubble incoming">
                Perfect. Please send me demo details.
                <small>10:45 AM</small>
              </div>
            </div>

            <div className="composer">
              <input placeholder="Type a message..." />
              <button>Send</button>
            </div>
          </div>

          <div className="profile">
            <h3>Contact Details</h3>

            <div className="profileCard">
              <div className="bigAvatar">A</div>
              <h2>Ayesha Khan</h2>
              <p>+971 50 426 5343</p>
            </div>

            <div className="info">
              <label>Status</label>
              <select>
                <option>New Lead</option>
                <option>In Progress</option>
                <option>Qualified</option>
                <option>Lost</option>
              </select>

              <label>Assigned Agent</label>
              <select>
                <option>Sales Team</option>
                <option>Marketing Team</option>
                <option>Support Team</option>
              </select>

              <label>CRM Deal</label>
              <input value="Bitrix24 Lead #1024" readOnly />
            </div>

            <div className="notes">
              <h4>Internal Notes</h4>
              <textarea placeholder="Add private team note..." />
              <button>Save Note</button>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        * { box-sizing: border-box; }

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
        }

        h1 {
          margin: 7px 0 0;
          font-size: 34px;
        }

        header button,
        .composer button,
        .notes button,
        .headerActions button {
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
        .info input,
        .info select,
        textarea {
          width: 100%;
          border: 1px solid #dcebe5;
          border-radius: 14px;
          outline: none;
          font-weight: 700;
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

        .headerActions button {
          padding: 10px 13px;
        }

        .messages {
          flex: 1;
          padding: 24px;
          background:
            linear-gradient(rgba(246, 251, 248, 0.92), rgba(246, 251, 248, 0.92));
          overflow-y: auto;
        }

        .bubble {
          max-width: 70%;
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
          max-width: 360px;
          background: #fff;
          border: 1px solid #bde9cf;
          border-left: 5px solid #25d366;
          border-radius: 18px;
          padding: 16px;
          margin: 12px auto 18px;
        }

        .crmCard p,
        .crmCard span {
          color: #58746c;
          margin: 7px 0 0;
          display: block;
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

        .info input,
        .info select {
          height: 46px;
          padding: 0 12px;
          background: #fff;
        }

        .notes {
          margin-top: 22px;
        }

        .notes h4 {
          margin-bottom: 10px;
        }

        textarea {
          min-height: 100px;
          padding: 12px;
          resize: vertical;
        }

        .notes button {
          width: 100%;
          height: 46px;
          margin-top: 10px;
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

          .inboxShell {
            height: auto;
            grid-template-columns: 1fr;
          }

          .conversation {
            min-height: 650px;
          }
        }
      `}</style>
    </main>
      </AuthGuard>
  );
}
