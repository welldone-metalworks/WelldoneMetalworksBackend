import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import enquiryRoutes from "./routes/contactRoute.js";

const app = express();

// =============================
// CONNECT DATABASE
// =============================
connectDB();

// =============================
// CORS CONFIG
// =============================
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://welldone-metalworks-frontend.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// =============================
// MIDDLEWARE
// =============================
app.use(express.json());

// =============================
// ROUTES
// =============================
app.use("/api/contact", enquiryRoutes);
app.use("/api/auth", authRoutes);

// =============================
// TEST ROUTE
// =============================
app.get("/", (req, res) => {
  res.send("API is running...");
});

// =============================
// SERVER
// =============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});