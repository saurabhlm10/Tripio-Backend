"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const sellerSchema = new mongoose_1.default.Schema({
    companyName: {
        type: String,
        require: [true, "companyName is required"],
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        require: [true, "email is required"],
        trim: true,
    },
    password: {
        type: String,
        require: [true, "password is required"],
        minlength: 8,
        maxlength: 20,
    },
    logo: {
        type: String,
        unique: true,
        require: [true, "Seller logo is required"],
        trim: true,
    },
    offerings: {
        hotels: {
            type: Boolean,
            default: false,
            require: [true, "hotels is required"],
        },
        flights: {
            type: Boolean,
            default: false,
            require: [true, "flights is required"],
        },
    },
});
sellerSchema.set("timestamps", true);
exports.default = mongoose_1.default.model("seller", sellerSchema);
