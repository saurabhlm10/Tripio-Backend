import dotenv from "dotenv";

dotenv.config();

import express from "express";
import connectToDb from "./lib/db";

const app = express();

connectToDb()


export default app;
