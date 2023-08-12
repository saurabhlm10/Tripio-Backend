import { Request, Response } from "express";
import Seller from "../../../Models/Seller";
import { SellerModelType } from "../../../Types/SellerModelType";
import { MongooseError } from "mongoose";

interface SellerLogoutBody {
  email: string;
}

interface ResponseObjectType {
  message: string;
}

const responseObject: ResponseObjectType = {
  message: "",
};
export const sellerLogout = async (req: Request, res: Response) => {
  try {
    const { email }: SellerLogoutBody = req.body;

    if (!email) {
      responseObject.message = "Please fill all the fields";
      return res.status(400).json(responseObject);
    }

    const seller = (await Seller.findOne({
      email,
    })) as SellerModelType | null;

    // Check if user exists
    if (!seller) {
      responseObject.message = "User does not exist";
      return res.status(401).json(responseObject);
    }

    responseObject.message = "Successfully logged out";

    return res
      .cookie("token", "", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json(responseObject);
  } catch (error) {
    console.log(error);
    if (error instanceof MongooseError) {
      responseObject.message = error.message;
      return res.status(401).json(responseObject);
    }
    if (error instanceof Error) {
      responseObject.message = error.message;
      return res.status(500).json(responseObject);
    }
  }
};
