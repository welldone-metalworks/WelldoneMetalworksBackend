import Category from "../models/Category.js";
import slugify from "slugify";

// CREATE CATEGORY
export const createCategory = async (
  req,
  res
) => {
  try {
    const { name, description } = req.body;

    const slug = slugify(name, {
      lower: true,
      strict: true,
    });

    const existingCategory =
      await Category.findOne({ slug });

    if (existingCategory) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }

    const category =
      await Category.create({
        name,
        slug,
        description,
      });

    res.status(201).json({
      message:
        "Category created successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET CATEGORIES
export const getCategories = async (
  req,
  res
) => {
  try {
    const categories =
      await Category.find().sort({
        createdAt: -1,
      });

    res.json(categories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE CATEGORY
export const updateCategory = async (
  req,
  res
) => {
  try {
    const { name, description } = req.body;

    const slug = slugify(name, {
      lower: true,
      strict: true,
    });

    const category =
      await Category.findByIdAndUpdate(
        req.params.id,
        {
          name,
          slug,
          description,
        },
        { new: true }
      );

    res.json({
      message:
        "Category updated successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE CATEGORY
export const deleteCategory = async (
  req,
  res
) => {
  try {
    await Category.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};