import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { CheckoutProduct, Header, Seo } from "components";
import { useAppSelector } from "lib/hooks";
import { selectItems, selectTotal } from "lib/redux/slices/basketSlice";
import { useSession } from "next-auth/client";
import Image from "next/image";
import { MouseEventHandler } from "react";
import Currency from "react-currency-formatter";

const stripePublicKey = process.env.stripe_public_key;

const stripePromise = loadStripe(stripePublicKey);

const Checkout = () => {
  const [session] = useSession();
  const basket = useAppSelector(selectItems);
  const total = useAppSelector(selectTotal);

  const createCheckoutSession: MouseEventHandler = async () => {
    const stripe = await stripePromise;

    const checkoutSession = await axios.post("/api/create-checkout-session", {
      basket,
    });

    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result?.error) alert(result.error.message);
  };

  return (
    <>
      <Seo title="Checkout" />
      <div className="bg-gray-100">
        <Header />
        <main className="lg: flex max-w-screen-2xl mx-auto">
          <div className="flex-grow m-5 shadow-sm">
            <Image
              src="/images/prime-day-banner.png"
              width={1020}
              height={250}
              objectFit="contain"
            />

            <div className="flex flex-col p-5 space-y-10 bg-white">
              <h1 className="text-3xl border-b pb-4">
                {basket.length === 0
                  ? "Your basket is empty"
                  : "Shopping Basket"}
              </h1>

              {basket.map((product) => (
                <CheckoutProduct key={product.id} {...product} />
              ))}
            </div>

            <div className="flex flex-col bg-white p-10 shadow-md">
              {basket.length > 0 && (
                <>
                  <h2 className="whitespace-nowrap">
                    Subtotal({basket.length} items):{" "}
                    <span className="font-bold">
                      <Currency quantity={total} currency="GBP" />
                    </span>
                  </h2>

                  <button
                    className={`button mt-2 ${
                      !session &&
                      "from-gray-300 to-gray-500 border-gray-200 text-gray-300"
                    }`}
                    disabled={!session}
                    role="link"
                    onClick={createCheckoutSession}
                  >
                    {!session ? "Sign in to checkout" : "Proceed to checkout"}
                  </button>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Checkout;
