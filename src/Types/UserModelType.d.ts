import { Document, Types } from "mongoose";

interface UserModelType extends Document {
  _id: Types.ObjectId;
  email: string;
  phoneNumber: number;
  password: string | undefined;
}
