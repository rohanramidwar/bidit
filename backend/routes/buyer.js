import express from "express";
import {
  getActiveAuctions,
  getAuctionById,
  getBidsByItem,
  getEndedAuctions,
  placeBid,
  registerToBid,
} from "../controllers/Buyer.js";

const router = express.Router();

router.get("/auctions/active", getActiveAuctions);
router.get("/auctions/ended", getEndedAuctions);
router.get("/auctions/:id", getAuctionById);
router.post("/auctions/:id/register", registerToBid);
router.post("/auctions/:id/bid", placeBid);
router.get("/auctions/:id/bids", getBidsByItem);

export default router;
