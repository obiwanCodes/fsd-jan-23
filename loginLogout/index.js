import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/user.js";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import { auth, logger } from "./middlewares/auth.js";
import { generateAccessToken } from "./utils.js";
import { createClient } from "redis";
const app = express();
const PORT = 5010;
dotenv.config();
connectDB();

const client = createClient({
  password: process.env.REDIS_CLIENT_PASSWORD,
  socket: {
    host: "redis-10977.c55.eu-central-1-1.ec2.cloud.redislabs.com",
    port: 10977,
  },
});
client.on("error", (err) => console.log("Redis Client Error", err));
client.connect();

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

  const accessToken = generateAccessToken({
    userId: user._id,
    userEmail: user.email,
  });
  const refreshToken = jwt.sign(
    {
      userId: user._id,
      userEmail: user.email,
    },
    process.env.JWT_REFRESH_TOKEN_SECRET_KEY
  );
  let refreshTokens = await client.get("refreshTokens");
  if (!refreshTokens)
    await client.set("refreshTokens", JSON.stringify([refreshToken]));
  else
    await client.set(
      "refreshTokens",
      JSON.stringify([...JSON.parse(refreshTokens), refreshToken])
    );
  res.send({
    message: "login success",
    email: user.email,
    accessToken,
    refreshToken,
  });
});

app.post("/token", async (req, res) => {
  const token = req.body.token;
  if (!token) {
    return res.sendStatus(401);
  }
  let refreshTokens = JSON.parse(await client.get("refreshTokens"));
  if (!refreshTokens.includes(token)) {
    return res.sendStatus(403);
  }
  try {
    const decodedPayload = jwt.verify(
      token,
      process.env.JWT_REFRESH_TOKEN_SECRET_KEY
    );
    const accessToken = generateAccessToken(decodedPayload);
    return res.send({ accessToken });
  } catch (error) {
    return res.sendStatus(403);
  }
});

app.delete("/logout", async (req, res) => {
  let refreshTokens = JSON.parse(await client.get("refreshTokens"));
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  await client.set("refreshTokens", JSON.stringify(refreshTokens));
  res.sendStatus(204);
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
