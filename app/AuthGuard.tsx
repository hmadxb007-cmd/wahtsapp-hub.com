"use client";

import { useEffect, useState } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const hasSession = document.cookie
      .split("; ")
      .some((cookie) => cookie === "wh_hub_session=active");

    if (!hasSession) {
      window.location.href = "/login";
      return;
    }

    setAllowed(true);
  }, []);

  if (!allowed) {
    return (
      <main style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        background: "#f6fbf8",
        color: "#071b15"
      }}>
        Checking login...
      </main>
    );
  }

  return <>{children}</>;
}
