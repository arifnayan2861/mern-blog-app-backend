import express from "express";
const router = express.Router();

import {
  createComment,
  updateComment,
} from "../controllers/commentControllers.js";
import { authGuard } from "../middleware/authMiddleware.js";

router.post("/", authGuard, createComment);
router.put("/:commentId", authGuard, updateComment);

export default router;
