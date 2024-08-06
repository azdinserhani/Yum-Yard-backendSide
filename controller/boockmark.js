import db from "../db/index.js";
import jwt from "jsonwebtoken";

export const getBookmark = (req, res) => {
  const token = req.cookies.accessTocken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secret Key", async (err, userInfo) => {
    if (err) return res.status(401).json("Not logged in!");
    try {
      const result = await db.query(
        "SELECT post_id FROM saved_recipe WHERE user_id = $1",
        [userInfo.id]
      );
      return res.status(200).json(result.rows.map((item) => item.post_id));
    } catch (err) {
      return res.status(500).send(err);
    }
  });
};

export const getBookmarkSaved = (req, res) => {
  const token = req.cookies.accessTocken;
  if (!token) return res.status(401).json("Not logged in!");
  const postId = req.params.postId;
  jwt.verify(token, "secret Key", async (err, userInfo) => {
    if (err) return res.status(401).json("Not logged in!");
    try {
      const result = await db.query(
        "SELECT post_id FROM saved_recipe WHERE post_id = $1",
        [postId]
      );
      return res.status(200).json(result.rows.map((item) => item.post_id));
    } catch (err) {
      return res.status(500).send(err);
    }
  });
};
export const addBookmark = (req, res) => {
  const token = req.cookies.accessTocken;
  const postId = req.query.postId;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secret Key", async (err, userInfo) => {
    if (err) return res.status(401).json("Not logged in!");
    try {
      const result = await db.query(
        "INSERT INTO saved_recipe(post_id,user_id) VALUES ($1,$2)",
        [postId, userInfo.id]
      );
      return res.status(200).json(result.rows.map((item) => item.post_id));
    } catch (err) {
      return res.status(500).send(err);
    }
  });
};
export const deleteBookmark = async (req, res) => {
  const token = req.cookies.accessTocken;
  const postId = req.query.postId;
  if (!token) return res.status(401).json("Not logged in!");

  try {
    const result = await db.query(
      "DELETE FROM saved_recipe WHERE post_id = $1",
      [postId]
    );
    return res.status(200).json(result.rows.map((item) => item.post_id));
  } catch (err) {
    return res.status(500).send(err);
  }
};
