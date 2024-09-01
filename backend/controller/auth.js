import User from "../model/auth.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import dotenv from "dotenv";
dotenv.config();

import Token from "../model/token.js"
import { sendEmail } from "../utils/sendEmail.js";
import CryptoJS from 'crypto-js';

// const Token = require("../models/token");
// const crypto = require("crypto");
// const sendEmail = require("../utils/sendEmail");

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return next(errorHandler(404, "Sign Up user by diffrent email"));
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    const token = await new Token({
			userId: newUser._id,
			token: CryptoJS.lib.WordArray.random(32 / 4).toString(CryptoJS.enc.Hex),
		}).save();
		const url = `${process.env.BASE_URL}api/auth/${newUser._id}/verify/${token.token}`;
		await sendEmail(newUser.email, "Verify Email", url);

    const { password: pass, ...rest } = newUser._doc;
		res
			.status(200)
			.send(rest);

    // const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
    // res
    // .cookie("token", token, {
    //   httpOnly: true,
    //   maxAge: 3600000
    // })
    //   .status(200)
    //   .json(rest);
  } catch (error) {
    console.log(error);
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

    // if (!validUser.verified) {
		// 	let token = await Token.findOne({ userId: validUser._id });
		// 	if (!token) {
		// 		token = await new Token({
		// 			userId: validUser._id,
		// 			token: CryptoJS.lib.WordArray.random(32 / 4).toString(CryptoJS.enc.Hex),
		// 		}).save();
		// 		const url = `${process.env.BASE_URL}api/auth/${validUser._id}/verify/${token.token}`;
		// 		await sendEmail(validUser.email, "Verify Email", url);
		// 	}

		// 	return res
		// 		.status(400)
		// 		.send({message: "An Email sent to your account please verify" });
		// }

    if (!validUser.verified) {
      let token = await Token.findOne({ userId: validUser._id });
      if (!token) {
        token = await new Token({
          userId: validUser._id,
          token: CryptoJS.lib.WordArray.random(32 / 4).toString(CryptoJS.enc.Hex),
        }).save();

        const url = `${process.env.BASE_URL}api/auth/${validUser._id}/verify/${token.token}`;

        // Try sending the email and log any potential errors
        console.log("enter to sendemail")
        try {
          await sendEmail(validUser.email, "Verify Email", url);
          console.log("Verification email sent to:", validUser.email);
        } catch (emailError) {
          console.error("Error sending verification email:", emailError);
          return next(errorHandler(500, "Failed to send verification email"));
        }
        console.log("exit to sendemail")
      }

      return res.status(400).send({ message: "An email has been sent to your account. Please verify it." });
    }

    const userToken = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("userToken", userToken, {
        httpOnly: true,
        maxAge: 3600000
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("userToken");
    res.status(200).json("User has been signed out");
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const {
      userId,
      name
    } = req.body;
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    existingUser.name = name || existingUser.name;
    await existingUser.save();

    res.status(200).json({ message: 'user updated successfully' });

  } catch (error) {
    next(error);
  }
};

// export const verifyEmailToken = async (req , res) => {

//   const { id , token } = req.params;
//   try {
// 		const user = await User.findOne({ _id: id });
// 		if (!user) return res.status(400).send({ message: "Invalid link" });
//     console.log(user);

// 		const token = await Token.findOne({
// 			userId: user._id
// 		});
//     console.log(token);
// 		if (!token) return res.status(400).send({ message: "Invalid link" });

// 		user.verified = true;
//     await user.save(); 
// 		await token.remove();

//     const userToken = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
//     const { password: pass, ...rest } = validUser._doc;
//     res
//       .cookie("userToken", userToken, {
//         httpOnly: true,
//         maxAge: 3600000
//       })
//       .status(200)
//       .json(rest);
// 	} catch (error) {
// 		res.status(500).send({ message: "Internal Server Error ....." });
// 	}
// } 

export const verifyEmailToken = async (req, res) => {
  const { id, token } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(id);
    if (!user) return res.status(400).send({ message: "Invalid link" });

    // Find the token associated with the user
    const userToken = await Token.findOne({
      userId: user._id,
      token: token,
    });
    if (!userToken) return res.status(400).send({ message: "Invalid link" });

    // Update the user's verified status
    user.verified = true;
    await user.save(); // Make sure to save the updated user

    // Remove the used token
    await Token.deleteOne({
      userId: user._id
    });

    // Create a new JWT token for the user
    const newUserToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

    // Respond with the user data and set the JWT token in a cookie
    const { password, ...rest } = user._doc;
    res
      .cookie("userToken", newUserToken, {
        httpOnly: true,
        maxAge: 3600000,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error ....." });
  }
};