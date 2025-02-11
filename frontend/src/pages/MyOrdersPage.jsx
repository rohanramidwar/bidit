import { fetchUserOrders } from "@/actions/buyerActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Package, Truck } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Loader = () => (
  <div className="w-full flex justify-center items-center py-10">
    <Loader2 className="animate-spin text-teal-500 h-8 w-8" />
  </div>
);

const MyOrdersPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.auctionReducer);

  useEffect(() => {
    dispatch(fetchUserOrders(id));
  }, [id]);

  const getEstimatedDeliveryDate = (orderDate) => {
    const date = new Date(orderDate);
    date.setDate(date.getDate() + 7);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getOrderDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="pt-9 px-4 pb-20 w-full md:flex md:justify-start">
      <div className="space-y-4">
        <h1 className="text-lg font-semibold text-teal-700">My Orders</h1>
        <div className="grid grid-cols-1 gap-4">
          {isLoading ? (
            <Loader />
          ) : orders.length === 0 ? (
            <div>No Orders Found</div>
          ) : (
            orders.map((order) => (
              <Card key={order?._id} className="w-full bg-gray-900">
                <CardHeader>
                  <CardTitle className="text-lg text-teal-500">
                    Order #{order?._id.slice(-6)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-24 h-24">
                      <img
                        src={order?.itemPic}
                        alt="Item pic"
                        className="w-full h-full object-cover rounded border border-gray-700"
                      />
                    </div>

                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-lg text-white">
                        {order?.title}
                      </h3>
                      <div className="text-sm text-gray-300">
                        <p>Price: ₹{order?.price}</p>
                        <p>Order Date: {getOrderDate(order?.createdAt)}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Truck className="w-4 h-4 text-teal-400" />
                          <p>
                            Expected Delivery:{" "}
                            {getEstimatedDeliveryDate(order?.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-2 text-sm text-gray-300">
                        <p className="font-medium text-white">
                          Delivery Address:
                        </p>
                        <p>{order?.address?.line1}</p>
                        <p>
                          {order?.address?.city}, {order?.address?.postal_code}
                        </p>
                        <p>{order?.address?.country}</p>
                      </div>

                      <div className="mt-3 flex items-center gap-2 text-teal-500">
                        <Package className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          Payment Completed
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;
