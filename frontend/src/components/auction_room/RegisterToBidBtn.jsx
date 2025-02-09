import React, { useState } from "react";
import { Button } from "../ui/button";
import { Loader2, ShieldCheck } from "lucide-react";
import { registerToBid } from "@/actions/buyerActions";
import { useDispatch } from "react-redux";

const RegisterToBidBtn = ({ id, userId }) => {
  const dispatch = useDispatch();
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const handleRegisterToBid = async () => {
    try {
      setIsBtnLoading(true);
      await dispatch(registerToBid(id, { userId }));
    } catch (error) {
      console.error("Error in handleRegisterToBid:", error);
    } finally {
      setIsBtnLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleRegisterToBid}
        variant="teal"
        className="w-full"
        disabled={isBtnLoading}
      >
        {isBtnLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <ShieldCheck className="mr-2" />
            Register to bid
          </>
        )}
      </Button>
    </>
  );
};

export default RegisterToBidBtn;
