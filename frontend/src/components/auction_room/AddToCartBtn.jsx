import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { addToCart } from "@/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";

const AddToCartBtn = ({ id, userId }) => {
  const dispatch = useDispatch();
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const { items } = useSelector((state) => state.cartReducer);

  useEffect(() => {
    const itemInCart = items.some((item) => item._id === id);
    setIsAdded(itemInCart);
  }, [items, id]);

  const handleAddToCart = async () => {
    try {
      setIsBtnLoading(true);
      await dispatch(addToCart(id, userId));
    } catch (error) {
      console.error("Error in handleAddToCart:", error);
    } finally {
      setIsBtnLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleAddToCart}
        className="w-full"
        variant="teal"
        disabled={isBtnLoading}
      >
        {isBtnLoading ? (
          <Loader2 className="animate-spin" />
        ) : isAdded ? (
          <>
            <CheckCircle2 className="mb-px" /> Added to Cart
          </>
        ) : (
          <>
            <ShieldCheck className="mb-px" /> Add to Cart
          </>
        )}
      </Button>
    </>
  );
};

export default AddToCartBtn;
