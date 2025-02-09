import { Loader2, UsersRound } from "lucide-react";
import React from "react";
import { formatDate } from "../FormatDate";

const AuctionDetails = ({
  auction,
  isEnded,
  bidsLoading,
  bids,
  participantsCount,
}) => {
  return (
    <div className="space-y-1">
      <div className="flex justify-end gap-1 items-center text-teal-700 pb-2">
        <UsersRound size={18} className="mb-px" />
        <div className="">{participantsCount}</div>
      </div>
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
