"use client";

export default function LoginPage() {
  return (
    <main className="page">
      <div className="box">
        <a href="/">← WhatsApp Hub</a>

        <h1>Client Login</h1>
        <p>Access your WhatsApp CRM, campaigns, templates and reports.</p>

        <input placeholder="Email address" />
        <input placeholder="Password" type="password" />

        <a className="button" href="/app/dashboard">Login to Dashboard</a>

        <small>This is demo login for now. Real authentication comes next.</small>
      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            linear-gradient(90deg, rgba(3, 16, 13, 0.88), rgba(3, 16, 13, 0.45)),
            url("/images/hero-dubai-cover.png");
          background-size: cover;
          background-position: center right;
          font-family: Inter, Arial, sans-serif;
          padding: 30px;
        }

        .box {
          width: 100%;
          max-width: 460px;
          background: #fff;
          border-radius: 30px;
          padding: 35px;
          box-shadow: 0 35px 90px rgba(0, 0, 0, 0.28);
        }

        a {
          color: #075e54;
          text-decoration: none;
          font-weight: 900;
        }

        h1 {
          margin: 35px 0 10px;
          font-size: 42px;
          letter-spacing: -1.5px;
          color: #071b15;
        }

        p {
          color: #58746c;
          line-height: 1.6;
        }

        input {
          width: 100%;
          height: 54px;
          border: 1px solid #dcebe5;
          border-radius: 15px;
          padding: 0 15px;
          margin-top: 14px;
          font-weight: 700;
          outline: none;
        }

        input:focus {
          border-color: #25d366;
        }

        .button {
          height: 55px;
          margin-top: 18px;
          border-radius: 16px;
          background: #25d366;
          color: #05251d;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        small {
          display: block;
          margin-top: 16px;
          color: #6d837b;
        }
      `}</style>
    </main>
  );
}
