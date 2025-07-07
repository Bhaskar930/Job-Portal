import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from './utils/db.js';
import userRoute from "./routes/userroute.js";
import companyrouter from "./routes/company.routes.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173", // ✅ your frontend
  credentials: true,               // ✅ must be lowercase
};

app.use(cors(corsOptions));

app.use("/api/user", userRoute);
app.use("/api/company",companyrouter);

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Listening at port ${process.env.PORT}`);
});
