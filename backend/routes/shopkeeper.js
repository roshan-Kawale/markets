import express from 'express';
import { createShopkeeper, deleteShopkeeper, getShopkeeper, updateShopkeeper } from '../controller/shopkeeper.js';
import authMiddleware from '../utils/authMiddleware.js';

const router = express.Router();

router.post("/create" ,createShopkeeper).post("/update" , updateShopkeeper).get("/get/:id" , getShopkeeper).delete("/delete/:id" , deleteShopkeeper)

export default router;