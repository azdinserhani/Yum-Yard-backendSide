import db from "../db/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const saltRound = 16;
  const { username, email, password } = req.body;
  try {
    //check if user already exist
    const result = await db.query("SELECT * FROM user_profile WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      return res.status(409).send({ msg: "user already exist" });
    }
    //create a new user
    //1-hash password
    const hashedPassword = await bcrypt.hash(password, saltRound);
    //2-insert a new user to the database
    await db.query(
      "INSERT INTO user_profile(username,email,password_hash) VALUES($1,$2,$3)",
      [username, email, hashedPassword]
    );
    res.status(200).send({ msg: "User has been created." });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //1-check if user exist
    const result = await db.query("SELECT * FROM user_profile WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(409).send({ msg: "User not Found" });
    }
    //2-compare password
    const chekPassword = await bcrypt.compare(
      password,
      result.rows[0].password_hash
    );
    if (!chekPassword) {
     return res.status(400).send({ msg: "Wrong Password" });
    }
    //3-generate JWT tocken
    const tocken = jwt.sign({ id: result.rows[0].id }, "secret Key");
    const { password: pwd, ...other } = result.rows[0];
    res
      .cookie("accessTocken", tocken, { httpOnly: true })
      .status(200)
      .json(other);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("accessTocken", { secure: true, samesite: "none" })
    .status(200)
    .send({ msg: "Logged out successfully" });
};
