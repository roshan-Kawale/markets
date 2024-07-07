import express from 'express';
import { signOut, signin, signup } from '../controller/auth.js';

const router = express.Router();

router.post("/signup" , signup).post("/signin" , signin).get("/signout" , signOut)

export default router;