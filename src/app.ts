import dotenv from "dotenv";

dotenv.config();

import express from "express";
import connectToDb from "./Lib/db";
import authRoutes from "./Routes/authRoutes";

const app = express();

connectToDb();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use("/api/auth", authRoutes);

export default app;
