import mongoose, { Schema } from "mongoose";

const flightSchema = new mongoose.Schema({
  flightName: {
    type: String,
    require: [true, "flight name is required"],
    unique: true,
    trim: true,
  },
  departureTime: {
    type: String,
    require: [true, "departure Time is required"],
    trim: true,
  },
  arrivalTime: {
    type: String,
    require: [true, "arrival Time is required"],
    trim: true,
  },
  departureCity: {
    type: String,
    require: [true, "departure city is required"],
    trim: true,
  },
  arrivalCity: {
    type: String,
    require: [true, "arrival city is required"],
    trim: true,
  },
  flightStructure: {
    type: [
      {
        seatNumber: {
          type: String,
          require: [true, "seatNumber is required"],
          trim: true,
        },
        price: {
          type: Number,
          require: [true, "price is required"],
          trim: true,
        },
      },
    ],
    require: [true, "flight structure is required"],
  },
  price: {
    type: Number,
    require: [true, "price is required"],
    trim: true,
  },
});

flightSchema.set("timestamps", true);

export default mongoose.model("flight", flightSchema);
