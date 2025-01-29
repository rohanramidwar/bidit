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
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);
export default Item;
