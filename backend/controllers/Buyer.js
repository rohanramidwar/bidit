import Item from "../models/Item.js";

export const getAuctionById = async (req, res) => {
  const { id } = req.params;

  try {
    const auction = await Item.findById(id);

    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    res.status(200).json(auction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getActiveAuctions = async (req, res) => {
  const currentDate = new Date().toISOString();

  try {
    const activeAuctions = await Item.find({
      endDate: { $gt: currentDate },
    })
      .sort({ endDate: 1 })
      .exec();

    res.status(200).json(activeAuctions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getEndedAuctions = async (req, res) => {
  const currentDate = new Date().toISOString();

  try {
    const endedAuctions = await Item.find({
      endDate: { $lte: currentDate },
    })
      .sort({ endDate: -1 })
      .exec();

    res.status(200).json(endedAuctions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const registerToBid = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const auction = await Item.findById(id);

    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    if (auction.bidders.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You are already registered for this auction" });
    }

    auction.bidders.push(userId);
    await auction.save();

    res
      .status(200)
      .json({ message: "Successfully registered for auction", auction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Place a bid on an auction
export const placeBid = async (req, res) => {
  const { id } = req.params;
  const { userId, bidAmount } = req.body;

  try {
    const auction = await Item.findById(id).populate("currentBid");

    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    // Create new bid
    const newBid = new Bid({
      bidder: userId,
      bid: bidAmount,
      item: id,
    });

    await newBid.save();

    auction.currentBid = newBid._id;
    await auction.save();

    res.status(200).json({
      message: "Bid placed successfully",
      bid: newBid,
      auction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
