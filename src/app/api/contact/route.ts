import { Resend } from "resend";
import { NextResponse } from "next/server";

const MAX_REQUESTS = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const rateMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateMap.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length === 0) {
    rateMap.delete(ip);
  }

  if (rateMap.size > 50_000) {
    rateMap.clear();
  }

  if (timestamps.length >= MAX_REQUESTS) return true;
  timestamps.push(now);
  rateMap.set(ip, timestamps);
  return false;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { name, email, message, website } = body as {
      name: string;
      email: string;
      message: string;
      website?: string;
    };

    const MAX_NAME_LEN = 100;
    const MAX_EMAIL_LEN = 254;
    const MAX_MSG_LEN = 5000;

    if (
      typeof name !== 'string' || name.length > MAX_NAME_LEN ||
      typeof email !== 'string' || email.length > MAX_EMAIL_LEN ||
      typeof message !== 'string' || message.length > MAX_MSG_LEN
    ) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: "FitMyCV Contact <noreply@fitmycv.io>",
      to: "contact@fitmycv.io",
      replyTo: email,
      subject: `[Contact] ${name.trim()}`,
      text: `De : ${name.trim()} (${email.trim()})\n\n${message.trim()}`,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
