import { getPosts, getPostById } from "../controllers/posts.js";
import { Router } from "express";

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPostById);

export default router;
