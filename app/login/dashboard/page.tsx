"use client";

export default function DashboardPage() {
  return (
    <main className="dashboard">
      <aside>
        <div className="brand">
          <div>W</div>
          <strong>WhatsApp Hub</strong>
        </div>

        <nav>
          <a className="active">Dashboard</a>
          <a>Inbox</a>
          <a>Campaigns</a>
          <a>Templates</a>
          <a>Contacts</a>
          <a>CRM Sync</a>
          <a>Settings</a>
        </nav>
      </aside>

      <section>
        <header>
          <div>
            <span>Client workspace</span>
            <h1>WhatsApp Business Dashboard</h1>
          </div>

          <a href="/">Visit Website</a>
        </header>

        <div className="stats">
          <div>
            <span>Messages sent</span>
            <b>12,450</b>
          </div>
          <div>
            <span>Leads synced</span>
            <b>532</b>
          </div>
          <div>
            <span>Active campaigns</span>
            <b>8</b>
          </div>
          <div>
            <span>Open chats</span>
            <b>41</b>
          </div>
        </div>

        <div className="grid">
          <div className="card inbox">
            <h2>Agent Inbox</h2>

            <div className="chat">
              <strong>New WhatsApp Lead</strong>
              <p>Hi, I am interested in your service.</p>
            </div>

            <div className="chat">
              <strong>CRM Client</strong>
              <p>Can you connect Bitrix24 with WhatsApp?</p>
            </div>

            <div className="chat">
              <strong>Campaign Reply</strong>
              <p>Yes, please send me more details.</p>
            </div>
          </div>

          <div className="card">
            <h2>Campaign Builder</h2>

            <label>Campaign name</label>
            <input value="September Offers Campaign" readOnly />

            <label>Template</label>
            <input value="approved_offer_template" readOnly />

            <div className="miniStats">
              <div>Imported: 2,350</div>
              <div>Ready to send</div>
            </div>

            <button>Start Campaign</button>
          </div>

          <div className="card">
            <h2>CRM Sync</h2>
            <p>Bitrix24 connected. New WhatsApp leads are synced automatically.</p>

            <div className="steps">
              <div>New Lead</div>
              <div>Copy Number</div>
              <div>Assign Agent</div>
              <div>Sync CRM</div>
            </div>
          </div>

          <div className="card">
            <h2>Connection Status</h2>

            <div className="status">✓ Meta WhatsApp API Connected</div>
            <div className="status">✓ Bitrix24 Connected</div>
            <div className="status">✓ Templates Synced</div>
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
          width: 260px;
          background: #061812;
          color: #fff;
          padding: 24px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 35px;
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
        }

        nav a.active {
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
        }

        h1 {
          margin: 7px 0 0;
          font-size: 34px;
        }

        header a {
          background: #075e54;
          color: #fff;
          padding: 13px 18px;
          border-radius: 14px;
          text-decoration: none;
          font-weight: 900;
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

        h2 {
          margin: 0 0 18px;
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
          margin-bottom: 0;
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
        }

        .miniStats,
        .steps {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin: 18px 0;
        }

        .miniStats div,
        .steps div,
        .status {
          background: #e8f7ef;
          border-radius: 14px;
          padding: 13px;
          font-weight: 850;
          color: #075e54;
        }

        button {
          width: 100%;
          height: 50px;
          border: 0;
          border-radius: 15px;
          background: #25d366;
          color: #05251d;
          font-weight: 950;
          cursor: pointer;
        }

        .status {
          margin-bottom: 12px;
        }

        @media (max-width: 900px) {
          .dashboard {
            flex-direction: column;
          }

          aside {
            width: 100%;
          }

          .stats,
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
