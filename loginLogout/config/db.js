import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // const conn = await mongoose.connect(
    //   process.env.MONGO_LOCAL_CONNECTION_STRING
    // );
    const conn = await mongoose.connect(
        process.env.MONGO_ATLAS_CONNECTION_STRING
      );
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
