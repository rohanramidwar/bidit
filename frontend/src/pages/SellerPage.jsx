import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyActiveAuctions,
  getMyEndedAuctions,
} from "@/actions/sellerActions";
import AuctionManageCard from "@/components/AuctionManageCard";
import { Loader2 } from "lucide-react";

const SellerPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);
  const { activeAuctions, endedAuctions, isLoading } = useSelector(
    (state) => state.auctionReducer
  );

  useEffect(() => {
    if (user?.id) {
      dispatch(getMyActiveAuctions(user?.id));
      dispatch(getMyEndedAuctions(user?.id));
    }
  }, [dispatch, user?.id]);

  const Loader = () => (
    <div className="w-full flex justify-center items-center py-10">
      <Loader2 className="animate-spin text-teal-500 h-8 w-8" />
    </div>
  );

  return (
    <div className="pt-9 px-4 pb-20 w-full">
      <div className="space-y-4">
        <div className="text-lg font-semibold text-gray-700">Your auctions</div>

        <div className="space-y-4">
          <div className="text-lg font-semibold text-teal-700">
            Active auctions
          </div>
          <div className="flex flex-col sm:grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 items-center">
            {isLoading ? (
              <Loader />
            ) : activeAuctions.length === 0 ? (
              <div className="text-white">No Active Auctions Found</div>
            ) : (
              activeAuctions?.map((auction) => (
                <AuctionManageCard
                  key={auction?._id}
                  auction={auction}
                  status={true}
                />
              ))
            )}
          </div>
        </div>
        <div className="pt-4 space-y-4">
          <div className="text-lg font-semibold text-teal-700">
            Past auctions
          </div>
          <div className="flex flex-col sm:grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 items-center">
            {isLoading ? (
              <Loader />
            ) : endedAuctions.length === 0 ? (
              <div className="text-white">No Past Auctions Found</div>
            ) : (
              endedAuctions?.map((auction) => (
                <AuctionManageCard
                  key={auction?._id}
                  auction={auction}
                  status={false}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerPage;
