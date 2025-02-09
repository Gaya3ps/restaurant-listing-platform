// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Define routes
app.use("/api/users", userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
