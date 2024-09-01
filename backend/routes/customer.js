import express from 'express';
import authMiddleware from '../utils/authMiddleware.js';
import { createCustomer } from '../controller/customer.js';

const router = express.Router();

router.post("/create" , createCustomer)

export default router;