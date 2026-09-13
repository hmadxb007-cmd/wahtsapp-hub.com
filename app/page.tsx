"use client";

export default function HomePage() {
  return (
    <main className="page">
      <nav className="nav">
        <a className="brand" href="#">
          <div className="logo">W</div>
          <div>
            <strong>WhatsApp Hub</strong>
            <small>CRM + Marketing Platform</small>
          </div>
        </a>

        <div className="links">
          <a href="#services">Services</a>
          <a href="#integrations">Integrations</a>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
        </div>

        <div className="navActions">
          <a className="login" href="#demo">Login</a>
          <a className="navCta" href="#demo">Request Demo</a>
        </div>
      </nav>

      <section className="hero">
        <div className="heroInner">
          <div className="heroText">
            <div className="badge">Meta WhatsApp API • CRM Integration • Bulk Campaigns</div>

            <h1>WhatsApp Marketing for Real Business Growth</h1>

            <p>
              Connect WhatsApp Cloud API with your CRM, manage agent conversations,
              run approved template campaigns, sync leads automatically, and convert
              more chats into paying customers.
            </p>

            <div className="heroBtns">
              <a className="primary" href="#demo">Request Demo</a>
              <a className="secondary" href="#services">Explore Services</a>
            </div>

            <div className="heroStats">
              <div>
                <b>10x</b>
                <span>Better engagement</span>
              </div>
              <div>
                <b>98%</b>
                <span>Delivery tracking</span>
              </div>
              <div>
                <b>24/7</b>
                <span>Automation ready</span>
              </div>
            </div>
          </div>

          <div className="heroMedia">
            <div className="photoCard">
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=85"
                alt="Business team using WhatsApp CRM"
              />
            </div>

            <div className="phoneCard">
              <div className="phoneHeader">
                <span className="waIcon">●</span>
                <div>
                  <strong>Your Business</strong>
                  <small>Online now</small>
                </div>
              </div>

              <div className="chatArea">
                <div className="message left">
                  Hi, I am interested in your service.
                </div>
                <div className="message right">
                  Great. Our team will assist you now.
                </div>
                <div className="miniDeal">
                  <strong>New CRM Lead</strong>
                  <span>Synced to Bitrix24</span>
                </div>
              </div>
            </div>

            <div className="floatingCard topFloat">
              <strong>Campaign Ready</strong>
              <span>2,350 numbers imported</span>
            </div>

            <div className="floatingCard bottomFloat">
              <strong>New WhatsApp Lead</strong>
              <span>Assigned to sales team</span>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="services">
        <div className="sectionHead">
          <span>Two services. One platform.</span>
          <h2>Everything businesses need to sell and support through WhatsApp.</h2>
        </div>

        <div className="serviceGrid">
          <div className="serviceCard">
            <div className="serviceImage">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=85"
                alt="CRM team dashboard"
              />
            </div>

            <div className="serviceContent">
              <small>Service 01</small>
              <h3>WhatsApp CRM Integration</h3>
              <p>
                Connect WhatsApp Cloud API with Bitrix24 and other CRMs. Give your
                agents a shared inbox, lead assignment, notes, pipeline sync and full
                conversation history.
              </p>

              <ul>
                <li>Shared team inbox</li>
                <li>Bitrix24 CRM sync</li>
                <li>Agent assignment</li>
                <li>Chat history inside CRM</li>
              </ul>
            </div>
          </div>

          <div className="serviceCard dark">
            <div className="serviceContent">
              <small>Service 02</small>
              <h3>WhatsApp Marketing Campaigns</h3>
              <p>
                Upload Excel numbers, select approved Meta message templates, schedule
                campaigns, control send speed and track delivery, read and failed reports.
              </p>

              <ul>
                <li>Excel number import</li>
                <li>Approved templates</li>
                <li>Campaign scheduling</li>
                <li>Delivery analytics</li>
              </ul>
            </div>

            <div className="campaignPreview">
              <div className="campaignTop">
                <strong>June Property Campaign</strong>
                <span>Ready</span>
              </div>

              <div className="progressLine">
                <i></i>
              </div>

              <div className="campaignStats">
                <div>
                  <b>12,450</b>
                  <span>Sent</span>
                </div>
                <div>
                  <b>10,980</b>
                  <span>Delivered</span>
                </div>
                <div>
                  <b>532</b>
                  <span>Replies</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="integrations" className="integrations">
        <div className="sectionHead">
          <span>CRM integrations</span>
          <h2>Connect WhatsApp with the tools your clients already use.</h2>
        </div>

        <div className="logoGrid">
          <div>Bitrix24</div>
          <div>Zoho</div>
          <div>HubSpot</div>
          <div>Salesforce</div>
          <div>Pipedrive</div>
          <div>Meta API</div>
        </div>
      </section>

      <section id="features" className="features">
        <div className="featureIntro">
          <span>Platform features</span>
          <h2>Built for agencies, sales teams, support teams and real estate companies.</h2>
          <p>
            WhatsApp Hub helps businesses manage customer conversations, automate
            follow-ups and launch compliant WhatsApp marketing campaigns.
          </p>
        </div>

        <div className="featureGrid">
          <div>
            <b>01</b>
            <h3>Agent Inbox</h3>
            <p>Manage customer chats in a shared team workspace.</p>
          </div>
          <div>
            <b>02</b>
            <h3>CRM Sync</h3>
            <p>Create leads, update contacts and store WhatsApp history.</p>
          </div>
          <div>
            <b>03</b>
            <h3>Templates</h3>
            <p>Use approved Meta templates for campaigns and follow-ups.</p>
          </div>
          <div>
            <b>04</b>
            <h3>Bulk Campaigns</h3>
            <p>Import Excel numbers and send scheduled marketing messages.</p>
          </div>
          <div>
            <b>05</b>
            <h3>Automation</h3>
            <p>Assign agents, move leads and send smart replies automatically.</p>
          </div>
          <div>
            <b>06</b>
            <h3>Analytics</h3>
            <p>Track sent, delivered, read, failed and reply performance.</p>
          </div>
        </div>
      </section>

      <section className="growth">
        <div className="growthImage">
          <img
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85"
            alt="Business growth with WhatsApp marketing"
          />
        </div>

        <div className="growthText">
          <span>Why choose WhatsApp Hub</span>
          <h2>More than messaging. A complete customer growth platform.</h2>

          <p>
            Offer your clients CRM integration and WhatsApp marketing from one website.
            Start with Bitrix24 and Meta WhatsApp Cloud API, then expand into more CRMs.
          </p>

          <div className="checkList">
            <div>✓ Faster customer response</div>
            <div>✓ Higher campaign engagement</div>
            <div>✓ Better sales team tracking</div>
            <div>✓ Professional WhatsApp automation</div>
          </div>

          <a href="#demo">Start with a Demo</a>
        </div>
      </section>

      <section id="pricing" className="pricing">
        <div className="sectionHead">
          <span>Pricing</span>
          <h2>Simple packages for every business size.</h2>
        </div>

        <div className="priceGrid">
          <div className="priceCard">
            <h3>Starter</h3>
            <b>$49/mo</b>
            <p>For small teams who need WhatsApp CRM integration.</p>
            <a href="#demo">Get Started</a>
          </div>

          <div className="priceCard featured">
            <h3>Growth</h3>
            <b>$149/mo</b>
            <p>CRM integration plus WhatsApp marketing campaigns.</p>
            <a href="#demo">Request Demo</a>
          </div>

          <div className="priceCard">
            <h3>Agency</h3>
            <b>Custom</b>
            <p>For agencies managing multiple clients and WhatsApp numbers.</p>
            <a href="#demo">Contact Sales</a>
          </div>
        </div>
      </section>

      <section id="demo" className="demo">
        <div>
          <span>Request a demo</span>
          <h2>Launch WhatsApp CRM and marketing for your business.</h2>
          <p>
            Tell us what you need and our team will show you how WhatsApp Hub can
            connect your CRM, campaigns and agents.
          </p>
        </div>

        <form className="form">
          <input placeholder="Your name" />
          <input placeholder="Business email" />
          <input placeholder="Phone number" />
          <input placeholder="Company name" />

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
          <strong>WhatsApp Hub</strong>
          <span>WhatsApp CRM Integration & Marketing Platform</span>
        </div>

        <p>whatsapp-hub.com</p>
      </footer>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .page {
          min-height: 100vh;
          background: #ffffff;
          color: #0b1f1a;
          font-family: Inter, Arial, Helvetica, sans-serif;
        }

        .nav {
          height: 82px;
          padding: 0 7vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(18px);
          border-bottom: 1px solid #e7eee9;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: #0b1f1a;
        }

        .logo {
          width: 44px;
          height: 44px;
          border-radius: 15px;
          background: linear-gradient(135deg, #25d366, #075e54);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 22px;
        }

        .brand strong {
          display: block;
          font-size: 22px;
          line-height: 1;
          letter-spacing: -0.6px;
        }

        .brand small {
          display: block;
          margin-top: 4px;
          color: #668078;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .links {
          display: flex;
          gap: 30px;
        }

        .links a,
        .login {
          color: #0f2a23;
          text-decoration: none;
          font-size: 14px;
          font-weight: 800;
        }

        .links a:hover,
        .login:hover {
          color: #075e54;
        }

        .navActions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .login {
          padding: 12px 16px;
          border: 1px solid #dfeae5;
          border-radius: 13px;
          background: #ffffff;
        }

        .navCta {
          background: #075e54;
          color: #ffffff;
          text-decoration: none;
          padding: 13px 19px;
          border-radius: 13px;
          font-weight: 900;
        }

       .hero {
  min-height: 760px;
  background:
    linear-gradient(
      90deg,
      rgba(3, 16, 13, 0.82) 0%,
      rgba(3, 16, 13, 0.68) 32%,
      rgba(3, 16, 13, 0.30) 58%,
      rgba(3, 16, 13, 0.08) 100%
    ),
    url("/images/hero-dubai-cover.png");
  background-size: cover;
  background-position: center right;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
}

        .hero::after {
          content: "";
          position: absolute;
          inset: auto 0 0;
          height: 170px;
          background: linear-gradient(180deg, transparent, #ffffff);
        }

        .heroInner {
          position: relative;
          z-index: 2;
          padding: 80px 7vw;
          display: grid;
          grid-template-columns: 1.02fr 1fr;
          gap: 48px;
          align-items: center;
        }

        .badge {
          display: inline-flex;
          padding: 10px 15px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #d6fff0;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          margin-bottom: 22px;
        }

        h1 {
          max-width: 760px;
          color: #ffffff;
          font-size: clamp(48px, 5.6vw, 86px);
          line-height: 0.94;
          letter-spacing: -3px;
          margin: 0;
        }

        .heroText p {
          max-width: 660px;
          margin: 28px 0 30px;
          color: #d8ebe5;
          font-size: 20px;
          line-height: 1.7;
        }

        .heroBtns {
          display: flex;
          gap: 14px;
          margin-bottom: 50px;
        }

        .primary,
        .secondary {
          min-height: 55px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 24px;
          border-radius: 15px;
          text-decoration: none;
          font-weight: 900;
        }

        .primary {
          background: #25d366;
          color: #05251d;
        }

        .secondary {
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
        }

        .heroStats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          max-width: 650px;
          border-top: 1px solid rgba(255, 255, 255, 0.14);
          border-bottom: 1px solid rgba(255, 255, 255, 0.14);
        }

        .heroStats div {
          padding: 20px 18px 20px 0;
          border-right: 1px solid rgba(255, 255, 255, 0.14);
        }

        .heroStats div:last-child {
          border-right: 0;
        }

        .heroStats b {
          display: block;
          color: #ffffff;
          font-size: 32px;
        }

        .heroStats span {
          display: block;
          color: #bdd8cf;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .heroMedia {
  display: none;
}

        .photoCard {
          position: absolute;
          top: 40px;
          right: 170px;
          width: 360px;
          height: 470px;
          border-radius: 34px;
          overflow: hidden;
          box-shadow: 0 35px 80px rgba(0, 0, 0, 0.38);
          border: 1px solid rgba(255, 255, 255, 0.28);
        }

        .photoCard img,
        .growthImage img,
        .serviceImage img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .phoneCard {
          position: absolute;
          right: 0;
          bottom: 15px;
          width: 300px;
          border-radius: 34px;
          background: #101d18;
          border: 8px solid #07110e;
          padding: 13px;
          box-shadow: 0 35px 90px rgba(0, 0, 0, 0.42);
        }

        .phoneHeader {
          display: flex;
          align-items: center;
          gap: 11px;
          background: #ffffff;
          border-radius: 22px 22px 8px 8px;
          padding: 18px 13px 12px;
        }

        .waIcon {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: #25d366;
          color: #25d366;
        }

        .phoneHeader strong,
        .phoneHeader small {
          display: block;
        }

        .phoneHeader small {
          color: #148d5c;
          margin-top: 3px;
        }

        .chatArea {
          min-height: 325px;
          background: #f1f7f3;
          border-radius: 8px 8px 22px 22px;
          padding: 15px;
        }

        .message,
        .miniDeal {
          padding: 12px 13px;
          border-radius: 14px;
          margin-bottom: 11px;
          font-size: 13px;
          line-height: 1.4;
        }

        .message.left {
          background: #ffffff;
        }

        .message.right {
          background: #dcf8c6;
          margin-left: 42px;
        }

        .miniDeal {
          background: #ffffff;
          border: 1px solid #cfe5dc;
        }

        .miniDeal strong,
        .miniDeal span {
          display: block;
        }

        .miniDeal span {
          color: #658078;
          margin-top: 4px;
        }

        .floatingCard {
          position: absolute;
          background: rgba(255, 255, 255, 0.94);
          border: 1px solid rgba(255, 255, 255, 0.68);
          backdrop-filter: blur(15px);
          padding: 16px 20px;
          border-radius: 20px;
          box-shadow: 0 22px 55px rgba(0, 0, 0, 0.2);
        }

        .floatingCard strong,
        .floatingCard span {
          display: block;
        }

        .floatingCard span {
          color: #647c74;
          margin-top: 5px;
          font-size: 13px;
        }

        .topFloat {
          top: 78px;
          right: 20px;
        }

        .bottomFloat {
          bottom: 35px;
          left: 70px;
        }

        section {
          padding: 82px 7vw;
        }

        .sectionHead {
          max-width: 870px;
          margin: 0 auto 42px;
          text-align: center;
        }

        .sectionHead span,
        .featureIntro span,
        .growthText span,
        .demo span {
          display: inline-flex;
          color: #075e54;
          background: #e8f7ef;
          padding: 8px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.7px;
        }

        .sectionHead h2,
        .featureIntro h2,
        .growthText h2,
        .demo h2 {
          margin: 14px 0 0;
          color: #071b15;
          font-size: clamp(34px, 4vw, 58px);
          line-height: 1.05;
          letter-spacing: -1.8px;
        }

        .serviceGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 26px;
        }

        .serviceCard {
          overflow: hidden;
          background: #ffffff;
          border: 1px solid #e4eee8;
          border-radius: 30px;
          box-shadow: 0 25px 70px rgba(8, 42, 31, 0.08);
        }

        .serviceCard.dark {
          background: linear-gradient(135deg, #061812, #0b4f3c);
          color: #ffffff;
          padding: 36px;
        }

        .serviceImage {
          height: 245px;
        }

        .serviceContent {
          padding: 34px;
        }

        .serviceCard.dark .serviceContent {
          padding: 0;
        }

        .serviceContent small {
          color: #0d7c66;
          font-weight: 900;
          text-transform: uppercase;
        }

        .serviceCard.dark small {
          color: #aef5d3;
        }

        .serviceContent h3 {
          margin: 12px 0;
          font-size: 31px;
          letter-spacing: -0.8px;
        }

        .serviceContent p {
          color: #58746c;
          line-height: 1.7;
          font-size: 16px;
        }

        .serviceCard.dark p {
          color: #d1e8df;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 22px 0 0;
        }

        li {
          margin: 12px 0;
          font-weight: 800;
        }

        li::before {
          content: "✓";
          display: inline-flex;
          width: 21px;
          height: 21px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #25d366;
          color: #ffffff;
          margin-right: 10px;
          font-size: 12px;
        }

        .campaignPreview {
          margin-top: 28px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 24px;
          padding: 22px;
        }

        .campaignTop {
          display: flex;
          justify-content: space-between;
          gap: 20px;
        }

        .campaignTop span {
          color: #25d366;
          font-weight: 900;
        }

        .progressLine {
          height: 10px;
          background: rgba(255, 255, 255, 0.12);
          border-radius: 999px;
          margin: 24px 0;
          overflow: hidden;
        }

        .progressLine i {
          display: block;
          width: 78%;
          height: 100%;
          background: #25d366;
          border-radius: inherit;
        }

        .campaignStats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .campaignStats div {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 14px;
        }

        .campaignStats b,
        .campaignStats span {
          display: block;
        }

        .campaignStats span {
          color: #bedbd1;
          margin-top: 5px;
          font-size: 12px;
        }

        .integrations {
          background: #f6fbf8;
        }

        .logoGrid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
        }

        .logoGrid div {
          height: 92px;
          border-radius: 20px;
          background: #ffffff;
          border: 1px solid #dfece6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 950;
          color: #0c2a22;
          box-shadow: 0 16px 38px rgba(8, 42, 31, 0.04);
        }

        .features {
          display: grid;
          grid-template-columns: 0.9fr 1.4fr;
          gap: 45px;
          align-items: start;
        }

        .featureIntro {
          position: sticky;
          top: 115px;
        }

        .featureIntro p,
        .growthText p,
        .demo p,
        .sectionHead p {
          color: #58746c;
          line-height: 1.7;
          font-size: 17px;
        }

        .featureGrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }

        .featureGrid div {
          background: #ffffff;
          border: 1px solid #e4eee8;
          border-radius: 24px;
          padding: 26px;
          box-shadow: 0 18px 50px rgba(8, 42, 31, 0.05);
        }

        .featureGrid b {
          color: #0d7c66;
          font-size: 13px;
        }

        .featureGrid h3 {
          margin: 12px 0 8px;
          font-size: 22px;
        }

        .featureGrid p {
          color: #58746c;
          line-height: 1.55;
          margin: 0;
        }

        .growth {
          background: #f6fbf8;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 55px;
          align-items: center;
        }

        .growthImage {
          height: 520px;
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 0 30px 75px rgba(8, 42, 31, 0.1);
        }

        .checkList {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin: 28px 0;
        }

        .checkList div {
          background: #ffffff;
          border: 1px solid #dfece6;
          border-radius: 16px;
          padding: 15px;
          font-weight: 850;
        }

        .growthText a {
          display: inline-flex;
          background: #075e54;
          color: #ffffff;
          padding: 15px 22px;
          border-radius: 15px;
          text-decoration: none;
          font-weight: 900;
        }

        .priceGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }

        .priceCard {
          background: #ffffff;
          border: 1px solid #e4eee8;
          border-radius: 28px;
          padding: 34px;
          box-shadow: 0 20px 60px rgba(8, 42, 31, 0.06);
        }

        .priceCard.featured {
          transform: translateY(-10px);
          border-color: #25d366;
          background: linear-gradient(180deg, #ffffff, #f0fbf5);
        }

        .priceCard h3 {
          margin: 0 0 14px;
          font-size: 28px;
        }

        .priceCard b {
          display: block;
          color: #075e54;
          font-size: 42px;
          margin-bottom: 14px;
        }

        .priceCard p {
          color: #58746c;
          line-height: 1.6;
        }

        .priceCard a {
          display: inline-flex;
          margin-top: 16px;
          background: #075e54;
          color: #ffffff;
          text-decoration: none;
          padding: 14px 20px;
          border-radius: 15px;
          font-weight: 900;
        }

        .demo {
          display: grid;
          grid-template-columns: 1fr 460px;
          gap: 50px;
          align-items: center;
          background:
            linear-gradient(90deg, rgba(4, 34, 25, 0.92), rgba(4, 73, 56, 0.76)),
            url("https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1800&q=90");
          background-size: cover;
          background-position: center;
          color: #ffffff;
        }

        .demo h2,
        .demo p {
          color: #ffffff;
        }

        .form {
          background: #ffffff;
          border-radius: 28px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.24);
        }

        .form input,
        .form select {
          height: 53px;
          border-radius: 15px;
          border: 1px solid #dcebe5;
          padding: 0 15px;
          color: #0b1f1a;
          font-weight: 700;
          outline: none;
        }

        .form input:focus,
        .form select:focus {
          border-color: #25d366;
        }

        .form button {
          height: 55px;
          border: 0;
          border-radius: 16px;
          background: #25d366;
          color: #05251d;
          font-size: 15px;
          font-weight: 950;
          cursor: pointer;
        }

        footer {
          background: #061812;
          color: #ffffff;
          padding: 34px 7vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        footer strong,
        footer span {
          display: block;
        }

        footer strong {
          font-size: 22px;
        }

        footer span,
        footer p {
          color: #a8c4ba;
          margin: 5px 0 0;
        }

        @media (max-width: 1100px) {
          .heroInner,
          .serviceGrid,
          .features,
          .growth,
          .demo {
            grid-template-columns: 1fr;
          }

          .heroMedia {
            min-height: 560px;
          }

          .links {
            display: none;
          }

          .logoGrid {
            grid-template-columns: repeat(3, 1fr);
          }

          .priceGrid {
            grid-template-columns: 1fr;
          }

          .featureIntro {
            position: static;
          }
        }

        @media (max-width: 700px) {
          .nav {
            padding: 0 20px;
          }

          .navActions {
            display: none;
          }

          .heroInner,
          section {
            padding-left: 20px;
            padding-right: 20px;
          }

          h1 {
            font-size: 44px;
            letter-spacing: -1.8px;
          }

          .heroStats,
          .logoGrid,
          .featureGrid,
          .checkList {
            grid-template-columns: 1fr;
          }

          .heroMedia {
            display: none;
          }

          .campaignStats {
            grid-template-columns: 1fr;
          }

          footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
        }
      `}</style>
    </main>
  );
}
