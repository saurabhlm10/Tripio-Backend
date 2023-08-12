import express from "express";
import { userRegister } from "../Controllers/Auth/User/userRegister";
import { userLogin } from "../Controllers/Auth/User/userLogin";
import { userLogout } from "../Controllers/Auth/User/userLogout";
import { sellerRegister } from "../Controllers/Auth/Seller/sellerRegister";
import upload from "../Utils/cloudinary";
import { sellerLogin } from "../Controllers/Auth/Seller/sellerLogin";
import { sellerLogout } from "../Controllers/Auth/Seller/sellerLogout";

const router = express.Router();

// User

// 	Register
router.post("/user/register", userRegister);
// 	Login
router.post("/user/login", userLogin);
// 	Logout
router.post("/user/logout", userLogout);

// Seller

// 	Register
router.post("/seller/register", upload.single("companyLogo"), sellerRegister);
// 	Login
router.post("/seller/login", sellerLogin);
// 	Logout
router.post("/seller/logout", sellerLogout);

export default router;
