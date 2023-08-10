"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRegister_1 = require("../Controllers/Auth/User/userRegister");
const router = express_1.default.Router();
// User
// 	Register
router.get("/user/register", userRegister_1.userRegister);
// 	Login
// 	Logout
// Seller
// 	Register
// 	Login
// 	Logout
exports.default = router;
