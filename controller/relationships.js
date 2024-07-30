import jwt from "jsonwebtoken";
import db from "../db/index.js";

export const getRelation = (req, res) => {
  const token = req.cookies.accessTocken;
  if (!token) return res.status(401).json("Not logged in!");
  db.query(
    "SELECT follower_id FROM followers WHERE followee_id = $1",
    [req.query.followedUserId],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res
        .status(200)
        .json(data.rows.map((relation) => relation.follower_id));
    }
  );
};

export const addRelation = (req, res) => {
  const token = req.cookies.accessTocken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secret Key", async (err, userInfo) => {
    if (err) return res.status(401).json("Not logged in!");
    try {
      await db.query(
        "INSERT INTO followers (followee_id,follower_id) VALUES ($1,$2)",
        [req.body.userId, userInfo.id]
      );
    } catch (err) {
      res.status(500).json(err);
    }
  });
};
export const deleteRelation = (req, res) => {
  const token = req.cookies.accessTocken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secret Key", async (err, userInfo) => {
    if (err) return res.status(401).json("Not logged in!");
    try {
      await db.query(
        "DELETE FROM followers WHERE follower_id = $1 AND followee_id =$2",
        [userInfo.id, req.query.userId]
      );
    } catch (err) {
      res.status(500).json(err);
    }
  });
};

export const getFollow = (req, res) => {
  const token = req.cookies.accessTocken;
  if (!token) return res.status(401).json("Not logged in!");
  db.query(
    "SELECT followee_id FROM followers WHERE follower_id = $1",
    [req.params.id],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res
        .status(200)
        .json(data.rows.map((relation) => relation.followee_id));
    }
  );
};
