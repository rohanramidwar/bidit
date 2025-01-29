import Item from "../models/Item.js";

export const getAllAuctions = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    // const currentDate = new Date();
    // const activeItems = items.filter(
    //   (item) => new Date(item.endDate) > currentDate
    // );
    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
