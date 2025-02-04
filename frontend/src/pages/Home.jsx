import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@/components/Card";
import { getActiveAuctions, getEndedAuctions } from "@/actions/buyerActions";
import { Loader2 } from "lucide-react";

const Home = () => {
  const dispatch = useDispatch();

  const { activeAuctions, endedAuctions, isLoading } = useSelector(
    (state) => state.auctionReducer
  );

  useEffect(() => {
    dispatch(getActiveAuctions());
    dispatch(getEndedAuctions());
  }, [dispatch]);

  const Loader = () => (
    <div className="w-full flex justify-center items-center py-10">
      <Loader2 className="animate-spin text-teal-500 h-8 w-8" />
    </div>
  );

  return (
    <div className="pt-9 px-4 pb-20 w-full">
      <div className="space-y-4">
        {/* <div className="text-lg font-semibold text-gray-700">Your auctions</div> */}

        <div className="space-y-4">
          <div className="text-lg font-semibold text-teal-700">
            Active auctions
          </div>
          <div className="flex flex-col sm:grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 items-center">
            {isLoading ? (
              <Loader />
            ) : (
              activeAuctions?.map((auction) => (
                <Card key={auction?._id} auction={auction} status={true} />
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
            ) : (
              endedAuctions?.map((auction) => (
                <Card key={auction?._id} auction={auction} status={false} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
