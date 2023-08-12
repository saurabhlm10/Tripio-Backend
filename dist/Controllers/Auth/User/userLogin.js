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
exports.userLogin = void 0;
const mongoose_1 = require("mongoose");
const User_1 = __importDefault(require("../../../Models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const responseObject = {
    message: "",
    user: {},
};
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            responseObject.message = "Please fill all the fields";
            responseObject.user = {};
            return res.status(400).json(responseObject);
        }
        const user = (yield User_1.default.findOne({
            email,
        }));
        // Check if user exists
        if (!user) {
            responseObject.message = "User does not exist";
            responseObject.user = {};
            return res.status(401).json(responseObject);
        }
        // Check if password is correct
        const checkPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!checkPassword) {
            responseObject.message = "Password Is Incorrect";
            responseObject.user = {};
            return res.status(403).json(responseObject);
        }
        // Sign token
        const token = jsonwebtoken_1.default.sign({
            id: user._id,
            email: user.email,
        }, process.env.SECRET, {
            expiresIn: "24h",
        });
        user.password = undefined;
        responseObject.message = "User logged in successfully";
        responseObject.user = user;
        // Send User and Token
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
        responseObject.user = {};
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
exports.userLogin = userLogin;
