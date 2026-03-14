"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
  const [streak, setStreak] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [lastStudyDate, setLastStudyDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadData() {
      const res = await fetch("/api/study");
      const data = await res.json();

      setStreak(data.streak);
      setLastStudyDate(data.lastStudyDate);
      setTotalDays(data.history.length);
      setLoading(false);
    }

    loadData();
  }, []);

  async function markToday() {
  console.log("Button clicked");

  const today = new Date().toISOString().split("T")[0];

  if (lastStudyDate === today) {
    setMessage("You have already marked today.");
    return;
  }

    const res = await fetch("/api/study", {
      method: "POST",
    });

    const data = await res.json();

    setStreak(data.streak);
    setLastStudyDate(data.lastStudyDate);
    setTotalDays(data.history.length);
    setMessage("Study recorded successfully!");
  }

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div>
      <Navbar />

      <div className="p-8 max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">
          Welcome to Daily Learning Streak Tracker
        </h1>

        <p className="mb-2">
          Current Streak: <strong>{streak}</strong> days
        </p>

        <p className="mb-2">
          Total Study Days: <strong>{totalDays}</strong>
        </p>

        <p className="mb-4">
          Last Studied: {lastStudyDate || "Never"}
        </p>

        <button
          onClick={markToday}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          I Studied Today
        </button>

        {message && (
          <p className="mt-4 text-green-600 font-semibold">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}