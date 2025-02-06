import { Loader2 } from "lucide-react";
import React from "react";
import { formatDate } from "../FormatDate";

const AuctionDetails = ({ auction, isEnded, bidsLoading, bids }) => {
  return (
    <div className="space-y-1">
      {!isEnded && (
        <div className="flex items-center justify-between text-sm text-white">
          <div>Time left: </div>
          <div>{formatDate(auction?.endDate)}</div>
        </div>
      )}

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
        <div>{!isEnded ? "Current bid" : "Highest bid"}</div>
        <div>${auction?.currentBid?.bid || 0}</div>
      </div>
    </div>
  );
};

export default AuctionDetails;
