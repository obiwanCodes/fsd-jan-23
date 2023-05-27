import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/user.js";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
const app = express();
const PORT = 5010;
dotenv.config();
connectDB();

app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.send("Test")
})

app.post("/register", async (req, res) => {
    let user;
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        user = new User({
            email: req.body.email,
            password: hashedPassword
        });
    } catch (error) {
        return res.status(400).send({message: "Bad Request"})
    }

    try {
        const response = await user.save();
        return res.status(201).send({
            message: "User created successfully",
            response
        })
    } catch (error) {
        return res.status(500).send({
            message: "Error creating user",
            error
        })
    }
})

app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`))