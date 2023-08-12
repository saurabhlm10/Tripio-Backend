import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
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

export default mongoose.model("seller", sellerSchema);
