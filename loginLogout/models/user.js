import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an email"],
       unique: [true, "Email already exists"]
    },
    password: {
        type: String,
        required: [true, "Please please a password"]
    },
    role: {
        type: Object,
        required: false
    }
})

const User = mongoose.model("User", UserSchema);

export default User;