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
exports.sellerLogout = void 0;
const Seller_1 = __importDefault(require("../../../Models/Seller"));
const mongoose_1 = require("mongoose");
const responseObject = {
    message: "",
};
const sellerLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email) {
            responseObject.message = "Please fill all the fields";
            return res.status(400).json(responseObject);
        }
        const seller = (yield Seller_1.default.findOne({
            email,
        }));
        // Check if user exists
        if (!seller) {
            responseObject.message = "User does not exist";
            return res.status(401).json(responseObject);
        }
        responseObject.message = "Successfully logged out";
        return res
            .cookie("token", "", {
            sameSite: "none",
            secure: true,
        })
            .status(200)
            .json(responseObject);
    }
    catch (error) {
        console.log(error);
        if (error instanceof mongoose_1.MongooseError) {
            responseObject.message = error.message;
            return res.status(401).json(responseObject);
        }
        if (error instanceof Error) {
            responseObject.message = error.message;
            return res.status(500).json(responseObject);
        }
    }
});
exports.sellerLogout = sellerLogout;
