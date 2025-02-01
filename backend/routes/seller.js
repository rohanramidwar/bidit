import express from "express";
import {
  createAuction,
  deleteAuction,
  getMyAuctions,
  stopAuction,
} from "../controllers/Seller.js";

const router = express.Router();

router.post("/create-auction", createAuction);
router.get("/auctions/user/:userId", getMyAuctions);
router.get("/auctions/active/user/:userId", getMyAuctions);
router.get("/auctions/ended/user/:userId", getMyAuctions);
router.patch("/auctions/:auctionId/stop", stopAuction);
router.delete("/auctions/:auctionId/delete", deleteAuction);

export default router;
