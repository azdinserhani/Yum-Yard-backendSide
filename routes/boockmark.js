import express from "express";
import { addBookmark, deleteBookmark, getBookmark,getBookmarkSaved } from "../controller/boockmark.js";

const router = express.Router();

router.get("/",getBookmark);
router.get("/post/:postId", getBookmarkSaved);
router.post("/", addBookmark);
router.delete("/",deleteBookmark)

export default router;