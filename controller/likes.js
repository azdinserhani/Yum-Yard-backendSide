import jwt from "jsonwebtoken";
import db from "../db/index.js";

export const getLikes = async (req, res) => {
  const token = req.cookies.accessTocken;
  if (!token) return res.status(401).json("Not logged in!");

  try {
    const result = await db.query("SELECT * FROM recipe_like");
    return res.status(200).send(result.rows.map((item) => item.post_id));
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const addLikes = (req, res) => {
  const token = req.cookies.accessTocken;
  if (!token) return res.status(401).json("Not logged in!");
    const postId = req.query.postId;
    console.log(postId);
    
  jwt.verify(token, "secret Key", async (err, userInfo) => {
    if (err) {
      return res.status(401).send("not Loged In");
    }
    try {
      const result = await db.query(
        "INSERT INTO recipe_like(user_id,post_id) VALUES ($1,$2)",
        [userInfo.id, postId]
      );
      return res.status(200).send(result.rows.map((item) => item.post_id));
    } catch (err) {
      return res.status(500).send(err);
    }
  });
};
export const deleteLikes = async (req, res) => {
  const token = req.cookies.accessTocken;
  if (!token) return res.status(401).json("Not logged in!");
  const postId = req.query.postId;

  try {
    const result = await db.query(
      "DELETE FROM recipe_like WHERE post_id = $1",
      [postId]
    );
    return res.status(200).send(result.rows.map((item) => item.post_id));
  } catch (err) {
    return res.status(500).send(err);
  }
};
