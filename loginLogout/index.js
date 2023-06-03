import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/user.js";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import { auth, logger } from "./middlewares/auth.js";
const app = express();
const PORT = 5010;
dotenv.config();
connectDB();

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Test");
});

app.post("/register", async (req, res) => {
  let user;
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user = new User({
      email: req.body.email,
      password: hashedPassword,
    });
  } catch (error) {
    return res.status(400).send({ message: "Bad Request" });
  }

  try {
    const response = await user.save();
    return res.status(201).send({
      message: "User created successfully",
      response,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error creating user",
      error,
    });
  }
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send({
      message: "Email/Password is incorrect",
    });
  }

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    return res.status(404).send({
      message: "Email/Password is incorrect",
    });
  }

  const token = jwt.sign(
    {
      userId: user._id,
      userEmail: user.email,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "20s" }
  );

  res.send({
    message: "login success",
    email: user.email,
    token,
  });
});

app.get("/public", logger, (req, res) => {
  res.send({
    message: "this endpoint is public",
  });
});

app.get("/private", auth, (req, res) => {
  res.send({
    message: "this endpoint requires authentication",
  });
});

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
