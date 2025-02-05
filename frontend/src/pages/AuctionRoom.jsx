import React, { useEffect, useState } from "react";
import {
  fetchAuctionById,
  fetchBidsByItem,
  placeBid,
  registerToBid,
} from "@/actions/buyerActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  DollarSign,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import * as api from "../api";
import toast from "react-hot-toast";
import { formatDate } from "@/components/FormatDate";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";

const AuctionRoom = () => {
  const dispatch = useDispatch();
  const { auction, isLoading } = useSelector((state) => state.auctionReducer);
  const { bids, bidsLoading } = useSelector((state) => state.bidsReducer);
  const { user } = useSelector((state) => state.authReducer);
  const { id } = useParams();
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [validationError, setValidationError] = useState("");
  const [showAllBids, setShowAllBids] = useState(false);

  useEffect(() => {
    dispatch(fetchAuctionById(id));
    dispatch(fetchBidsByItem(id));
  }, [id]);

  const handleRegisterToBid = () => {
    setIsBtnLoading(true);
    dispatch(
      registerToBid(id, {
        userId: user?.id,
      })
    );
    setIsBtnLoading(false);
  };

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
      placeBid(id, {
        userId: user?.id,
        amount: Number(bidAmount),
      })
    );
    setBidAmount("");
    setIsBtnLoading(false);
  };

  const getSuggestedBids = () => {
    const currentBid = auction?.currentBid?.bid || auction?.startingBid;
    return [
      Math.ceil(currentBid * 1.05),
      Math.ceil(currentBid * 1.1),
      Math.ceil(currentBid * 1.2),
    ];
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isRegistered = auction?.bidders?.includes(user?.id);
  const isEnded = new Date(auction?.endDate) <= new Date();
  const displayedBids = showAllBids ? bids : bids?.slice(0, 3);

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-lg">
          <div className="p-4 rounded-md bg-gray-900 space-y-4 shadow-md">
            <div className="text-3xl font-medium text-teal-700">
              {auction?.title}
            </div>
            {auction?.itemPic ? (
              <img
                className="rounded-md w-full"
                src={auction.itemPic}
                alt="pic"
                loading="lazy"
              />
            ) : (
              <div className="flex justify-center items-center h-64 bg-gray-800 rounded-md">
                <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
              </div>
            )}
          </div>

          <div className="p-4 bg-gray-900 rounded-md shadow-md space-y-8">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
              </div>
            ) : (
              <>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm text-white">
                    <div>Time left: </div>
                    <div>{formatDate(auction?.endDate)}</div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-white">
                    <div>Total bids: </div>
                    <div>
                      {bidsLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        `${bids?.length || 0} bids`
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-white">
                    <div>Starting bid: </div>
                    <div>${auction?.startingBid || 0}</div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-white">
                    <div>Current bid: </div>
                    <div>${auction?.currentBid?.bid || 0}</div>
                  </div>
                </div>

                {isRegistered && !isEnded && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="text-sm text-white">Suggested bids:</div>
                      <div className="flex gap-2">
                        {getSuggestedBids().map((amount) => (
                          <Button
                            key={amount}
                            variant="outline"
                            size="sm"
                            onClick={() => setBidAmount(amount.toString())}
                            className="flex-1"
                          >
                            ${amount}
                          </Button>
                        ))}
                      </div>
                    </div>

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
                )}

                {!isRegistered && !isEnded && (
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
                )}
              </>
            )}

            <div className="rounded-md">
              <h2 className="text-xl font-medium text-teal-700 mb-4">
                Bid History
              </h2>
              {bidsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
                </div>
              ) : bids?.length > 0 ? (
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b border-gray-700">
                          <th className="pb-2 text-sm font-medium text-gray-400">
                            Bidder
                          </th>
                          <th className="pb-2 text-sm font-medium text-gray-400">
                            Bid
                          </th>
                          <th className="pb-2 text-sm font-medium text-gray-400">
                            Time
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-white">
                        {displayedBids.map((bid) => (
                          <tr
                            key={bid._id}
                            className="border-b border-gray-800"
                          >
                            <td className="py-3 text-sm">{bid.bidder.name}</td>
                            <td className="py-3 text-sm">${bid.bid}</td>
                            <td className="py-3 text-sm">
                              {formatDateTime(bid.createdAt)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {bids.length > 3 && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowAllBids(!showAllBids)}
                    >
                      {showAllBids ? (
                        <>
                          <ChevronUp className="mr-2 h-4 w-4" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="mr-2 h-4 w-4" />
                          Show All {bids.length} Bids
                        </>
                      )}
                    </Button>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  No bids placed yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionRoom;
