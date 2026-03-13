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

  const today = new Date().toISOString().split("T")[0];

  // Check if already studied today
  if (json.lastStudyDate !== today) {
    json.streak = json.lastStudyDate === getYesterday() ? json.streak + 1 : 1;
    json.lastStudyDate = today;

    // Prevent duplicate dates
    if (!json.history.includes(today)) {
      json.history.push(today);
    }

    fs.writeFileSync(dataFilePath, JSON.stringify(json, null, 2));
  }

  return NextResponse.json(json);
}

function getYesterday() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}