import React, { useEffect } from "react";
import CreateAuction from "./CreateAuction";
import { useDispatch, useSelector } from "react-redux";
import { getMyAuctions } from "@/actions/sellerActions";

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (user?.id) {
      dispatch(getMyAuctions(user.id));
    }
  }, [dispatch, user?.id]);

  return (
    <div>
      <CreateAuction />
    </div>
  );
};

export default SellerDashboard;
