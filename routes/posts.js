import express from "express";
import { getPost ,addPost, getPostById} from "../controller/posts.js";
const router = express.Router();

router.get("/",getPost);
router.post("/", addPost);
router.get("/:id", getPostById);

export default router;