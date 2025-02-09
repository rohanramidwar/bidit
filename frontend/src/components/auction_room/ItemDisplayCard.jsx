import { Loader2 } from "lucide-react";
import React from "react";

const ItemDisplayCard = ({ auction }) => {
  return (
    <div className="md:sticky md:top-4 h-fit">
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
    </div>
  );
};

export default ItemDisplayCard;
