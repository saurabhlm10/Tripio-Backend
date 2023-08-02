import mongoose from "mongoose";

const roomTypeSchema = new mongoose.Schema({
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
      require: [true, "Max Adults Allowed Is Required"],
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

export default mongoose.model("roomtype", roomTypeSchema);
