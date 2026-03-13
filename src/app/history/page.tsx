"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function HistoryPage() {
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/history")
      .then((res) => res.json())
      .then((data) => {
        const sortedHistory = data.history.sort(
          (a: string, b: string) =>
            new Date(b).getTime() - new Date(a).getTime()
        );

        setHistory(sortedHistory);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div>
      <Navbar />

      <div className="p-8 max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Study History</h1>

        {history.length === 0 ? (
          <p>No study records yet.</p>
        ) : (
          <ul className="list-disc list-inside space-y-2">
            {history.map((date) => (
              <li key={date}>
                {new Date(date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                })}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}