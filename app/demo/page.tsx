"use client";

import { useState } from "react";

export default function DemoPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "WhatsApp CRM Integration",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function updateField(field: string, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function requestDemo() {
    setSubmitted(false);

    if (!form.name || !form.phone) {
      alert("Please enter name and phone number.");
      return;
    }

    try {
      await fetch("/api/demo-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      setSubmitted(true);

      const text = `
Hi, I want a demo for WhatsApp Hub.

Name: ${form.name}
Company: ${form.company}
Email: ${form.email}
Phone: ${form.phone}
Service: ${form.service}
Message: ${form.message}
      `.trim();

      const whatsappNumber = "971504265343";
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

      window.open(url, "_blank");
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <main className="page">
      <nav className="topbar">
        <a className="brand" href="/">
          <div>W</div>
          <strong>WhatsApp Hub</strong>
        </a>

        <div className="links">
          <a href="/">Home</a>
          <a href="/pricing">Pricing</a>
          <a href="/login">Login</a>
        </div>
      </nav>

      <section className="hero">
        <div className="left">
          <span>Request demo</span>
          <h1>See how WhatsApp Hub can work for your business</h1>
          <p>
            Book a demo for WhatsApp CRM integration, marketing campaigns,
            templates, contacts and CRM sync.
          </p>

          <div className="benefits">
            <div>
              <b>CRM Integration</b>
              <small>Connect WhatsApp with Bitrix24 and other CRMs.</small>
            </div>

            <div>
              <b>Bulk Campaigns</b>
              <small>Send approved WhatsApp templates to your audience.</small>
            </div>

            <div>
              <b>Agent Inbox</b>
              <small>Manage all customer replies in one team inbox.</small>
            </div>
          </div>
        </div>

        <div className="formCard">
          <h2>Request a Demo</h2>
          <p>Fill the form and we will contact you on WhatsApp.</p>

          <label>Full Name</label>
          <input
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Your name"
          />

          <label>Company Name</label>
          <input
            value={form.company}
            onChange={(e) => updateField("company", e.target.value)}
            placeholder="Company name"
          />

          <label>Email Address</label>
          <input
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="email@example.com"
          />

          <label>WhatsApp Number</label>
          <input
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="+971 50 000 0000"
          />

          <label>Service Required</label>
          <select
            value={form.service}
            onChange={(e) => updateField("service", e.target.value)}
          >
            <option>WhatsApp CRM Integration</option>
            <option>WhatsApp Marketing Campaigns</option>
            <option>CRM + Marketing Package</option>
            <option>Meta WhatsApp API Setup</option>
          </select>

          <label>Message</label>
          <textarea
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
            placeholder="Tell us what you need..."
          />

          <button type="button" onClick={requestDemo}>
            Request Demo on WhatsApp
          </button>

          {submitted && (
            <div className="success">
              Demo request saved successfully. WhatsApp will open now.
            </div>
          )}
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

        .topbar {
          height: 86px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 7vw;
          background: #fff;
          border-bottom: 1px solid #e4eee8;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: #071b15;
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

        .brand strong {
          font-size: 20px;
        }

        .links {
          display: flex;
          gap: 22px;
          align-items: center;
        }

        .links a {
          color: #26423a;
          text-decoration: none;
          font-weight: 850;
        }

        .links a:hover {
          color: #075e54;
        }

        .hero {
          min-height: calc(100vh - 86px);
          display: grid;
          grid-template-columns: 1fr 520px;
          gap: 42px;
          padding: 70px 7vw;
          align-items: center;
          background:
            linear-gradient(90deg, rgba(246, 251, 248, 0.96), rgba(246, 251, 248, 0.75)),
            url("/images/hero-dubai-cover.png");
          background-size: cover;
          background-position: center right;
        }

        .left {
          max-width: 720px;
        }

        .left > span {
          color: #075e54;
          font-weight: 950;
          text-transform: uppercase;
          font-size: 13px;
          letter-spacing: 0.8px;
        }

        h1 {
          margin: 12px 0 18px;
          font-size: 58px;
          line-height: 1.02;
          letter-spacing: -2.2px;
        }

        .left p {
          max-width: 620px;
          margin: 0 0 28px;
          color: #58746c;
          font-size: 18px;
          line-height: 1.7;
        }

        .benefits {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-top: 30px;
        }

        .benefits div {
          background: #fff;
          border: 1px solid #e4eee8;
          border-radius: 22px;
          padding: 20px;
          box-shadow: 0 18px 50px rgba(8, 42, 31, 0.05);
        }

        .benefits b,
        .benefits small {
          display: block;
        }

        .benefits b {
          margin-bottom: 8px;
          color: #075e54;
        }

        .benefits small {
          color: #58746c;
          line-height: 1.5;
        }

        .formCard {
          background: #fff;
          border: 1px solid #e4eee8;
          border-radius: 30px;
          padding: 32px;
          box-shadow: 0 25px 70px rgba(8, 42, 31, 0.12);
        }

        .formCard h2 {
          margin: 0 0 8px;
          font-size: 30px;
          letter-spacing: -1px;
        }

        .formCard p {
          margin: 0 0 20px;
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
        select,
        textarea {
          width: 100%;
          border: 1px solid #dcebe5;
          border-radius: 15px;
          padding: 0 14px;
          font-weight: 800;
          outline: none;
          background: #fff;
        }

        input,
        select {
          height: 50px;
        }

        textarea {
          min-height: 105px;
          padding-top: 14px;
          resize: vertical;
          line-height: 1.5;
        }

        input:focus,
        select:focus,
        textarea:focus {
          border-color: #25d366;
        }

        button {
          width: 100%;
          height: 54px;
          border: 0;
          border-radius: 16px;
          background: #25d366;
          color: #05251d;
          font-weight: 950;
          margin-top: 20px;
          cursor: pointer;
          font-size: 15px;
        }

        button:hover {
          background: #1fc65d;
        }

        .success {
          margin-top: 14px;
          background: #e8f7ef;
          color: #075e54;
          border: 1px solid #bde9cf;
          border-radius: 14px;
          padding: 13px 15px;
          font-weight: 900;
        }

        @media (max-width: 1050px) {
          .hero {
            grid-template-columns: 1fr;
          }

          h1 {
            font-size: 44px;
          }

          .benefits {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 700px) {
          .topbar {
            height: auto;
            padding: 18px 24px;
            align-items: flex-start;
            flex-direction: column;
            gap: 18px;
          }

          .links {
            flex-wrap: wrap;
          }

          .hero {
            padding: 40px 24px;
          }

          h1 {
            font-size: 36px;
          }

          .formCard {
            padding: 24px;
          }
        }
      `}</style>
    </main>
  );
}
