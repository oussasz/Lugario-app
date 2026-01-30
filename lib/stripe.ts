import Stripe from "stripe";

const stripeApiKey = process.env.STRIPE_API_KEY;

export const stripe = stripeApiKey
  ? new Stripe(stripeApiKey, {
      apiVersion: "2024-09-30.acacia",
      typescript: true,
    })
  : (null as unknown as Stripe);
