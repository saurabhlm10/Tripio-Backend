import { Request, Response } from "express";
import { SellerModelType } from "../../../Types/SellerModelType";
import Seller from "../../../Models/Seller";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface SellerLoginBody {
  email: string;
  password: string;
}

interface ResponseObjectType {
  message: string;
  seller: SellerModelType | {};
}

const responseObject: ResponseObjectType = {
  message: "",
  seller: {},
};

export const sellerLogin = async (req: Request, res: Response) => {
  try {
    const { email, password }: SellerLoginBody = req.body;

    //Check all the fields
    if (!(email && password)) {
      responseObject.message = "Please fill all the fields";
      responseObject.seller = {};
      return res.status(400).json(responseObject);
    }

    const seller = (await Seller.findOne({
      email,
    })) as SellerModelType | null;

    // Check if seller exists
    if (!seller) {
      responseObject.message = "User does not exist";
      responseObject.seller = {};
      return res.status(401).json(responseObject);
    }

    // Check if password is correct
    const checkPassword: boolean = await bcrypt.compare(
      password,
      seller.password as string
    );

    if (!checkPassword) {
      responseObject.message = "Password Is Incorrect";
      responseObject.seller = {};
      return res.status(403).json(responseObject);
    }

    // Sign token
    const token: string = jwt.sign(
      {
        id: seller._id,
        email: seller.email,
      },
      process.env.SECRET!,
      {
        expiresIn: "24h",
      }
    );

    seller.password = undefined;

    responseObject.message = "User logged in successfully";
    responseObject.seller = seller;

    // Send Seller and Token
    return res
      .cookie("token", token, {
        expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json(responseObject);
  } catch (error) {
    console.log(error);
  }
};
