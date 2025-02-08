import { PLACE_BID, UPDATE_AUCTION } from "@/constants/actionTypes";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

export const useAuctionSocket = (auctionId, userId) => {
  const socket = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    socket.current = io("http://localhost:5000");

    socket.current.emit("join_auction", { auctionId, userId });

    socket.current.on("bid_update", ({ bid, auction }) => {
      dispatch({ type: PLACE_BID, payload: bid });
      if (auction) {
        dispatch({ type: UPDATE_AUCTION, payload: auction });
      }
    });

    return () => {
      if (socket.current) {
        socket.current.emit("leave_auction", { auctionId, userId });
        socket.current.disconnect();
      }
    };
  }, [auctionId, userId, navigate]);

  return { socket: socket.current };
};
