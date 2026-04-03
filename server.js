import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import connectDB from "./config/database.js";
import userRoutes from "./routes/userroutes.js";
import recordRoutes from "./routes/recordroutes.js";
import dashboardRoutes from "./routes/dashboardroutes.js";
import authRoutes from "./routes/authroutes.js";

dotenv.config();

connectDB();


const app = express();

//rate limiting--> 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later"
});

app.use(limiter);

app.use(express.json());

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/records", recordRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.listen(process.env.PORT, () => {

  console.log(`Server running on port ${process.env.PORT}`);

});