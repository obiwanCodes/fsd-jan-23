import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { createClient } from "redis";
dotenv.config();

const app = express();
const PORT = 5008;

// const client = createClient({
//   password: process.env.REDIS_CLIENT_PASSWORD,
//   socket: {
//     host: "redis-10977.c55.eu-central-1-1.ec2.cloud.redislabs.com",
//     port: 10977,
//   },
// });

const client = createClient();
client.on("error", (err) => console.log("Redis Client Error", err));
client.connect();

app.get("/", (req, res) => res.send("API working"));

app.get("/photos", async (req, res) => {
  const photos = await client.get("photos");
  if (photos) {
    console.log("cache hit");
    return res.send(JSON.parse(photos));
  }
  console.log("cache miss");
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/photos"
  );
  client.setEx("photos", 10, JSON.stringify(response.data));
  res.send(response.data);
});

app.listen(PORT, () => console.log(`Server running on PORT:${PORT}`));
