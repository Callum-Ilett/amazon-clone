import { Header, Order } from "components";
import { firestore } from "lib/firebase";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession, useSession } from "next-auth/client";
import moment from "moment";
import Stripe from "stripe";

interface Props {
  orders: Orders;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, {
    apiVersion: "2020-08-27",
  });

  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  const email: string = session.user?.email as string;

  const stripeOrders = await firestore
    .collection("users")
    .doc(email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return { props: { orders } };
};

const orders = ({ orders }: Props) => {
  const [session] = useSession();

  console.log(orders);

  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>

        {session ? (
          <h2>
            {orders?.length} {orders?.length > 1 ? "Orders" : "Order"}
          </h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}

        <div className="mt-5 space-y-4">
          {orders?.map((order) => (
            <Order key={order.id} {...order} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default orders;
