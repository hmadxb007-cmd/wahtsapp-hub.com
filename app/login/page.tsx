"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@whatsapp-hub.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  function login() {
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    document.cookie =
      "wh_hub_session=active; path=/; max-age=604800; SameSite=Lax";

    const params = new URLSearchParams(window.location.search);
    const next = params.get("next") || "/dashboard";

    window.location.href = next;
  }

  return (
    <main className="page">
      <section className="loginBox">
        <a className="brand" href="/">
          <div>W</div>
          <strong>WhatsApp Hub</strong>
        </a>

        <span>Client Login</span>
        <h1>Login to Dashboard</h1>
        <p>
          Access WhatsApp inbox, campaigns, templates, contacts and CRM sync.
        </p>

        <label>Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@whatsapp-hub.com"
        />

        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          type="password"
        />

        {error && <div className="error">{error}</div>}

        <button onClick={login}>Login to Dashboard</button>

        <small>
          Demo login: admin@whatsapp-hub.com / 123456
        </small>
      </section>

      <section className="visual">
        <div className="glass">
          <h2>WhatsApp Business Control Center</h2>
          <p>
            Manage chats, campaigns, contacts and CRM automation from one place.
          </p>

          <div className="mini">
            <div>
              <span>Open Chats</span>
              <b>41</b>
            </div>
            <div>
              <span>Campaign Replies</span>
              <b>532</b>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .page {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 460px 1fr;
          background: #f6fbf8;
          color: #071b15;
          font-family: Inter, Arial, sans-serif;
        }

        .loginBox {
          background: #fff;
          padding: 55px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-right: 1px solid #e4eee8;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 45px;
          color: #071b15;
          text-decoration: none;
        }

        .brand div {
          width: 44px;
          height: 44px;
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

        .loginBox > span {
          color: #075e54;
          font-weight: 950;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 0.8px;
        }

        h1 {
          margin: 10px 0 12px;
          font-size: 38px;
          letter-spacing: -1.2px;
        }

        p {
          margin: 0 0 25px;
          color: #58746c;
          line-height: 1.6;
        }

        label {
          display: block;
          margin: 15px 0 7px;
          color: #58746c;
          font-size: 12px;
          font-weight: 950;
          text-transform: uppercase;
        }

        input {
          width: 100%;
          height: 52px;
          border: 1px solid #dcebe5;
          border-radius: 15px;
          padding: 0 15px;
          font-weight: 850;
          outline: none;
        }

        input:focus {
          border-color: #25d366;
        }

        button {
          height: 54px;
          border: 0;
          border-radius: 15px;
          background: #25d366;
          color: #05251d;
          font-weight: 950;
          margin-top: 20px;
          cursor: pointer;
          font-size: 15px;
        }

        small {
          color: #58746c;
          margin-top: 16px;
          text-align: center;
          font-weight: 700;
        }

        .error {
          background: #ffe8e8;
          color: #b42318;
          padding: 12px 14px;
          border-radius: 14px;
          margin-top: 15px;
          font-weight: 850;
        }

        .visual {
          background:
            linear-gradient(90deg, rgba(3, 16, 13, 0.86), rgba(3, 16, 13, 0.35)),
            url("/images/hero-dubai-cover.png");
          background-size: cover;
          background-position: center right;
          display: flex;
          align-items: flex-end;
          padding: 60px;
        }

        .glass {
          max-width: 560px;
          background: rgba(255, 255, 255, 0.13);
          border: 1px solid rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(12px);
          border-radius: 28px;
          padding: 30px;
          color: #fff;
        }

        .glass h2 {
          margin: 0 0 10px;
          font-size: 34px;
          letter-spacing: -1px;
        }

        .glass p {
          color: rgba(255, 255, 255, 0.82);
        }

        .mini {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-top: 22px;
        }

        .mini div {
          background: rgba(255, 255, 255, 0.14);
          border-radius: 18px;
          padding: 18px;
        }

        .mini span,
        .mini b {
          display: block;
        }

        .mini span {
          color: rgba(255, 255, 255, 0.78);
          font-size: 13px;
        }

        .mini b {
          font-size: 32px;
          margin-top: 6px;
        }

        @media (max-width: 900px) {
          .page {
            grid-template-columns: 1fr;
          }

          .visual {
            min-height: 420px;
          }

          .loginBox {
            padding: 35px 24px;
          }
        }
      `}</style>
    </main>
  );
}
