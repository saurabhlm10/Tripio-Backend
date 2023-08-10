import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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

export default mongoose.model("user", userSchema);
