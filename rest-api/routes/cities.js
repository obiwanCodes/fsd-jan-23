import { Router } from "express";
import {
  getCities,
  getCityById,
  createCity,
  replaceCity,
  updateCity,
  deleteCity,
} from "../controllers/cities.js";
const router = Router();

router.get("/", getCities);
router.get("/:id", getCityById);
router.post("/", createCity);
router.put("/:id", replaceCity);
router.patch("/:id", updateCity);
router.delete("/:id", deleteCity);

export default router;
