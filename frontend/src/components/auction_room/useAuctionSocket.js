import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

export const useAuctionSocket = (auctionId, userId) => {
  const socket = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    socket.current = io("http://localhost:5000");

    socket.current.emit("join_auction", { auctionId, userId });

    return () => {
      if (socket.current) {
        socket.current.emit("leave_auction", { auctionId, userId });
        socket.current.disconnect();
      }
    };
  }, [auctionId, userId, navigate]);

  return { socket: socket.current };
};
