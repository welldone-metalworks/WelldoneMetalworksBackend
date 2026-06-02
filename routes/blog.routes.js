import express from "express";

import {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  getBlogsByCategory,
  getBlogsByTag,
} from "../controllers/blog.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

import upload from "../middleware/upload.middleware.js";

const router =
  express.Router();

//
// ======================================
// PUBLIC ROUTES
// ======================================
//

//
// GET ALL BLOGS
//
router.get(
  "/",
  getBlogs
);

//
// GET BLOGS BY CATEGORY
//
router.get(
  "/category/:slug",
  getBlogsByCategory
);

//
// GET BLOGS BY TAG
//
router.get(
  "/tag/:slug",
  getBlogsByTag
);

//
// GET SINGLE BLOG
//
router.get(
  "/:slug",
  getSingleBlog
);

//
// ======================================
// ADMIN ROUTES
// ======================================
//

//
// CREATE BLOG
//
router.post(
  "/create",
  authMiddleware,
  upload.single(
    "featuredImage"
  ),
  createBlog
);

//
// UPDATE BLOG
//
router.put(
  "/:id",
  authMiddleware,
  upload.single(
    "featuredImage"
  ),
  updateBlog
);

//
// DELETE BLOG
//
router.delete(
  "/:id",
  authMiddleware,
  deleteBlog
);

export default router;