import express from "express";

import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getCategories);

// ADMIN
router.post(
  "/create",
  authMiddleware,
  createCategory
);

router.put(
  "/:id",
  authMiddleware,
  updateCategory
);

router.delete(
  "/:id",
  authMiddleware,
  deleteCategory
);

export default router;