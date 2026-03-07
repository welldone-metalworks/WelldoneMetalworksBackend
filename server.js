import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import enquiryRoutes from "./routes/contactRoute.js";

const app = express();

// =============================
// CONNECT DATABASE (SAFE)
// =============================
connectDB().catch((err) => {
  console.log("❌ MongoDB connection failed, running without DB");
});

// =============================
// CORS CONFIG
// =============================
const allowedOrigins = [
  "http://localhost:3000",
  "https://welldone-metalworks-frontend.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(null, true);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
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
  res.send("🚀 API is running...");
});

// =============================
// SERVER
// =============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});