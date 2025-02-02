import React, { useEffect } from "react";
import { fetchAuctionById } from "@/actions/buyerActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const AuctionRoom = () => {
  const dispatch = useDispatch();
  const { auction, isLoading } = useSelector((state) => state.auctionReducer);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchAuctionById(id));
  }, [id]);

  return <div>AuctionRoom</div>;
};

export default AuctionRoom;
