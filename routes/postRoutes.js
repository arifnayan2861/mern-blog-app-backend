import express from "express";
const router = express.Router();

import {
  createPost,
  deletePost,
  updatePost,
  getPost,
} from "../controllers/postController.js";
import { authGuard, adminGuard } from "../middleware/authMiddleware.js";

router.post("/", authGuard, adminGuard, createPost);
router
  .route("/:slug")
  .put(authGuard, adminGuard, updatePost)
  .delete(authGuard, adminGuard, deletePost)
  .get(getPost);

export default router;
