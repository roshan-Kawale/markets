import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./backend/routes/auth.js";
import { errormiddleware } from "./backend/utils/error.js";
import path from "path";
import cors from "cors";

const app = express();

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "./frontend/build")));
app.use(cookieParser());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(express.json());

dotenv.config(); 
// Connect to MongoDB using Mongoose
mongoose 
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
  })
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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend","build", "index.html"));
});


app.use(errormiddleware);

app.listen(process.env.PORT, () => {
  console.log('Server started on port 5000');
});