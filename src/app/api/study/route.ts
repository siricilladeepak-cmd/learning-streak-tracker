import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "studyData.json");

export async function GET() {
  const data = fs.readFileSync(dataFilePath, "utf-8");
  return NextResponse.json(JSON.parse(data));
}

export async function POST(req: NextRequest) {
  const data = fs.readFileSync(dataFilePath, "utf-8");
  const json = JSON.parse(data);

  // ✅ Get today's date in YYYY-MM-DD format
  const today = new Date();
  const localDate = today.toISOString().split("T")[0]; 

  // Check if already studied today
  if (json.lastStudyDate !== localDate) {
    // Update streak: +1 if yesterday was studied, else reset to 1
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

// ✅ Helper function to check if a date is yesterday
function isYesterday(dateString: string) {
  if (!dateString) return false; // first day

  const date = new Date(dateString);
  const today = new Date();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  return (
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate()
  );
}