import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import { connectDatabase } from "./config/database.js";
import colors from "colors";
import authRoutes from "./routes/auth.js";
import sellerRoutes from "./routes/seller.js";
import buyerRoutes from "./routes/buyer.js";
import { setupSocket } from "./socket.js";

const app = express();
//enable us to send post req
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://bidit-blue.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/user", authRoutes);
app.use("/api", sellerRoutes, buyerRoutes);

config(); //access to env

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server Started on PORT: ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

const io = setupSocket(server);
connectDatabase();
