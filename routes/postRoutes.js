import express from "express";
const router = express.Router();

import { createPost, updatePost } from "../controllers/postController.js";
import { authGuard, adminGuard } from "../middleware/authMiddleware.js";

router.post("/", authGuard, adminGuard, createPost);
router.put("/:slug", authGuard, adminGuard, updatePost);

export default router;
