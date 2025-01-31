import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyAuctions } from "@/actions/sellerActions";
import ManageAuctionCard from "@/components/ManageAuctionCard";

const SellerPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);
  const { auctions } = useSelector((state) => state.auctionReducer);

  useEffect(() => {
    if (user?.id) {
      dispatch(getMyAuctions(user.id));
    }
  }, [dispatch, user?.id]);

  return (
    <div>
      <div className="w-full h-14 bg-teal-700 flex items-center text-lg font-bold px-6 text-white">
        Your auctions
      </div>
      <div className="p-4">
        <div className="flex flex-col sm:grid grid-cols-4 gap-4 items-center">
          {auctions?.map((auction) => (
            <ManageAuctionCard key={auction?._id} auction={auction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerPage;
