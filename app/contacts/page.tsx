"use client";
import AuthGuard from "../AuthGuard";
export default function ContactsPage() {
  const contacts = [
    {
      name: "Ayesha Khan",
      phone: "+971 50 426 5343",
      email: "ayesha@example.com",
      source: "Website Demo",
      status: "New Lead",
      agent: "Sales Team",
    },
    {
      name: "Dubai Properties",
      phone: "+971 55 360 2141",
      email: "info@dubaiproperties.ae",
      source: "Campaign Reply",
      status: "Qualified",
      agent: "Marketing Team",
    },
    {
      name: "Ahmed Raza",
      phone: "+971 56 889 4404",
      email: "ahmed@example.com",
      source: "WhatsApp Inbox",
      status: "In Progress",
      agent: "Sales Team",
    },
    {
      name: "Priya Sharma",
      phone: "+971 52 222 9988",
      email: "priya@example.com",
      source: "Excel Import",
      status: "Imported",
      agent: "Unassigned",
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
          <a href="/templates">Templates</a>
          <a className="active" href="/contacts">Contacts</a>
          <a href="/crm-sync">CRM Sync</a>
          <a href="/settings">Settings</a>
        </nav>
      </aside>

      <section className="content">
        <header>
          <div>
            <span>Customer database</span>
            <h1>Contacts</h1>
          </div>

          <div className="actions">
            <button className="secondary">Import Excel</button>
            <button>Add Contact</button>
          </div>
        </header>

        <div className="stats">
          <div>
            <span>Total Contacts</span>
            <b>18,420</b>
          </div>
          <div>
            <span>WhatsApp Leads</span>
            <b>4,832</b>
          </div>
          <div>
            <span>Synced to CRM</span>
            <b>3,910</b>
          </div>
          <div>
            <span>Unassigned</span>
            <b>246</b>
          </div>
        </div>

        <div className="grid">
          <div className="card formCard">
            <h2>Add New Contact</h2>

            <label>Full Name</label>
            <input placeholder="Customer name" />

            <label>WhatsApp Number</label>
            <input placeholder="+971 50 000 0000" />

            <label>Email</label>
            <input placeholder="customer@example.com" />

            <label>Lead Source</label>
            <select>
              <option>Website Demo</option>
              <option>WhatsApp Inbox</option>
              <option>Marketing Campaign</option>
              <option>Excel Import</option>
              <option>CRM Sync</option>
            </select>

            <button className="primary">Save Contact</button>
          </div>

          <div className="card segmentCard">
            <h2>Segments</h2>

            <div className="segment active">
              <div>
                <strong>All Contacts</strong>
                <p>Complete customer database</p>
              </div>
              <b>18,420</b>
            </div>

            <div className="segment">
              <div>
                <strong>New Leads</strong>
                <p>Fresh WhatsApp enquiries</p>
              </div>
              <b>532</b>
            </div>

            <div className="segment">
              <div>
                <strong>Campaign Replies</strong>
                <p>Contacts who replied to marketing</p>
              </div>
              <b>1,245</b>
            </div>

            <div className="segment">
              <div>
                <strong>CRM Synced</strong>
                <p>Contacts already pushed to CRM</p>
              </div>
              <b>3,910</b>
            </div>
          </div>

          <div className="card wide">
            <div className="tableTop">
              <h2>Contact List</h2>
              <input placeholder="Search contacts..." />
            </div>

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Source</th>
                  <th>Status</th>
                  <th>Agent</th>
                </tr>
              </thead>

              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.phone}>
                    <td>
                      <strong>{contact.name}</strong>
                    </td>
                    <td>{contact.phone}</td>
                    <td>{contact.email}</td>
                    <td>{contact.source}</td>
                    <td>
                      <em>{contact.status}</em>
                    </td>
                    <td>{contact.agent}</td>
                  </tr>
                ))}
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

        .actions {
          display: flex;
          gap: 10px;
        }

        button,
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

        .secondary {
          background: #075e54;
          color: #fff;
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
          font-size: 34px;
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

        .segment {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
          border: 1px solid #e4eee8;
          border-radius: 18px;
          padding: 16px;
          margin-bottom: 12px;
          background: #f8fcfa;
        }

        .segment.active {
          background: #e8f7ef;
          border-color: #bde9cf;
        }

        .segment p {
          margin: 6px 0 0;
          color: #58746c;
        }

        .segment b {
          color: #075e54;
          font-size: 22px;
        }

        .tableTop {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 15px;
        }

        .tableTop h2 {
          margin: 0;
        }

        .tableTop input {
          max-width: 320px;
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
          vertical-align: middle;
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

        @media (max-width: 1000px) {
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

          header,
          .tableTop {
            align-items: flex-start;
            flex-direction: column;
          }

          .tableTop input {
            max-width: 100%;
          }
        }
      `}</style>
    </main>
        </AuthGuard>
  );
}
