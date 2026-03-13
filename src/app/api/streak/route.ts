import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "studyData.json");

// Helper to get date string in YYYY-MM-DD (UTC)
function getUTCDateString(offsetDays = 0) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + offsetDays);
  return date.toISOString().split("T")[0];
}

// Helper to check if a date string is yesterday (UTC)
function isYesterday(dateString: string) {
  if (!dateString) return false;

  const yesterday = getUTCDateString(-1);
  return dateString === yesterday;
}

export async function GET() {
  const data = fs.readFileSync(dataFilePath, "utf-8");
  return NextResponse.json(JSON.parse(data));
}

export async function POST(req: NextRequest) {
  const data = fs.readFileSync(dataFilePath, "utf-8");
  const json = JSON.parse(data);

  const today = getUTCDateString(); // always UTC

  // Already marked today?
  if (json.lastStudyDate !== today) {
    // Update streak
    json.streak = isYesterday(json.lastStudyDate) ? json.streak + 1 : 1;

    // Update last study date
    json.lastStudyDate = today;

    // Add to history
    json.history.push(today);

    // Save JSON
    fs.writeFileSync(dataFilePath, JSON.stringify(json, null, 2));
  }

  return NextResponse.json(json);
}