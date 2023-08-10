"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: [true, "user name is required"],
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        require: [true, "email is required"],
        trim: true,
    },
    phoneNumber: {
        type: Number,
        unique: true,
        require: [true, "phoneNumber is required"],
        trim: true,
    },
    password: {
        type: String,
        require: [true, "password is required"],
    },
});
userSchema.set("timestamps", true);
exports.default = mongoose_1.default.model("user", userSchema);
