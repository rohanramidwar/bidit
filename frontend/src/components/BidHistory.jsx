import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, TrendingUp, Trophy, Clock } from "lucide-react";

const BidHistory = ({ bids, bidsLoading }) => {
  const [showAllBids, setShowAllBids] = useState(false);

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const displayedBids = showAllBids ? bids : bids?.slice(0, 5);

  if (bidsLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
      </div>
    );
  }

  return (
    <div className="rounded-md bg-gray-800 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium text-teal-500 flex items-center">
          <TrendingUp className="mr-2" />
          Bid History
        </h2>
        <div className="text-sm text-gray-400">
          Total Bids: {bids?.length || 0}
        </div>
      </div>

      {bids?.length > 0 ? (
        <div className="space-y-3">
          {displayedBids.map((bid, index) => (
            <div
              key={bid._id}
              className={`
                flex items-center justify-between p-3 rounded-lg 
                ${
                  index === 0
                    ? "bg-teal-900/30 border-l-4 border-teal-500"
                    : "bg-gray-900/50"
                }
                transition-all duration-300 hover:bg-gray-700/50
              `}
            >
              <div className="flex items-center space-x-3">
                {index === 0 && <Trophy className="text-teal-500" size={20} />}
                <div>
                  <div className="text-sm font-medium text-white">
                    {bid.bidder.name}
                  </div>
                  <div className="text-xs text-gray-400 flex items-center">
                    <Clock className="mr-1" size={12} />
                    {formatDateTime(bid.createdAt)}
                  </div>
                </div>
              </div>
              <div className="text-teal-400 font-semibold">
                ${bid.bid.toLocaleString()}
              </div>
            </div>
          ))}

          {bids.length > 5 && (
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => setShowAllBids(!showAllBids)}
            >
              {showAllBids ? "Show Less" : `View All ${bids.length} Bids`}
            </Button>
          )}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-400 bg-gray-900/50 rounded-lg">
          <TrendingUp className="mx-auto mb-2 text-gray-500" size={32} />
          No bids placed yet
        </div>
      )}
    </div>
  );
};

export default BidHistory;
