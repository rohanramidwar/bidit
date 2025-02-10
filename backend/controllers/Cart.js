import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
  const { itemId } = req.params;
  const { userId } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [itemId],
      });
      await cart.save();
    } else {
      if (!cart.items.includes(itemId)) {
        cart.items.push(itemId);
        await cart.save();
      }
    }

    const populatedCart = await Cart.findById(cart._id).populate({
      path: "items",
      populate: {
        path: "currentBid",
      },
    });

    res.status(200).json(populatedCart.items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  const { itemId, userId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => item.toString() !== itemId);
    await cart.save();

    res.status(200).json({ message: "Item removed successfully", itemId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCartItems = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "items",
      populate: {
        path: "currentBid",
      },
    });

    if (!cart) {
      return res.status(200).json([]);
    }

    res.status(200).json(cart.items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
