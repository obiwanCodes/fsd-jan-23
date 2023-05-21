import { Router } from "express";
import { getAdventures } from "../controllers/adventures.js";
const router = Router();

router.get("/", getAdventures);

export default router;
