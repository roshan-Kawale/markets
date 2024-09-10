import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import shopkeeperRouter from "./routes/shopkeeper.js"
import customerRouter from "./routes/customer.js"
import productRouter from "./routes/product.js"
import { errormiddleware } from "./utils/error.js";
import path from "path";
import cors from "cors";

const app = express();

const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.use(cookieParser());
app.use(cors({ origin: '*' }));

dotenv.config();
// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message); 
  });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/api/auth" , authRouter);
app.use("/api/shopkeeper" , shopkeeperRouter);
app.use("/api/customer" , customerRouter);
app.use("/api/product" , productRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend","build", "index.html"));
});

app.use(errormiddleware);

app.listen(process.env.PORT || 5000, () => {
  console.log('Server started on port 5000');
});