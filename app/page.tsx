export default function HomePage() {
  return (
    <main className="page">
      <nav className="nav">
        <div className="brand">
          <div className="logo">W</div>
          <span>WhatsApp Hub</span>
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
          <div className="badge">WhatsApp Cloud API • CRM • Campaigns</div>
          <h1>Turn WhatsApp into a complete sales and marketing platform.</h1>
          <p>
            Connect Meta WhatsApp Cloud API with CRM, manage agent conversations,
            sync leads, import Excel numbers, send approved template campaigns and track every result.
          </p>
          <div className="heroBtns">
            <a className="primary" href="#demo">Request Demo</a>
            <a className="secondary" href="#services">Explore Services</a>
          </div>
        </div>

        <div className="dashboardMock">
          <div className="mockTop">
            <b>WhatsApp Hub Dashboard</b>
            <span>Connected</span>
          </div>
          <div className="stats">
            <div><small>Messages Sent</small><strong>12,450</strong></div>
            <div><small>Leads Synced</small><strong>532</strong></div>
            <div><small>Delivery Rate</small><strong>98%</strong></div>
          </div>
          <div className="mockGrid">
            <div className="chatList">
              <div className="chat active"><b>New Lead</b><span>Interested in your service...</span></div>
              <div className="chat"><b>Sales Team</b><span>Campaign report ready</span></div>
              <div className="chat"><b>CRM Sync</b><span>Bitrix24 lead created</span></div>
            </div>
            <div className="conversation">
              <div className="bubble left">Hi, I want to connect WhatsApp with my CRM.</div>
              <div className="bubble right">Sure. We can connect your Meta WhatsApp API and sync leads automatically.</div>
              <div className="campaign"><b>Campaign Ready</b><span>2,350 numbers imported from Excel</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="sectionHead">
          <span>Two services. One website.</span>
          <h2>Sell CRM integration and WhatsApp marketing together.</h2>
        </div>
        <div className="cards">
          <article className="card">
            <div className="cardIcon">CRM</div>
            <h3>WhatsApp CRM Integration</h3>
            <p>Connect WhatsApp Cloud API with Bitrix24 and other CRMs so agents can chat, assign leads and save full history.</p>
            <ul><li>Shared agent inbox</li><li>CRM lead sync</li><li>Chat history in CRM</li><li>Automation rules</li></ul>
          </article>
          <article className="card featured">
            <div className="cardIcon">API</div>
            <h3>WhatsApp Marketing Campaigns</h3>
            <p>Upload Excel phone numbers, choose approved Meta templates, schedule campaigns and track delivery/read/failed reports.</p>
            <ul><li>Excel import</li><li>Approved templates</li><li>Bulk sending control</li><li>Campaign analytics</li></ul>
          </article>
        </div>
      </section>

      <section id="platform" className="platform section">
        <div className="sectionHead">
          <span>Platform modules</span>
          <h2>Everything businesses need for WhatsApp operations.</h2>
        </div>
        <div className="moduleGrid">
          <div>Meta WhatsApp Connection</div><div>Agent Inbox</div><div>CRM Sync</div><div>Templates</div>
          <div>Bulk Campaigns</div><div>Excel Contacts</div><div>Automation</div><div>Reports</div>
        </div>
      </section>

      <section id="pricing" className="section">
        <div className="sectionHead">
          <span>Pricing preview</span>
          <h2>Simple packages for your first launch.</h2>
        </div>
        <div className="priceGrid">
          <div className="price"><h3>Starter</h3><strong>$49/mo</strong><p>WhatsApp inbox and basic CRM sync.</p></div>
          <div className="price main"><h3>Growth</h3><strong>$149/mo</strong><p>CRM integration plus marketing campaigns.</p></div>
          <div className="price"><h3>Agency</h3><strong>Custom</strong><p>Multi-client setup and managed campaigns.</p></div>
        </div>
      </section>

      <section id="demo" className="demo">
        <div>
          <span>Launch faster</span>
          <h2>Request a demo for WhatsApp CRM and marketing.</h2>
          <p>This form is a frontend demo. Later we will connect it to your backend and email.</p>
        </div>
        <form className="form">
          <input placeholder="Your name" />
          <input placeholder="Business email" />
          <input placeholder="Phone number" />
          <select><option>Both services</option><option>CRM Integration</option><option>Marketing Campaigns</option></select>
          <button type="button">Request Demo</button>
        </form>
      </section>

      <footer><b>WhatsApp Hub</b><span>CRM Integration & WhatsApp Marketing Platform</span></footer>

      <style jsx>{`
        *{box-sizing:border-box}.page{min-height:100vh;background:#f7fbff;color:#0c1b2a;font-family:Inter,Arial,sans-serif}.nav{height:82px;display:flex;align-items:center;justify-content:space-between;padding:0 7vw;background:rgba(255,255,255,.86);backdrop-filter:blur(18px);border-bottom:1px solid #e2edf7;position:sticky;top:0;z-index:10}.brand{display:flex;align-items:center;gap:12px;font-size:24px;font-weight:900}.logo{width:42px;height:42px;border-radius:14px;background:linear-gradient(135deg,#0fb9b1,#2d98da);color:#fff;display:flex;align-items:center;justify-content:center}.links{display:flex;gap:28px}.links a,.navCta{color:#17324d;text-decoration:none;font-weight:700;font-size:14px}.navCta{background:#0fb9b1;color:#fff;padding:13px 18px;border-radius:12px;box-shadow:0 10px 24px rgba(15,185,177,.25)}.hero{display:grid;grid-template-columns:1fr 1.08fr;gap:40px;padding:78px 7vw 52px;align-items:center;background:radial-gradient(circle at 20% 20%,rgba(15,185,177,.18),transparent 32%),radial-gradient(circle at 90% 15%,rgba(45,152,218,.2),transparent 30%)}.badge{display:inline-flex;padding:10px 14px;border-radius:999px;background:#e9fbf9;color:#078f89;font-weight:900;margin-bottom:18px}h1{font-size:clamp(42px,5vw,72px);line-height:.96;letter-spacing:-2.5px;margin:0}.heroText p{font-size:19px;line-height:1.65;color:#486278;max-width:720px;margin:24px 0}.heroBtns{display:flex;gap:14px}.primary,.secondary{padding:15px 22px;border-radius:14px;font-weight:900;text-decoration:none}.primary{background:#0fb9b1;color:#fff;box-shadow:0 15px 30px rgba(15,185,177,.28)}.secondary{background:#fff;color:#17324d;border:1px solid #dceaf5}.dashboardMock{background:#fff;border:1px solid #dceaf5;border-radius:28px;padding:22px;box-shadow:0 30px 80px rgba(31,85,125,.14)}.mockTop{display:flex;justify-content:space-between;margin-bottom:18px}.mockTop span{background:#e9fbf9;color:#078f89;padding:7px 10px;border-radius:999px;font-weight:800}.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:14px}.stats div,.card,.price{background:#fff;border:1px solid #e2edf7;border-radius:18px;padding:18px}.stats small{display:block;color:#6c8193;margin-bottom:8px}.stats strong{font-size:28px}.mockGrid{display:grid;grid-template-columns:245px 1fr;gap:12px}.chatList,.conversation{background:#f8fbff;border:1px solid #e2edf7;border-radius:20px;padding:12px}.chat{padding:14px;border-radius:15px;margin-bottom:10px;background:#fff}.chat.active{background:#e9fbf9;border:1px solid #a8ece8}.chat b,.chat span{display:block}.chat span{color:#64798c;margin-top:5px;font-size:12px}.conversation{min-height:300px;display:flex;flex-direction:column;gap:12px}.bubble,.campaign{max-width:78%;padding:13px 15px;border-radius:16px;line-height:1.45}.left{background:#fff;align-self:flex-start}.right{background:#dff9f6;align-self:flex-end}.campaign{background:linear-gradient(135deg,#e9fbf9,#edf6ff);border:1px solid #cbeeea;align-self:flex-end}.campaign span{display:block;color:#60768a;margin-top:5px}.section{padding:65px 7vw}.sectionHead{text-align:center;max-width:820px;margin:0 auto 36px}.sectionHead span{color:#0fb9b1;font-weight:900}h2{font-size:clamp(34px,4vw,54px);line-height:1.05;letter-spacing:-1.5px;margin:10px 0 0}.cards{display:grid;grid-template-columns:1fr 1fr;gap:22px}.card{padding:32px;box-shadow:0 20px 55px rgba(31,85,125,.08)}.card.featured{border-color:#0fb9b1;background:linear-gradient(180deg,#ffffff,#eefcfa)}.cardIcon{width:58px;height:58px;border-radius:18px;display:flex;align-items:center;justify-content:center;background:#e9fbf9;color:#078f89;font-weight:900;margin-bottom:22px}.card h3{font-size:30px;margin:0 0 12px}.card p{color:#526b80;line-height:1.65;font-size:16px}li{margin:10px 0;color:#17324d;font-weight:700}.platform{background:#eef7ff}.moduleGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.moduleGrid div{background:#fff;border:1px solid #dceaf5;border-radius:16px;padding:22px;font-weight:900;text-align:center}.priceGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.price{padding:30px}.price.main{border-color:#0fb9b1;transform:translateY(-8px);box-shadow:0 25px 60px rgba(15,185,177,.14)}.price h3{font-size:28px;margin:0 0 15px}.price strong{font-size:38px}.price p{color:#60768a}.demo{display:grid;grid-template-columns:1fr 430px;gap:35px;padding:65px 7vw;background:linear-gradient(135deg,#0b2437,#0e887f);color:#fff}.demo span{color:#a8fff7;font-weight:900}.demo p{color:#d8f2ef;font-size:18px}.form{background:#fff;border-radius:24px;padding:24px;display:flex;flex-direction:column;gap:12px}.form input,.form select{height:48px;border:1px solid #dceaf5;border-radius:13px;padding:0 14px}.form button{height:50px;border:0;border-radius:14px;background:#0fb9b1;color:#fff;font-weight:900;cursor:pointer}footer{display:flex;justify-content:space-between;padding:30px 7vw;background:#07131d;color:#fff}footer span{color:#92a4b5}@media(max-width:1050px){.hero,.cards,.demo{grid-template-columns:1fr}.moduleGrid,.priceGrid{grid-template-columns:1fr 1fr}.mockGrid{grid-template-columns:1fr}.links{display:none}}
      `}</style>
    </main>
  );
}
