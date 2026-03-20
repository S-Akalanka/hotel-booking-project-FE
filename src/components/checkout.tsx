import { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { useParams } from "react-router";
import { useCreateCheckoutSessionMutation } from "@/lib/api";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const CheckoutForm = () => {
  const { bookingId } = useParams();
  
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();

  const fetchClientSecret = useCallback(async () => {
    try {
      const result = await createCheckoutSession(bookingId).unwrap();
      return result.clientSecret; 
    } catch (err) {
      console.error("Failed to create checkout session:", err);
    }
  }, [bookingId, createCheckoutSession]);

  return (
    <div id="checkout" className="my-28">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};