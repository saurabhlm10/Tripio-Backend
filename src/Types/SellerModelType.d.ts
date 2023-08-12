import { Document, Types } from "mongoose";

interface SellerModelType extends Document {
  _id: Types.ObjectId;
  companyName: string;
  email: string;
  logo: string;
  password: string | undefined;
  offerings: {
    hotels: boolean;
    flights: boolean;
  };
}
