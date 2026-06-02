import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";

import connectDB from "./config/db.js";

// ROUTES
import authRoutes from "./routes/auth.routes.js";
import enquiryRoutes from "./routes/contactRoute.js";
import blogRoutes from "./routes/blog.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import tagRoutes from "./routes/tag.routes.js";

// MIDDLEWARE
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

//
// CONNECT DATABASE
//
connectDB().catch(() => {
  console.log(
    "❌ MongoDB connection failed"
  );
});

//
// CORS CONFIG
//
const allowedOrigins = [
  "http://localhost:3000",

  "https://welldone-metalworks-frontend.vercel.app",

  "https://welldone-metalworks.in",

  "https://www.welldone-metalworks.in",
];

app.use(
  cors({
    origin: function (
      origin,
      callback
    ) {
      // ALLOW POSTMAN & SERVER REQUESTS
      if (!origin) {
        return callback(null, true);
      }

      if (
        allowedOrigins.includes(origin)
      ) {
        return callback(null, true);
      }

      return callback(
        new Error("CORS not allowed")
      );
    },

    credentials: true,
  })
);

//
// BODY PARSER
//
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

//
// STATIC FOLDER
//
app.use(
  "/uploads",
  express.static(
    path.join(process.cwd(), "uploads")
  )
);

//
// API ROUTES
//
app.use("/api/auth", authRoutes);

app.use(
  "/api/contact",
  enquiryRoutes
);

app.use("/api/blogs", blogRoutes);

app.use(
  "/api/categories",
  categoryRoutes
);

app.use("/api/tags", tagRoutes);

//
// TEST ROUTE
//
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

//
// 404 ROUTE
//
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

//
// ERROR MIDDLEWARE
//
app.use(errorMiddleware);

//
// SERVER
//
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT}`
  );
});