import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";

const stripeSecretKey = `${process.env.STRIPE_PRIVATE_KEY}`;

const stripe = new Stripe(stripeSecretKey, { apiVersion: "2020-08-27" });

interface RequestBody {
  basket: Products;
  email: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { basket }: RequestBody = req.body;

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = basket.map(
    (item) => ({
      description: item.description,
      quantity: 1,
      price_data: {
        currency: "GBP",
        unit_amount: item.price * 100,
        product_data: {
          name: item.title,
          description: item.description,
          images: [item.image],
        },
      },
    })
  );

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_rates: ["shr_1IuK6VIbjUTEhRl6UM8xm9aL"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,

    metadata: {
      images: JSON.stringify(basket.map((item) => item.image)),
    },

    shipping_address_collection: {
      allowed_countries: ["GB", "US", "CA"],
    },
  });

  res.status(200).json({ id: session.id });
};
