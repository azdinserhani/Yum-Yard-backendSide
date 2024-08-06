import express from "express";
import { addRating, getAvgRating } from "../controller/rating.js";

const router = express.Router()

router.get("/",getAvgRating)
router.post("/", addRating);

export default router;