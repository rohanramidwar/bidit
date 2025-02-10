import express from "express";
import {
  addToCart,
  getCartItems,
  removeFromCart,
} from "../controllers/Cart.js";

const router = express.Router();

router.post("/add/:itemId", addToCart);
router.delete("/:itemId/user/:userId", removeFromCart);
router.get("/:userId", getCartItems);

export default router;
