import { Request, Response } from "express";
import { MongooseError } from "mongoose";
import UserModel from "../../../Models/User";
import { UserModelType } from "../../../Types/UserModelType";

interface UserLogoutBody {
  email: string;
}

interface ResponseObjectType {
  message: string;
}

const responseObject: ResponseObjectType = {
  message: "",
};

export const userLogout = async (req: Request, res: Response) => {
  try {
    const { email }: UserLogoutBody = req.body;

    if (!email) {
      responseObject.message = "Please fill all the fields";
      return res.status(400).json(responseObject);
    }

    const user = (await UserModel.findOne({
      email,
    })) as UserModelType | null;

    // Check if user exists
    if (!user) {
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
