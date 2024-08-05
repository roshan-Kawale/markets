import express from "express";
import authMiddleware from "../utils/authMiddleware.js";
import {
  commentOnProduct,
  createProduct,
  getAllProducts,
  getProductById,
  likeAndUnlikeProduct,
} from "../controller/product.js";

const router = express.Router();

router
  .post("/create", createProduct)
  .get("/getall", getAllProducts)
  .get("/get/:productId", getProductById)
  .post("/like/:id", likeAndUnlikeProduct)
  .post("/comment/:id", commentOnProduct);

export default router;
