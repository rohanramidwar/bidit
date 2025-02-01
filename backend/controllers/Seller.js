import Item from "../models/Item.js";

export const createAuction = async (req, res) => {
  const { title, itemPic, startingBid, endDate, admin } = req.body;

  const formattedEndDate = new Date(endDate).toISOString();

  const newItem = new Item({
    title,
    itemPic,
    startingBid,
    endDate: formattedEndDate,
    admin,
  });

  try {
    const item = await newItem.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const stopAuction = async (req, res) => {
  const { auctionId } = req.params;

  try {
    const auction = await Item.findById(auctionId);

    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    auction.endDate = new Date().toISOString();
    const updatedAuction = await auction.save();

    res.status(200).json(updatedAuction);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteAuction = async (req, res) => {
  const { auctionId } = req.params;

  try {
    const auction = await Item.findById(auctionId);
    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }
    await Item.findByIdAndDelete(auctionId);
    res.status(200).json(auctionId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyActiveAuctions = async (req, res) => {
  const { userId } = req.params;
  const currentDate = new Date().toISOString();

  try {
    const activeAuctions = await Item.find({
      admin: userId,
      endDate: { $gt: currentDate },
    })
      .sort({ endDate: 1 })
      .exec();

    res.status(200).json(activeAuctions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMyEndedAuctions = async (req, res) => {
  const { userId } = req.params;
  const currentDate = new Date().toISOString();

  try {
    const endedAuctions = await Item.find({
      admin: userId,
      endDate: { $lte: currentDate },
    })
      .sort({ endDate: -1 })
      .exec();

    res.status(200).json(endedAuctions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
