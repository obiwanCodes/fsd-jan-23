import {
  getPosts,
  getPostById,
  createPost,
  replacePost,
  updatePost,
  deletePost,
} from "../controllers/posts.js";
import { Router } from "express";

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", createPost);
router.put("/:id", replacePost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
