import express from "express";
import { addLikes, deleteLikes, getLikes } from "../controller/likes.js";

const router = express.Router();

router.get("/",getLikes);
router.post("/", addLikes);
router.delete("/", deleteLikes);

export default router;
