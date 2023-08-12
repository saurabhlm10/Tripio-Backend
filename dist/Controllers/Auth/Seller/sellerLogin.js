"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellerLogin = void 0;
const Seller_1 = __importDefault(require("../../../Models/Seller"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const responseObject = {
    message: "",
    seller: {},
};
const sellerLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        //Check all the fields
        if (!(email && password)) {
            responseObject.message = "Please fill all the fields";
            responseObject.seller = {};
            return res.status(400).json(responseObject);
        }
        const seller = (yield Seller_1.default.findOne({
            email,
        }));
        // Check if seller exists
        if (!seller) {
            responseObject.message = "User does not exist";
            responseObject.seller = {};
            return res.status(401).json(responseObject);
        }
        // Check if password is correct
        const checkPassword = yield bcryptjs_1.default.compare(password, seller.password);
        if (!checkPassword) {
            responseObject.message = "Password Is Incorrect";
            responseObject.seller = {};
            return res.status(403).json(responseObject);
        }
        // Sign token
        const token = jsonwebtoken_1.default.sign({
            id: seller._id,
            email: seller.email,
        }, process.env.SECRET, {
            expiresIn: "24h",
        });
        seller.password = undefined;
        responseObject.message = "User logged in successfully";
        responseObject.seller = seller;
        // Send Seller and Token
        return res
            .cookie("token", token, {
            expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
            sameSite: "none",
            secure: true,
        })
            .status(200)
            .json(responseObject);
    }
    catch (error) {
        console.log(error);
    }
});
exports.sellerLogin = sellerLogin;
