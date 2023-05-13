import { getPosts, getPostById, createPost } from "../controllers/posts.js";
import { Router } from "express";

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", createPost);

export default router;
