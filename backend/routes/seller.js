import express from "express";
import { createAuction } from "../controllers/Seller.js";

const router = express.Router();

router.post("/create-auction", createAuction);

export default router;
