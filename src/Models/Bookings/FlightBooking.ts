import mongoose from "mongoose";

const flightBookingSchema = new mongoose.Schema({
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
  travellers: {
    type: [String],
    require: [true, "travellers is required"],
  },
  totalPaid: {
    type: Number,
    require: [true, "total paid is required"],
    trim: true,
  },
});

flightBookingSchema.set("timestamps", true);

export default mongoose.model("flightbooking", flightBookingSchema);
