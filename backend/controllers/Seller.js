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
