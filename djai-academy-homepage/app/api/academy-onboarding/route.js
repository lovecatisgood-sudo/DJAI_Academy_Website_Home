import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const experienceValues = new Set(["none", "beginner", "intermediate", "advanced"]);
const goalValues = new Set(["app", "game", "work", "income", "startup", "other"]);
const ageRangeValues = new Set(["under-18", "18-24", "25-34", "35-44", "45-54", "55-plus", "not-stated"]);
const requestLog = new Map();

function cleanString(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function storageFile() {
  if (process.env.DJAI_ONBOARDING_DATA_FILE) {
    return path.resolve(process.env.DJAI_ONBOARDING_DATA_FILE);
  }
  if (process.env.DJAI_BLOG_DATA_FILE) {
    return path.join(path.dirname(path.resolve(process.env.DJAI_BLOG_DATA_FILE)), "academy-onboarding-responses.jsonl");
  }
  return path.resolve(process.cwd(), "data", "academy-onboarding-responses.jsonl");
}

function rateLimited(request) {
  const forwarded = request.headers.get("x-forwarded-for") || "";
  const address = forwarded.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
  const now = Date.now();
  const recent = (requestLog.get(address) || []).filter((time) => now - time < 10 * 60 * 1000);
  recent.push(now);
  requestLog.set(address, recent);
  return recent.length > 8;
}

function sameOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

export async function POST(request) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }
  if (rateLimited(request)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const goals = Array.isArray(body?.goals)
    ? [...new Set(body.goals.filter((goal) => goalValues.has(goal)))].slice(0, goalValues.size)
    : [];
  const response = {
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    version: 1,
    locale: body?.locale === "th" ? "th" : "en",
    name: cleanString(body?.name, 100),
    ageRange: cleanString(body?.ageRange, 20),
    profession: cleanString(body?.profession, 120),
    experience: cleanString(body?.experience, 20),
    knowsProgramming: body?.knowsProgramming === "yes" ? "yes" : body?.knowsProgramming === "no" ? "no" : "",
    programmingLanguages: body?.knowsProgramming === "yes" ? cleanString(body?.programmingLanguages, 180) : "",
    goals,
    otherGoal: goals.includes("other") ? cleanString(body?.otherGoal, 240) : "",
    acceptedGuidelines: body?.acceptedGuidelines === true,
    acceptedDeclaration: body?.acceptedDeclaration === true
  };

  const valid = response.name
    && ageRangeValues.has(response.ageRange)
    && response.profession
    && experienceValues.has(response.experience)
    && response.knowsProgramming
    && (response.knowsProgramming === "no" || response.programmingLanguages)
    && response.goals.length > 0
    && (!response.goals.includes("other") || response.otherGoal)
    && response.acceptedGuidelines
    && response.acceptedDeclaration;

  if (!valid) {
    return NextResponse.json({ error: "Please complete every required onboarding field." }, { status: 400 });
  }

  try {
    const dataFile = storageFile();
    await fs.mkdir(path.dirname(dataFile), { recursive: true });
    await fs.appendFile(dataFile, `${JSON.stringify(response)}\n`, { encoding: "utf8", mode: 0o600 });
    return NextResponse.json({ saved: true, id: response.id }, { status: 201 });
  } catch (error) {
    console.error("Unable to save Academy onboarding response.", error);
    return NextResponse.json({ error: "Unable to save the onboarding response." }, { status: 503 });
  }
}
