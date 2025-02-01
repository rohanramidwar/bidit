import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyActiveAuctions, getMyAuctions } from "@/actions/sellerActions";
import AuctionManageCard from "@/components/AuctionManageCard";

const SellerPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);
  const { activeAuctions } = useSelector((state) => state.auctionReducer);

  useEffect(() => {
    if (user?.id) {
      dispatch(getMyActiveAuctions(user?.id));
    }
  }, [dispatch, user?.id]);

  return (
    <div className="pt-9 px-4 pb-20 w-full">
      <div className="space-y-4">
        <div className="text-lg font-semibold text-gray-700">Your auctions</div>
        <div className="flex sm:grid grid-cols-4  gap-4 items-center">
          {activeAuctions?.map((auction) => (
            <AuctionManageCard key={auction?._id} auction={auction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerPage;
