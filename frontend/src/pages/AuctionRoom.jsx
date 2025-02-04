import React, { useEffect, useState } from "react";
import { fetchAuctionById } from "@/actions/buyerActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as api from "../api";
import toast from "react-hot-toast";
import { formatDate } from "@/components/FormatDate";

const AuctionRoom = () => {
  const dispatch = useDispatch();
  const { auction, isLoading } = useSelector((state) => state.auctionReducer);
  const { user } = useSelector((state) => state.authReducer);
  const { id } = useParams();
  const [isBntLoading, setIsBtnLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchAuctionById(id));
  }, [id]);

  const handleRegisterToBid = async () => {
    setIsBtnLoading(true);
    try {
      const response = await api.registerToBid(id, {
        userId: user?.id,
      });

      if (response.data) {
        toast.success("Successfully registered for auction!");
        setIsBtnLoading(false);
        dispatch(fetchAuctionById(id));
      }
    } catch (error) {
      toast.error("Error registering for auction");
      console.error("Error registering for auction:", error);
      setIsBtnLoading(false);
    }
  };

  const isRegistered = auction.bidders?.includes(user?.id);
  const isEnded = new Date(auction.endDate) <= new Date();

  return (
    <div className="pt-9 pb-20 px-4">
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-lg">
          <div className="p-4 rounded-md bg-gray-900 space-y-4 shadow-md">
            <div className="text-3xl font-medium text-teal-700">
              {auction?.title}
            </div>
            <img
              className="rounded-md w-full"
              src={auction?.itemPic}
              alt="pic"
              loading="lazy"
            />
          </div>
          <div className="p-4 bg-gray-900 rounded-md shadow-md space-y-8">
            <div className="px-2.5 space-y-1">
              <div className="flex items-center justify-between text-sm text-white">
                <div>Time left: </div>
                <div>{formatDate(auction?.endDate)}</div>
              </div>

              <div className="flex items-center justify-between text-sm text-white">
                <div>Total bids: </div>
                <div>8 bids</div>
              </div>
              <div className="flex items-center justify-between text-sm text-white">
                <div>Starting bid: </div>
                <div>${auction?.startingBid || 0}</div>
              </div>
              <div className="flex items-center justify-between text-sm text-white">
                <div>Current bid: </div>
                <div>${auction?.currentBid || 0}</div>
              </div>
            </div>

            <div>
              <Button
                onClick={handleRegisterToBid}
                variant="teal"
                className="w-full"
                disabled={isBntLoading}
              >
                {isBntLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <ShieldCheck />
                    "Register to bid"
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionRoom;
