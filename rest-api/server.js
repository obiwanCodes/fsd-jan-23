// const express = require("express");
import express from "express";
import postRoutes from "./routes/posts.js";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = 5000;
app.use(bodyParser.json());
app.use(cors());
// const students = [
//   {
//     firstName: "Zalmai",
//     lastName: "Zazai",
//   },
//   {
//     firstName: "Brian",
//     lastName: "Hughes",
//   },
//   {
//     firstName: "Shoeib",
//     lastName: "Khan",
//   },
//   {
//     firstName: "Richard",
//     lastName: "Hughes",
//   },
//   {
//     firstName: "Jay",
//     lastName: "Vejayan",
//   },
// ];

app.get("/test", (req, res) => {
  res.send("API working!");
});

// app.get("/students", (req, res) => {
//   res.send(students);
// });

app.use("/posts", postRoutes);
//app.use("/users", userRoutes);

app.post("/chat", async (req, res) => {
  const response = await axios.post(
    "https://slack.com/api/chat.postMessage",
    req.body,
    {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
      },
    }
  );
  res.send(response?.data);
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
