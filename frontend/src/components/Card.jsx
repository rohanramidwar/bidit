import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "./FormatDate";

const Card = ({ auction, status }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/auction/${auction._id}`);
  };

  return (
    <div
      role="button"
      onClick={handleCardClick}
      className="overflow-hidden w-full rounded-md bg-gray-100 shadow-md pb-2 space-y-2"
    >
      <div className="relative h-40 bg-muted">
        <img
          src={auction?.itemPic}
          alt="img"
          loading="lazy"
          className="h-full w-full object-cover transition-transform hover:scale-[1.02]"
        />
      </div>
      <div className="px-2.5 text-teal-900 font-medium">
        <div>{auction?.title}</div>
      </div>
      <div className="px-2.5 space-y-1">
        {status ? (
          <div className="flex items-center justify-between text-sm text-teal-900">
            <div>Time left: </div>
            <div>{formatDate(auction?.endDate)}</div>
          </div>
        ) : (
          <div></div>
        )}
        <div className="flex items-center justify-between text-sm text-teal-900">
          <div>Starting bid: </div>
          <div>${auction?.startingBid}</div>
        </div>
        <div className="flex items-center justify-between text-sm text-teal-900">
          <div>{status ? "Current bid:" : "Highest bid:"} </div>
          <div>${auction?.currentBid?.bid || 0}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
