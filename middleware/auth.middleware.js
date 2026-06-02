import jwt from "jsonwebtoken";

const authMiddleware = (
  req,
  res,
  next
) => {
  const authHeader =
    req.headers.authorization;

  // CHECK HEADER
  if (
    !authHeader ||
    !authHeader.startsWith("Bearer ")
  ) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  // GET TOKEN
  const token =
    authHeader.split(" ")[1];

  try {
    // VERIFY TOKEN
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // SAVE ADMIN DATA
    req.admin = {
      id: decoded.id,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

export default authMiddleware;