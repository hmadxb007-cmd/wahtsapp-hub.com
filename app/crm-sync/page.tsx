"use client";
import AuthGuard from "../AuthGuard";
export default function CrmSyncPage() {
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
  <a href="/settings">Settings</a>
</nav>
      </aside>

      <section className="content">
        <header>
          <div>
            <span>CRM integration</span>
            <h1>CRM Sync</h1>
          </div>

          <button>Connect CRM</button>
        </header>

        <div className="stats">
          <div>
            <span>Synced Leads</span>
            <b>3,910</b>
          </div>
          <div>
            <span>Pending Sync</span>
            <b>42</b>
          </div>
          <div>
            <span>Failed Sync</span>
            <b>7</b>
          </div>
          <div>
            <span>Connected CRM</span>
            <b>Bitrix24</b>
          </div>
        </div>

        <div className="grid">
          <div className="card">
            <h2>CRM Connection</h2>

            <div className="connected">
              <strong>Bitrix24 Connected</strong>
              <p>Your WhatsApp leads are syncing with Bitrix24 CRM.</p>
            </div>

            <label>CRM Type</label>
            <select>
              <option>Bitrix24</option>
              <option>HubSpot</option>
              <option>Zoho CRM</option>
              <option>Salesforce</option>
              <option>Custom CRM</option>
            </select>

            <label>CRM Webhook / API URL</label>
            <input value="https://your-company.bitrix24.com/rest/..." readOnly />

            <label>Lead Pipeline</label>
            <select>
              <option>New WhatsApp Leads</option>
              <option>Sales Pipeline</option>
              <option>Marketing Leads</option>
            </select>

            <button className="primary">Save CRM Settings</button>
          </div>

          <div className="card">
            <h2>Field Mapping</h2>

            <div className="mapRow">
              <span>WhatsApp Name</span>
              <strong>CRM Contact Name</strong>
            </div>

            <div className="mapRow">
              <span>WhatsApp Phone</span>
              <strong>CRM Phone Number</strong>
            </div>

            <div className="mapRow">
              <span>First Message</span>
              <strong>CRM Lead Comment</strong>
            </div>

            <div className="mapRow">
              <span>Campaign Source</span>
              <strong>CRM Lead Source</strong>
            </div>

            <div className="mapRow">
              <span>Assigned Agent</span>
              <strong>CRM Responsible Person</strong>
            </div>

            <button className="secondary">Edit Mapping</button>
          </div>

          <div className="card wide">
            <h2>Automation Workflow</h2>

            <div className="workflow">
              <div>
                <b>1</b>
                <strong>New WhatsApp Message</strong>
                <p>Customer sends message or replies to campaign.</p>
              </div>

              <span>→</span>

              <div>
                <b>2</b>
                <strong>Lead Detection</strong>
                <p>System checks if contact already exists.</p>
              </div>

              <span>→</span>

              <div>
                <b>3</b>
                <strong>Create / Update CRM</strong>
                <p>Lead, contact and message history are synced.</p>
              </div>

              <span>→</span>

              <div>
                <b>4</b>
                <strong>Assign Agent</strong>
                <p>Sales team receives the new WhatsApp lead.</p>
              </div>
            </div>
          </div>

          <div className="card wide">
            <div className="tableTop">
              <h2>Recent Sync Activity</h2>
              <button className="secondary">View Logs</button>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Contact</th>
                  <th>Phone</th>
                  <th>Action</th>
                  <th>CRM Status</th>
                  <th>Time</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Ayesha Khan</td>
                  <td>+971 50 426 5343</td>
                  <td>Lead Created</td>
                  <td><em>Success</em></td>
                  <td>2 min ago</td>
                </tr>

                <tr>
                  <td>Dubai Properties</td>
                  <td>+971 55 360 2141</td>
                  <td>Contact Updated</td>
                  <td><em>Success</em></td>
                  <td>18 min ago</td>
                </tr>

                <tr>
                  <td>Ahmed Raza</td>
                  <td>+971 56 889 4404</td>
                  <td>Lead Created</td>
                  <td><em className="pending">Pending</em></td>
                  <td>34 min ago</td>
                </tr>

                <tr>
                  <td>Priya Sharma</td>
                  <td>+971 52 222 9988</td>
                  <td>Sync Failed</td>
                  <td><em className="failed">Failed</em></td>
                  <td>1 hour ago</td>
                </tr>
              </tbody>
            </table>
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

        button,
        .primary,
        .secondary {
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
          font-size: 30px;
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

        .connected {
          background: #e8f7ef;
          border: 1px solid #bde9cf;
          border-radius: 18px;
          padding: 18px;
          margin-bottom: 18px;
        }

        .connected p {
          margin: 8px 0 0;
          color: #58746c;
          line-height: 1.5;
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

        .primary {
          width: 100%;
          height: 52px;
          margin-top: 20px;
        }

        .mapRow {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          align-items: center;
          background: #f8fcfa;
          border: 1px solid #e4eee8;
          border-radius: 16px;
          padding: 16px;
          margin-bottom: 12px;
        }

        .mapRow span {
          color: #58746c;
          font-weight: 800;
        }

        .mapRow strong {
          color: #075e54;
        }

        .workflow {
          display: grid;
          grid-template-columns: 1fr 35px 1fr 35px 1fr 35px 1fr;
          gap: 10px;
          align-items: center;
        }

        .workflow div {
          background: #f8fcfa;
          border: 1px solid #e4eee8;
          border-radius: 18px;
          padding: 18px;
          min-height: 160px;
        }

        .workflow b {
          width: 36px;
          height: 36px;
          background: #25d366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }

        .workflow strong {
          display: block;
          margin-bottom: 8px;
        }

        .workflow p {
          color: #58746c;
          line-height: 1.5;
          margin: 0;
        }

        .workflow span {
          color: #075e54;
          font-size: 24px;
          font-weight: 950;
          text-align: center;
        }

        .tableTop {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 18px;
          margin-bottom: 16px;
        }

        .tableTop h2 {
          margin: 0;
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
          white-space: nowrap;
        }

        em.pending {
          background: #fff4db;
          color: #9a6500;
        }

        em.failed {
          background: #ffe8e8;
          color: #b42318;
        }

        @media (max-width: 1100px) {
          .app {
            flex-direction: column;
          }

          aside {
            width: 100%;
            min-height: auto;
          }

          .stats,
          .grid {
            grid-template-columns: 1fr;
          }

          .wide {
            grid-column: span 1;
            overflow-x: auto;
          }

          .workflow {
            grid-template-columns: 1fr;
          }

          .workflow span {
            display: none;
          }
        }
      `}</style>
    </main>
      </AuthGuard>
  );
}
