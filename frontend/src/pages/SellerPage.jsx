import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyActiveAuctions,
  getMyEndedAuctions,
} from "@/actions/sellerActions";
import AuctionManageCard from "@/components/AuctionManageCard";

const SellerPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);
  const { activeAuctions, endedAuctions } = useSelector(
    (state) => state.auctionReducer
  );

  useEffect(() => {
    if (user?.id) {
      dispatch(getMyActiveAuctions(user?.id));
      dispatch(getMyEndedAuctions(user?.id));
    }
  }, [dispatch, user?.id]);

  return (
    <div className="pt-9 px-4 pb-20 w-full">
      <div className="space-y-4">
        <div className="text-lg font-semibold text-gray-700">Your auctions</div>

        <div className="space-y-4">
          <div className="text-lg font-semibold text-teal-700">
            Active auctions
          </div>
          <div className="flex flex-col sm:grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 items-center">
            {activeAuctions?.map((auction) => (
              <AuctionManageCard
                key={auction?._id}
                auction={auction}
                status={true}
              />
            ))}
          </div>
        </div>
        <div className="pt-4 space-y-4">
          <div className="text-lg font-semibold text-teal-700">
            Past auctions
          </div>
          <div className="flex flex-col sm:grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 items-center">
            {endedAuctions?.map((auction) => (
              <AuctionManageCard
                key={auction?._id}
                auction={auction}
                status={false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerPage;
