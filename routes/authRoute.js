import { Router } from "express";
import db from "../db/index.js";
import passport from "passport";
import session from "express-session";
import { Strategy } from "passport-local";
import bcrypt, { hash } from "bcrypt";

const router = Router();
const saltRound = 16;

router.use(session({
    secret: "top secret",
    resave: false,
    saveUninitialized:true
}));
router.use(passport.initialize());
router.use(passport.session());
router.post("/api/login", passport.authenticate(("local"), {
    successRedirect: "/api/home",
    failureRedirect: "/api/register"
}))
//register route
router.post("/api/register", async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    country,
    date_of_birth,
    profile_img,
    creted_at,
  } = req.body;
  console.log(email);
  try {
    const checkResult = await db.query(
      "SELECT * FROM user_profile WHERE email = $1",
      [email]
    );

    if (checkResult.rows.length > 0) {
        // res.status(200).send({ msg: "you have been register before" });
        res.redirect("/api/login");
    } else {
      bcrypt.hash(password, saltRound, async (err, hash) => {
        if (err) {
          console.log(err);
        } else {
          const result = await db.query(
            "INSERT INTO user_profile(first_name,last_name,email,password_hash,country,date_of_birth,profile_img) VALUES($1,$2,$3,$4,$5,$6,$7)",
            [
              first_name,
              last_name,
              email,
              hash,
              country,
              date_of_birth,
              profile_img,
            ]
          );
          res.redirect("/api/login");
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

passport.use("local", new Strategy(async (email, password, done) => {
    try {
        const result = await db.query("SELECT * FROM user_profile WHERE email = $1", [email]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const stredHashPassword = user.password_hash;
            bcrypt.compare(password, stredHashPassword, (err, valid) => {
                if (err) {
                    console.log("error comparee pssword :", err);
                    done(err, null);
                } else {
                    if (valid) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                }
            })
        } else {
            return done("user not found");
        }
    } catch (err) {
        console.log(err);
    }
}));
passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser((user, done) => {
    done(null, user);
})
export default router;
