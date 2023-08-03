import mongoose, { Schema } from "mongoose";

const hotelBookingSchema = new Schema({
  name: {
    type: String,
    require: [true, "hotel name is required"],
    trim: true,
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
  travellers: {
    type: {
      adults: {
        type: Number,
        require: [true, "Adults Count Is Required"],
      },
      children: {
        type: Number,
        require: [true, "Children Count Is Required"],
      },
    },
  },
  addOns: {
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
  totalPaid: {
    type: Number,
    require: [true, "total paid is required"],
    trim: true,
  },
});

hotelBookingSchema.set("timestamps", true);

export default mongoose.model("hotelbooking", hotelBookingSchema);
