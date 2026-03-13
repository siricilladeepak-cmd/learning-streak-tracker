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

  // ✅ Use local date instead of UTC
  const today = new Date();
  const localDate = today.toLocaleDateString("en-CA"); // format: YYYY-MM-DD

  // Check if already studied today
  if (json.lastStudyDate !== localDate) {
    json.streak =
      json.lastStudyDate === getYesterday() ? json.streak + 1 : 1;
    json.lastStudyDate = localDate;
    json.history.push(localDate);

    fs.writeFileSync(dataFilePath, JSON.stringify(json, null, 2));
  }

  return NextResponse.json(json);
}

// ✅ Use local date for yesterday calculation
function getYesterday() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toLocaleDateString("en-CA"); // format: YYYY-MM-DD
}