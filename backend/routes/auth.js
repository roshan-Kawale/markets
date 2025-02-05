import express from "express";
import {
    getUserById,
  signOut,
  signin,
  signup,
  updateUser,
  verifyEmailToken,
} from "../controller/auth.js";

const router = express.Router();

router
  .post("/signup", signup)
  .post("/signin", signin)
  .get("/signout", signOut)
  .post("/update", updateUser)
  .get("/user/:id/verify/:token", verifyEmailToken)
  .get("/get/:id" , getUserById)

export default router;
