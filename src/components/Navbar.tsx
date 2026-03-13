"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "15px",
      background: "#222",
      color: "white"
    }}>
      <h2>Daily Streak</h2>

      <div style={{display:"flex", gap:"20px"}}>
        <Link href="/">Dashboard</Link>
        <Link href="/history">History</Link>
      </div>
    </nav>
  );
}