import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import { connectDatabase } from "./config/database.js";
import colors from "colors";
import authRoutes from "./routes/auth.js";

const app = express();
//enable us to send post req
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.json());

app.use("/user", authRoutes);

config(); //access to env

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server Started on PORT: ${PORT}`);
});

connectDatabase();
