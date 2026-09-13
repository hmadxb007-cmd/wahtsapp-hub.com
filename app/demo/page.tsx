"use client";

import { useState } from "react";

export default function DemoPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "Both CRM Integration and Marketing",
    message: "",
  });

  function update(field: string, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function requestDemo() {
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
  }

  return (
    <main className="page">
      <section className="hero">
        <a className="back" href="/">← Back to Home</a>

        <div className="grid">
          <div>
            <span>Request demo</span>
            <h1>See how WhatsApp Hub can grow your business.</h1>
            <p>
              Book a demo for WhatsApp CRM integration, bulk WhatsApp marketing,
              Meta Cloud API setup, templates and agent inbox automation.
            </p>

            <div className="points">
              <div>✓ WhatsApp Cloud API setup</div>
              <div>✓ CRM integration consultation</div>
              <div>✓ Campaign and template setup</div>
              <div>✓ Agent inbox workflow demo</div>
            </div>
          </div>

          <form className="form" onSubmit={(event) => event.preventDefault()}>
            <h2>Request a Demo</h2>

            <input
              placeholder="Your name"
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
            />

            <input
              placeholder="Company name"
              value={form.company}
              onChange={(event) => update("company", event.target.value)}
            />

            <input
              placeholder="Business email"
              value={form.email}
              onChange={(event) => update("email", event.target.value)}
            />

            <input
              placeholder="WhatsApp number"
              value={form.phone}
              onChange={(event) => update("phone", event.target.value)}
            />

            <select
              value={form.service}
              onChange={(event) => update("service", event.target.value)}
            >
              <option>Both CRM Integration and Marketing</option>
              <option>WhatsApp CRM Integration only</option>
              <option>WhatsApp Marketing Campaigns only</option>
              <option>Meta WhatsApp API setup only</option>
            </select>

            <textarea
              placeholder="Tell us what you need"
              value={form.message}
              onChange={(event) => update("message", event.target.value)}
            />

            <button type="button" onClick={requestDemo}>
              Request Demo on WhatsApp
            </button>

            <small>
              For now this sends the request to WhatsApp. Later we will save it in your dashboard also.
            </small>
          </form>
        </div>
      </section>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .page {
          min-height: 100vh;
          font-family: Inter, Arial, sans-serif;
          background:
            linear-gradient(90deg, rgba(3, 16, 13, 0.92), rgba(3, 16, 13, 0.55)),
            url("/images/hero-dubai-cover.png");
          background-size: cover;
          background-position: center right;
          color: #fff;
        }

        .hero {
          min-height: 100vh;
          padding: 36px 7vw 80px;
        }

        .back {
          display: inline-flex;
          color: #fff;
          text-decoration: none;
          margin-bottom: 70px;
          font-weight: 800;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 470px;
          gap: 60px;
          align-items: center;
        }

        span {
          display: inline-flex;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #d6fff0;
          border-radius: 999px;
          padding: 9px 14px;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
        }

        h1 {
          font-size: clamp(48px, 5vw, 78px);
          line-height: 0.95;
          letter-spacing: -3px;
          margin: 22px 0;
          max-width: 760px;
        }

        p {
          color: #d8ebe5;
          font-size: 20px;
          line-height: 1.7;
          max-width: 680px;
        }

        .points {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-top: 35px;
          max-width: 720px;
        }

        .points div {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 16px;
          padding: 16px;
          font-weight: 800;
          backdrop-filter: blur(10px);
        }

        .form {
          background: #fff;
          color: #071b15;
          border-radius: 30px;
          padding: 30px;
          box-shadow: 0 35px 90px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        h2 {
          margin: 0 0 10px;
          font-size: 30px;
        }

        input,
        select,
        textarea {
          width: 100%;
          border: 1px solid #dcebe5;
          border-radius: 15px;
          padding: 0 15px;
          font-size: 15px;
          font-weight: 700;
          outline: none;
        }

        input,
        select {
          height: 53px;
        }

        textarea {
          min-height: 110px;
          padding-top: 15px;
          resize: vertical;
        }

        input:focus,
        select:focus,
        textarea:focus {
          border-color: #25d366;
        }

        button {
          height: 55px;
          border: 0;
          border-radius: 16px;
          background: #25d366;
          color: #05251d;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-weight: 950;
          cursor: pointer;
        }

        small {
          color: #6d837b;
          line-height: 1.5;
        }

        @media (max-width: 900px) {
          .grid,
          .points {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
