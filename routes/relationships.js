import express from "express";
import {
  addRelation,
  deleteRelation,
  getRelation,
  getFollow
} from "../controller/relationships.js";
const router = express.Router();

router.get("/", getRelation);
router.post("/", addRelation);
router.delete("/", deleteRelation);
router.get("/:id", getFollow);


export default router;
