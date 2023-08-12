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
exports.sellerRegister = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Seller_1 = __importDefault(require("../../../Models/Seller"));
const responseObject = {
    message: "",
    id: "",
};
const sellerRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { companyName, email, password, offerings } = req.body;
        // Converting incoming text to booleans
        offerings.hotels = Boolean(offerings.hotels);
        offerings.flights = Boolean(offerings.flights);
        if (!(companyName && email && password && offerings)) {
            responseObject.message = "Please fill all the fields";
            return res.status(400).json(responseObject);
        }
        // Check if seller already exists or not
        const sellerAlreadyExists = (yield Seller_1.default.findOne({
            email,
        }));
        if (sellerAlreadyExists) {
            responseObject.message = "This Email Is Already Registered";
            return res.status(401).json(responseObject);
        }
        if (!req.file) {
            responseObject.message = "Please upload a logo";
            return res.status(401).json(responseObject);
        }
        const logo = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        // encrypt password
        const myEnPassword = bcryptjs_1.default.hashSync(password, 10);
        // Create a new entry in db
        const seller = (yield Seller_1.default.create({
            companyName,
            email,
            logo,
            password: myEnPassword,
            offerings,
        }));
        // Sign the Token
        jsonwebtoken_1.default.sign({ userId: seller === null || seller === void 0 ? void 0 : seller._id, email }, process.env.SECRET, { expiresIn: "24h" }, (err, token) => {
            if (err)
                throw err;
            responseObject.message = "User registered successfully";
            responseObject.id = seller === null || seller === void 0 ? void 0 : seller._id;
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
exports.sellerRegister = sellerRegister;
