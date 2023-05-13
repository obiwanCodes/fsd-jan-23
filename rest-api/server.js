// const express = require("express");
import express from "express";
import postRoutes from "./routes/posts.js";
const app = express();
const PORT = 5000;

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

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
