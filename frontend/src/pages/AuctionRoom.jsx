import React, { useEffect } from "react";
import { fetchAuctionById } from "@/actions/buyerActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Timer } from "lucide-react";
import { Button } from "@/components/ui/button";

const AuctionRoom = () => {
  const dispatch = useDispatch();
  const { auction, isLoading } = useSelector((state) => state.auctionReducer);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchAuctionById(id));
  }, [id]);

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  return <div className="pt-9 pb-20 px-4">AuctionRoom</div>;
};

export default AuctionRoom;
