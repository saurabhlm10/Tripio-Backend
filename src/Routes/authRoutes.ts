import express from "express";
import { userRegister } from "../Controllers/Auth/User/userRegister";

const router = express.Router();

// User

// 	Register
router.get("/user/register", userRegister);

// 	Login
// 	Logout
// Seller
// 	Register
// 	Login
// 	Logout

export default router;
