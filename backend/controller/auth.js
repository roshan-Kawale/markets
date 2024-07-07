import User from "../model/auth.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import dotenv from "dotenv";
dotenv.config(); 

export const signup = async (req, res, next) => {
  try {
    const { name, email, password , role} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ name, email, password : hashedPassword , role});
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email: email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
    const { password: pass, ...rest } = validUser._doc;
    res.cookie("token", token, { httpOnly: true , maxAge : 3600000}).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
    try {
      res.clearCookie("token");
      res.status(200).json("User has been signed out");
    } catch (error) {
      next(error);
    }
  }
  