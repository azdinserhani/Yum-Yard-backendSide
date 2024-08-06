import jwt from "jsonwebtoken";
import db from "../db/index.js";
import moment from "moment";
export const getPost = async (req, res) => {
  const token = req.cookies.accessTocken;
  if (!token) return res.status(401).json("Not logged in!");
  const userId = req.query.userId;
  //1-get all posts
  try {
    const query =
      userId !== "undefined"
        ? "SELECT p.*, u.id AS userId,u.profile_img,u.username FROM user_recipe AS p left" +
          " JOIN user_profile AS u ON p.user_id = u.id WHERE user_id = $1"
        : "SELECT p.*, u.id AS userId,u.profile_img,u.username FROM user_recipe AS p" +
          " JOIN user_profile AS u ON u.id = p.user_id ORDER BY p.created_datetime DESC";
    const params = userId !== "undefined" ? [userId] : [];
    const result = await db.query(query, params);
    if (!result) return res.status(201).send({ msg: "No Recipes" });
    return res.status(200).send(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const addPost = async (req, res) => {
  const token = req.cookies.accessTocken;
  if (!token) return res.status(401).json("Not logged in!");

  const {
    title,
    description,
    ingredients,
    instructions,
    cuisine_type,
    defficulty_level,
    recipe_img,
    cooking_time_hours,
    cooking_time_minutes
  } = req.body;
 
  jwt.verify(token, "secret Key", (err, userInfo) => {
    if (err) return res.status(500).send(err);
    try {
      db.query(
        "INSERT INTO user_recipe(user_id,title,description,ingredients,instructions,created_datetime,cuisine_type,defficulty_level,recipe_img,cooking_time_hours,cooking_time_minutes) " +
          " VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
        [
          userInfo.id,
          title,
          description,
          ingredients,
          instructions,
          moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          cuisine_type,
          defficulty_level,
          recipe_img,
          cooking_time_hours,
          cooking_time_minutes,
        ]
      );
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });
};

export const getPostById = async (req, res) => {
  const token = req.cookies.accessTocken;
  if (!token) return res.status(401).json("Not logged in!");
  const postId = req.params.id;
  //1-get all posts
  try {
    const result = await db.query(
      "SELECT p.*,u.username,u.profile_img  FROM user_recipe AS p INNER JOIN user_profile AS u ON p.user_id = u.id WHERE p.id = $1",
      [postId]
    );
    if (!result) return res.status(201).send({ msg: "No Recipes" });
    return res.status(200).send(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
