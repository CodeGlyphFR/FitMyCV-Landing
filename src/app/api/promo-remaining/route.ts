import Stripe from "stripe";
import { NextResponse } from "next/server";

export const revalidate = 60; // ISR: revalidate every 60s

export async function GET() {
  try {
    const apiKey = process.env.STRIPE_SECRET_KEY;
    const promoId = process.env.STRIPE_PROMO_ID;
    if (!apiKey || !promoId) {
      return NextResponse.json({ remaining: null }, { status: 500 });
    }

    const stripe = new Stripe(apiKey);
    const promo = await stripe.promotionCodes.retrieve(promoId);

    const max = promo.max_redemptions;
    const used = promo.times_redeemed;
    const remaining = max !== null ? max - used : null;

    return NextResponse.json(
      { remaining, max, used, active: promo.active },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch {
    return NextResponse.json({ remaining: null }, { status: 500 });
  }
}
