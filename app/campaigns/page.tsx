"use client";

export default function CampaignsPage() {
  return (
    <main className="app">
      <aside>
        <a className="brand" href="/">
          <div>W</div>
          <strong>WhatsApp Hub</strong>
        </a>

        <nav>
          <a href="/dashboard">Dashboard</a>
          <a href="/inbox">Inbox</a>
          <a className="active" href="/campaigns">Campaigns</a>
          <a href="/templates">Templates</a>
          <a href="/contacts">Contacts</a>
          <a href="/crm-sync">CRM Sync</a>
          <a href="/settings">Settings</a>
        </nav>
      </aside>

      <section className="content">
        <header>
          <div>
            <span>Marketing workspace</span>
            <h1>WhatsApp Campaigns</h1>
          </div>

          <button>Create Campaign</button>
        </header>

        <div className="grid">
          <div className="card builder">
            <h2>Create New Campaign</h2>

            <label>Campaign Name</label>
            <input placeholder="Example: September Dubai Property Offers" />

            <label>Choose Approved Template</label>
            <select>
              <option>property_offer_template</option>
              <option>appointment_reminder_template</option>
              <option>new_launch_invitation</option>
            </select>

            <div className="row">
              <div>
                <label>Date</label>
                <input type="date" />
              </div>
              <div>
                <label>Time</label>
                <input type="time" />
              </div>
            </div>

            <label>Send Speed</label>
            <input type="range" min="1" max="10" defaultValue="2" />

            <div className="upload">
              <strong>Import Excel Numbers</strong>
              <p>Upload one Excel column with phone numbers only.</p>
              <button>Import File</button>
            </div>

            <button className="primary">Save Campaign</button>
          </div>

          <div className="card preview">
            <h2>Message Preview</h2>

            <div className="phone">
              <div className="phoneTop">
                <strong>Your Business</strong>
                <span>WhatsApp Business</span>
              </div>

              <div className="message">
                🏙️ Discover exclusive Dubai property offers. Reply YES for details.
              </div>

              <div className="message reply">
                YES
              </div>
            </div>

            <div className="statusBox">
              <div>
                <span>Recipients</span>
                <b>2,350</b>
              </div>
              <div>
                <span>Estimated time</span>
                <b>35 min</b>
              </div>
            </div>
          </div>

          <div className="card wide">
            <h2>Recent Campaigns</h2>

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Template</th>
                  <th>Sent</th>
                  <th>Delivered</th>
                  <th>Replies</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Dubai Property Offers</td>
                  <td>property_offer_template</td>
                  <td>12,450</td>
                  <td>10,980</td>
                  <td>532</td>
                  <td><em>Completed</em></td>
                </tr>
                <tr>
                  <td>CRM Demo Invite</td>
                  <td>demo_invitation</td>
                  <td>2,350</td>
                  <td>2,102</td>
                  <td>118</td>
                  <td><em>Completed</em></td>
                </tr>
                <tr>
                  <td>September Follow-up</td>
                  <td>follow_up_template</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td><em className="draft">Draft</em></td>
                </tr>
              </tbody>
            </table>
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
        }

        h1 {
          margin: 7px 0 0;
          font-size: 36px;
        }

        header button,
        .primary,
        .upload button {
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
          grid-template-columns: 1.2fr 0.8fr;
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

        .row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .upload {
          background: #f1faf5;
          border: 1px dashed #25d366;
          border-radius: 18px;
          padding: 18px;
          margin: 20px 0;
        }

        .upload p {
          color: #58746c;
          margin: 8px 0 14px;
        }

        .upload button {
          padding: 12px 16px;
        }

        .primary {
          width: 100%;
          height: 52px;
          font-size: 15px;
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

        .reply {
          background: #dcf8c6;
          margin-left: 80px;
          text-align: center;
          font-weight: 900;
        }

        .statusBox {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 20px;
        }

        .statusBox div {
          background: #f6fbf8;
          border-radius: 16px;
          padding: 16px;
          text-align: center;
        }

        .statusBox span,
        .statusBox b {
          display: block;
        }

        .statusBox span {
          color: #58746c;
          font-size: 12px;
          margin-bottom: 6px;
        }

        .statusBox b {
          font-size: 24px;
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
        }

        em.draft {
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

          .grid {
            grid-template-columns: 1fr;
          }

          .wide {
            grid-column: span 1;
            overflow-x: auto;
          }
        }
      `}</style>
    </main>
  );
}
