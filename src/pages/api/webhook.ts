import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import admin from "firebase-admin";
import permissions from "lib/permissions.json";
import Stripe from "stripe";

const serviceAccount: admin.ServiceAccount = {
  clientEmail: permissions.client_email,
  privateKey: permissions.private_key,
  projectId: permissions.project_id,
};

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, {
  apiVersion: "2020-08-27",
});

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const handleOrder = async (session: Stripe.Checkout.Session) => {
  const email: string = session.customer_details?.email as string;
  const images =
    session.metadata?.images && JSON.parse(session.metadata.images);
  const amount = session.amount_total && session.amount_total / 100;
  const timestamp = admin.firestore.FieldValue.serverTimestamp();

  const newOrder = { amount, email, timestamp, images };

  return app
    .firestore()
    .collection("users")
    .doc(email)
    .collection("orders")
    .doc(session.id)
    .set({ ...newOrder });
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const signature = req.headers["stripe-signature"] as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature,
        endpointSecret
      );
    } catch (error) {
      console.log("ERROR:", error);
      return res.status(400).send(`Webhook error: ${error.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      return handleOrder(session);
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalSolver: true,
  },
};
