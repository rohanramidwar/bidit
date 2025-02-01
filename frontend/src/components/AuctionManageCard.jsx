import moment from "moment";
import React from "react";
import ManageAuction from "./ManageAuction";

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
      <div className="flex items-center justify-between px-2.5 text-teal-900 font-medium">
        <div>{auction?.title}</div>
        <div>
          <ManageAuction auctionId={auction?._id} />
        </div>
      </div>
      <div className="px-2.5 space-y-1">
        <div className="flex items-center justify-between text-sm text-teal-900">
          <div>Time left: </div>
          <div>{moment(auction?.endDate).format("MM/DD/YYYY HH:mm:ss")}</div>
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
