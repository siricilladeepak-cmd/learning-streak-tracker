import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "studyData.json");

// Helper function to get today's date in IST (YYYY-MM-DD)
function getLocalDateIST() {
  const date = new Date();
  const istOffset = 330; // IST = UTC + 5:30
  const localTime = new Date(date.getTime() + istOffset * 60 * 1000);
  return localTime.toISOString().split("T")[0];
}

// Helper function to check if a date string is yesterday in IST
function isYesterday(dateString: string) {
  if (!dateString) return false;

  const today = new Date();
  const istOffset = 330;
  const localToday = new Date(today.getTime() + istOffset * 60 * 1000);

  const yesterday = new Date(localToday);
  yesterday.setDate(localToday.getDate() - 1);

  const date = new Date(dateString);

  return (
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate()
  );
}

export async function GET() {
  const data = fs.readFileSync(dataFilePath, "utf-8");
  return NextResponse.json(JSON.parse(data));
}

export async function POST(req: NextRequest) {
  const data = fs.readFileSync(dataFilePath, "utf-8");
  const json = JSON.parse(data);

  const localDate = getLocalDateIST();

  // Check if already studied today
  if (json.lastStudyDate !== localDate) {
    // Update streak: increment if yesterday was studied, else reset
    json.streak = isYesterday(json.lastStudyDate) ? json.streak + 1 : 1;

    // Update last study date
    json.lastStudyDate = localDate;

    // Add to history
    json.history.push(localDate);

    // Save updated data
    fs.writeFileSync(dataFilePath, JSON.stringify(json, null, 2));
  }

  return NextResponse.json(json);
}