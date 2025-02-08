import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Alert, AlertDescription } from "../ui/alert";
import { DollarSign, Loader2 } from "lucide-react";
import { placeBid } from "@/actions/buyerActions";
import { useDispatch } from "react-redux";

const PlaceBidForm = ({ auction, id, userId, socket }) => {
  const dispatch = useDispatch();
  const [bidAmount, setBidAmount] = useState("");
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [validationError, setValidationError] = useState("");

  const validateBid = (amount) => {
    const numAmount = Number(amount);
    const minBid = auction?.currentBid?.bid
      ? auction?.currentBid?.bid * 1.05
      : auction?.startingBid;

    if (isNaN(numAmount)) {
      return "Please enter a valid number";
    }
    if (numAmount < minBid) {
      return `Bid must be at least $${minBid.toFixed(2)}`;
    }
    return "";
  };

  const handlePlaceBid = () => {
    const error = validateBid(bidAmount);
    if (error) {
      setValidationError(error);
      return;
    }
    setIsBtnLoading(true);
    dispatch(
      placeBid(
        id,
        {
          userId,
          amount: Number(bidAmount),
        },
        socket
      )
    );
    setBidAmount("");
    setIsBtnLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Input
          type="number"
          value={bidAmount}
          onChange={(e) => {
            setBidAmount(e.target.value);
            setValidationError("");
          }}
          placeholder="Enter bid amount"
          className="bg-gray-800 text-white"
        />
        {validationError && (
          <Alert variant="destructive">
            <AlertDescription>{validationError}</AlertDescription>
          </Alert>
        )}
      </div>

      <Button
        onClick={handlePlaceBid}
        variant="teal"
        className="w-full"
        disabled={isBtnLoading || !bidAmount}
      >
        {isBtnLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <DollarSign className="mr-2" />
            Place Bid
          </>
        )}
      </Button>
    </div>
  );
};

export default PlaceBidForm;
