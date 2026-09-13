"use client";

export default function DemoPage() {
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

          <form className="form">
            <h2>Request a Demo</h2>

            <input placeholder="Your name" />
            <input placeholder="Company name" />
            <input placeholder="Business email" />
            <input placeholder="WhatsApp number" />

            <select>
              <option>Both CRM Integration and Marketing</option>
              <option>WhatsApp CRM Integration only</option>
              <option>WhatsApp Marketing Campaigns only</option>
              <option>Meta WhatsApp API setup only</option>
            </select>

            <textarea placeholder="Tell us what you need"></textarea>

            <a
              className="submit"
              href="https://wa.me/971509998888?text=Hi%2C%20I%20want%20a%20demo%20for%20WhatsApp%20Hub"
              target="_blank"
            >
              Request Demo on WhatsApp
            </a>

            <small>
              Replace this WhatsApp number later with your official business number.
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

        .submit {
          height: 55px;
          border-radius: 16px;
          background: #25d366;
          color: #05251d;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-weight: 950;
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
