"use client";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$49/mo",
      desc: "For small teams starting with WhatsApp CRM.",
      features: ["1 WhatsApp number", "Shared inbox", "Basic CRM sync", "Email support"],
    },
    {
      name: "Growth",
      price: "$149/mo",
      desc: "For companies needing CRM plus marketing campaigns.",
      features: ["3 WhatsApp numbers", "Campaigns", "Template sync", "Analytics", "Automation"],
      active: true,
    },
    {
      name: "Agency",
      price: "Custom",
      desc: "For agencies managing multiple clients.",
      features: ["Multi-client panel", "Multiple CRMs", "Priority setup", "Custom workflow"],
    },
  ];

  return (
    <main className="page">
      <nav>
        <a href="/">WhatsApp Hub</a>
        <a href="/demo">Request Demo</a>
      </nav>

      <section>
        <span>Pricing</span>
        <h1>Simple plans for WhatsApp CRM and marketing growth.</h1>

        <div className="cards">
          {plans.map((plan) => (
            <div className={`card ${plan.active ? "active" : ""}`} key={plan.name}>
              <h2>{plan.name}</h2>
              <b>{plan.price}</b>
              <p>{plan.desc}</p>

              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>✓ {feature}</li>
                ))}
              </ul>

              <a href="/demo">{plan.active ? "Request Demo" : "Get Started"}</a>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .page {
          min-height: 100vh;
          background: #f6fbf8;
          color: #071b15;
          font-family: Inter, Arial, sans-serif;
        }

        nav {
          height: 82px;
          padding: 0 7vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fff;
          border-bottom: 1px solid #e4eee8;
        }

        nav a {
          color: #071b15;
          text-decoration: none;
          font-weight: 900;
        }

        section {
          padding: 80px 7vw;
          text-align: center;
        }

        span {
          display: inline-flex;
          color: #075e54;
          background: #e8f7ef;
          padding: 8px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
        }

        h1 {
          max-width: 900px;
          margin: 18px auto 45px;
          font-size: clamp(42px, 5vw, 72px);
          line-height: 1;
          letter-spacing: -2.5px;
        }

        .cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
          text-align: left;
        }

        .card {
          background: #fff;
          border: 1px solid #e4eee8;
          border-radius: 30px;
          padding: 35px;
          box-shadow: 0 25px 70px rgba(8, 42, 31, 0.06);
        }

        .card.active {
          border-color: #25d366;
          transform: translateY(-12px);
          background: linear-gradient(180deg, #fff, #f0fbf5);
        }

        h2 {
          margin: 0 0 12px;
          font-size: 30px;
        }

        b {
          display: block;
          color: #075e54;
          font-size: 44px;
          margin-bottom: 16px;
        }

        p {
          color: #58746c;
          line-height: 1.6;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 25px 0;
        }

        li {
          margin: 13px 0;
          font-weight: 800;
        }

        .card a {
          display: inline-flex;
          background: #075e54;
          color: #fff;
          padding: 15px 22px;
          border-radius: 15px;
          text-decoration: none;
          font-weight: 900;
        }

        @media (max-width: 900px) {
          .cards {
            grid-template-columns: 1fr;
          }

          .card.active {
            transform: none;
          }
        }
      `}</style>
    </main>
  );
}
