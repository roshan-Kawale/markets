import express from 'express';
import { signOut, signin, signup, updateUser } from '../controller/auth.js';

const router = express.Router();

router.post("/signup" , signup).post("/signin" , signin).get("/signout" , signOut).post("/update" , updateUser)

export default router;