import express from 'express';
import { createShopkeeper, getShopkeeper, updateShopkeeper } from '../controller/shopkeeper.js';
import authMiddleware from '../utils/authMiddleware.js';

const router = express.Router();

router.post("/create" , authMiddleware , createShopkeeper).post("/update" , updateShopkeeper).get("/get/:id" , getShopkeeper)

export default router;