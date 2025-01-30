import express from "express";
import jwt from "jsonwebtoken";
import { UserModel, ContentModel } from "./db";
import { userMiddleware } from "./userMiddleware";
const app = express();
require("dotenv").config();

app.use(express.json());
app.post("/api/v1/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    await UserModel.create({
      username: username,
      password: password,
    });
    res.json({ message: "User signed up" });
  } catch (e) {
    res.status(409).json({ message: "User already exists" });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Find a user with the provided credentials.
  const existingUser = await UserModel.findOne({ username, password });

  if (existingUser) {
    const JWT_SECRET = process.env.JWT_USER_PASSWORD as string;

    const token = jwt.sign({ id: existingUser._id }, JWT_SECRET);
    res.json({ token }); // Send the token in response.
  } else {
    // Send error response for invalid credentials.
    res.status(403).json({ message: "Incorrect credentials" });
  }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const { link, type, title } = req.body;
  // Create a new content entry linked to the logged-in user.
  await ContentModel.create({
    link,
    type,
    title,
    //@ts-ignore
    userId: req.userid, // userId is added by the middleware.
    tags: [], // Initialize tags as an empty array.
  });

  res.json({ message: "Content added" }); // Send success response.
});

app.get("/api/v1/content", async (req, res) => {
  //@ts-ignore
  const userid = req.userid;
  const content = await ContentModel.find({
    userid: userid,
  }).populate("userId", "username");
  res.json({
    content,
  });
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  const contentId = req.body.contentId;

  // Delete content based on contentId and userId.
  //@ts-ignore
  await ContentModel.deleteMany({ contentId, userId: req.userid });
  res.json({ message: "Deleted" }); // Send success response.
});
app.get("/api/v1/brain/share", (req, res) => {});

app.get("/api/v1/brain/:shareLink", (req, res) => {});

app.listen(3000);
