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
exports.userRegister = void 0;
const User_1 = __importDefault(require("../../../Models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = require("mongoose");
const responseObject = {
    message: "",
    id: "",
};
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phoneNumber, password } = req.body;
        if (!(name && email && phoneNumber && password)) {
            responseObject.message = "Please fill all the fields";
            return res.status(400).json(responseObject);
        }
        // Check if user already exists or not
        const userAlreadyExists = (yield User_1.default.findOne({
            email,
        }));
        if (userAlreadyExists) {
            responseObject.message = "This Email Is Already Registered";
            return res.status(402).json(responseObject);
        }
        // Check if username available
        const phoneNumberExists = (yield User_1.default.findOne({
            phoneNumber,
        }));
        if (phoneNumberExists) {
            responseObject.message = "Phone Number is already registered";
            return res.status(403).json(responseObject);
        }
        // encrypt password
        const myEnPassword = bcryptjs_1.default.hashSync(password, 10);
        // Create a new entry in db
        const user = (yield User_1.default.create({
            name,
            email,
            phoneNumber,
            password: myEnPassword,
        }));
        // Sign the Token
        jsonwebtoken_1.default.sign({ userId: user === null || user === void 0 ? void 0 : user._id, email }, process.env.SECRET, { expiresIn: "24h" }, (err, token) => {
            if (err)
                throw err;
            responseObject.message = "User registered successfully";
            responseObject.id = user === null || user === void 0 ? void 0 : user._id;
            res
                .cookie("token", token, {
                expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
                sameSite: "none",
                secure: true,
            })
                .status(200)
                .json(responseObject);
        });
    }
    catch (error) {
        console.log(error);
        responseObject.id = "";
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
exports.userRegister = userRegister;
