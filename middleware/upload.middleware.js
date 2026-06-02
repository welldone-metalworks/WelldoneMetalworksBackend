import multer from "multer";
import path from "path";

// STORAGE CONFIG
const storage = multer.diskStorage({
  destination: function (
    req,
    file,
    cb
  ) {
    cb(null, "uploads/blogs");
  },

  filename: function (
    req,
    file,
    cb
  ) {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName +
        path.extname(file.originalname)
    );
  },
});

// FILE FILTER
const fileFilter = (
  req,
  file,
  cb
) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
  ];

  if (
    allowedTypes.includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only JPG, PNG and WEBP images are allowed"
      ),
      false
    );
  }
};

// UPLOAD CONFIG
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter,
});

export default upload;