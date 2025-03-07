import express from "express";
import { Content, Link, User } from "./db";
import jwt from "jsonwebtoken";
import { USER_JWT } from "./config";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    await User.create({ username, password });
    res.json({ message: "User signed up" });
  } catch (e) {
    res.status(409).json({ message: "User already exists" });
  }
});

app.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const existingUser = await User.findOne({ username, password });

  if (existingUser) {
    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      USER_JWT
    );
    res.json({ token: token });
  } else {
    res.status(403).json({ message: "Incorrect credentials" });
  }
});

app.post("/content", userMiddleware, async (req, res) => {
  const { link, type, title } = req.body;

  await Content.create({
    link,
    type,
    title,
    //@ts-ignore
    userId: req.userId,
    tags: [],
  });

  res.json({ message: "Content added" });
});

app.get("/content", userMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;

  const content = await Content.find({ userId: userId }).populate(
    "userId",
    "username"
  );
  res.json(content);
});

app.delete("/content", userMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  const contentId = req.body.contentId;

  await Content.deleteOne({ _id: contentId, userId: userId });
  res.json({ message: "Deleted" }); // Send success response.
});

app.post("/brain/share", userMiddleware, async (req, res) => {
  const { share } = req.body;
  //@ts-ignore
  const userId = req.userId;
  if (share) {
    const existingUser = await Link.findOne({
      //@ts-ignore
      userId: userId,
    });

    if (existingUser) {
      res.json({
        "hash:": existingUser.hash,
      });
      return;
    }

    const hash = random(10);
    await Link.create({
      //@ts-ignore
      userId: userId,
      hash: hash,
    });

    res.json({
      message: "/share/" + hash,
    });
  } else {
    await Link.deleteOne({
      userId: userId,
    });
    res.json({
      message: "Link Removed",
    });
  }
});

app.get("/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;

  const link = await Link.findOne({
    hash,
  });

  if (!link) {
    res.status(411).json({
      message: "sorry incorrect message",
    });
  }

  const content = await Content.findOne({
    userId: link?.userId,
  });

  const user = await User.findOne({
    _id: link?.userId,
  });

  res.json({
    username: user?.username,
    content: content,
  });
});
app.listen(3000);
