import express from "express";

import {
  createTag,
  getTags,
  updateTag,
  deleteTag,
} from "../controllers/tag.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getTags);

// ADMIN
router.post(
  "/create",
  authMiddleware,
  createTag
);

router.put(
  "/:id",
  authMiddleware,
  updateTag
);

router.delete(
  "/:id",
  authMiddleware,
  deleteTag
);

export default router;