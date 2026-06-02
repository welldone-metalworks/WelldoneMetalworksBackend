import slugify from "slugify";

const createSlug = async (
  title,
  Model,
  currentId = null
) => {
  // BASE SLUG
  let slug = slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  });

  let existingSlug = await Model.findOne({
    slug,
  });

  // IF SLUG EXISTS
  if (
    existingSlug &&
    existingSlug._id.toString() !== currentId
  ) {
    let counter = 1;

    let newSlug = `${slug}-${counter}`;

    while (
      await Model.findOne({
        slug: newSlug,
      })
    ) {
      counter++;

      newSlug = `${slug}-${counter}`;
    }

    slug = newSlug;
  }

  return slug;
};

export default createSlug;