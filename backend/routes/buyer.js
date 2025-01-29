import express from "express";
import { getAllAuctions } from "../controllers/Buyer.js";

const router = express.Router();

router.get("/auctions", getAllAuctions);

export default router;
