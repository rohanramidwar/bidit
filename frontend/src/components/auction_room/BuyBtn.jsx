import React, { useState } from "react";
import { Button } from "../ui/button";
import { Loader2, ShieldCheck } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";

const BuyBtn = ({ id, userId, auction }) => {
  const [inProcess, setInProcess] = useState(false);

  const makePayment = async () => {
    setInProcess(true);
    const stripe = await loadStripe(
      "pk_test_51Ptrd0Kr2vWG4UII1jNdHmT0zC28evCW85B5vtvbVuP6zWretaX4Aq8cz8Qt4dUeVN6Bcy6J2USlOlfJMIVqwxBS00ytRUAzR0"
    );

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(
      "https://bidit-jsro.vercel.app/api/stripe/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          id: id,
          title: auction?.title,
          itemPic: auction?.itemPic,
          price: auction?.currentBid?.bid,
          userId: userId,
        }),
      }
    );

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    setInProcess(false);

    if (result.error) {
      console.log(result.error);
      setInProcess(false);
    }
  };

  return (
    <>
      <Button
        className="w-full"
        variant="teal"
        disabled={inProcess}
        onClick={makePayment}
      >
        {inProcess ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <ShieldCheck className="mb-px" /> Buy ${auction?.currentBid?.bid}
          </>
        )}
      </Button>
    </>
  );
};

export default BuyBtn;
