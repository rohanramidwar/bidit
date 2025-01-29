import express from "express";
import { createAuctionItem } from "../controllers/Seller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/create", auth, createAuctionItem);

export default router;
