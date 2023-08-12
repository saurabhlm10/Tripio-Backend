import { Request, Response } from "express";
import { MongooseError, Types } from "mongoose";
import UserModel from "../../../Models/User";
import { UserModelType } from "../../../Types/UserModelType";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface UserLoginBody {
  email: string;
  password: string;
}

interface ResponseObjectType {
  message: string;
  user: UserModelType | {};
}

const responseObject: ResponseObjectType = {
  message: "",
  user: {},
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password }: UserLoginBody = req.body;

    if (!(email && password)) {
      responseObject.message = "Please fill all the fields";
      responseObject.user = {};
      return res.status(400).json(responseObject);
    }

    const user = (await UserModel.findOne({
      email,
    })) as UserModelType | null;

    // Check if user exists
    if (!user) {
      responseObject.message = "User does not exist";
      responseObject.user = {};
      return res.status(401).json(responseObject);
    }

    // Check if password is correct
    const checkPassword: boolean = await bcrypt.compare(
      password,
      user.password as string
    );

    if (!checkPassword) {
      responseObject.message = "Password Is Incorrect";
      responseObject.user = {};
      return res.status(403).json(responseObject);
    }

    // Sign token
    const token: string = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.SECRET!,
      {
        expiresIn: "24h",
      }
    );

    user.password = undefined;

    responseObject.message = "User logged in successfully";
    responseObject.user = user;

    // Send User and Token
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
    responseObject.user = {};
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
