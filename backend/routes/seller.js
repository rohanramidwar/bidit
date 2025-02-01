import express from "express";
import {
  createAuction,
  deleteAuction,
  getMyActiveAuctions,
  getMyEndedAuctions,
  stopAuction,
} from "../controllers/Seller.js";

const router = express.Router();

router.post("/create-auction", createAuction);
router.get("/auctions/active/user/:userId", getMyActiveAuctions);
router.get("/auctions/ended/user/:userId", getMyEndedAuctions);
router.patch("/auctions/:auctionId/stop", stopAuction);
router.delete("/auctions/:auctionId/delete", deleteAuction);

export default router;
