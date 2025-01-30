import Item from "../models/Item.js";

export const createAuction = async (req, res) => {
  const { title, itemPic, startingBid, endDate, admin } = req.body;

  const newItem = new Item({
    title,
    itemPic,
    startingBid,
    endDate,
    admin,
  });
  try {
    const item = await newItem.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getMyAuctions = async (req, res) => {
  const { userId } = req.params;

  console.log("userId:", userId);

  try {
    // Find all auctions where the user is the admin
    const auctions = await Item.find({ admin: userId })
      .sort({ endDate: -1 })
      .exec();

    res.status(200).json(auctions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const stopAuction = async (req, res) => {
  const { auctionId } = req.params;

  try {
    const auction = await Item.findById(auctionId);
    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }
    auction.endDate = new Date();
    const updatedAuction = await auction.save();

    res.status(200).json(updatedAuction);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
