import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import enquiryRoutes from "./routes/contactRoute.js";

const app = express();

// CONNECT DB
connectDB().catch(() => {
  console.log("❌ MongoDB connection failed, running without DB");
});

// CORS
const allowedOrigins = [
  "http://localhost:3000",
  "https://welldone-metalworks-frontend.vercel.app",
  "https://welldone-metalworks.in",
  "https://www.welldone-metalworks.in",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed"));
    },
    credentials: true,
  })
);

app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api/contact", enquiryRoutes);
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});