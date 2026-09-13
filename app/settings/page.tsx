"use client";
import AuthGuard from "../AuthGuard";
export default function SettingsPage() {
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
          <a className="active" href="/settings">Settings</a>
        </nav>
      </aside>

      <section className="content">
        <header>
          <div>
            <span>System configuration</span>
            <h1>Settings</h1>
          </div>

          <button>Save Changes</button>
        </header>

        <div className="grid">
          <div className="card">
            <h2>Meta WhatsApp API</h2>

            <div className="status success">
              <strong>Connected</strong>
              <p>Your WhatsApp Business API is connected and ready.</p>
            </div>

            <label>WhatsApp Business Account ID</label>
            <input placeholder="Enter WABA ID" />

            <label>Phone Number ID</label>
            <input placeholder="Enter Phone Number ID" />

            <label>Business Phone Number</label>
            <input placeholder="+971 50 000 0000" />

            <label>Permanent Access Token</label>
            <input type="password" placeholder="Enter Meta access token" />

            <button className="primary">Update Meta Settings</button>
          </div>

          <div className="card">
            <h2>Webhook Settings</h2>

            <label>Webhook URL</label>
            <input value="https://whatsapp-hub.com/api/meta/webhook" readOnly />

            <label>Verify Token</label>
            <input value="whatsapp_hub_verify_token" readOnly />

            <div className="status">
              <strong>Webhook Events</strong>
              <p>Messages, delivery status, read status and template updates.</p>
            </div>

            <button className="secondary">Copy Webhook Details</button>
          </div>

          <div className="card">
            <h2>Business Profile</h2>

            <label>Company Name</label>
            <input placeholder="Your company name" />

            <label>Support Email</label>
            <input placeholder="support@yourcompany.com" />

            <label>Default Agent</label>
            <select>
              <option>Sales Team</option>
              <option>Marketing Team</option>
              <option>Support Team</option>
            </select>

            <label>Timezone</label>
            <select>
              <option>Asia/Dubai</option>
              <option>Asia/Kolkata</option>
              <option>Europe/London</option>
            </select>

            <button className="primary">Save Business Profile</button>
          </div>

          <div className="card">
            <h2>Sending Rules</h2>

            <label>Daily Campaign Limit</label>
            <input value="1000" readOnly />

            <label>Delay Between Messages</label>
            <select>
              <option>2 seconds</option>
              <option>5 seconds</option>
              <option>10 seconds</option>
            </select>

            <label>Failed Message Retry</label>
            <select>
              <option>Retry once</option>
              <option>Retry twice</option>
              <option>No retry</option>
            </select>

            <div className="warning">
              <strong>Important</strong>
              <p>Only approved WhatsApp templates should be used for marketing campaigns.</p>
            </div>
          </div>

          <div className="card wide">
            <h2>Team Members</h2>

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Sales Team</td>
                  <td>sales@company.com</td>
                  <td>Agent</td>
                  <td><em>Active</em></td>
                </tr>

                <tr>
                  <td>Marketing Manager</td>
                  <td>marketing@company.com</td>
                  <td>Admin</td>
                  <td><em>Active</em></td>
                </tr>

                <tr>
                  <td>Support Team</td>
                  <td>support@company.com</td>
                  <td>Agent</td>
                  <td><em>Active</em></td>
                </tr>
              </tbody>
            </table>

            <button className="secondary addUser">Add Team Member</button>
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

        button {
          border: 0;
          border-radius: 14px;
          font-weight: 950;
          cursor: pointer;
        }

        header button,
        .primary {
          background: #25d366;
          color: #05251d;
        }

        header button {
          padding: 14px 18px;
        }

        .secondary {
          background: #075e54;
          color: #fff;
          padding: 13px 16px;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
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

        .primary {
          width: 100%;
          height: 52px;
          margin-top: 20px;
        }

        .status,
        .warning {
          border-radius: 18px;
          padding: 18px;
          margin-bottom: 18px;
        }

        .status {
          background: #e8f7ef;
          border: 1px solid #bde9cf;
        }

        .warning {
          background: #fff4db;
          border: 1px solid #f6d88a;
          margin-top: 20px;
        }

        .status p,
        .warning p {
          margin: 8px 0 0;
          color: #58746c;
          line-height: 1.5;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
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

        .addUser {
          margin-top: 4px;
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

          header {
            align-items: flex-start;
            flex-direction: column;
            gap: 14px;
          }
        }
      `}</style>
    </main>
      </AuthGuard>
  );
}
