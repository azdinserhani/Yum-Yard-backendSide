import db from "../db/index.js";
import jwt from "jsonwebtoken";
export const getComment = async (req, res) => {
  const postId = req.query.postId;
  const token = req.cookies.accessTocken;
  if (!token) return res.status(401).json("Not Logd In");

  try {
    const result = await db.query(
      "SELECT r.*,u.username,u.profile_img FROM recipe_comment AS r INNER JOIN user_profile AS u ON r.user_id = u.id WHERE r.post_id = $1 ORDER BY r.created_time DESC",
      [postId]
    );

    return res.status(200).send(result.rows);
  } catch (err) {
    return res.status(500).send(err);
  }
};
export const addComment = async (req, res) => {
  const { postId, text } = req.body;
  const token = req.cookies.accessTocken;
  if (!token) return res.status(401).json("Not Logd In");

  jwt.verify(token, "secret Key", async (err, userInfo) => {
    try {
      if (err) return res.status(401).json("Not Logd In");
      await db.query(
        "INSERT INTO recipe_comment(post_id,user_id,comment_text) VALUES ($1,$2,$3)",
        [postId, userInfo.id, text]
      );
      return res.status(200).send("add succes");
    } catch (err) {
      return res.status(500).send(err);
    }
  });
};
