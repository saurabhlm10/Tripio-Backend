"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const hotelSchema = new mongoose_1.default.Schema({
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
    roomTypes: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "roomtype",
    },
    checkinTime: {
        type: String,
        require: [true, "checkin time is required"],
        trim: true,
    },
    checkOutTime: {
        type: String,
        require: [true, "checkin time is required"],
        trim: true,
    },
    ageRestriction: {
        minAge: {
            type: Number,
            require: [true, "min age restriction is required"],
        },
        maxAge: {
            type: Number,
            require: [true, "max age restriction is required"],
        },
    },
    petsAllowed: {
        type: Boolean,
        require: [true, "pets allowed is required"],
    },
    location: {
        type: String,
        require: [true, "location is required"],
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
    addOnsProvided: {
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
                price: {
                    type: Number,
                    require: [true, "facility price is required"],
                    trim: true,
                },
            },
        ],
    },
});
hotelSchema.set("timestamps", true);
exports.default = mongoose_1.default.model("hotel", hotelSchema);
