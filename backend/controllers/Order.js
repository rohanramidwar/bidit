import Order from "../models/Order.js";

export const fetchOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ user: userId }).sort({ _id: -1 });

    res.status(201).json(orders);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
