import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from './utils/db.js';
import userRoute from "./routes/userroute.js";
import companyrouter from "./routes/company.routes.js"
import jobrouter from "./routes/job.route.js"
import applyrouter from "./routes/application.route.js"

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
app.use("/api/job",jobrouter);
app.use("/api/apply",applyrouter)

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Listening at port ${process.env.PORT}`);
});
