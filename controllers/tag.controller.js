import Tag from "../models/Tag.js";
import slugify from "slugify";

// CREATE TAG
export const createTag = async (
  req,
  res
) => {
  try {
    const { name } = req.body;

    const slug = slugify(name, {
      lower: true,
      strict: true,
    });

    const existingTag =
      await Tag.findOne({ slug });

    if (existingTag) {
      return res.status(400).json({
        message: "Tag already exists",
      });
    }

    const tag = await Tag.create({
      name,
      slug,
    });

    res.status(201).json({
      message: "Tag created successfully",
      tag,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET TAGS
export const getTags = async (
  req,
  res
) => {
  try {
    const tags = await Tag.find().sort({
      createdAt: -1,
    });

    res.json(tags);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE TAG
export const updateTag = async (
  req,
  res
) => {
  try {
    const { name } = req.body;

    const slug = slugify(name, {
      lower: true,
      strict: true,
    });

    const tag = await Tag.findByIdAndUpdate(
      req.params.id,
      {
        name,
        slug,
      },
      { new: true }
    );

    res.json({
      message: "Tag updated successfully",
      tag,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE TAG
export const deleteTag = async (
  req,
  res
) => {
  try {
    await Tag.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Tag deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};