import React, { useEffect, useState } from "react";
import { fetchAuctionById, fetchBidsByItem } from "@/actions/buyerActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loader2, ShieldCheck } from "lucide-react";
import BidHistory from "@/components/BidHistory";
import ItemDisplayCard from "@/components/auction_room/ItemDisplayCard";
import AuctionDetails from "@/components/auction_room/AuctionDetails";
import RegisterToBidBtn from "@/components/auction_room/RegisterToBidBtn";
import PlaceBidForm from "@/components/auction_room/PlaceBidForm";
import { useAuctionSocket } from "@/components/auction_room/useAuctionSocket";
import { Button } from "@/components/ui/button";

const AuctionRoom = () => {
  const dispatch = useDispatch();
  const { auction, isLoading } = useSelector((state) => state.auctionReducer);
  const { bids, bidsLoading } = useSelector((state) => state.bidsReducer);
  const { user } = useSelector((state) => state.authReducer);
  const { id } = useParams();
  const [participantsCount, setParticipantsCount] = useState(0);

  const { socket } = useAuctionSocket(id, user?.id);

  useEffect(() => {
    dispatch(fetchAuctionById(id));
    dispatch(fetchBidsByItem(id));
  }, [id]);

  useEffect(() => {
    if (!socket) return;

    socket.on("user_joined", ({ participantsCount }) => {
      setParticipantsCount(participantsCount);
    });

    socket.on("user_left", ({ participantsCount }) => {
      setParticipantsCount(participantsCount);
    });

    return () => {
      socket.off("user_joined");
      socket.off("user_left");
    };
  }, [socket]);

  const isRegistered = auction?.bidders?.includes(user?.id);
  const isWinner = auction?.currentBid?.bidder?.includes(user?.id);
  const isEnded = new Date(auction?.endDate) <= new Date();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
      </div>
    );
  }

  return (
    <div className="pt-9 pb-20 px-4">
      <div className="flex justify-center">
        <div className="md:grid grid-cols-1 md:grid-cols-2 flex flex-col-reverse gap-8 w-full">
          <ItemDisplayCard auction={auction} />

          <div className="h-full">
            <div className="p-4 bg-gray-900 rounded-md shadow-md space-y-8">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
                </div>
              ) : (
                <>
                  <AuctionDetails
                    auction={auction}
                    isEnded={isEnded}
                    bids={bids}
                    bidsLoading={bidsLoading}
                    participantsCount={participantsCount}
                  />

                  {isRegistered && !isEnded && (
                    <PlaceBidForm
                      auction={auction}
                      id={id}
                      userId={user?.id}
                      socket={socket}
                    />
                  )}

                  {!isRegistered && !isEnded && (
                    <RegisterToBidBtn id={id} userId={user?.id} />
                  )}

                  {isWinner && isEnded && (
                    <Button className="w-full" variant="teal">
                      <ShieldCheck className="mb-px" />
                      Pay ${auction?.currentBid?.bid}
                    </Button>
                  )}
                </>
              )}

              <BidHistory bids={bids} bidsLoading={bidsLoading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionRoom;
