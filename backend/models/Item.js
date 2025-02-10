import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    itemPic: {
      type: String,
      required: true,
    },
    startingBid: {
      type: Number,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    bidders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    currentBid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bid",
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    paymentStatus: {
      typeo: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);
export default Item;
