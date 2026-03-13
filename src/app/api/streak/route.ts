import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "studyData.json");

export async function GET() {
  const data = fs.readFileSync(dataFilePath, "utf-8");
  const json = JSON.parse(data);

  return NextResponse.json({
    streak: json.streak,
    totalDays: json.history.length,
    lastStudyDate: json.lastStudyDate,
  });
}