"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRegister_1 = require("../Controllers/Auth/User/userRegister");
const userLogin_1 = require("../Controllers/Auth/User/userLogin");
const userLogout_1 = require("../Controllers/Auth/User/userLogout");
const sellerRegister_1 = require("../Controllers/Auth/Seller/sellerRegister");
const cloudinary_1 = __importDefault(require("../Utils/cloudinary"));
const sellerLogin_1 = require("../Controllers/Auth/Seller/sellerLogin");
const sellerLogout_1 = require("../Controllers/Auth/Seller/sellerLogout");
const router = express_1.default.Router();
// User
// 	Register
router.post("/user/register", userRegister_1.userRegister);
// 	Login
router.post("/user/login", userLogin_1.userLogin);
// 	Logout
router.post("/user/logout", userLogout_1.userLogout);
// Seller
// 	Register
router.post("/seller/register", cloudinary_1.default.single("companyLogo"), sellerRegister_1.sellerRegister);
// 	Login
router.post("/seller/login", sellerLogin_1.sellerLogin);
// 	Logout
router.post("/seller/logout", sellerLogout_1.sellerLogout);
exports.default = router;
