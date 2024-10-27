import express from 'express';
import authMiddleware from '../utils/authMiddleware.js';
import { createCustomer, getCustomer, updateCustomer } from '../controller/customer.js';

const router = express.Router();

router.post("/create" , createCustomer).get("/get/:id" , getCustomer).post("/update" , updateCustomer)

export default router;