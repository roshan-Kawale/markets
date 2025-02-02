import express from "express";
import {
  createShopkeeper,
  deleteShopkeeper,
  getShopkeeper,
  getShopkeepers,
  updateShopkeeper,
} from "../controller/shopkeeper.js";
import authMiddleware from "../utils/authMiddleware.js";

const router = express.Router();

router
  .post("/create", createShopkeeper)
  .post("/update", updateShopkeeper)
  .get("/get/:id", getShopkeeper)
  .delete("/delete/:id", deleteShopkeeper)
  .get("/getall", getShopkeepers);

export default router;
