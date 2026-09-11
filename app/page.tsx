"use client";

export default function HomePage() {
  return (
    <main className="page">
      <nav className="nav">
        <div className="brand">
          <div className="logo">W</div>
          <div>
            <strong>WAPIHub</strong>
            <small>WhatsApp Business Platform</small>
          </div>
        </div>

        <div className="links">
          <a href="#services">Solutions</a>
          <a href="#integrations">Integrations</a>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
        </div>

        <div className="navActions">
          <a className="login" href="#demo">Login</a>
          <a className="navCta" href="#demo">Get Started</a>
        </div>
      </nav>

      <section className="hero">
        <div className="heroOverlay"></div>

        <div className="heroContent">
          <div className="heroText">
            <div className="badge">Official Meta WhatsApp API • CRM • Campaigns</div>

            <h1>WhatsApp Marketing for real business growth.</h1>

            <p>
              Connect WhatsApp with your CRM, automate campaigns, manage agent
              conversations, sync leads, and turn every chat into a real customer.
            </p>

            <div className="heroBtns">
              <a className="primary" href="#demo">Request a Demo</a>
              <a className="secondary" href="#services">
                <span className="play">▶</span>
                Watch Video
              </a>
            </div>

            <div className="heroStats">
              <div>
                <b>10x</b>
                <span>More engagement</span>
              </div>
              <div>
                <b>70%</b>
                <span>Faster response</span>
              </div>
              <div>
                <b>250+</b>
                <span>Business clients</span>
              </div>
              <div>
                <b>98%</b>
                <span>Delivery rate</span>
              </div>
            </div>
          </div>

          <div className="heroVisual">
            <div className="personCard">
              <div className="personImage"></div>
              <div className="floating aiBox">
                <b>AI Automation</b>
                <span>24/7 Support</span>
              </div>
            </div>

            <div className="phoneMock">
              <div className="phoneTop">
                <div className="whatsIcon">☘</div>
                <div>
                  <b>Your Business</b>
                  <span>Online</span>
                </div>
              </div>

              <div className="phoneChat">
                <div className="msg left">
                  Hi 👋<br />
                  How can we assist you today?
                </div>

                <div className="quickReply">Get a Quote</div>
                <div className="quickReply">Book a Meeting</div>
                <div className="quickReply">View Catalog</div>

                <div className="msg right">
                  Great! I’d like to get a quote.
                </div>
              </div>
            </div>

            <div className="floating leadBox">
              <div className="leadIcon">☎</div>
              <div>
                <b>New Lead</b>
                <span>From WhatsApp</span>
                <small>John • +971 50 123 4567</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="integrations" className="integrations">
        <div className="sectionHead">
          <span>Integrations</span>
          <h2>Works seamlessly with your favorite tools</h2>
          <p>Connect with leading CRMs and business platforms.</p>
        </div>

        <div className="logoGrid">
          <div>Bitrix24</div>
          <div>Zoho</div>
          <div>HubSpot</div>
          <div>Salesforce</div>
          <div>Pipedrive</div>
          <div>Meta</div>
        </div>
      </section>

      <section id="services" className="services">
        <div className="sectionHead">
          <span>Our solutions</span>
          <h2>Everything you need to succeed with WhatsApp</h2>
          <p>Two powerful services. One integrated platform.</p>
        </div>

        <div className="serviceGrid">
          <div className="serviceCard">
            <div className="serviceIcon">👥</div>
            <h3>WhatsApp CRM Integration</h3>
            <p>
              Connect with Bitrix24 and other CRMs. Manage chats, assign leads,
              track pipeline activity and improve team productivity.
            </p>

            <ul>
              <li>Shared team inbox</li>
              <li>Lead and contact sync</li>
              <li>Agent assignment</li>
              <li>Conversation history</li>
            </ul>

            <a href="#demo">Learn More →</a>
          </div>

          <div className="serviceCard">
            <div className="serviceIcon">✈</div>
            <h3>WhatsApp Marketing Campaigns</h3>
            <p>
              Upload Excel numbers, send approved templates, schedule campaigns
              and track real-time delivery results.
            </p>

            <ul>
              <li>Bulk number import</li>
              <li>Approved templates</li>
              <li>Campaign scheduling</li>
              <li>Detailed analytics</li>
            </ul>

            <a href="#demo">Learn More →</a>
          </div>
        </div>
      </section>

      <section className="apiBanner">
        <div>
          <h2>Official WhatsApp Business API</h2>
          <p>Secure. Reliable. Scalable.</p>
          <a href="#demo">Learn More →</a>
        </div>

        <div className="verifiedBox">
          <div>✓ Verified Business</div>
          <div>✓ Higher Delivery Rate</div>
          <div>✓ Full API Access</div>
          <div>✓ Official Meta Partner Ready</div>
        </div>
      </section>

      <section id="features" className="features">
        <div className="sectionHead">
          <span>Key features</span>
          <h2>Powerful features for modern businesses</h2>
          <p>Everything you need to manage, market and grow with WhatsApp.</p>
        </div>

        <div className="featureGrid">
          <div>
            <span>💬</span>
            <h4>Team Inbox</h4>
            <p>Manage all conversations in one place.</p>
          </div>

          <div>
            <span>⚙</span>
            <h4>Automation</h4>
            <p>Automate replies, workflows and CRM updates.</p>
          </div>

          <div>
            <span>✈</span>
            <h4>Campaigns</h4>
            <p>Send targeted bulk messages with approved templates.</p>
          </div>

          <div>
            <span>📈</span>
            <h4>Analytics</h4>
            <p>Track performance in real time.</p>
          </div>

          <div>
            <span>📋</span>
            <h4>Template Library</h4>
            <p>Use approved Meta message templates.</p>
          </div>

          <div>
            <span>👤</span>
            <h4>Contact Management</h4>
            <p>Sync and organize your leads.</p>
          </div>

          <div>
            <span>🤖</span>
            <h4>AI Assistant</h4>
            <p>24/7 automated support and smart replies.</p>
          </div>

          <div>
            <span>🌐</span>
            <h4>Multi-Number Support</h4>
            <p>Manage multiple WhatsApp numbers.</p>
          </div>
        </div>
      </section>

      <section className="growth">
        <div className="growthImage">
          <div className="laptopPerson"></div>
          <div className="opportunity">
            <b>New Opportunity</b>
            <span>High-value lead</span>
            <small>View in CRM →</small>
          </div>
        </div>

        <div className="growthText">
          <span>Why businesses choose us</span>
          <h2>More than just messaging. A complete growth platform.</h2>

          <ul>
            <li>Increase sales and customer satisfaction</li>
            <li>Save time with automation</li>
            <li>Works with your existing CRM</li>
            <li>Trusted by businesses worldwide</li>
          </ul>

          <div className="growthCta">
            <a href="#demo">Start Free Trial →</a>
            <div className="avatars">
              <i></i><i></i><i></i><i></i>
              <span>Join 250+ businesses</span>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="pricing">
        <div className="sectionHead">
          <span>Pricing</span>
          <h2>Simple plans for growing businesses</h2>
          <p>Start small, then scale as your WhatsApp operations grow.</p>
        </div>

        <div className="priceGrid">
          <div className="priceCard">
            <h3>Starter</h3>
            <b>$49/mo</b>
            <p>For small teams starting with WhatsApp CRM.</p>
            <a href="#demo">Get Started</a>
          </div>

          <div className="priceCard active">
            <h3>Growth</h3>
            <b>$149/mo</b>
            <p>CRM integration plus WhatsApp marketing campaigns.</p>
            <a href="#demo">Start Growth</a>
          </div>

          <div className="priceCard">
            <h3>Agency</h3>
            <b>Custom</b>
            <p>For agencies managing multiple clients and numbers.</p>
            <a href="#demo">Contact Sales</a>
          </div>
        </div>
      </section>

      <section id="demo" className="demo">
        <div>
          <span>Request demo</span>
          <h2>Ready to grow your business with WhatsApp?</h2>
          <p>
            Book a demo and see how WAPIHub can connect your CRM, marketing,
            templates and agent conversations.
          </p>
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
        <div>
          <b>WAPIHub</b>
          <span>WhatsApp CRM Integration & Marketing Platform</span>
        </div>

        <p>© 2026 WAPIHub. All rights reserved.</p>
      </footer>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .page {
          min-height: 100vh;
          color: #071b15;
          background: #ffffff;
          font-family: Inter, Arial, Helvetica, sans-serif;
        }

        .nav {
          height: 78px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 7vw;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid #e5eee9;
          position: sticky;
          top: 0;
          z-index: 20;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #0a241d;
        }

        .brand strong {
          display: block;
          font-size: 24px;
          line-height: 1;
          font-weight: 900;
          letter-spacing: -0.8px;
        }

        .brand small {
          display: block;
          margin-top: 3px;
          color: #5d746b;
          font-size: 10px;
          letter-spacing: 1.4px;
          text-transform: uppercase;
        }

        .logo {
          width: 42px;
          height: 42px;
          border-radius: 14px;
          background: linear-gradient(135deg, #0d7c66, #25d366);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 900;
          box-shadow: 0 10px 22px rgba(13, 124, 102, 0.22);
        }

        .links {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .links a,
        .login {
          color: #0d2a22;
          text-decoration: none;
          font-size: 14px;
          font-weight: 800;
        }

        .links a:hover,
        .login:hover {
          color: #0d7c66;
        }

        .navActions {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .login {
          padding: 12px 16px;
          border: 1px solid #d9e8e1;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.55);
        }

        .navCta {
          background: linear-gradient(135deg, #16bf7a, #0d7c66);
          color: white;
          text-decoration: none;
          padding: 13px 20px;
          border-radius: 14px;
          font-weight: 900;
          box-shadow: 0 16px 30px rgba(13, 124, 102, 0.25);
        }

        .hero {
          position: relative;
          min-height: 720px;
          overflow: hidden;
          background:
            linear-gradient(90deg, rgba(2, 20, 15, 0.94) 0%, rgba(3, 28, 22, 0.78) 43%, rgba(4, 60, 46, 0.24) 100%),
            radial-gradient(circle at 78% 20%, rgba(37, 211, 102, 0.25), transparent 32%),
            linear-gradient(135deg, #07150f, #083729 55%, #eaf7f0 55%);
        }

        .hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 80% 30%, rgba(255, 255, 255, 0.6), transparent 14%),
            radial-gradient(circle at 72% 68%, rgba(37, 211, 102, 0.18), transparent 20%);
          opacity: 0.6;
        }

        .heroContent {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1.02fr 1fr;
          gap: 42px;
          align-items: center;
          padding: 70px 7vw 80px;
        }

        .badge {
          display: inline-flex;
          padding: 10px 15px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.12);
          color: #c8f8e3;
          border: 1px solid rgba(255, 255, 255, 0.16);
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 24px;
        }

        h1 {
          margin: 0;
          max-width: 780px;
          color: #ffffff;
          font-size: clamp(48px, 5.6vw, 86px);
          line-height: 0.95;
          letter-spacing: -3.2px;
          font-weight: 950;
        }

        .heroText p {
          max-width: 650px;
          margin: 26px 0 30px;
          color: #d9eee7;
          font-size: 20px;
          line-height: 1.7;
        }

        .heroBtns {
          display: flex;
          gap: 16px;
          margin-bottom: 55px;
        }

        .primary,
        .secondary {
          min-height: 56px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          padding: 0 24px;
          text-decoration: none;
          font-weight: 900;
        }

        .primary {
          background: linear-gradient(135deg, #25d366, #0d7c66);
          color: #ffffff;
          box-shadow: 0 22px 42px rgba(37, 211, 102, 0.28);
        }

        .secondary {
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.35);
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          gap: 10px;
        }

        .play {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          color: #0d7c66;
          font-size: 11px;
        }

        .heroStats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          max-width: 650px;
          border-top: 1px solid rgba(255, 255, 255, 0.13);
          border-bottom: 1px solid rgba(255, 255, 255, 0.13);
        }

        .heroStats div {
          padding: 18px 18px 18px 0;
          border-right: 1px solid rgba(255, 255, 255, 0.12);
        }

        .heroStats div:last-child {
          border-right: 0;
        }

        .heroStats b {
          display: block;
          color: #ffffff;
          font-size: 30px;
          line-height: 1;
        }

        .heroStats span {
          display: block;
          color: #b8d6cd;
          font-size: 12px;
          margin-top: 7px;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }

        .heroVisual {
          min-height: 600px;
          position: relative;
        }

        .personCard {
          position: absolute;
          right: 22%;
          top: 10px;
          width: 360px;
          height: 520px;
          border-radius: 40px;
          overflow: hidden;
          background:
            radial-gradient(circle at 50% 10%, #ffffff 0%, #edf6f0 24%, transparent 25%),
            linear-gradient(160deg, #124c3a, #07150f);
          box-shadow: 0 40px 90px rgba(0, 0, 0, 0.28);
        }

        .personImage {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 52% 22%, #f7d0a7 0 7%, transparent 8%),
            radial-gradient(circle at 47% 20%, #37261c 0 14%, transparent 15%),
            linear-gradient(180deg, transparent 0 28%, rgba(255,255,255,.9) 29% 47%, #11231e 48% 100%);
          opacity: 0.95;
        }

        .personCard::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 48% 21%, rgba(255, 219, 184, 0.95) 0 46px, transparent 47px),
            radial-gradient(circle at 48% 17%, rgba(52, 33, 23, 0.95) 0 64px, transparent 65px),
            linear-gradient(170deg, transparent 0 38%, rgba(255,255,255,.92) 39% 54%, rgba(12, 45, 35, .92) 55%);
          clip-path: polygon(23% 0, 84% 0, 95% 100%, 10% 100%);
          opacity: 0.92;
        }

        .phoneMock {
          position: absolute;
          right: 0;
          bottom: 20px;
          width: 285px;
          min-height: 430px;
          border-radius: 36px;
          background: #0b1612;
          padding: 15px;
          box-shadow: 0 35px 80px rgba(0, 0, 0, 0.34);
          border: 8px solid #111;
        }

        .phoneMock::before {
          content: "";
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 90px;
          height: 20px;
          border-radius: 999px;
          background: #0b1612;
          z-index: 2;
        }

        .phoneTop {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #ffffff;
          border-radius: 24px 24px 10px 10px;
          padding: 24px 13px 12px;
        }

        .phoneTop b {
          display: block;
          color: #071b15;
          font-size: 13px;
        }

        .phoneTop span {
          color: #0d7c66;
          font-size: 11px;
        }

        .whatsIcon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #25d366;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .phoneChat {
          background: #f1f7f3;
          border-radius: 10px 10px 24px 24px;
          padding: 15px;
          min-height: 335px;
        }

        .msg {
          padding: 11px 12px;
          border-radius: 14px;
          font-size: 12px;
          line-height: 1.35;
          margin-bottom: 10px;
        }

        .msg.left {
          background: #ffffff;
          color: #102027;
        }

        .msg.right {
          background: #dcf8c6;
          color: #102027;
          margin-left: 30px;
        }

        .quickReply {
          padding: 10px;
          background: #ffffff;
          border-bottom: 1px solid #e3eae6;
          color: #0d7c66;
          text-align: center;
          font-size: 12px;
          font-weight: 800;
        }

        .floating {
          position: absolute;
          z-index: 4;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.65);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.16);
        }

        .aiBox {
          top: 80px;
          right: 20px;
          border-radius: 18px;
          padding: 18px 20px;
        }

        .aiBox b,
        .leadBox b {
          display: block;
          color: #102027;
        }

        .aiBox span,
        .leadBox span,
        .leadBox small {
          display: block;
          color: #536e66;
          font-size: 12px;
          margin-top: 3px;
        }

        .leadBox {
          left: 110px;
          bottom: 15px;
          border-radius: 22px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .leadIcon {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: #25d366;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
        }

        section {
          padding: 78px 7vw;
        }

        .sectionHead {
          text-align: center;
          max-width: 860px;
          margin: 0 auto 42px;
        }

        .sectionHead span {
          display: inline-flex;
          color: #0d7c66;
          background: #e7f6ee;
          padding: 7px 13px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.6px;
        }

        .sectionHead h2,
        .growthText h2,
        .demo h2 {
          margin: 12px 0 0;
          color: #071b15;
          font-size: clamp(34px, 4vw, 58px);
          line-height: 1.04;
          letter-spacing: -1.8px;
        }

        .sectionHead p {
          color: #61766f;
          font-size: 16px;
          margin-top: 12px;
        }

        .integrations {
          background: #ffffff;
        }

        .logoGrid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
        }

        .logoGrid div {
          height: 88px;
          border: 1px solid #e2ebe6;
          border-radius: 18px;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 900;
          color: #0d2a22;
          box-shadow: 0 14px 35px rgba(7, 41, 31, 0.04);
        }

        .services {
          background: linear-gradient(180deg, #f5fbf8, #ffffff);
        }

        .serviceGrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 26px;
          max-width: 1150px;
          margin: 0 auto;
        }

        .serviceCard {
          min-height: 430px;
          padding: 36px;
          background: #ffffff;
          border: 1px solid #e3eee8;
          border-radius: 28px;
          box-shadow: 0 30px 80px rgba(7, 41, 31, 0.07);
        }

        .serviceIcon {
          width: 64px;
          height: 64px;
          border-radius: 20px;
          background: linear-gradient(135deg, #25d366, #0d7c66);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          margin-bottom: 22px;
        }

        .serviceCard h3 {
          font-size: 30px;
          color: #071b15;
          margin: 0 0 12px;
          letter-spacing: -0.8px;
        }

        .serviceCard p {
          color: #536e66;
          line-height: 1.7;
          font-size: 16px;
        }

        .serviceCard ul {
          padding: 0;
          list-style: none;
          margin: 22px 0;
        }

        .serviceCard li {
          margin: 12px 0;
          color: #102027;
          font-weight: 800;
        }

        .serviceCard li::before,
        .growthText li::before {
          content: "✓";
          color: #ffffff;
          background: #16bf7a;
          border-radius: 50%;
          display: inline-flex;
          width: 21px;
          height: 21px;
          align-items: center;
          justify-content: center;
          margin-right: 10px;
          font-size: 12px;
        }

        .serviceCard a {
          display: inline-flex;
          color: #0d2a22;
          text-decoration: none;
          border: 1px solid #d4e4dd;
          border-radius: 14px;
          padding: 13px 18px;
          font-weight: 900;
        }

        .apiBanner {
          margin: 0 7vw;
          padding: 45px;
          border-radius: 28px;
          min-height: 235px;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background:
            radial-gradient(circle at 78% 44%, rgba(37, 211, 102, 0.32), transparent 24%),
            linear-gradient(135deg, #063629, #0a5c47);
          overflow: hidden;
        }

        .apiBanner h2 {
          color: #ffffff;
          font-size: 34px;
          margin: 0;
        }

        .apiBanner p {
          color: #d8f1e9;
          font-size: 18px;
        }

        .apiBanner a {
          display: inline-flex;
          background: #25d366;
          color: #07352f;
          text-decoration: none;
          padding: 14px 20px;
          border-radius: 14px;
          font-weight: 900;
        }

        .verifiedBox {
          background: #ffffff;
          color: #102027;
          border-radius: 22px;
          padding: 20px 24px;
          min-width: 260px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.18);
        }

        .verifiedBox div {
          margin: 12px 0;
          font-weight: 800;
          color: #0d2a22;
        }

        .features {
          background: #ffffff;
        }

        .featureGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 22px;
        }

        .featureGrid div {
          padding: 24px;
          border-radius: 22px;
          background: #f7fbf8;
          border: 1px solid #e2ebe6;
          min-height: 180px;
        }

        .featureGrid span {
          width: 48px;
          height: 48px;
          background: #dff7e9;
          color: #0d7c66;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          font-size: 22px;
        }

        .featureGrid h4 {
          margin: 0 0 8px;
          color: #071b15;
          font-size: 18px;
        }

        .featureGrid p {
          color: #536e66;
          line-height: 1.5;
          margin: 0;
        }

        .growth {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 55px;
          align-items: center;
          background: #f5fbf8;
        }

        .growthImage {
          min-height: 430px;
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          background:
            radial-gradient(circle at 48% 19%, #f6cba2 0 42px, transparent 43px),
            radial-gradient(circle at 48% 14%, #312114 0 63px, transparent 64px),
            linear-gradient(160deg, #ffffff 0 35%, #0c382c 36% 100%);
          box-shadow: 0 30px 80px rgba(7, 41, 31, 0.08);
        }

        .growthImage::after {
          content: "";
          position: absolute;
          left: 22%;
          bottom: 0;
          width: 55%;
          height: 58%;
          background: linear-gradient(180deg, #f4f4f4, #0f2d25);
          clip-path: polygon(20% 0, 80% 0, 100% 100%, 0 100%);
        }

        .opportunity {
          position: absolute;
          right: 28px;
          top: 88px;
          z-index: 4;
          background: #ffffff;
          border-radius: 18px;
          padding: 17px 19px;
          box-shadow: 0 22px 55px rgba(0, 0, 0, 0.14);
        }

        .opportunity b,
        .opportunity span,
        .opportunity small {
          display: block;
        }

        .opportunity span {
          color: #536e66;
          margin-top: 4px;
        }

        .opportunity small {
          color: #0d7c66;
          margin-top: 7px;
          font-weight: 900;
        }

        .growthText span {
          color: #0d7c66;
          background: #e7f6ee;
          padding: 7px 13px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .growthText ul {
          padding: 0;
          list-style: none;
          margin: 28px 0;
        }

        .growthText li {
          margin: 15px 0;
          font-weight: 800;
          color: #102027;
        }

        .growthCta {
          display: flex;
          align-items: center;
          gap: 22px;
        }

        .growthCta a {
          background: linear-gradient(135deg, #25d366, #0d7c66);
          color: #ffffff;
          text-decoration: none;
          padding: 15px 22px;
          border-radius: 15px;
          font-weight: 900;
        }

        .avatars {
          display: flex;
          align-items: center;
        }

        .avatars i {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d7a67b, #17251f);
          border: 2px solid #ffffff;
          margin-left: -8px;
        }

        .avatars span {
          margin-left: 12px;
          background: transparent;
          color: #536e66;
          font-size: 13px;
          text-transform: none;
          padding: 0;
        }

        .pricing {
          background: #ffffff;
        }

        .priceGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }

        .priceCard {
          padding: 34px;
          border-radius: 26px;
          border: 1px solid #e2ebe6;
          background: #ffffff;
          box-shadow: 0 20px 55px rgba(7, 41, 31, 0.05);
        }

        .priceCard.active {
          border-color: #25d366;
          transform: translateY(-10px);
          background: linear-gradient(180deg, #ffffff, #f0fbf5);
        }

        .priceCard h3 {
          margin: 0 0 14px;
          font-size: 28px;
        }

        .priceCard b {
          display: block;
          color: #0d7c66;
          font-size: 42px;
          margin-bottom: 14px;
        }

        .priceCard p {
          color: #536e66;
          line-height: 1.6;
        }

        .priceCard a {
          margin-top: 18px;
          display: inline-flex;
          text-decoration: none;
          color: #ffffff;
          background: #0d7c66;
          padding: 13px 18px;
          border-radius: 14px;
          font-weight: 900;
        }

        .demo {
          display: grid;
          grid-template-columns: 1fr 440px;
          gap: 45px;
          align-items: center;
          background:
            radial-gradient(circle at 80% 20%, rgba(37, 211, 102, 0.24), transparent 28%),
            linear-gradient(135deg, #061812, #0d4b39);
          color: #ffffff;
        }

        .demo span {
          display: inline-flex;
          color: #c8f8e3;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.14);
          padding: 7px 13px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .demo h2 {
          color: #ffffff;
        }

        .demo p {
          color: #d9eee7;
          line-height: 1.7;
          font-size: 18px;
        }

        .form {
          background: #ffffff;
          border-radius: 28px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.18);
        }

        .form input,
        .form select {
          height: 52px;
          border-radius: 15px;
          border: 1px solid #d8e7e0;
          padding: 0 15px;
          font-weight: 700;
          color: #102027;
          outline: none;
        }

        .form input:focus,
        .form select:focus {
          border-color: #25d366;
        }

        .form button {
          height: 54px;
          border: 0;
          border-radius: 16px;
          background: linear-gradient(135deg, #25d366, #0d7c66);
          color: #ffffff;
          font-size: 15px;
          font-weight: 900;
          cursor: pointer;
        }

        footer {
          padding: 32px 7vw;
          background: #061812;
          color: #ffffff;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        footer b {
          display: block;
          font-size: 22px;
        }

        footer span,
        footer p {
          color: #9cb9af;
          margin: 5px 0 0;
        }

        @media (max-width: 1100px) {
          .heroContent,
          .growth,
          .demo,
          .serviceGrid {
            grid-template-columns: 1fr;
          }

          .heroVisual {
            min-height: 520px;
          }

          .logoGrid,
          .featureGrid {
            grid-template-columns: repeat(2, 1fr);
          }

          .priceGrid {
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

          .navActions {
            display: none;
          }

          .heroContent,
          section {
            padding-left: 20px;
            padding-right: 20px;
          }

          h1 {
            font-size: 46px;
            letter-spacing: -2px;
          }

          .heroStats,
          .logoGrid,
          .featureGrid {
            grid-template-columns: 1fr;
          }

          .heroVisual {
            display: none;
          }

          .apiBanner {
            margin: 0 20px;
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
          }

          .growthCta {
            flex-direction: column;
            align-items: flex-start;
          }

          footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
        }
      `}</style>
    </main>
  );
}
