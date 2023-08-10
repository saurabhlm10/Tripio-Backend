import { Request, Response } from "express";
import UserModel from "../../../Models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModelType } from "../../../Types/UserModelType";
import { MongooseError, Types } from "mongoose";

/******************************************************
 * @REGISTER
 * @route /api/auth/user/register
 * @description User register Controller for creating new user
 * @parameters
 * @body name, email, phoneNumber, password
 * @returns Token as cookie and id in JSON
 ******************************************************/

interface UserRegisterBody {
  name: string;
  email: string;
  phoneNumber: number;
  password: string;
}

interface ResponseObjectType {
  message: string;
  id: string | Types.ObjectId;
}

const responseObject: ResponseObjectType = {
  message: "",
  id: "",
};

export const userRegister = async (req: Request, res: Response) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    if (!(name && email && phoneNumber && password)) {
      responseObject.message = "Please fill all the fields";
      return res.status(400).json(responseObject);
    }

    // Check if user already exists or not
    const userAlreadyExists = (await UserModel.findOne({
      email,
    })) as UserModelType | null;
    if (userAlreadyExists) {
      responseObject.message = "This Email Is Already Registered";

      return res.status(402).json(responseObject);
    }

     // Check if username available
     const phoneNumberExists = (await UserModel.findOne({
        phoneNumber,
      })) as UserModelType;
  
      if (phoneNumberExists) {
        responseObject.message = "Phone Number is already registered";
  
        return res.status(403).json(responseObject);
      }

    // encrypt password
    const myEnPassword: string = bcrypt.hashSync(password, 10);

    // Create a new entry in db
    const user = (await UserModel.create({
      name,
      email,
      phoneNumber,
      password: myEnPassword,
    })) as UserModelType;

    // Sign the Token
    jwt.sign(
      { userId: user?._id, email },
      process.env.SECRET!,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) throw err;
        responseObject.message = "User registered successfully";
        responseObject.id = user?._id as Types.ObjectId;

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
