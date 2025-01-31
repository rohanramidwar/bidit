import React from "react";

const AuctionManageCard = ({ auction }) => {
  return (
    <div className="overflow-hidden w-full rounded-md bg-gray-100 shadow-md pb-2 space-y-2">
      <div className="relative h-40 bg-muted">
        <img
          src={auction?.itemPic}
          alt="img"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="px-2.5 text-teal-900 font-medium">{auction?.title}</div>
      <div className="px-2.5 space-y-1">
        <div className="flex items-center justify-between text-sm text-teal-900">
          <div>Time left: </div>
          <div>2 days</div>
        </div>
        <div className="flex items-center justify-between text-sm text-teal-900">
          <div>Total bids: </div>
          <div>8 bids</div>
        </div>
        <div className="flex items-center justify-between text-sm text-teal-900">
          <div>Current bid: </div>
          <div>$5</div>
        </div>
      </div>
    </div>
  );
};

export default AuctionManageCard;
