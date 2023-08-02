import mongoose, { Schema } from "mongoose";

const hotelSchema = new mongoose.Schema({
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
    type: [Schema.Types.ObjectId],
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
    require: [false, "hotel facilities is not mandatory"],
  },
});

hotelSchema.set("timestamps", true);

export default mongoose.model("hotel", hotelSchema);
