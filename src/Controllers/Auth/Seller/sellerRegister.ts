import { Request, Response } from "express";
import { MongooseError, Types } from "mongoose";
import { SellerModelType } from "../../../Types/SellerModelType";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Seller from "../../../Models/Seller";

interface SellerRegisterBody {
  companyName: string;
  email: string;
  password: string;
  offerings: {
    hotels: boolean;
    flights: boolean;
  };
}

interface ResponseObjectType {
  message: string;
  id: string | Types.ObjectId;
}

const responseObject: ResponseObjectType = {
  message: "",
  id: "",
};

export const sellerRegister = async (req: Request, res: Response) => {
  try {
    const { companyName, email, password, offerings }: SellerRegisterBody =
      req.body;

    // Converting incoming text to booleans
    offerings.hotels = Boolean(offerings.hotels);
    offerings.flights = Boolean(offerings.flights);

    if (!(companyName && email && password && offerings)) {
      responseObject.message = "Please fill all the fields";
      return res.status(400).json(responseObject);
    }

    // Check if seller already exists or not
    const sellerAlreadyExists = (await Seller.findOne({
      email,
    })) as SellerModelType | null;
    if (sellerAlreadyExists) {
      responseObject.message = "This Email Is Already Registered";
      return res.status(401).json(responseObject);
    }

    if (!req.file) {
      responseObject.message = "Please upload a logo";
      return res.status(401).json(responseObject);
    }

    const logo = req.file?.path;

    // encrypt password
    const myEnPassword: string = bcrypt.hashSync(password, 10);

    // Create a new entry in db
    const seller = (await Seller.create({
      companyName,
      email,
      logo,
      password: myEnPassword,
      offerings,
    })) as SellerModelType;

    // Sign the Token
    jwt.sign(
      { userId: seller?._id, email },
      process.env.SECRET!,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) throw err;
        responseObject.message = "User registered successfully";
        responseObject.id = seller?._id as Types.ObjectId;

        res
          .cookie("token", token, {
            expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
            sameSite: "none",
            secure: true,
          })
          .status(200)
          .json(responseObject);
      }
    );
  } catch (error) {
    console.log(error);
    responseObject.id = "";
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
