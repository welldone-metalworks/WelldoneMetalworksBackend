import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/auth.controller.js";
import {
  validateRegister,
  validateLogin,
} from "../middleware/validate.middleware.js";

const router = express.Router();

router.post("/register", validateRegister, registerAdmin);
router.post("/login", validateLogin, loginAdmin);

export default router;
