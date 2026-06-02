import Blog from "../models/Blog.js";

import Category from "../models/Category.js";

import Tag from "../models/Tag.js";

import slugify from "slugify";

//
// ======================================
// CREATE BLOG
// ======================================
//
export const createBlog =
  async (req, res) => {
    try {
      const {
        title,
        excerpt,
        content,
        category,
        tags,
        metaTitle,
        metaDescription,
        keywords,
        status,
      } = req.body;

      //
      // CREATE SLUG
      //
      const slug =
        slugify(title, {
          lower: true,
          strict: true,
        });

      //
      // CHECK EXISTING BLOG
      //
      const existingBlog =
        await Blog.findOne({
          slug,
        });

      if (existingBlog) {
        return res
          .status(400)
          .json({
            message:
              "Blog already exists",
          });
      }

      //
      // CREATE BLOG
      //
      const blog =
        await Blog.create({
          title,
          slug,
          excerpt,
          content,
          category,
          tags,
          metaTitle,
          metaDescription,
          keywords,
          status,
          featuredImage:
            req.file
              ? req.file.path
              : "",
          author:
            req.admin.id,
        });

      res.status(201).json({
        message:
          "Blog created successfully",
        blog,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

//
// ======================================
// GET ALL BLOGS
// ======================================
//
export const getBlogs =
  async (req, res) => {
    try {
      const blogs =
        await Blog.find()
          .populate(
            "category"
          )
          .populate("tags")
          .populate(
            "author",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      res.json(blogs);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

//
// ======================================
// GET SINGLE BLOG
// ======================================
//
export const getSingleBlog =
  async (req, res) => {
    try {
      const blog =
        await Blog.findOne({
          slug:
            req.params.slug,
        })
          .populate(
            "category"
          )
          .populate("tags")
          .populate(
            "author",
            "name email"
          );

      if (!blog) {
        return res
          .status(404)
          .json({
            message:
              "Blog not found",
          });
      }

      //
      // INCREASE VIEWS
      //
      blog.views += 1;

      await blog.save();

      res.json(blog);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

//
// ======================================
// UPDATE BLOG
// ======================================
//
export const updateBlog =
  async (req, res) => {
    try {
      const {
        title,
        excerpt,
        content,
        category,
        tags,
        metaTitle,
        metaDescription,
        keywords,
        status,
      } = req.body;

      //
      // CREATE SLUG
      //
      const slug =
        slugify(title, {
          lower: true,
          strict: true,
        });

      //
      // UPDATED DATA
      //
      const updatedData = {
        title,
        slug,
        excerpt,
        content,
        category,
        tags,
        metaTitle,
        metaDescription,
        keywords,
        status,
      };

      //
      // UPDATE IMAGE
      //
      if (req.file) {
        updatedData.featuredImage =
          req.file.path;
      }

      //
      // UPDATE BLOG
      //
      const blog =
        await Blog.findByIdAndUpdate(
          req.params.id,
          updatedData,
          {
            new: true,
          }
        );

      res.json({
        message:
          "Blog updated successfully",
        blog,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

//
// ======================================
// DELETE BLOG
// ======================================
//
export const deleteBlog =
  async (req, res) => {
    try {
      await Blog.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Blog deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

//
// ======================================
// GET BLOGS BY CATEGORY
// ======================================
//
export const getBlogsByCategory =
  async (req, res) => {
    try {
      const { slug } =
        req.params;

      //
      // FIND CATEGORY
      //
      const category =
        await Category.findOne({
          slug,
        });

      if (!category) {
        return res
          .status(404)
          .json({
            message:
              "Category not found",
          });
      }

      //
      // FIND BLOGS
      //
      const blogs =
        await Blog.find({
          category:
            category._id,
        })
          .populate(
            "category"
          )
          .populate("tags")
          .populate(
            "author",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json(
        blogs
      );
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Failed to fetch category blogs",
      });
    }
  };

//
// ======================================
// GET BLOGS BY TAG
// ======================================
//
export const getBlogsByTag =
  async (req, res) => {
    try {
      const { slug } =
        req.params;

      //
      // FIND TAG
      //
      const tag =
        await Tag.findOne({
          slug,
        });

      if (!tag) {
        return res
          .status(404)
          .json({
            message:
              "Tag not found",
          });
      }

      //
      // FIND BLOGS
      //
      const blogs =
        await Blog.find({
          tags: tag._id,
        })
          .populate(
            "category"
          )
          .populate("tags")
          .populate(
            "author",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json(
        blogs
      );
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Failed to fetch tag blogs",
      });
    }
  };