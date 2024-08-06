import db from "../db/index.js";
import jwt from "jsonwebtoken";
export const getAvgRating = async (req, res) => {
  const token = req.cookies.accessTocken;
  if (!token) return res.status(401).json("Not Logd In");
  const postId = req.query.postId;
  try {
    const result = await db.query(
      "SELECT AVG(rating) AS average_rating FROM reviews WHERE post_id = $1 ",
      [postId]
    );
    return res.status(200).send(result.rows[0]);
  } catch (err) {
    return res.status(500).send(err);
  }
};
export const addRating = async (req, res) => {
  const token = req.cookies.accessTocken;
  if (!token) return res.status(401).json("Not Logd In");
  const postId = req.body.postId;
  const rating = req.body.rating;
  console.log(req.body);
  console.log(typeof req.body.rating);

  
  jwt.verify(token, "secret Key", async (err, userInfo) => {
    if (err) return res.status(401).json("Not Logd In");
    try {
      await db.query(
        "INSERT INTO reviews ( post_id, user_id, rating) VALUES ($1,$2,$3)",
        [postId, userInfo.id, rating]
      );
      return res.status(200).send("rating has been added");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
};
