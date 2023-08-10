"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const roomTypeSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: [true, "hotel name is required"],
        trim: true,
    },
    description: {
        type: String,
        require: [true, "hotel description is required"],
        trim: true,
    },
    mainImage: {
        type: String,
        require: [true, "hotel main image is required"],
        trim: true,
    },
    facilities: {
        type: [String],
    },
    maxPeopleAllowed: {
        adults: {
            type: Number,
            require: [true, "Max Adults Allowed Is Required"],
        },
        children: {
            type: Number,
            require: [true, "Max Children Allowed Is Required"],
        },
    },
    price: {
        type: Number,
        require: [true, "price is required"],
        trim: true,
    },
    additionalFacilities: {
        type: [
            {
                name: {
                    type: String,
                    require: [true, "facility name is required"],
                    trim: true,
                },
                description: {
                    type: String,
                    require: [true, "facility description is required"],
                    trim: true,
                },
            },
        ],
        require: [true, "hotel facilities is required"],
        trim: true,
    },
});
roomTypeSchema.set("timestamps", true);
exports.default = mongoose_1.default.model("roomtype", roomTypeSchema);
