// const express = require("express");
import express from "express";
import postRoutes from "./routes/posts.js";
import cityRoutes from "./routes/cities.js";
import adventureRoutes from "./routes/adventures.js";
import productRoutes from "./routes/products.js";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
/* LowDb boilerplate */
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

// db.json file path
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "db.json");

// Configure lowdb to write data to JSON file
const db = new Low(new JSONFile(file), { posts: [] });

// Read data from JSON file, this will set db.data content
// If JSON file doesn't exist, defaultData is used instead
await db.read();

export default db;

dotenv.config();
connectDB();

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
app.use("/cities", cityRoutes);
app.use("/adventures", adventureRoutes);
app.use("/products", productRoutes);

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
