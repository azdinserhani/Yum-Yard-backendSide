import db from "../db/index.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.userId;
  try {
    db.query(
      "SELECT * FROM user_profile WHERE id = $1",
      [userId],
      (err, data) => {
        if (err) return res.status(500).json(err);
        const { password_hash, ...info } = data.rows[0];
        return res.status(200).json(info);
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};
export const updateUser = (req, res) => {
  const token = req.cookies.accessTocken;
  if (!token) return res.status(401).json("Not logged in!");
  const { username, email, country, date_of_birth, profile_img } = req.body;

  jwt.verify(token, "secret Key", async (err, userInfo) => {
    if (err) return res.status(403).json(err.message);
    try {
      db.query(
        "UPDATE user_profile SET username= $1, email=$2, country=$3, date_of_birth=$4, profile_img=$5 WHERE id=$6",
        [username, email, country, date_of_birth, profile_img, userInfo.id],
        (err, data) => {
          if (err) return res.status(500).json(err.message);
          if (data.affectedRows > 0) return res.status(200).json("updated");
          return res.status(403).json("You can only update your profile");
        }
      );
    } catch (err) {
      res.status(500).json(err);
    }
  });
};
