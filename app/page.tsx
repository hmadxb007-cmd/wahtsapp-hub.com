"use client";

export default function HomePage() {
  return (
    <main className="page">
      <nav className="nav">
        <div className="brand">
          <div className="logo">W</div>
          <span>WAPIHub</span>
        </div>

        <div className="links">
          <a href="#services">Services</a>
          <a href="#platform">Platform</a>
          <a href="#pricing">Pricing</a>
          <a href="#demo">Demo</a>
        </div>

        <a className="navCta" href="#demo">Start Free Trial</a>
      </nav>

      <section className="hero">
        <div className="heroText">
          <div className="badge">Official-style WhatsApp Cloud API • CRM • Campaigns</div>

          <h1>Professional WhatsApp CRM and marketing platform.</h1>

          <p>
            Connect Meta WhatsApp Cloud API with your CRM, manage agent conversations,
            sync leads, import Excel numbers, send approved template campaigns, and
            track every result from one clean business dashboard.
          </p>

          <div className="heroBtns">
            <a className="primary" href="#demo">Request Demo</a>
            <a className="secondary" href="#services">Explore Services</a>
          </div>

          <div className="trusted">
            <span>Works with</span>
            <b>Meta WhatsApp</b>
            <b>Bitrix24</b>
            <b>Zoho</b>
            <b>HubSpot</b>
          </div>
        </div>

        <div className="heroPanel">
          <div className="appTop">
            <span>WAPIHub Dashboard</span>
            <small>Connected</small>
          </div>

          <div className="stats">
            <div>
              <span>Messages Sent</span>
              <b>12,450</b>
            </div>

            <div>
              <span>Leads Synced</span>
              <b>532</b>
            </div>

            <div>
              <span>Delivery Rate</span>
              <b>98%</b>
            </div>
          </div>

          <div className="inbox">
            <div className="chatList">
              <div className="chat active">
                <b>New Lead</b>
                <span>Interested in your service...</span>
              </div>

              <div className="chat">
                <b>Sales Team</b>
                <span>Campaign report ready</span>
              </div>

              <div className="chat">
                <b>CRM Sync</b>
                <span>Bitrix24 lead created</span>
              </div>
            </div>

            <div className="chatBox">
              <div className="bubble left">
                Hi, I want to connect WhatsApp with my CRM.
              </div>

              <div className="bubble right">
                Sure. We can connect your Meta WhatsApp API and sync leads automatically.
              </div>

              <div className="campaignCard">
                <b>Campaign Ready</b>
                <span>2,350 numbers imported from Excel</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="services">
        <div className="sectionHead">
          <span>Two services. One website.</span>
          <h2>Sell CRM integration and WhatsApp marketing together.</h2>
        </div>

        <div className="cards">
          <div className="serviceCard">
            <div className="icon">CRM</div>

            <h3>WhatsApp CRM Integration</h3>

            <p>
              Connect WhatsApp Cloud API with Bitrix24 and other CRMs. Agents can
              chat, assign leads, add notes, and keep full conversation history
              inside the CRM.
            </p>

            <ul>
              <li>Shared team inbox</li>
              <li>Agent assignment</li>
              <li>Lead and contact sync</li>
              <li>Bitrix24 iframe app</li>
            </ul>
          </div>

          <div className="serviceCard highlight">
            <div className="icon">API</div>

            <h3>WhatsApp Marketing Campaigns</h3>

            <p>
              Upload Excel phone numbers, choose approved Meta templates, schedule
              campaigns, and track sent, delivered, read, and failed messages.
            </p>

            <ul>
              <li>Excel number import</li>
              <li>Approved Meta templates</li>
              <li>Campaign throttling</li>
              <li>Delivery reports</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="platform" className="platform">
        <div className="sectionHead">
          <span>Platform modules</span>
          <h2>Everything clients need to run WhatsApp from their CRM.</h2>
        </div>

        <div className="moduleGrid">
          <div>Meta WhatsApp Connection</div>
          <div>CRM Sync Settings</div>
          <div>Agent Inbox</div>
          <div>Message Templates</div>
          <div>Bulk Campaigns</div>
          <div>Automation Workflows</div>
          <div>Analytics Dashboard</div>
          <div>Billing & Subscriptions</div>
        </div>
      </section>

      <section id="pricing" className="pricing">
        <div className="sectionHead">
          <span>Pricing preview</span>
          <h2>Simple plans for different business sizes.</h2>
        </div>

        <div className="priceGrid">
          <div className="priceCard">
            <h3>Starter</h3>
            <b>$49/mo</b>
            <p>For small teams starting with WhatsApp CRM.</p>
          </div>

          <div className="priceCard featured">
            <h3>Growth</h3>
            <b>$149/mo</b>
            <p>CRM integration plus WhatsApp marketing campaigns.</p>
          </div>

          <div className="priceCard">
            <h3>Agency</h3>
            <b>Custom</b>
            <p>For agencies managing multiple clients and WhatsApp numbers.</p>
          </div>
        </div>
      </section>

      <section id="demo" className="demo">
        <div>
          <span>Launch your WhatsApp SaaS</span>
          <h2>Ready to connect WhatsApp, CRM and marketing?</h2>
          <p>This demo section will later become your real signup and lead capture form.</p>
        </div>

        <form className="form">
          <input placeholder="Your name" />
          <input placeholder="Business email" />
          <input placeholder="Phone number" />

          <select>
            <option>WhatsApp CRM Integration</option>
            <option>WhatsApp Marketing Campaigns</option>
            <option>Both services</option>
          </select>

          <button type="button">Request Demo</button>
        </form>
      </section>

      <footer>
        <b>WAPIHub</b>
        <span>WhatsApp CRM Integration & Marketing Platform</span>
      </footer>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .page {
          min-height: 100vh;
          background: #f4f8f6;
          color: #102027;
          font-family: Inter, Arial, sans-serif;
        }

        .nav {
          height: 82px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 7vw;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(18px);
          border-bottom: 1px solid #d9e8e3;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 24px;
          font-weight: 900;
          letter-spacing: -0.5px;
          color: #102027;
        }

        .logo {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: linear-gradient(135deg, #25d366, #075e54);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 12px 28px rgba(37, 211, 102, 0.25);
        }

        .links {
          display: flex;
          gap: 30px;
        }

        .links a,
        .navCta {
          color: #102027;
          text-decoration: none;
          font-weight: 800;
          font-size: 14px;
        }

        .links a:hover {
          color: #075e54;
        }

        .navCta {
          background: #25d366;
          color: #07352f;
          padding: 13px 20px;
          border-radius: 12px;
          box-shadow: 0 12px 26px rgba(37, 211, 102, 0.24);
        }

        .hero {
          display: grid;
          grid-template-columns: 1fr 1.08fr;
          gap: 42px;
          padding: 78px 7vw 62px;
          align-items: center;
          background:
            radial-gradient(circle at 18% 20%, rgba(37, 211, 102, 0.16), transparent 30%),
            radial-gradient(circle at 85% 10%, rgba(7, 94, 84, 0.14), transparent 28%),
            linear-gradient(135deg, #f4f8f6 0%, #ffffff 48%, #e9f8ef 100%);
        }

        .badge {
          display: inline-flex;
          padding: 10px 16px;
          border-radius: 999px;
          background: #e9f8ef;
          color: #075e54;
          font-weight: 900;
          margin-bottom: 20px;
          border: 1px solid #cceadd;
        }

        h1 {
          font-size: clamp(46px, 5.4vw, 82px);
          line-height: 0.94;
          letter-spacing: -3px;
          margin: 0;
          color: #102027;
        }

        .heroText p {
          font-size: 19px;
          line-height: 1.7;
          color: #4b635d;
          max-width: 740px;
          margin: 26px 0;
        }

        .heroBtns {
          display: flex;
          gap: 14px;
          margin-bottom: 30px;
        }

        .primary,
        .secondary {
          padding: 15px 24px;
          border-radius: 14px;
          font-weight: 900;
          text-decoration: none;
        }

        .primary {
          background: #25d366;
          color: #07352f;
          box-shadow: 0 15px 32px rgba(37, 211, 102, 0.25);
        }

        .secondary {
          background: #ffffff;
          color: #102027;
          border: 1px solid #d8e7e2;
        }

        .secondary:hover {
          border-color: #25d366;
        }

        .trusted {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          align-items: center;
          color: #647873;
        }

        .trusted b {
          color: #075e54;
        }

        .heroPanel {
          background: #ffffff;
          border: 1px solid #d9e8e3;
          border-radius: 28px;
          padding: 22px;
          box-shadow: 0 30px 80px rgba(7, 94, 84, 0.12);
        }

        .appTop {
          display: flex;
          justify-content: space-between;
          font-weight: 900;
          margin-bottom: 18px;
        }

        .appTop small {
          background: #e9f8ef;
          color: #075e54;
          padding: 7px 12px;
          border-radius: 999px;
          border: 1px solid #cceadd;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 14px;
        }

        .stats div,
        .priceCard,
        .serviceCard {
          background: #ffffff;
          border: 1px solid #dcebe5;
          border-radius: 18px;
          padding: 18px;
        }

        .stats span {
          display: block;
          color: #647873;
          font-size: 12px;
          margin-bottom: 8px;
        }

        .stats b {
          font-size: 28px;
          color: #102027;
        }

        .inbox {
          display: grid;
          grid-template-columns: 245px 1fr;
          gap: 12px;
        }

        .chatList,
        .chatBox {
          background: #f7fbf9;
          border: 1px solid #dcebe5;
          border-radius: 20px;
          padding: 12px;
        }

        .chat {
          padding: 14px;
          border-radius: 15px;
          margin-bottom: 10px;
          background: #ffffff;
          border: 1px solid transparent;
        }

        .chat.active {
          background: #e9f8ef;
          border-color: #bce8cc;
        }

        .chat b,
        .chat span {
          display: block;
        }

        .chat span {
          color: #647873;
          margin-top: 5px;
          font-size: 12px;
        }

        .chatBox {
          min-height: 300px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .bubble,
        .campaignCard {
          max-width: 78%;
          padding: 13px 15px;
          border-radius: 16px;
          line-height: 1.45;
        }

        .left {
          background: #ffffff;
          align-self: flex-start;
        }

        .right {
          background: #dcf8c6;
          align-self: flex-end;
        }

        .campaignCard {
          background: linear-gradient(135deg, #e9f8ef, #f5fff8);
          border: 1px solid #bce8cc;
          align-self: flex-end;
        }

        .campaignCard span {
          display: block;
          color: #4b635d;
          margin-top: 5px;
        }

        section {
          padding: 68px 7vw;
        }

        .sectionHead {
          text-align: center;
          max-width: 840px;
          margin: 0 auto 38px;
        }

        .sectionHead span {
          color: #075e54;
          font-weight: 900;
        }

        h2 {
          font-size: clamp(34px, 4vw, 56px);
          line-height: 1.05;
          letter-spacing: -1.7px;
          margin: 10px 0 0;
          color: #102027;
        }

        .cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
        }

        .serviceCard {
          padding: 34px;
          box-shadow: 0 20px 55px rgba(7, 94, 84, 0.07);
        }

        .serviceCard.highlight {
          border-color: #25d366;
          background: linear-gradient(180deg, #ffffff, #effbf3);
        }

        .icon {
          width: 58px;
          height: 58px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e9f8ef;
          color: #075e54;
          font-weight: 900;
          margin-bottom: 22px;
          border: 1px solid #cceadd;
        }

        .serviceCard h3 {
          font-size: 30px;
          margin: 0 0 12px;
          color: #102027;
        }

        .serviceCard p {
          color: #4b635d;
          line-height: 1.65;
          font-size: 16px;
        }

        li {
          margin: 10px 0;
          color: #102027;
          font-weight: 800;
        }

        .platform {
          background: #f1f7f4;
        }

        .moduleGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        .moduleGrid div {
          background: #ffffff;
          border: 1px solid #dcebe5;
          border-radius: 16px;
          padding: 22px;
          font-weight: 900;
          text-align: center;
          color: #102027;
        }

        .priceGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .priceCard {
          padding: 32px;
        }

        .priceCard.featured {
          border-color: #25d366;
          transform: translateY(-8px);
          box-shadow: 0 25px 60px rgba(37, 211, 102, 0.13);
        }

        .priceCard h3 {
          font-size: 28px;
          margin: 0 0 15px;
        }

        .priceCard b {
          font-size: 38px;
          color: #075e54;
        }

        .priceCard p {
          color: #647873;
        }

        .demo {
          display: grid;
          grid-template-columns: 1fr 430px;
          gap: 35px;
          background: linear-gradient(135deg, #075e54, #128c7e);
          color: #ffffff;
        }

        .demo span {
          color: #dcf8c6;
          font-weight: 900;
        }

        .demo h2 {
          color: #ffffff;
        }

        .demo p {
          color: #d8f2ef;
          font-size: 18px;
        }

        .form {
          background: #ffffff;
          border-radius: 24px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.12);
        }

        .form input,
        .form select {
          height: 48px;
          border: 1px solid #dcebe5;
          border-radius: 13px;
          padding: 0 14px;
          color: #102027;
        }

        .form button {
          height: 50px;
          border: 0;
          border-radius: 14px;
          background: #25d366;
          color: #07352f;
          font-weight: 900;
          cursor: pointer;
        }

        footer {
          display: flex;
          justify-content: space-between;
          padding: 30px 7vw;
          background: #075e54;
          color: #ffffff;
        }

        footer span {
          color: #d8f2ef;
        }

        @media (max-width: 1050px) {
          .hero,
          .cards,
          .demo {
            grid-template-columns: 1fr;
          }

          .moduleGrid,
          .priceGrid {
            grid-template-columns: 1fr 1fr;
          }

          .inbox {
            grid-template-columns: 1fr;
          }

          .links {
            display: none;
          }
        }

        @media (max-width: 700px) {
          .nav {
            padding: 0 20px;
          }

          .navCta {
            display: none;
          }

          .hero,
          section {
            padding-left: 20px;
            padding-right: 20px;
          }

          h1 {
            font-size: 46px;
            letter-spacing: -2px;
          }

          .stats,
          .moduleGrid,
          .priceGrid {
            grid-template-columns: 1fr;
          }

          .heroBtns {
            flex-direction: column;
          }

          footer {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>
    </main>
  );
}
