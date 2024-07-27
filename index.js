import express from "express";
import bodyParser from "body-parser";
import authRoute from "./routes/auth.js";
import postRout from "./routes/posts.js";
import userRoute from "./routes/user.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import multer from "multer";

const port = process.env.PORT;
const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../../clients/YumYard/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    res.status(200).json(file.filename);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/posts", postRout);
app.use("/api/users", userRoute);

app.listen(port, () => {
  console.log(`server run in port ${port}`);
});
