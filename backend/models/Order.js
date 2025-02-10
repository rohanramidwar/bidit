import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: String,
    itemPic: String,
    price: Number,
    address: { type: Object },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
