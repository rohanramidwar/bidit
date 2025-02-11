import { fetchUserOrders } from "@/actions/buyerActions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const MyOrdersPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.auctionReducer);

  useEffect(() => {
    dispatch(fetchUserOrders(id));
  }, [id]);

  console.log("Orders: ", orders);

  return <div>MyOrdersPage</div>;
};

export default MyOrdersPage;
