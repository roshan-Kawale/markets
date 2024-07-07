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
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: '*', // or 'https://markets-two.vercel.app/'
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
}));


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